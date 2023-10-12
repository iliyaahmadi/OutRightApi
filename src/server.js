const express = require('express');
const dotenv = require('dotenv').config();
const app = express();
const db = require('./models/index');
global.__basedir = __dirname;

// temp for initializing server / reseting DB
// const initial = require('./utils/initial');
// {force : true}

db.sequelize.sync().then(() => {
  console.log('DB CONNECTED');
  // initial(db.role);
});

//middlewares
require('./middlewares/index')(app);
//router
require('./routes/index')(app);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`OutRight Api running on port ${port}`);
});
