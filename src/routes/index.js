const userRoutes = require('./user-routes.js');
const authRoutes = require('./auth-routes.js');

module.exports = function (app) {
  app.use('/api/v1', userRoutes);
  app.use('/api/v1', authRoutes);
};
