const Cart = require('../models').cart;
const Product = require('../models').product;
const CartProduct = require('../models').cart_products;
const asyncErrorHandler = require('../utils/asyncErrorHandler');

const getItems = asyncErrorHandler(async (req, res, next) => {
  await Cart.findOne({
    where: { userId: req.userId },
    attributes: ['id'],
  }).then(async (cart) => {
    await CartProduct.findAll({
      where: { cartId: cart.id },
      attributes: ['productId', 'amount'],
    }).then(async (items) => {
      if (items.length == 0) {
        return res.status(200).json({ msg: 'سبد خرید شما خالی است' });
      } else {
        let cartItems = [];
        for (let item of items) {
          await Product.findOne({
            where: { id: item.dataValues.productId },
            attributes: ['id', 'title', 'price', 'image'],
          }).then((p) => {
            p.setDataValue('incart', item.amount);
            cartItems.push(p.dataValues);
          });
        }
        return res.status(200).json(cartItems);
      }
    });
  });
});

module.exports = {
  getItems,
};
