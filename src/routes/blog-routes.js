const blogRoutes = require('express').Router();
const {
  findAll,
  findById,
  create,
  edit,
  remove,
  getImages,
  uploadProfile,
} = require('../controllers/blog-controller');
const userAuth = require('../middlewares/user-auth');
const bloggerAuth = require('../middlewares/blogger-auth');
const uploadImage = require('../utils/uploadImg');

blogRoutes.route('/blog').get(userAuth, findAll).post(bloggerAuth, create);

blogRoutes
  .route('/blog/:id')
  .get(userAuth, findById)
  .put(bloggerAuth, edit)
  .delete(bloggerAuth, remove);

module.exports = blogRoutes;
