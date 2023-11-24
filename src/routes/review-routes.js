const reviewRoutes = require('express').Router();
const {
  findAll,
  create,
  like,
  remove,
} = require('../controllers/Review-controller');
const userAuth = require('../middlewares/user-auth');
// const adminAuth = require('../middlewares/admin-auth');

reviewRoutes.route('/review').post(userAuth, create).delete(userAuth, remove);

reviewRoutes.route('/review/:id').get(findAll);

reviewRoutes.route('/review/:id/like').patch(userAuth, like);

module.exports = reviewRoutes;
