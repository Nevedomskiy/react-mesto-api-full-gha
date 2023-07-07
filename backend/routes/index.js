const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const cardRouter = require('./cards');
const userRouter = require('./users');
const auth = require('../middlewares/auth');
const { validIsURL } = require('../validation/validation');
const { login, createUser } = require('../controllers/users');

router.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login,
);
router.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().custom(validIsURL),
    }),
  }),
  createUser,
);
router.use(auth);
router.use('/cards', cardRouter);
router.use('/users', userRouter);

module.exports = router;
