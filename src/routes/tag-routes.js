const tagRoutes = require('express').Router();
const {
  findAll,
  create,
  remove,
  addToBlog,
  addToProduct,
} = require('../controllers/tag-controller');
const adminAuth = require('../middlewares/admin-auth');

tagRoutes.route('/tag').get(adminAuth, findAll).post(adminAuth, create);
tagRoutes.route('/tag/:id').delete(adminAuth, remove);

// recieves arr of tagID
tagRoutes.route('/tag/addToBlog/:id').post(adminAuth, addToBlog);
tagRoutes.route('/tag/addToProduct/:id').post(adminAuth, addToProduct);

module.exports = tagRoutes;
