const express = require('express');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review, ReviewImage, User, Sequelize } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');
// const user = require('../../db/models/user');

const router = express.Router();

///////////////////////// POST //////////////////////////////////////////////

router.post('/:reviewId/images', [restoreUser, requireAuth], async (req, res) => {
  let review = await Review.findByPk(req.params.reviewId);

  if (review) {
    review = review.dataValues;
  } else {
    res.statusCode = 404;
    res.json({
      "message": "Review couldn't be found",
      "statusCode": 404
    });
  }

  // Find the number of images that already exist for the review
  const numberOfImgs = await ReviewImage.findAll({ where: { reviewId: req.params.reviewId }});
  if (numberOfImgs.length >= 10) {
    res.statusCode = 403;
    res.json({
      "message": "Maximum number of images for this resource was reached",
      "statusCode": 403
    });
  }

  const { url } = req.body;

  await ReviewImage.create({
    reviewId: req.params.reviewId,
    url: url,
  });

  let newestReviewImage = await ReviewImage.scope('createImage').findAll({
    limit: 1,
    order: [['createdAt', 'DESC']],
  });

  newestReviewImage = newestReviewImage[0].dataValues;
  delete newestReviewImage.reviewId;
  delete newestReviewImage.createdAt;
  delete newestReviewImage.updatedAt;

  return res.json(newestReviewImage);
});


///////////////////////// PUT //////////////////////////////////////////////
// Edit a Review
router.put('/:reviewId', [restoreUser, requireAuth], async (req, res) => {
  let reviewEdit = await Review.findOne({ where: { id: req.params.reviewId } });

  if (reviewEdit) {
    reviewEdit = reviewEdit.dataValues;
  } else {
    res.statusCode = 404;
    return res.json({
      "message": "Review couldn't be found",
      "statusCode": 404
    });
  }

  if (reviewEdit.userId !== req.user.id) {
    res.statusCode = 403;
    return res.json('Unauthorized User');
  }

  const { review, stars } = req.body;

  const values = [];

  if (review) {
    values.review = review;
  } else {
    res.statusCode = 400;
    return res.json({
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "review": "Review text is required",
      }
    });
  }
  if (stars) {
    values.stars = stars;
  } else {
    res.statusCode = 400;
    return res.json({
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "stars": "Stars must be an integer from 1 to 5",
      }
    });
  }

  await Review.update(values, { where: { id: req.params.reviewId } });
  let edited = await Review.findByPk(req.params.reviewId);
  edited = edited.dataValues;

  return res.json(edited);
});

///////////////////////// DELETE //////////////////////////////////////////////


///////////////////////// GET //////////////////////////////////////////////

// Get all Reviews of the Current User
router.get('/current', [restoreUser, requireAuth], async (req, res) => {
  // Get all reviews belonging to current user
  let reviews = await Review.findAll({
    where: { userId: req.user.id },
  });

  // Get current user
  let user = await User.findByPk(req.user.id);
  user = user.dataValues;
  delete user.username;
  console.log(user);

  if (reviews.length) {
    for (let i = 0; i < reviews.length; i++) {
      reviews[i] = reviews[i].dataValues;
      reviews[i].User = user;

      let spot = await Spot.scope('currentReviews').findOne({ where: { id: reviews[i].spotId } });
      spot = spot.dataValues;

      // Get image from SportsImages table for the tempSpot
      const img = await SpotImage.findOne({
        where: { spotId: spot.id }
      });


      // Assign url to spot object
      if (img) {
        spot.previewImage = img.dataValues.url;
      } else {
        spot.previewImage = null;
      }

      reviews[i].Spot = spot;

      // Get review images
      const imageArray = [];
      let images = await ReviewImage.scope('currentReview').findAll({ where: { reviewId: reviews[i].id } });
      for (let img of images) {
        imageArray.push(img.dataValues);
      }

      reviews[i].ReviewImages = imageArray;
    }
  }

  return res.json({ "Reviews": reviews });

});


module.exports = router;
