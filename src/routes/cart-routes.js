const cartRoutes = require('express').Router();
const {
  getItems,
  //   addItem,
  //   removeItem
} = require('../controllers/cart-controller');
const userAuth = require('../middlewares/user-auth');

cartRoutes.route('/cart').get(userAuth, getItems);

module.exports = cartRoutes;
