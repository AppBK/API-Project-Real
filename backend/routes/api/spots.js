const express = require('express');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review, User, Sequelize } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');
// const user = require('../../db/models/user');

const router = express.Router();

//////////////////// POST ////////////////////////////////////////////

router.post('/:spotId/images', [restoreUser, requireAuth], async (req, res) => {
  const { url, preview } = req.body;
  const spotId = req.params.spotId;

  const testSpot = await Spot.findOne({ where: { id: spotId } });

  if (!testSpot) {
    const error = new Error("Spot couldn't be found");
    error.status = 404;
    throw error;
  }

  await SpotImage.create({
    spotId: spotId,
    url: url,
    preview: preview,
  });

  const newestSpotImage = await SpotImage.scope('defaultScope').findAll({
    limit: 1,
    order: [['createdAt', 'DESC']],
  });


  return res.json(newestSpotImage.pop());
});

router.post('/', [restoreUser, requireAuth], async (req, res) => {
  const { address, city, state, country, lat, lng, name, description, price } = req.body;


  await Spot.create({
    ownerId: req.user.dataValues.id,
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

  const newestSpot = await Spot.findAll({
    limit: 1,
    order: [[ 'createdAt', 'DESC']],
  });

  res.statusCode = 201;
  return res.json(newestSpot.pop());

});

/////////////////// PUT //////////////////////////////////////////////////////

router.put('/:spotId', [restoreUser, requireAuth], async (req, res) => {
  let spot = await Spot.findByPk(req.params.spotId);

  if (spot) {
    spot = spot.dataValues;
  } else {
    const error = new Error('Resource Not Found');
    error.status = 400;
    throw error;
  }

  if (spot.ownerId !== req.user.id) {
    throw new Error('Validation Error');
  }

  const { address, city, state, country, lat, lng, name, description, price } = req.body;

  const values = {};

  if (address) values.address = address;
  if (city) values.city = city;
  if (state) values.state = state;
  if (country) values.country = country;
  if (lat) values.lat = lat;
  if (lng) values.lng = lng;
  if (name) values.name = name;
  if (description) values.description = description;
  if (price) values.price = price;

  await Spot.update(values, { where: { ownerId: req.user.id, id: req.params.spotId }});
  spot = await Spot.findByPk(req.params.spotId);
  spot = spot.dataValues;

  return res.json(spot);
});

/////////////////// GET /////////////////////////////////////////////////////

router.get('/:spotId', async (req, res) => {
  let spot = await Spot.findByPk(req.params.spotId);

  // If no spot is found, throw an error!
  if (!spot) {
    const error = new Error("Spot couldn't be found");
    error.status = 404;
    throw error;
  }

  spot = spot.dataValues;

  // Aggregates!
  // Get all reviews for the current spot
  const allReviews = await Review.findAll({
    where: { spotId: spot.id },
  });

  spot.numReviews = allReviews.length;
  // Get rating for each review
  let sum = 0;
  for (const review of allReviews) {
    sum += review.dataValues.stars;
  }

  // Get average rating for spot
  const avgRating = sum / allReviews.length;
  // Add avg to temp object
  spot.avgStarRating = avgRating;


  let spotImages = await SpotImage.findAll({
    where: {
      spotId: spot.id,
    }
  });

  // Collect all spot image objects into an array
  const images = [];
  if (spotImages) {
    for (const image of spotImages) {
      const tempImg = image.dataValues;
      images.push(tempImg);
    }
  }
  spot.SpotImages = images;

  // Get owner of current Spot
  let owner = await User.scope('getOwner').findOne({ where: { id: spot.ownerId } });
  // Retrieve the user object!
  if (owner) owner = owner.dataValues;

  spot.Owner = owner;

  return res.json(spot);
});

router.get('/current', [restoreUser, requireAuth], async (req, res) => {
  // const currentUserId = req.user.id;
  // req.user.id
  console.log('CURRENT: ', req.user.id);

  const currentUserSpots = await Spot.findAll({ where: { ownerId: req.user.id } });
  const spots = [];

  for (const spot of currentUserSpots) {
    // Assign the Spot object to tempSpot
    const tempSpot = spot.dataValues;

    // Get all reviews for the current spot
    const allReviews = await Review.findAll({
      where: { spotId: tempSpot.id },
    });

    // Get rating for each review
    let sum = 0;
    for (const review of allReviews) {
      sum += review.dataValues.stars;
    }

    // Get average rating for spot
    const avgRating = sum / allReviews.length;
    // Add avg to temp object
    tempSpot.avgRating = avgRating;


    // Get image from SportsImages table for the tempSpot
    const img = await SpotImage.findOne({
      where: { spotId: tempSpot.id }
    });

    // Assign url to temp object
    tempSpot.preview = img.url;

    spots.push(tempSpot);
  }

  return res.json({ "Spots": spots });
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

  for (const spot of spots) {
    const tempSpot = spot.dataValues;
    const img = await SpotImage.findOne({
      where: { spotId: tempSpot.id }
    });

   const tempRevs = await Review.findAll({
      where: { spotId: tempSpot.id },
    });

    let sum = 0;
    for (const rev of tempRevs) {
      sum += rev.dataValues.stars;
    }

    const avg = sum / tempRevs.length;

    tempSpot.avgRating = avg;
    tempSpot.previewImage = img.url;

    // await SpotImage.scope('defaultScope', 'createSpotImage')

    response.push(tempSpot);
  }

  return res.json({ "Spots": response });
});

module.exports = router;


/*
detail: 'Failing row contains (null, 6, aaa12789, San Francisco, California, United States of America, 37.7645358, -122.4730327, Apples, Place where web developers are created, 123, 2022-10-26 00:34:21.265+00, 2022-10-26 00:34:21.265+00).',

{{url}}/spots/{{spotId}}/images
Worked: https://splangy01.herokuapp.com/api/spots/2/images

{{url}}/spots/{{spotId}}
*/
