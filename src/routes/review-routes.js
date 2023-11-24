const reviewRoutes = require('express').Router();
const {
  findAll,
  create,
  remove,
  like,
  dislike,
} = require('../controllers/Review-controller');
const userAuth = require('../middlewares/user-auth');
// const adminAuth = require('../middlewares/admin-auth');

reviewRoutes.route('/review').post(userAuth, create).delete(userAuth, remove);

//id is for product
reviewRoutes.route('/review/:id').get(findAll);

reviewRoutes.route('/review/:id/like').patch(userAuth, like);
reviewRoutes.route('/review/:id/dislike').patch(userAuth, dislike);

module.exports = reviewRoutes;
