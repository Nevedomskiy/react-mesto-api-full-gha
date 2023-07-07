const Card = require('../models/card');
const { changeLike, getData } = require('./helpers/helpers');
const AssertionError = require('../errors/assertion-error');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-error');

const errMessageCardNotFound = 'Карточка не найдена';

const getCards = (req, res, next) => {
  getData(Card, req, res, next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card
    .create({ name, link, owner })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании карточки.'));
      } else {
        next(err);
      }
    });
};

const removeCardById = (req, res, next) => {
  Card
    .findById(req.params.id)
    .then((card) => {
      if (!card) {
        next(new NotFoundError(errMessageCardNotFound));
      } else if (req.user._id !== card.owner.toString()) {
        next(new AssertionError('Попытка удалить чужую карточку'));
      } else {
        Card
          .findByIdAndDelete(req.params.id)
          .then(() => { res.status(200).send({ message: 'Карточка удалена' }); })
          .catch(next);
      }
    });
};

const addLikeCardById = (req, res, next) => {
  changeLike(Card, { $addToSet: { likes: req.user._id } }, req, res, next, errMessageCardNotFound);
};

const removeLikeCardById = (req, res, next) => {
  changeLike(Card, { $pull: { likes: req.user._id } }, req, res, next, errMessageCardNotFound);
};

module.exports = {
  getCards,
  createCard,
  removeCardById,
  addLikeCardById,
  removeLikeCardById,
};
