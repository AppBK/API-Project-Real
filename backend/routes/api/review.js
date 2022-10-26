const express = require('express');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review, User, Sequelize } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');
// const user = require('../../db/models/user');

const router = express.Router();

///////////////////////// POST //////////////////////////////////////////////



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
