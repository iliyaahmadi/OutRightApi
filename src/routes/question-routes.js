const questionRoutes = require('express').Router();
const { findAll, remove } = require('../controllers/Review-controller');
const userAuth = require('../middlewares/user-auth');
// const adminAuth = require('../middlewares/admin-auth');

questionRoutes.route('/question').get(findAll).delete(userAuth, remove);

module.exports = questionRoutes;
