const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ConflictingRequestError = require("../errors/conflicting-request-error");
const { changeData, getData, getUserData } = require('./helpers/helpers');

const errMessageUserNotFound = 'Пользователь не найден';

const { NODE_ENV, JWT_SECRET } = process.env;

const getUsers = (req, res, next) => {
  getData(User, req, res, next);
};

const changeUserInfo = (req, res, next) => {
  const me = req.user._id;
  const { name, about } = req.body;
  changeData(User, { name, about }, me, req, res, errMessageUserNotFound);
};

const changeUserAvatar = (req, res, next) => {
  const me = req.user._id;
  const { avatar } = req.body;
  changeData(User, { avatar }, me, req, res, errMessageUserNotFound);
};

const getUserById = (req, res, next) => {
  getUserData(User, req.params.id, res, next, errMessageUserNotFound);
};

const getUserInfo = (req, res, next) => {
  getUserData(User, req.user._id, res, next, errMessageUserNotFound);
};

const createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then(hash => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictingRequestError('Данная почта уже зарегистрирована'));
        return;
      }
      return next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.cookie(
        'jwt',
        token,
        {
          maxAge: 360000,
          httpOnly: true,
          sameSite: true,
        },
      );
      res.status(200).send({ message: 'Вход успешно выполнен' });
    })
    .catch(next);
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  getUserInfo,
  changeUserInfo,
  changeUserAvatar,
  login,
};
