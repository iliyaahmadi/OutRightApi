const userRoutes = require('express').Router();
const {
  findAll,
  findById,
  create,
  edit,
  remove,
  getProfile,
  updateUserRole,
  uploadProfile,
} = require('../controllers/userController');
const userAuth = require('../middlewares/userAuth');
const adminAuth = require('../middlewares/adminAuth');
const uploadImage = require('../utils/uploadImg');

userRoutes.route('/user').get(adminAuth, findAll).post(adminAuth, create);

userRoutes
  .route('/user/:id')
  .get(userAuth, findById)
  .put(userAuth, edit)
  .delete(adminAuth, remove);

userRoutes.route('/user/profile').get(userAuth, getProfile);

userRoutes.route('/user/:id/role').patch(adminAuth, updateUserRole);
userRoutes
  .route('/user/uploadProfile')
  .patch(userAuth, uploadImage, uploadProfile);

module.exports = userRoutes;
