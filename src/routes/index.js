const userRoutes = require('./user-routes.js');
const authRoutes = require('./auth-routes.js');
const productRoutes = require('./product-routes.js');
const blogRoutes = require('./blog-routes.js');
const adminRoutes = require('./admin-routes.js');
const reviewRoutes = require('./review-routes.js');
const questionRoutes = require('./question-routes.js');

module.exports = function (app) {
  app.use('/api/v1', userRoutes);
  app.use('/api/v1', authRoutes);
  app.use('/api/v1', productRoutes);
  app.use('/api/v1', blogRoutes);
  app.use('/api/v1', reviewRoutes);
  app.use('/api/v1', questionRoutes);
  app.use('/api/v1/admin', adminRoutes);
};
