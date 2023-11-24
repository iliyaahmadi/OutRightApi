const Cart = require('../models').cart;
const CartProduct = require('../models').cart_products;
const asyncErrorHandler = require('../utils/asyncErrorHandler');

const getItems = asyncErrorHandler(async (req, res, next) => {
  await Cart.findOne({
    where: { userId: req.userId },
    attributes: ['id'],
  }).then(async (c) => {
    await CartProduct.findAll({
      where: { cartId: c.id },
      attributes: ['productId'],
    }).then((i) => {
      return res.status(200).json({ cart: c.id, items: i });
    });
  });
});

module.exports = {
  getItems,
};
