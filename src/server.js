const express = require('express');
const dotenv = require('dotenv').config();
const app = express();
const db = require('./models/index');
const CustomError = require('./utils/customError');
const globalErrorHandler = require('./middlewares/error-handler');
global.__basedir = __dirname;

// temp for initializing server / reseting DB

// const {stticRole , stticCat} = require('./utils/dbInitial');

// db.sequelize.sync({ force: true }).then(() => {
//   console.log('DB CONNECTED - ReStarted');
//   stticRole(db.role);
//   stticCat(db.category)
// });

db.sequelize.sync().then(() => {
  console.log('DB CONNECTED');
});

//middlewares
require('./middlewares/index')(app);
//router
require('./routes/index')(app);

app.all('*', (req, res, next) => {
  const err = new CustomError('ادرس داده شده وجود ندارد', 404);
  next(err);
});

app.use(globalErrorHandler);
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`OutRight Api running on port ${port}`);
});
