/* eslint-disable no-unused-vars */
// This script will import json data once at into our database at once

const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const Tour = require('./../../models/tourModel');
const User = require('./../../models/userModel');
const Review = require('./../../models/reviewModel');

dotenv.config({ path: './config.env' }); // will read our variables from file and save them in environment variables

// import file data

// const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
// const reviews = JSON.parse(
//   fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8')
// );

const DB = process.env.DATABASE_ATLAS.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

// mongoose
//   .connect(DB, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true
//   })
//   .then(con => {
//     console.log('ATLAS DATABASE - Connected successfully');
//     console.log(con.connections);
//   });

// LOCAL DATABASE
mongoose
  .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  // eslint-disable-next-line no-unused-vars
  .then(con => {
    console.log('LOCAL DATABASE - Connected successfully');
    // console.log(con.connections);
  });

// IMPORT DATA TO COLLECTION

const importData = async () => {
  try {
    // await Tour.create(tours);
    await User.create(users, {
      validateBeforeSave: false
    });
    // await Review.create(reviews);
    // console.log('Data successfully imported');
  } catch (err) {
    // console.log(err);
  }
  process.exit();
};

// DELETE ALL THE DATA FROM THE COLLECTION

const deleteData = async () => {
  try {
    // await Tour.deleteMany();
    await User.deleteMany();
    // await Review.deleteMany();
    // console.log('Data successfully deleted');
  } catch (err) {
    // console.log(err);
  }
  process.exit();
};

// COMMAND TO IMPORT AND DELETE IN DB

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}

// console.log(process.argv);
