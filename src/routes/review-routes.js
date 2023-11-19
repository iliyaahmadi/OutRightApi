const reviewRoutes = require('express').Router();
const { findAll, like , remove } = require('../controllers/Review-controller');
const userAuth = require('../middlewares/user-auth');
// const adminAuth = require('../middlewares/admin-auth');

reviewRoutes.route('/review').get(findAll).delete(userAuth, remove);
reviewRoutes.route('/review/:id/like').patch(userAuth, like);

module.exports = reviewRoutes;
