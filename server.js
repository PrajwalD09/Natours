const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', err => {
  console.log(err.name, err.message);
  console.log('UNCAUGHT EXCEPTION! Shutting Down...');

  process.exit(1);
});

dotenv.config({ path: './config.env' }); // will read our variables from file and save them in environment variables

const app = require('./app');

// ATLAS DATABASE

const DB = process.env.DATABASE_ATLAS.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(con => {
    console.log('ATLAS DATABASE - Connected successfully');
    console.log(con.connections);
  });


// LOCAL DATABASE

// mongoose
//   .connect(process.env.DATABASE_LOCAL, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true
//   })
//   // eslint-disable-next-line no-unused-vars
//   .then(con => {
//     console.log('LOCAL DATABASE - Connected successfully');
//     // console.log(con.connections);
//   })
//   .catch(err => console.log('DB connection error:', err));

// SERVER
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`app running on port ${port}`);
});

// console.log(process.env);

// Unhandled Rejections
process.on('unhandledRejection', err => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REEJCTION! Shutting Down...');
  server.close(() => {
    process.exit(1);
  });
});
