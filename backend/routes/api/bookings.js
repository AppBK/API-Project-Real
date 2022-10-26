const express = require('express');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review, ReviewImage, User, Sequelize } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


///////////////////////// POST //////////////////////////////////////////////




///////////////////////// PUT //////////////////////////////////////////////



///////////////////////// DELETE //////////////////////////////////////////////



///////////////////////// GET //////////////////////////////////////////////

// Get all of the Current User's Bookings
router.get('/current', [restoreUser, requireAuth], async (req, res) => {
  ;
});


module.exports = router;
