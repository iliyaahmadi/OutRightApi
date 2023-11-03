const userRoutes = require('./user-routes.js');
const authRoutes = require('./auth-routes.js');
const blogRoutes = require('./blog-routes.js');

module.exports = function (app) {
  app.use('/api/v1', userRoutes);
  app.use('/api/v1', authRoutes);
  app.use('/api/v1', blogRoutes);
};
