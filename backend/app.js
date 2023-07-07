require('dotenv').config();
const helmet = require('helmet');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorBadUrl = require('./middlewares/errorBadUrl');
const errorHandler = require('./middlewares/errorHandler');
const corsOptions = require('./middlewares/corsOptions');
const routes = require('./routes/index');
const limiterOptions = require('./middlewares/limiterOptions');

const { PORT = 3000 } = process.env;
const URL = 'mongodb://localhost:27017/mestodb';
const app = express();

// логирование запросов
app.use(requestLogger);

// блокировка множественных запросов(от DoS-атак)
app.use(limiterOptions);

// защита express(шифрование заголовков)
app.use(helmet());

// парсинг кук
app.use(cookieParser());

// преобразование ответа в формат json
app.use(express.json());

// проверка тела запроса
app.use(bodyParser.json());

// поддержка анализа данных запроса
app.use(bodyParser.urlencoded({ extended: true }));

// подключение cors(защита от посторонних запросов)
app.use(corsOptions);

// проверка работоспособности pm2 на сервере(поднимает сервер после ошибки)
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

// подключаем базу данных
mongoose
  .connect(URL, {
    useNewUrlParser: true,
    family: 4,
  });

// обработка запросов
app.use(routes);

// обработка ошибок celebrate
app.use(errors());

// обработка ошибки с неправильным адресом запроса
app.use(errorBadUrl);

// логирование ошибок
app.use(errorLogger);

// конечная обработка ошибок
app.use(errorHandler);

app.listen(PORT, (err) => {
  // eslint-disable-next-line no-console, no-unused-expressions
  err ? console.log(err) : console.log(`Listening port ${PORT}`);
});
