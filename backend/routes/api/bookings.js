const express = require('express');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review, ReviewImage, User, Booking, Sequelize } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');
const { verify } = require('jsonwebtoken');

const router = express.Router();


///////////////////////// POST //////////////////////////////////////////////




///////////////////////// PUT //////////////////////////////////////////////

router.put('/:bookingId', [restoreUser, requireAuth], async (req, res) => {
  // console.log('bookingId: ',  req.params.bookingId);
  let booking = await Booking.findByPk(req.params.bookingId);
  console.log('BOOKING ID UPDATE: ', booking.id);

  if (booking) {
    booking = booking.toJSON();
  } else {
    res.statusCode = 404;
    return res.json({
      "error": "Booking couldn't be found",
      "statusCode": 404
    });
  }

  // Get today's date
  let currentDate = new Date();
  let year = currentDate.getUTCFullYear();
  let month = currentDate.getUTCMonth() + 1;
  if (Number(month) < 10) {
    month = '0' + month;
  }
  let day = currentDate.getUTCDate();
  if (Number(day) < 10) {
    day = '0' + day;
  }

  currentDate = `${year}-${month}-${day}`;

  // Cannot change bookings in the past...
  if (booking.endDate < currentDate) {
    res.statusCode = 403;
    return res.json({
      "error": "Past bookings can't be modified",
      "statusCode": 403
    });
  }

  const { startDate, endDate } = req.body;

  // Verify that input is fit for updating record
  if (!startDate) throw new Error('startDate cannot be null!');
  if (!endDate) throw new Error('endDate cannot be null!');

  if (endDate < startDate) {
    res.statusCode = 400;
    return res.json({
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "endDate": "endDate cannot come before startDate"
      }
    });
  }

  // Check for Scheduling Conflicts!
  let currentBookings = await Booking.findAll({ where: { spotId: booking.spotId } });

  if (currentBookings.length) {
    // Get raw data object of bookings
    for (let i = 0; i < currentBookings.length; i++) {
      currentBookings[i] = currentBookings[i].dataValues;

      // Validate start and end dates against bookings for that spot
      if (startDate >= currentBookings[i].startDate && startDate <= currentBookings[i].endDate && currentBookings[i].id !== booking.id) {
        res.statusCode = 403;
        return res.json({
          "message": "Sorry, this spot is already booked for the specified dates",
          "error": "Start date conflicts with an existing booking",
        });
      } else if (endDate >= currentBookings[i].startDate && endDate <= currentBookings[i].endDate && currentBookings[i].id !== booking.id) {
        res.statusCode = 403;
        return res.json({
          "message": "Sorry, this spot is already booked for the specified dates",
          "error": "End date conflicts with an existing booking"
        });
      }
    }
  }

  const values = {};
  values.startDate = startDate;
  values.endDate = endDate;
  await Booking.update(values, { where: { id: req.params.bookingId } });

  let updatedBooking = await Booking.findByPk(req.params.bookingId);
  updatedBooking = updatedBooking.dataValues;


  return res.json(updatedBooking);
});

///////////////////////// DELETE //////////////////////////////////////////////

router.delete('/:bookingId', [restoreUser, requireAuth], async (req, res) => {
  let booking = await Booking.findByPk(req.params.bookingId);


  if (booking) {
    booking = booking.toJSON();
  } else {
    res.statusCode = 404;
    return res.json({
      "error": "Booking couldn't be found",
      "statusCode": 404
    });
  }

  //Get today's date
  let currentDate = new Date();
  let year = currentDate.getUTCFullYear();
  let month = currentDate.getUTCMonth() + 1;
  let day = currentDate.getUTCDate();

  if (Number(month) < 10) {
    month = '0' + month;
  }

  if (Number(day) < 10) {
    day = '0' + day;
  }

  currentDate = `${year}-${month}-${day}`;

  if (booking.startDate < currentDate) {
    res.statusCode = 403;
    return res.json({
      "error": "Bookings that have been started can't be deleted",
      "statusCode": 403
    });
  }

  await Booking.destroy({ where: { id: booking.id} })

  return res.json({
    "message": "Successfully deleted",
    "statusCode": 200
  });
});

///////////////////////// GET //////////////////////////////////////////////

// Get all of the Current User's Bookings. URL: /api/bookings/current
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
