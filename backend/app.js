const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const routes = require('./routes');

const { ValidationError } = require('sequelize');

const { environment } = require('./config');
const isProduction = environment === 'production';

const app = express();

// morgan logs and prints requests to the terminal
app.use(morgan('dev'));
app.use(cookieParser());  //Needed for accessing the cookies in headers and things like tokens and jwts
app.use(express.json());



// Security Middleware
if (!isProduction) {
  // enable cors only in development
  app.use(cors());
}

// helmet helps set a variety of headers to better secure your app
app.use(
  helmet.crossOriginResourcePolicy({
    policy: "cross-origin"
  })
);

// Set the _csrf token and create req.csrfToken method
app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && "Lax",
      httpOnly: true
    }
  })
);

app.use(routes); // Connect all the routes


// Error Handling middleware
app.use((_req, _res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.title = "Resource Not Found";
  err.errors = ["The requested resource couldn't be found."];
  err.status = 404;
  next(err);
});

app.use((err, _req, _res, next) => {
  // check if error is a Sequelize error:
  if (err instanceof ValidationError) {
    err.errors = err.errors.map((e) => e.message);
    err.title = 'Validation error';

    if (err.errors.includes("email must be unique")) {
      err.status = 403;
    }
  }
  next(err);
});

app.use((err, _req, res, _next) => {
  res.status(err.status || 500);
  console.error(err);
  res.json({
    title: err.title || 'Server Error',
    message: err.message,
    errors: err.errors,
    stack: isProduction ? null : err.stack
  });
});


module.exports = app;


// HEADER: { "alg": "HS256", "typ": "JWT" }
// PAYLOAD: { "email": "myself@appacademy.io" }

// require('crypto').randomBytes(64).toString('hex');
//'b084f41b5e674eabcc8c416251e98f19c90c43443b1f5ccc908c913c12d778f716f504ee1f050dd18fdab1d5213f5c0e954cf851eae47775a9f90f62369aea00'
