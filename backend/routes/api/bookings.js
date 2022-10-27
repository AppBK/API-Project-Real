const express = require('express');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review, ReviewImage, User, Booking, Sequelize } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


///////////////////////// POST //////////////////////////////////////////////




///////////////////////// PUT //////////////////////////////////////////////



///////////////////////// DELETE //////////////////////////////////////////////



///////////////////////// GET //////////////////////////////////////////////

// Get all of the Current User's Bookings
router.get('/current', [restoreUser, requireAuth], async (req, res) => {
  let bookings = await Booking.findAll({ where: { userId: req.user.id } });

  console.log(bookings);

  const response = [];
  if (bookings.length) {
    for (let i = 0; i < bookings.length; i++) {
      // Get raw data object from booking
      bookings[i] = bookings[i].dataValues;

      // Get spot data to add to response object
      let spot = await Spot.findByPk(bookings[i].spotId);
      spot = spot.dataValues;
      delete spot.description;
      delete spot.createdAt;
      delete spot.updatedAt;

      let spotImg = await SpotImage.findOne({ where: { spotId: spot.id, preview: true }});
      spotImg = spotImg.dataValues;

      spot.previewImage = spotImg.url;

      bookings[i].Spot = spot;

      response.push(bookings[i]);
    }
  }

  return res.json({ "Bookings": response });
});


module.exports = router;
