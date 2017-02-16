var express = require('express');
var router = express.Router();
var passport = require('passport');
var controllers = require('.././controllers');
var AuthMiddleware = require('.././settings/authentication/login.auth');

router.get('/', controllers.LoginControl.index);

//routas de usuario
//router.get('/auth/signup', controllers.UserControl.getSignUp);
router.post('/auth/signup', controllers.UserControl.postSignUp);
//router.get('/auth/signin', controllers.UserControl.getSignIn);
router.post('/auth/login',  passport.authenticate('local', {
	successRedirect : '/index',
	failureRedirect : '/index',
	failureFlash : true 
}));
//router.get('/auth/logout', controllers.UserControl.logout);
//router.get('/users/panel', AuthMiddleware.isLogged ,controllers.UserControl.getUserPanel);

module.exports = router;
