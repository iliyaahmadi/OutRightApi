const userRoutes = require('./userRoutes.js');
const authRoutes = require('./authRoutes.js');

module.exports = function (app) {
  app.use('/api/v1', userRoutes);
  app.use('/api/v1', authRoutes);
};
