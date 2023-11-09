const express = require('express');
const dotenv = require('dotenv').config();
const app = express();
const db = require('./models/index');
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

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`OutRight Api running on port ${port}`);
});
