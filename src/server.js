const express = require('express');
const dotenv = require('dotenv').config();
const app = express();
const db = require('./models/index');
const CustomError = require('./utils/customError');
const globalErrorHandler = require('./middlewares/error-handler');
const fs = require('fs');
global.__basedir = __dirname;

//uncaughtExceptions handler
process.on('uncaughtException', (err) => {
  const utc = Date.now();
  const date = new Date(utc).toString();
  const errObject = {
    time: date,
    error_name: err.name,
    error_message: err.message,
    error: err,
  };
  fs.appendFileSync(
    `${__dirname}/logs/uncaughtException.txt`,
    JSON.stringify(errObject, null, 2),
    'UTF-8'
  );
  console.log('uncaughtException Occured , Shutting Down');
  process.exit(1);
});

// --temp for initializing server / reseting DB--

// const {stticRole , stticCat , saveSku} = require('./utils/dbInitial');
// db.sequelize.sync({ force: true }).then(() => {
//   console.log('DB CONNECTED - ReStarted');
//   stticRole(db.role);
//   stticCat(db.category)
//   saveSku(db.saveSKU)
// });

db.sequelize.sync().then(() => {
  console.log('DB CONNECTED');
});

//middlewares
require('./middlewares/index')(app);
//router
require('./routes/index')(app);

//404
app.all('*', (req, res, next) => {
  const err = new CustomError('ادرس داده شده وجود ندارد', 404);
  next(err);
});

//error handler
app.use(globalErrorHandler);

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
  console.log(`OutRight Api running on port ${port}`);
});

//unhandledRejection handler
process.on('unhandledRejection', (err) => {
  const utc = Date.now();
  const date = new Date(utc).toString();
  const errObject = {
    time: date,
    error_name: err.name,
    error_message: err.message,
    error: err,
  };
  fs.appendFileSync(
    `${__dirname}/logs/unhandledRejection.txt`,
    JSON.stringify(errObject, null, 2),
    'UTF-8'
  );
  console.log('unhandledRejection Occured , Shutting Down');
  server.close(() => {
    process.exit(1);
  });
});
