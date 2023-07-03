const allowedCors = [
  'https://practic.front.nvv.nomoreparties.sbs',
  'http://practic.front.nvv.nomoreparties.sbs',
  'http://localhost:3000',
];

// module.exports = (req, res, next) => {
//   const { origin } = req.headers;
//   const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";
//   const requestHeaders = req.headers['access-control-request-headers'];
//   const { method } = req;

//   if (allowedCors.includes(origin)) {
//     res.header('Access-Control-Allow-Origin', origin);
//   }
//   if (method === 'OPTIONS') {
//     res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
//     res.header('Access-Control-Allow-Headers', requestHeaders);
//     return res.end();
//   }

//   next();
// };

module.exports.corsOptions = {
  credentials: true,
  origin: (origin, callback) => {
    if (allowedCors.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};
