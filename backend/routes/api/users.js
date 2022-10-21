const express = require('express');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  check('firstName')
    .isLength({min: 0}),
  check('lastName')
    .isLength({ min: 0 }),
  handleValidationErrors
];



const router = express.Router();

router.post('/', validateSignup, async (req, res) => {
    const { email, password, username, firstName, lastName } = req.body;
    const user = await User.signup({ email, username, password, firstName, lastName });

    await setTokenCookie(res, user);

    return res.json({
      user
    });
  }
);

module.exports = router;

/*

fetch('/api/users', {
  method: 'POST',
  headers: {
    "Content-Type": "application/json",
    "XSRF-TOKEN": "cm9MVmzx-prc8fEdSlDtRCWS5NUPhN2o83TM"
  },
  body: JSON.stringify({
    email: 'spidey@spider.man',
    username: 'Spidey',
    password: 'password'
  })
}).then(res => res.json()).then(data => console.log(data));

fetch('/api/users', {
  method: 'POST',
  headers: {
    "Content-Type": "application/json",
    "XSRF-TOKEN": "cm9MVmzx-prc8fEdSlDtRCWS5NUPhN2o83TM"
  },
  body: JSON.stringify({
    email: 'poser@io.net',
    username: 'Spidey',
    password: 'password'
  })
}).then(res => res.json()).then(data => console.log(data));

fetch('/api/users', {
  method: 'POST',
  headers: {
    "Content-Type": "application/json",
    "XSRF-TOKEN": "cm9MVmzx-prc8fEdSlDtRCWS5NUPhN2o83TM"
  },
  body: JSON.stringify({
    email: 'spidey@spider.man',
    username: 'poser',
    password: 'password'
  })
}).then(res => res.json()).then(data => console.log(data));


fetch('/api/users', {
  method: 'POST',
  headers: {
    "Content-Type": "application/json",
    "XSRF-TOKEN": "alm8w6Ly-eAA_6KzG_uOLgipOZhuTbIqLYs8"
  },
  body: JSON.stringify({
    email: 'firestar@spider.man',
    username: 'Firestar',
    password: 'password',
    firstName: 'Splangy',
    lastName: 'Bear-Costume'
  })
}).then(res => res.json()).then(data => console.log(data));

firestar@spider.man
Firestar
*/
