const userRoutes = require('express').Router();
const {
  findAll,
  findOne,
  create,
  edit,
  remove,
  getProfile,
} = require('../controllers/userController');
const userAuth = require('../middlewares/userAuth');
const adminAuth = require('../middlewares/adminAuth');

userRoutes.route('/user').get(userAuth, findAll).post(adminAuth, create);

userRoutes
  .route('/user/:id')
  .get(userAuth, findOne)
  .put(userAuth, edit)
  .delete(adminAuth, remove);

userRoutes.route('/user/profile').get(userAuth, getProfile);

// userRoutes.route('/user/:id/role').patch(adminAuth, updateUserRole);
// userRoutes.route('/user/uploadProfile').patch(userAuth, uploadImage, uploadProfile);

module.exports = userRoutes;
