const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// const corsOptions = {
//   origin: 'http://localhost:5000',
// };

module.exports = function (app) {
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  //static image folder
  app.use('/Images', express.static(__basedir + './Images'));
};
