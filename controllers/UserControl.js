var mysql = require('mysql');
var bcrypt = require('bcryptjs');

module.exports = {

	getSignUp : function(req, res, next){
		return res.render('/index');
	},

	postSignUp: function(req, res, next){
		
		var salt = bcrypt.genSaltSync(10);
		var password = bcrypt.hashSync(req.body.password, salt);

		var user = {
			name : req.body.name,
			family_name : req.body.familyname,
			//email_id : req.body.email,
			password : password
		};

		var config = require('.././settings/config.db');

		var db = mysql.createConnection(config);

		db.connect();

		db.query('INSERT INTO tester SET ?', user, function(err, rows, fields){
			if(err) throw err;

			db.end();
		});
		req.flash('info', 'Your account has been registered successfully..!');
		return res.redirect('/index');
	},

	getSignIn: function(req, res, next){
		return res.render('/index', {message: req.flash('info'), authmessage : req.flash('authmessage')});
	},

	/*logout : function(req, res, next){
		req.logout();
		res.redirect('/auth/signin');
	},

	getUserPanel : function(req, res, next){
		res.render('users/panel', {
			isAuthenticated : req.isAuthenticated(),
			user : req.user
		});
	}*/



};