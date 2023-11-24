const questionRoutes = require('express').Router();
const {
  findAll,
  create,
  remove,
} = require('../controllers/Question-controller');
const userAuth = require('../middlewares/user-auth');
// const adminAuth = require('../middlewares/admin-auth');

questionRoutes.route('/question').post(userAuth, create);

questionRoutes.route('/question/:id').delete(userAuth, remove);
module.exports = questionRoutes;
