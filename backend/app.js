require('dotenv').config();
const helmet = require('helmet');
const cors = require('cors');
const express = require('express');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors, celebrate, Joi } = require('celebrate');
const cardRouter = require('./routes/cards');
const userRouter = require('./routes/users');
const auth = require('./middlewares/auth');
const { validIsURL } = require('./validation/validation');
const NotFoundError = require('./errors/not-found-err');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const corsOptions = require('./middlewares/corsOptions');
const { login, createUser } = require('./controllers/users');

const URL = 'mongodb://localhost:27017/mestodb';
const app = express();
const { PORT = 3000 } = process.env;
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(requestLogger);
app.use(limiter);
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(corsOptions);
// app.get('/crash-test', () => {
//   setTimeout(() => {
//     throw new Error('Сервер сейчас упадёт');
//   }, 0);
// });

mongoose
  .connect(URL, {
    useNewUrlParser: true,
    family: 4,
  });
app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login,
);
app.post(
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

app.use(auth);
app.use('/cards', cardRouter);
app.use('/users', userRouter);
app.use(errorLogger);
app.use(errors());
app.use((req, res) => {
  throw new NotFoundError('Маршрут указан некорректно');
});
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
});

app.listen(PORT, (err) => {
  err ? console.log(err) : console.log(`Listening port ${PORT}`);
});
