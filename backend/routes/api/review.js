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



///////////////////////// DELETE //////////////////////////////////////////////


///////////////////////// GET //////////////////////////////////////////////

router.get('/current', [restoreUser, requireAuth], async (req, res) => {
  let reviews = await Review.findAll({ where: { userId: req.user.id } });

  console.log(reviews);
  if (reviews.length) {
    reviews = reviews.dataValues;
  }


});


module.exports = router;
