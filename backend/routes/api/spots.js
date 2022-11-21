const express = require('express');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review, User, ReviewImage, Booking, Sequelize } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');
const { verify } = require('jsonwebtoken');
// const user = require('../../db/models/user');

const router = express.Router();

//////////////////// POST ////////////////////////////////////////////

router.post('/:spotId/reviews', [restoreUser, requireAuth], async (req, res) => {
  let spot = await Spot.findByPk(req.params.spotId);

  if (spot) {
    spot = spot.dataValues;
  } else {
    const error = new Error("Spot couldn't be found");
    error.status = 404;
    throw error;
  }

  const hasReview = await Review.findOne({
    where: {
      spotId: spot.id,
      userId: req.user.id,
    }
  });

  if (hasReview) {
    res.statusCode = 403;
    return res.json({
      "message": "User already has a review for this spot",
      "statusCode": 403,
      "errors": "User already has a review for this spot"
    });
    // const error = new Error("User already has a review for this spot");
    // error.status = 403;
    // throw error;
   }

  const { review, stars } = req.body;

  await Review.create({
    spotId: req.params.spotId,
    userId: req.user.id,
    review: review,
    stars: stars,
  });

  let newestReview = await Review.findAll({
    limit: 1,
    order: [['createdAt', 'DESC']],
  });

  newestReview = newestReview[0].dataValues;

  // Get info of user who gave the review
  let user = await User.findByPk(newestReview.userId);
  user = user.dataValues;
  delete user.username;

  newestReview.User = user;

  let revImg = await ReviewImage.create({
    reviewId: newestReview.id,
    url: 'https://cdn.royalcanin-weshare-online.io/UCImMmgBaxEApS7LuQnZ/v2/eukanuba-market-image-puppy-beagle?w=5596&h=2317&rect=574,77,1850,1045&auto=compress,enhance',
  });

  let defaultReviewImg = await ReviewImage.findAll({
    limit: 1,
    order: [['createdAt', 'DESC']],
  });

  // defaultReviewImg = defaultReviewImg.dataValues;
  console.log(defaultReviewImg[0].dataValues);

  newestReview.ReviewImages = defaultReviewImg;

  res.statusCode = 201;
  return res.json(newestReview);

});

// Create a Booking from a Spot based on the Spot's id
router.post('/:spotId/bookings', [restoreUser, requireAuth], async (req, res) => {
  let spot = await Spot.findByPk(req.params.spotId);

  if (spot) {
    // Get the raw data values of the object
    spot = spot.dataValues;
  } else {
    res.statusCode = 404;
    return res.json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    });
  }

  const { startDate, endDate } = req.body;

  // Validate dates
  if (endDate <= startDate) {
    res.statusCode = 400;
    return res.json({
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "endDate": "endDate cannot be on or before startDate"
      }
    });
  }

  // Check for Scheduling Conflicts!
  let currentBookings = await Booking.findAll({ where: { spotId: spot.id } });

  if (currentBookings.length) {
    // Get raw data object of bookings
    for (let i = 0; i < currentBookings.length; i++) {
      currentBookings[i] = currentBookings[i].dataValues;

      // Validate start and end dates against all current bookings for that spot
      if (startDate >= currentBookings[i].startDate && startDate <= currentBookings[i].endDate) {
        res.statusCode = 403;
        return res.json({
          "message": "Sorry, this spot is already booked for the specified dates",
          "statusCode": 403,
          "errors": {
            "startDate": "Start date conflicts with an existing booking",
          }
        });
      } else if (endDate >= currentBookings[i].startDate && startDate <= currentBookings[i].endDate) {
        res.statusCode = 403;
        return res.json({
          "message": "Sorry, this spot is already booked for the specified dates",
          "statusCode": 403,
          "errors": {
            "endDate": "End date conflicts with an existing booking"
          }
        });
      }
    }
  }

  // Create the booking
  await Booking.create({
    spotId: spot.id,
    userId: req.user.id,
    startDate: startDate,
    endDate: endDate,
  });

  // Get the new booking
  let newestBooking = await Booking.findAll({
    limit: 1,
    order: [['createdAt', 'DESC']],
  });

  newestBooking = newestBooking.pop();
  newestBooking = newestBooking.dataValues;

  return res.json(newestBooking);
});

router.post('/:spotId/images', [restoreUser, requireAuth], async (req, res) => {
  let spot = await Spot.findByPk(req.params.spotId);

  if (spot) {
    spot = spot.dataValues;
  } else {
    res.statusCode = 404;
    return res.json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    });
  }

  if (spot.ownerId !== req.user.id) {
    res.statusCode = 403;
    return res.json({ "message": "Unauthorized User!"});
  }

  const { url, preview } = req.body;

  await SpotImage.create({
    spotId: req.params.spotId,
    url: url,
    preview: preview,
  });

  let newestSpotImg = await SpotImage.findAll({
    limit: 1,
    order: [['createdAt', 'DESC']],
  });

  newestSpotImg = newestSpotImg[0].dataValues;

  return res.json(newestSpotImg);
});

router.post('/', [restoreUser, requireAuth], async (req, res) => {
  const { address, city, state, country, lat, lng, name, description, price, category } = req.body;


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
    price: price,
    category
  });

  let newestSpot = await Spot.findAll({
    limit: 1,
    order: [[ 'createdAt', 'DESC']],
  });

  // console.log('NEWEST-SPOT: ', newestSpot[0].dataValues);
  newestSpot = newestSpot[0].dataValues;
  newestSpot.avgRating = null;
  newestSpot.previewImage = 'https://cdn.royalcanin-weshare-online.io/UCImMmgBaxEApS7LuQnZ/v2/eukanuba-market-image-puppy-beagle?w=5596&h=2317&rect=574,77,1850,1045&auto=compress,enhance';

  // console.log('AFTER: ', newestSpot);
  res.statusCode = 201;
  return res.json(newestSpot);

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


/////////////////// DELETE /////////////////////////////////////////////////////

router.delete('/:spotId', [restoreUser, requireAuth], async (req, res) => {
  let spot = await Spot.findByPk(req.params.spotId);

  if (spot) {
    spot = spot.dataValues;
  } else {
    const error = new Error('Spot could not Found.');
    error.status = 404;
    throw error;
  }

  if (spot.ownerId !== req.user.id) {
    const error = new Error('Current user is Unauthorized to delete specified data.');
    error.status = 403;
    throw error;
  }

  await SpotImage.destroy({ where: { spotId: spot.id } });
  await Review.destroy({ where: { spotId: spot.id } });
  await Booking.destroy({ where: { spotId: spot.id } });


  await Spot.destroy({ where: { id: spot.id } });

  res.json({
    "message": "Successfully deleted",
    "statusCode": 200
  });
});



/////////////////// GET ///////////////////////////////////////////////////////

router.get('/current', [restoreUser, requireAuth], async (req, res) => {

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

    if (img) {
      tempSpot.previewImage = img.dataValues.url;
    } else {
      tempSpot.previewImage = null;
    }

    spots.push(tempSpot);
  }

  return res.json({ "Spots": spots });
});

router.get('/:spotId/images', [restoreUser, requireAuth], async (req, res) => {
  const { url, preview } = req.body;
  const spotId = req.params.spotId;

  const testSpot = await Spot.findOne({ where: { id: spotId } });

  if (!testSpot) {
    const error = new Error("Spot couldn't be found");
    error.status = 404;
    throw error;
  }

  if (testSpot.dataValues.ownerId !== req.user.id) {
    const error = new Error("Unauthorized Action");
    error.status = 403;
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

// Get all Reviews by a Spot's id
router.get('/:spotId/reviews', [restoreUser], async (req, res) => {
  const reviews = await Review.findAll({ where: { spotId: req.params.spotId } });

  console.log('GOT REVIEWS!!');

  if (reviews.length) {
    for (let i = 0; i < reviews.length; i++) {
      // Just get the 'raw' review data object
      reviews[i] = reviews[i].dataValues;

      // Get info of user who gave the review
      let user = await User.findByPk(reviews[i].userId);
      user = user.dataValues;
      delete user.username;

      reviews[i].User = user;

      // Get review images
      const imageArray = [];
      let images = await ReviewImage.scope('currentReview').findAll({ where: { reviewId: reviews[i].id } });
      for (let img of images) {
        imageArray.push(img.dataValues);
      }

      reviews[i].ReviewImages = imageArray;
    }
  } else {
    res.statusCode = 404;
    return res.json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    });
  }

  // console.log(reviews);

  return res.json({ "Reviews": reviews });
});

// Get all Bookings for a Spot based on the Spot's id
router.get('/:spotId/bookings', [restoreUser, requireAuth], async (req, res) => {
  // Verify the owner of the spot
  let verifyOwner = await Spot.findByPk(req.params.spotId);

  if (verifyOwner) {
    verifyOwner = verifyOwner.dataValues;
  } else {
    res.statusCode = 404;
    return res.json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    });
  }

// {{spotIdForBooking}}

  let bookings;
  if (verifyOwner.ownerId === req.user.id) {
    // Return ALL info!
    let owner = await User.scope('getOwner').findByPk(req.user.id);
    owner = owner.dataValues;

    bookings = await Booking.findAll({ where: { spotId: req.params.spotId } });

    if (bookings.length) {
      const response = [];
      for (let i = 0; i < bookings.length; i++) {
        let tempBooking = {};
        tempBooking.User = owner;
        bookings[i] = bookings[i].dataValues;
        // Tedium
        tempBooking.id = bookings[i].id;
        tempBooking.spotId = bookings[i].spotId;
        tempBooking.userId = bookings[i].userId;
        tempBooking.startDate = bookings[i].startDate;
        tempBooking.endDate = bookings[i].endDate;
        tempBooking.createdAt = bookings[i].createdAt;
        tempBooking.updatedAt = bookings[i].updatedAt;

        response.push(tempBooking);
      }

      return res.json({ "Bookings": response });
    } else {
      return res.json({ "Bookings": [] });
    }

  } else {
    // Return sparse info.
    bookings = await Booking.scope('allBookingsNonOwner').findAll({ where: { spotId: req.params.spotId } });

    if (bookings.length) {
      for (let i = 0; i < bookings.length; i++) {
        bookings[i] = bookings[i].dataValues;
      }
      return res.json({ "Bookings": bookings });
    } else {
      return res.json({ "Bookings": []});
    }
  }
});


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


//  Add Query Filters to Get All Spots
router.get('/', async (req, res) => {
  // const spots = await Spot.findAll({});

  let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice, where } = req.query;

  if (where) {
    where = { category: where };
  }

  console.log('WHERE: ', where);

  if (!page || page < 1 || page > 10) page = 1;
  if (!size || size < 1 || size > 20) size = 25;

  let offset = size * (page - 1);

  const spots = await Spot.findAll({
    limit: size,
    offset: offset,
    where,
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
    // Help;
    tempSpot.previewImage = img.url;

    response.push(tempSpot);
  }

  if (req.query.page) {
    return res.json({ "Spots": response, "page": page, "size": size });
  } else {
    return res.json({
      "Spots": response
    });
  }
});

module.exports = router;


/*
detail: 'Failing row contains (null, 6, aaa12789, San Francisco, California, United States of America, 37.7645358, -122.4730327, Apples, Place where web developers are created, 123, 2022-10-26 00:34:21.265+00, 2022-10-26 00:34:21.265+00).',

{{url}}/spots/{{spotId}}/images
Worked: https://splangy01.herokuapp.com/api/spots/2/images

{{url}}/spots/{{spotId}}
*/

/*
  //   include: [
  //   {
  //       model: Review,
  //       as: 'avgRating',
  //       attributes: {
  //         include: [[Sequelize.fn("AVG", Sequelize.col("stars")), "avgRating"]],
  //       }
  //   },
  // ],


RETURN from Create a Spot:
  {
      "id": 1,
      "ownerId": 1,
      "address": "123 Disney Lane",
      "city": "San Francisco",
      "state": "California",
      "country": "United States of America",
      "lat": 37.7645358,
      "lng": -122.4730327,
      "name": "App Academy",
      "description": "Place where web developers are created",
      "price": 123,
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-19 20:39:36"
    }


RETURN from Get all spots:

    {
      "Spots": [
        {
          "id": 1,
          "ownerId": 1,
          "address": "123 Disney Lane",
          "city": "San Francisco",
          "state": "California",
          "country": "United States of America",
          "lat": 37.7645358,
          "lng": -122.4730327,
          "name": "App Academy",
          "description": "Place where web developers are created",
          "price": 123,
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36",
          "avgRating": 4.5,
          "previewImage": "image url"
        }
      ]
    }


NEWEST-SPOT:  [
  Spot {
    dataValues: {
      id: 46,
      ownerId: 6,
      address: '1555 Farley Ave.',
      city: 'San Jose',
      state: 'California',
      country: 'United States',
      lat: 4567,
      lng: 4567,
      name: 'CHEESY',
      description: 'Hey Now',
      price: 30,
      category: 'BeachFront',
      createdAt: 2022-11-18T22:26:37.969Z,
      updatedAt: 2022-11-18T22:26:37.969Z
    },
    _previousDataValues: {
      id: 46,
      ownerId: 6,
      address: '1555 Farley Ave.',
      city: 'San Jose',
      state: 'California',
      country: 'United States',
      lat: 4567,
      lng: 4567,
      name: 'CHEESY',
      description: 'Hey Now',
      price: 30,
      category: 'BeachFront',
      createdAt: 2022-11-18T22:26:37.969Z,
      updatedAt: 2022-11-18T22:26:37.969Z
    },
    uniqno: 1,
    _changed: Set(0) {},
    _options: {
      isNewRecord: false,
      _schema: null,
      _schemaDelimiter: '',
      raw: true,
      attributes: [Array]
    },
    isNewRecord: false
  }
]


  */
