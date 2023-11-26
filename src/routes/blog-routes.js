const blogRoutes = require('express').Router();
const {
  findAll,
  findById,
  create,
  edit,
  remove,
  getImages,
  uploadProfile,
  addSection,
  removeSection,
  editSection,
  addImage,
  removeImage,
} = require('../controllers/blog-controller');
const bloggerAuth = require('../middlewares/blogger-auth');
const uploadImage = require('../utils/uploadImg');

blogRoutes.route('/blog').get(findAll).post(bloggerAuth, create);

blogRoutes
  .route('/blog/:id')
  .get(findById)
  .put(bloggerAuth, edit)
  .delete(bloggerAuth, remove);

blogRoutes.route('/blog/:id/section').post(bloggerAuth, addSection);
blogRoutes
  .route('/blog/section/:id')
  .put(bloggerAuth, editSection)
  .delete(bloggerAuth, removeSection);

blogRoutes.route('/blog/section/image').post(bloggerAuth, addImage);
blogRoutes.route('/blog/section/image/:id').delete(bloggerAuth, removeImage);

module.exports = blogRoutes;
