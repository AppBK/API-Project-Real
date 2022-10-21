const { validationResult } = require('express-validator');

const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = validationErrors
      .array()
      .map((error) => `${error.msg}`);

    const err = Error('Bad request.');
    err.errors = errors;
    err.status = 400;
    err.title = 'Bad request.';
    next(err);
  }
  next();
};


module.exports = {
  handleValidationErrors
};

/*
fetch('/api/session', {
  method: 'POST',
  headers: {
    "Content-Type": "application/json",
    "XSRF-TOKEN": "CDbmUYMY-xEWiWHYjF74twbjaDBM7BHsJdm0"
  },
  body: JSON.stringify({ credential: 'Hey Now', password: '' })
}).then(res => res.json()).then(data => console.log(data));

*/
