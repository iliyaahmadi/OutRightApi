const productRoutes = require('express').Router();
const {
  findAll,
  findById,
  create,
} = require('../controllers/product-controller');
const userAuth = require('../middlewares/user-auth');
const adminAuth = require('../middlewares/admin-auth');
const uploadImage = require('../utils/uploadImg');

productRoutes.route('/product').get(findAll).post(adminAuth, create);

productRoutes.route('/product/:id').get(findById);
//   .put(adminAuth, edit)
//   .delete(adminAuth, remove);

module.exports = productRoutes;
