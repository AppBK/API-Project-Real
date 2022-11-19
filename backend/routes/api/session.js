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
    } else return res.json(null);
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


// Rawaha's Infinite Wisdom!!! Let's fix this bitch!!

1) home page is nto all. spots, it acutually defaultsto the first category, so. if you create a spotin another category,
it doesnt show. up on the main page, and it looks like its not created, ut. it is under the correct category, just.
not intuitive #FIXED?

2) on refresh we get logged out FIXED!!

3) no demo user button  # FIXED!!

4) make category iterable drop down, had to figure out how to create a spot. #FIXED!!

5) is there a way to show all spots? or I can only see the spot I created on the category i put it on.

6) when yo uadd an image, it doesnt dymanically update created a spot and when I click on the spot from the home page the spot detail page breaks.
#FIXED!!

7) on edit,  able to submit a blank form and there is no error handling and it breaks the app

8) able to submit a blank review form, we dont get error handling and it breaks the app.

9) left a review as one user and was able to delete it as another user, was not able to delete it as the user
who left the review.

10) make that logout modal prettier!!

*/
