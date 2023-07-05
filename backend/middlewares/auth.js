const jwt = require('jsonwebtoken');
const UnauthorizedError = require("../errors/unauthorized-error");

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies;
  console.log(token);
  if (!token) {
    next(new UnauthorizedError('Необходима авторизация'));
    return;
  }

  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
    );
  } catch (err) {
    next(new UnauthorizedError('Необходима авторизация'));
    return;
  }

  req.user = payload;

  next();
};
