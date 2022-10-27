const express = require('express');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review, ReviewImage, User, Booking, Sequelize } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


///////////////////////// DELETE //////////////////////////////////////////////

router.delete('/:imageId', [restoreUser, requireAuth], async (req, res) => {
  let image = await SpotImage.scope('deleteImage').findByPk(req.params.imageId);

  // Verify image exists
  if (image) {
    image = image.dataValues;
  } else {
    res.statusCode = 404;
    return res.json({
      "message": "Spot Image couldn't be found",
      "statusCode": 404
    });
  }

  // Verify owner of Spot that image belongs to
  let owner = await Spot.findByPk(image.spotId);
  owner = owner.dataValues;

  if (owner.ownerId !== req.user.id) {
    const error = new Error('Current user is Unauthorized to delete specified data.');
    error.status = 403;
    throw error;
  };

  await SpotImage.destroy({ where: { id: req.params.imageId } });

  res.json({
    "message": "Successfully deleted",
    "statusCode": 200
  });
});

module.exports = router;
