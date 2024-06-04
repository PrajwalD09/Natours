/* eslint-disable node/no-unpublished-require */
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const cors = require('cors');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const viewRouter = require('./routes/viewRoutes');
const bookingRouter = require('./routes/bookingRoutes');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './views'));

// 1) MIDDLEWARES

// set security http header
// app.use(helmet());
// app.use(helmet.crossOriginEmbedderPolicy());
// app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
// app.use(helmet.contentSecurityPolicy());

//inbuilt

// app.use(helmet({ crossOriginEmbedderPolicy: false, originAgentCluster: true }));
// app.use(
//   helmet.contentSecurityPolicy({
//     useDefaults: true,
//     directives: {
//       defaultSrc: ["'self'", 'data:', 'blob:', 'https://js.stripe.com/'],
//       imgSrc: ["'self'", 'https: data: blob:'],
//       scriptSrc: [
//         "'self'",
//         'https://*.cloudflare.com',
//         'https://js.stripe.com/v3/'
//       ]
//       // connectSrc: ["'self'", "blob:"],
//     }
//   })
// );

//Security HTTP headers
// Further HELMET configuration for Security Policy (CSP)

// --------------- sajan -   works

// app.use(
//   helmet({
//     crossOriginEmbedderPolicy: false
//   })
// );

// // Further HELMET configuration for Security Policy (CSP)
// const scriptSrcUrls = [
//   'https://api.tiles.mapbox.com/',
//   'https://api.mapbox.com/',
//   'https://*.cloudflare.com',
//   'https://js.stripe.com/v3/',
//   'https://checkout.stripe.com'
// ];
// const styleSrcUrls = [
//   'https://api.mapbox.com/',
//   'https://api.tiles.mapbox.com/',
//   'https://fonts.googleapis.com/',
//   'https://www.myfonts.com/fonts/radomir-tinkov/gilroy/*',
//   ' checkout.stripe.com'
// ];
// const connectSrcUrls = [
//   'https://*.mapbox.com/',
//   'https://*.cloudflare.com',
//   'http://127.0.0.1:3000',
//   'http://127.0.0.1:52191',
//   '*.stripe.com'
// ];

// const fontSrcUrls = ['fonts.googleapis.com', 'fonts.gstatic.com'];

// app.use(
//   helmet.contentSecurityPolicy({
//     directives: {
//       defaultSrc: [],
//       connectSrc: ["'self'", ...connectSrcUrls],
//       scriptSrc: ["'self'", ...scriptSrcUrls],
//       styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
//       workerSrc: ["'self'", 'blob:'],
//       objectSrc: [],
//       imgSrc: ["'self'", 'blob:', 'data:'],
//       fontSrc: ["'self'", ...fontSrcUrls],
//       frameSrc: ['*.stripe.com', '*.stripe.network']
//     }
//   })
// );

//--------------- this works beautifully

const scriptSrcUrls = [
  'https://unpkg.com/',
  'https://tile.openstreetmap.org/',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://cdnjs.cloudflare.com/ajax/libs/axios/1.5.1/axios.min.js',
  'http://127.0.0.1:3000/api/v1/users/login',
  'https://cdnjs.cloudflare.com',
  'https://js.stripe.com/v3/',
  'https://js.stripe.com/'
];
const framesSrcUrls = ['https://js.stripe.com/'];
const styleSrcUrls = [
  'https://unpkg.com/',
  'https://tile.openstreetmap.org/',
  'https://fonts.googleapis.com/',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
];
const connectSrcUrls = [
  'https://unpkg.com/',
  'https://tile.openstreetmap.org/',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://cdnjs.cloudflare.com/ajax/libs/axios/1.5.1/axios.min.js',
  'http://127.0.0.1:3000/api/v1/users/login',
  'https://cdnjs.cloudflare.com',
  'ws://localhost:56331/',
  'https://js.stripe.com/v3/',
  'https://js.stripe.com/',
  'ws:', // Allow WebSocket connections
  'wss:'
];
const fontSrcUrls = ['fonts.googleapis.com', 'fonts.gstatic.com'];

app.use(cors());
app.options('*', cors());

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: [],
      connectSrc: ["'self'", ...connectSrcUrls],
      scriptSrc: ["'self'", ...scriptSrcUrls],
      styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
      workerSrc: ["'self'", 'blob:'],
      objectSrc: [],
      imgSrc: ["'self'", 'blob:', 'data:', 'https:'],
      fontSrc: ["'self'", ...fontSrcUrls],
      frameSrc: ["'self'", ...framesSrcUrls]
    }
  })
);

// since mapbox not working

// const scriptSrcUrls = [
//   'https://unpkg.com/',
//   'https://tile.openstreetmap.org',
//   'https://cdnjs.cloudflare.com',
//   'https://js.stripe.com'
// ];
// const styleSrcUrls = [
//   'https://unpkg.com/',
//   'https://tile.openstreetmap.org',
//   'https://fonts.googleapis.com/',
//   'https://cdnjs.cloudflare.com',
//   'https://js.stripe.com'
// ];
// const connectSrcUrls = [
//   'https://unpkg.com',
//   'https://tile.openstreetmap.org',
//   'ws:', // Allow WebSocket connections
//   'wss:'
// ];
// const fontSrcUrls = ['fonts.googleapis.com', 'fonts.gstatic.com'];

// //set security http headers
// app.use(
//   helmet.contentSecurityPolicy({
//     directives: {
//       defaultSrc: [],
//       connectSrc: ["'self'", ...connectSrcUrls],
//       scriptSrc: ["'self'", ...scriptSrcUrls],
//       styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
//       workerSrc: ["'self'", 'blob:'],
//       objectSrc: [],
//       imgSrc: ["'self'", 'blob:', 'data:', 'https:'],
//       fontSrc: ["'self'", ...fontSrcUrls]
//     }
//   })
// );

// ------------------------------------------

// app.use(helmet());

// // after
// app.use(
//   helmet.contentSecurityPolicy({
//     directives: {
//       defaultSrc: ["'self'"],
//       scriptSrc: ["'self'", 'unpkg.com'],
//       styleSrc: ["'self'", 'cdnjs.cloudflare.com']
//       // fontSrc: ["'self'", "maxcdn.bootstrapcdn.com"],
//     }
//   })
// );

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); //used for logging
}

// limit request from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000, // allows 100 reqs from same ip in 1 hr
  message: 'Too many requests, please try again in an hour'
});
app.use('/api', limiter);

// Body Parser, reading data from the body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());

// Data Sanitization against NOSQL querry injection
app.use(mongoSanitize()); // filters $ signs

// Data Sanitization against XSS
app.use(xss());

// Prevent Parameter pollution
app.use(
  hpp({
    whiteList: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price'
    ]
  })
);

app.use(compression());

// Serving static files
// app.use(express.static(`${__dirname}/public`));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3) ROUTES

app.use('/', viewRouter);
app.use('/api/v1/tours', tourRouter); //mounting the router on new routers
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/bookings', bookingRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`), 400);
});

app.use(globalErrorHandler);

// 4) SERVER
module.exports = app;
