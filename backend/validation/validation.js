const validator = require('validator');
const BadRequestError = require('../errors/bad-request-error');

module.exports.validIsURL = (value) => {
  const result = validator.isURL(value);
  if (result) {
    return value;
  }
  throw new BadRequestError('Ссылка невалидна');
};
