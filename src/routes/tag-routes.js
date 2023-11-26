const tagRoutes = require('express').Router();
const { findAll, create, remove } = require('../controllers/tag-controller');
const adminAuth = require('../middlewares/admin-auth');

tagRoutes.route('/tag').get(adminAuth, findAll).post(adminAuth, create);
tagRoutes.route('/tag/:id').delete(adminAuth, remove);

module.exports = tagRoutes;
