const productRoutes = require('express').Router();
const {
  findAll,
  findById,
  create,
  edit,
  remove,
  addAV,
  removeAV,
  addTrait,
  removeTrait,
} = require('../controllers/product-controller');
const { findAll: findAllQA } = require('../controllers/Question-controller');
const { findAll: findAllReview } = require('../controllers/Review-controller');
const userAuth = require('../middlewares/user-auth');
const adminAuth = require('../middlewares/admin-auth');
const uploadImage = require('../utils/uploadImg');

productRoutes.route('/product').get(findAll).post(adminAuth, create);

productRoutes
  .route('/product/:id')
  .get(findById)
  .put(adminAuth, edit)
  .delete(adminAuth, remove);

productRoutes
  .route('/product/:id/attr')
  .post(adminAuth, addAV)
  .delete(adminAuth, removeAV);

productRoutes
  .route('/product/:id/trait')
  .post(adminAuth, addTrait)
  .delete(adminAuth, removeTrait);

productRoutes.route('/product/:id/review').get(findAllReview);

productRoutes.route('/product/:id/question').get(findAllQA);

module.exports = productRoutes;
