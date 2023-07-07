const NotFoundError = require('../../errors/not-found-err');
const BadRequestError = require('../../errors/bad-request-error');

const changeData = (out, body, id, req, res, next, errMessageNotFound) => {
  out
    .findByIdAndUpdate(
      id,
      body,
      {
        new: true,
        runValidators: true,
      },
    )
    .orFail(new NotFoundError(errMessageNotFound))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при обновлении профиля.'));
      } else {
        next(err);
      }
    });
};

const changeLike = (out, method, req, res, next, errMessageNotFound) => {
  out
    .findByIdAndUpdate(
      req.params.id,
      method,
      { new: true },
    )
    .orFail(new NotFoundError(errMessageNotFound))
    .then((newCard) => res.status(200).send(newCard))
    .catch(next);
};

const getData = (out, req, res, next) => {
  out
    .find({})
    .then((data) => {
      res.status(200).send(data);
    })
    .catch(next);
};

const getUserData = (out, id, res, next, errMessageNotFound) => {
  out
    .findById(id)
    .orFail(new NotFoundError(errMessageNotFound))
    .then((user) => res.status(200).send(user))
    .catch(next);
};

module.exports = {
  changeData,
  getData,
  changeLike,
  getUserData,
};
