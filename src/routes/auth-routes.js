const authRoutes = require('express').Router();
const { login, signup, logout } = require('../controllers/auth-controller');
const userAuth = require('../middlewares/user-auth');
const validateDto = require('../middlewares/validate-dto');
const userSchema = require('../schema/user');

authRoutes.route('/login').post(login);

authRoutes.route('/signup').post(validateDto(userSchema), signup);

authRoutes.route('/logout').get(userAuth, logout);

module.exports = authRoutes;
