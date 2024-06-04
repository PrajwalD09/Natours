const Tour = require('../models/tourModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/appError');
const Booking = require('../models/bookingModel');

exports.getOverview = catchAsync(async (req, res, next) => {
  // 1) get tour data from collection
  const tours = await Tour.find();

  // 2) build template

  // 3) render that template usin tour data from 1

  res.status(200).render('overview', {
    title: 'All Tours',
    tours
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  // 1) Get the data, for the requested tour(including reviews and guides)
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user'
  });

  if (!tour) {
    return next(new AppError('There is no tour with that name', 404));
  }
  // 2) Build template

  // 3) Render template using data from step 1

  res
    .status(200)
    // .set('Content-Security-Policy', "connect-src 'self' https://unpkg.com ")
    .render('tour', {
      title: `${tour.name} Tour`,
      tour
    });
});

exports.getLoginForm = (req, res) => {
  res
    .status(200)
    // .set(
    //   'Content-Security-Policy',
    //   "connect-src 'self' https://cdnjs.cloudflare.com"
    // )
    .render('login', {
      title: 'Log into your account'
    });
};

exports.getSignupForm = (req, res) => {
  // 1) Render that template using data from 1)
  res.status(200).render('signup', {
    title: `Create an account`
  });
};

exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'Your Account'
  });
};

exports.getMyTours = catchAsync(async (req, res, next) => {
  // 1) Find all bookings

  const bookings = await Booking.find({ user: req.user.id });

  // 2) Find tours with the returned IDs
  const tourIDs = bookings.map(el => el.tour);
  const tours = await Tour.find({ _id: { $in: tourIDs } });

  res.status(200).render('overview', {
    title: 'My Tours',
    tours
  });
});

// exports.getMyTours = catchAsync(async (req, res, next) => {
//   console.log('in getMytours');
//   // 1) Find all bookings with their corresponding tours
//   const bookings = await Booking.find({ user: req.user.id });
//   // 2) Extract tours without the duplicates (e.g. in case user bought the same Tour 1 million times)
//   const toursObj = {};
//   bookings.forEach(el => {
//     if (!toursObj[el.tour.id]) toursObj[el.tour.id] = el.tour;
//   });
//   const tours = Object.values(toursObj);

//   console.log(tours);

//   res.status(200).render('overview', {
//     title: 'My Tours',
//     tours
//   });
// });
