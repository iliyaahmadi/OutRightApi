const adminRoutes = require('express').Router();
const {
  removeByAdmin: removeQuestion,
} = require('../controllers/Question-controller');
const {
  removeByAdmin: removeReview,
} = require('../controllers/Review-controller');
const adminAuth = require('../middlewares/admin-auth');

adminRoutes.route('/question').delete(adminAuth, removeQuestion);

adminRoutes.route('/review').delete(adminAuth, removeReview);

module.exports = adminRoutes;
