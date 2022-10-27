const express = require('express');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { response } = require('express');


const validateLogin = [
  check('credential') // email OR UserName
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a valid email or username.'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.'),
  handleValidationErrors
];


const router = express.Router();

router.get('/', restoreUser, (req, res) => {
    const { user } = req;
    if (user) {
      return res.json(
        user.toSafeObject()
      );
    } else return res.json({});
  }
);


router.post('/', validateLogin, async (req, res, next) => {
  const { credential, password } = req.body;

  const user = await User.login({ credential, password });

  if (!user) {
    const err = new Error('Login failed');
    err.status = 401;
    err.title = 'Login failed';
    err.errors = ['The provided credentials were invalid.'];
    return next(err);
  }

  let token = await setTokenCookie(res, user);

  user.dataValues.token = "";

  let response = {};
  response.id = user.dataValues.id;
  response.firstName = user.dataValues.firstName;
  response.lastName = user.dataValues.lastName;
  response.email = user.dataValues.email;
  response.username = user.dataValues.username;
  response.token = token;


  return res.json(
    response
  );
});

router.delete('/', (_req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'success' });
  }
);

module.exports = router;

// "TtcRABgi-0fR6k8AblItQlH6GWRKkw4H1VXs"
// Google: "cm9MVmzx-prc8fEdSlDtRCWS5NUPhN2o83TM"

/*
fetch('/api/session', {
  method: 'POST',
  headers: {
    "Content-Type": "application/json",
    "XSRF-TOKEN": "cm9MVmzx-prc8fEdSlDtRCWS5NUPhN2o83TM"
  },
  body: JSON.stringify({ credential: 'Demo-lition', password: 'password' })
}).then(res => res.json()).then(data => console.log(data));
*/

/*
fetch('/api/session', {
  method: 'POST',
  headers: {
    "Content-Type": "application/json",
    "XSRF-TOKEN": "in5tlx7f--9ogxOhxMPi1nnGa48SZcie2qc4"
  },
  body: JSON.stringify({ credential: 'demo@user.io', password: 'password' })
}).then(res => res.json()).then(data => console.log(data));
*/

/*
fetch('/api/session', {
  method: 'POST',
  headers: {
    "Content-Type": "application/json",
    "XSRF-TOKEN": "in5tlx7f--9ogxOhxMPi1nnGa48SZcie2qc4"
  },
  body: JSON.stringify({ credential: 'Demo-lition', password: 'Hello World!' })
}).then(res => res.json()).then(data => console.log(data));
*/

/*
fetch('/api/session', {
  method: 'DELETE',
  headers: {
    "Content-Type": "application/json",
    "XSRF-TOKEN": "cm9MVmzx-prc8fEdSlDtRCWS5NUPhN2o83TM"
  }
}).then(res => res.json()).then(data => console.log(data));

*/
