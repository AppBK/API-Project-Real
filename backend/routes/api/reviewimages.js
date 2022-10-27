const express = require('express');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review, ReviewImage, User, Booking, Sequelize } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


///////////////////////// DELETE //////////////////////////////////////////////

router.delete('/:imageId', [restoreUser, requireAuth], async (req, res) => {
  let image = await ReviewImage.findByPk(req.params.imageId);

  if (image) {
    image = image.toJSON();
  } else {
    res.statusCode = 404;
    return res.json({
      "message": "Review Image couldn't be found",
      "statusCode": 404
    });
  }

  // Confirm owner id
  let review = await Review.findOne({ where: { id: image.reviewId }});

  review = review.toJSON();

  if (review.userId !== req.user.id) {
    res.statusCode = 403;
    return res.json({ "message": 'You are not Authorized to delete this content!'});
  }

  await ReviewImage.destroy({ where: { id: req.params.imageId }});

  return res.json({
    "message": "Successfully deleted",
    "statusCode": 200
  });
});


module.exports = router;
