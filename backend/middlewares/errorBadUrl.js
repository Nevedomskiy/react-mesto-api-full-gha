const NotFoundError = require('../errors/not-found-err');

module.exports = () => {
  throw new NotFoundError('Маршрут указан некорректно');
};
