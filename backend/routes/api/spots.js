const express = require('express');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { Spot, SpotImage, Review, Sequelize } = require('../../db/models');
// const Sequelize = db.Sequelize;
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');

const router = express.Router();

router.post('/spots', requireAuth, async (req, res) => {
  const { address, city, state, country, lat, lng, name, description, price } = req.body;

  const newSpot = await Spot.create({
    address: address,
    city: city,
    state: state,
    country: country,
    lat: lat,
    lng: lng,
    name: name,
    description: description,
    price: price
  });

  return res.json(newSpot);

});

router.get('/', async (_req, res) => {
  const spots = await Spot.findAll({
  //   include: [
  //   {
  //       model: Review,
  //       as: 'avgRating',
  //       attributes: {
  //         include: [[Sequelize.fn("AVG", Sequelize.col("stars")), "avgRating"]],
  //       }
  //   },
  // ],
  });

  const response = [];

  for (spot of spots) {
    const tempSpot = spot.dataValues;
    const img = await SpotImage.findOne({
      where: { spotId: tempSpot.id }
    });

    const tempRevs = await Review.findAll({
      where: { spotId: tempSpot.id },
    });

    let sum = 0;
    let num = 0;
    for (rev of tempRevs) {
      sum += rev.dataValues.stars;
      num++;
    }

    const avg = sum / num;

    tempSpot.avgRating = avg;
    tempSpot.previewImage = img.url;

    response.push(tempSpot);
  }

  return res.json({ "Spots": response });
});

module.exports = router;
