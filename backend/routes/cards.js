const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { validIsURL } = require('../validation/validation');

const {
  getCards,
  createCard,
  removeCardById,
  addLikeCardById,
  removeLikeCardById,
} = require('../controllers/cards');

router.get('/', getCards);

router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().custom(validIsURL),
    }),
  }),
  createCard,
);

router.put(
  '/:id/likes',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().hex().length(24),
    }),
  }),
  addLikeCardById,
);

router.delete(
  '/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().hex().length(24),
    }),
  }),
  removeCardById,
);
router.delete(
  '/:id/likes',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().hex().length(24),
    }),
  }),
  removeLikeCardById,
);

module.exports = router;
