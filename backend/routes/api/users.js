const express = require('express');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
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

  let otherUser1 = await User.findAll({
    where: {
      username: { [Op.eq]: username },
    }
  });

  if (otherUser1[0]) {
    res.status(500);
    return res.json({
      "errors": "User with this username already exists"
    })
  }

  let otherUser2 = await User.findAll({
    where: {
      email: { [Op.eq]: email },
    }
  });

  if (otherUser2[0]) {
    res.status(500);
    return res.json({
      "errors": "User with this email already exists"
    })
  }

  // console.log('OTHER USER1: ', otherUser1);
  // console.log('OTHER USER2: ', otherUser2);


    const user = await User.signup({ email, username, password, firstName, lastName });

    let token = setTokenCookie(res, user);
    user.dataValues.token = "";

    let response = {};

  response.id = user.dataValues.id;
  response.firstName = user.dataValues.firstName;
  response.lastName = user.dataValues.lastName;
  response.email = user.dataValues.email;
  response.username = user.dataValues.username;
  response.token = token;

    return res.json(response);
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


/*
Mojave:authenticate-me satori$ heroku logs --tail
2022-10-21T17:29:41.139319+00:00 heroku[web.1]: Error R14 (Memory quota exceeded)
2022-10-21T17:30:10.331805+00:00 heroku[web.1]: Process running mem=516M(100.9%)
2022-10-21T17:30:10.394663+00:00 heroku[web.1]: Error R14 (Memory quota exceeded)
2022-10-21T17:30:14.697945+00:00 heroku[web.1]: Error R10 (Boot timeout) -> Web process failed to bind to $PORT within 60 seconds of launch
2022-10-21T17:30:14.809599+00:00 heroku[web.1]: Stopping process with SIGKILL
2022-10-21T17:30:15.791125+00:00 heroku[web.1]: Process exited with status 137
2022-10-21T17:30:16.211201+00:00 heroku[web.1]: State changed from starting to crashed
2022-10-21T17:30:16.214932+00:00 heroku[web.1]: State changed from crashed to starting
2022-10-21T17:30:21.786094+00:00 heroku[web.1]: Starting process with command `npm start`
2022-10-21T17:30:25.222601+00:00 app[web.1]:
2022-10-21T17:30:25.222639+00:00 app[web.1]: > authenticate-me@1.0.0 start
2022-10-21T17:30:25.222640+00:00 app[web.1]: > npm start --prefix backend
2022-10-21T17:30:25.222640+00:00 app[web.1]:
2022-10-21T17:30:25.935173+00:00 app[web.1]:
2022-10-21T17:30:25.935199+00:00 app[web.1]: > backend@1.0.0 start
2022-10-21T17:30:25.935200+00:00 app[web.1]: > npm start
2022-10-21T17:30:25.935200+00:00 app[web.1]:
2022-10-21T17:30:26.773623+00:00 app[web.1]:
2022-10-21T17:30:26.773643+00:00 app[web.1]: > backend@1.0.0 start
2022-10-21T17:30:26.773643+00:00 app[web.1]: > npm start
2022-10-21T17:30:26.773644+00:00 app[web.1]:
2022-10-21T17:30:27.504795+00:00 app[web.1]:
2022-10-21T17:30:27.504801+00:00 app[web.1]: > backend@1.0.0 start
2022-10-21T17:30:27.504801+00:00 app[web.1]: > npm start
2022-10-21T17:30:27.504801+00:00 app[web.1]:
2022-10-21T17:30:28.423214+00:00 app[web.1]:
2022-10-21T17:30:28.423236+00:00 app[web.1]: > backend@1.0.0 start
2022-10-21T17:30:28.423236+00:00 app[web.1]: > npm start
2022-10-21T17:30:28.423237+00:00 app[web.1]:
2022-10-21T17:30:29.460811+00:00 app[web.1]:
2022-10-21T17:30:29.460829+00:00 app[web.1]: > backend@1.0.0 start
2022-10-21T17:30:29.460830+00:00 app[web.1]: > npm start
2022-10-21T17:30:29.460830+00:00 app[web.1]:
2022-10-21T17:30:30.244145+00:00 app[web.1]:
2022-10-21T17:30:30.244158+00:00 app[web.1]: > backend@1.0.0 start
2022-10-21T17:30:30.244158+00:00 app[web.1]: > npm start
2022-10-21T17:30:30.244158+00:00 app[web.1]:
2022-10-21T17:30:31.505585+00:00 app[web.1]:
2022-10-21T17:30:31.505599+00:00 app[web.1]: > backend@1.0.0 start
2022-10-21T17:30:31.505600+00:00 app[web.1]: > npm start
2022-10-21T17:30:31.505600+00:00 app[web.1]:
2022-10-21T17:30:32.320301+00:00 app[web.1]:
2022-10-21T17:30:32.320319+00:00 app[web.1]: > backend@1.0.0 start
2022-10-21T17:30:32.320319+00:00 app[web.1]: > npm start
2022-10-21T17:30:32.320320+00:00 app[web.1]:
2022-10-21T17:30:33.385513+00:00 app[web.1]:
2022-10-21T17:30:33.385527+00:00 app[web.1]: > backend@1.0.0 start
2022-10-21T17:30:33.385528+00:00 app[web.1]: > npm start
2022-10-21T17:30:33.385528+00:00 app[web.1]:
2022-10-21T17:30:34.256574+00:00 app[web.1]:
2022-10-21T17:30:34.256587+00:00 app[web.1]: > backend@1.0.0 start
2022-10-21T17:30:34.256587+00:00 app[web.1]: > npm start
2022-10-21T17:30:34.256587+00:00 app[web.1]:
2022-10-21T17:30:35.613708+00:00 app[web.1]:
2022-10-21T17:30:35.613727+00:00 app[web.1]: > backend@1.0.0 start
2022-10-21T17:30:35.613728+00:00 app[web.1]: > npm start
2022-10-21T17:30:35.613728+00:00 app[web.1]:
2022-10-21T17:30:36.876296+00:00 app[web.1]:
2022-10-21T17:30:36.876313+00:00 app[web.1]: > backend@1.0.0 start
2022-10-21T17:30:36.876314+00:00 app[web.1]: > npm start
2022-10-21T17:30:36.876314+00:00 app[web.1]:
2022-10-21T17:30:38.237637+00:00 app[web.1]:
2022-10-21T17:30:38.237661+00:00 app[web.1]: > backend@1.0.0 start
2022-10-21T17:30:38.237661+00:00 app[web.1]: > npm start
2022-10-21T17:30:38.237662+00:00 app[web.1]:
2022-10-21T17:30:40.065516+00:00 app[web.1]:
2022-10-21T17:30:40.065527+00:00 app[web.1]: > backend@1.0.0 start
2022-10-21T17:30:40.065527+00:00 app[web.1]: > npm start
2022-10-21T17:30:40.065528+00:00 app[web.1]:
2022-10-21T17:30:41.480573+00:00 app[web.1]:
2022-10-21T17:30:41.480597+00:00 app[web.1]: > backend@1.0.0 start
2022-10-21T17:30:41.480597+00:00 app[web.1]: > npm start
2022-10-21T17:30:41.480598+00:00 app[web.1]:
2022-10-21T17:30:42.847832+00:00 app[web.1]:
2022-10-21T17:30:42.847845+00:00 app[web.1]: > backend@1.0.0 start
2022-10-21T17:30:42.847846+00:00 app[web.1]: > npm start
2022-10-21T17:30:42.847846+00:00 app[web.1]:
2022-10-21T17:30:43.842792+00:00 app[web.1]:
2022-10-21T17:30:43.842818+00:00 app[web.1]: > backend@1.0.0 start
2022-10-21T17:30:43.842818+00:00 app[web.1]: > npm start
2022-10-21T17:30:43.842819+00:00 app[web.1]:
2022-10-21T17:30:45.130873+00:00 app[web.1]:
2022-10-21T17:30:45.130887+00:00 app[web.1]: > backend@1.0.0 start
2022-10-21T17:30:45.130888+00:00 app[web.1]: > npm start
2022-10-21T17:30:45.130888+00:00 app[web.1]:
2022-10-21T17:30:46.561824+00:00 app[web.1]:
2022-10-21T17:30:46.561845+00:00 app[web.1]: > backend@1.0.0 start
2022-10-21T17:30:46.561845+00:00 app[web.1]: > npm start
2022-10-21T17:30:46.561845+00:00 app[web.1]:
2022-10-21T17:30:47.565059+00:00 app[web.1]:
2022-10-21T17:30:47.565064+00:00 app[web.1]: > backend@1.0.0 start
2022-10-21T17:30:47.565064+00:00 app[web.1]: > npm start
2022-10-21T17:30:47.565065+00:00 app[web.1]:
2022-10-21T17:30:56.343644+00:00 heroku[router]: at=error code=H20 desc="App boot timeout" method=GET path="/" host=splangy01.herokuapp.com request_id=90f672ce-8b65-4322-b26a-99d463069a82 fwd="24.23.215.153" dyno= connect= service= status=503 bytes= protocol=https
2022-10-21T17:31:21.865412+00:00 heroku[web.1]: Error R10 (Boot timeout) -> Web process failed to bind to $PORT within 60 seconds of launch
2022-10-21T17:31:21.963861+00:00 heroku[web.1]: Stopping process with SIGKILL
2022-10-21T17:31:22.804039+00:00 app[web.1]: Error waiting for process to terminate: No child processes
2022-10-21T17:31:23.017011+00:00 heroku[web.1]: Process exited with status 22
2022-10-21T17:31:23.092461+00:00 heroku[web.1]: State changed from starting to crashed
2022-10-21T17:31:24.670891+00:00 heroku[router]: at=error code=H10 desc="App crashed" method=GET path="/favicon.ico" host=splangy01.herokuapp.com request_id=96fa7f0f-e371-422a-b518-ed8b9984cfc0 fwd="24.23.215.153" dyno= connect= service= status=503 bytes= protocol=https

*/
