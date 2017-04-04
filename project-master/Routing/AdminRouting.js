var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var multer = require('multer');
var crypto = require('crypto');
var User = require('../models/admin');
var path = require('path');


// Register Page
router.get('/admin/register', function(req, res){
	res.render('AdminRegister',{
    Admin:req.Admin
	});
});
// Register User
router.post('/Admin/register', function(req, res){
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;

	// Validation
	
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

	var errors = req.validationErrors();
	 Admin.findOne({ username: username}, function(err, user) {
        if (err) { return next(err); }
        if (user) {
            req.flash("error", "User already exists");
            return res.redirect("/Admin/register");
        }

       Admin.findOne({ email: email }, function(err, user) {
            if (err) { return next(err); }
            if (user) {
                req.flash("error", "Email already exists");
                return res.redirect("/admin/register");
            }
            var newAdmin = new Admin({
            
                username: username,
                password: password,
                email: email,
                
            });
           // newUser.save(next);
            User.createAdmin(newAdmin, function(err, user){
			if(err) throw err;
			console.log(user);
		});

		req.flash('success_msg', 'You are registered and can now login');

		res.redirect('/Admin/login');
	
        });
    });

	/*if(errors){
		res.render('register',{
			errors:errors
		});
	} else {
		var newUser = new User({
			name: name,
			email:email,
			username: username,
			password: password
		});
*/
		
});
// eL Page elyy abl login 
router.get('/',function(req,res,next){
	Admin.find().exec((err,Admin)=>{
		if(err){next(err);return;}
			res.render('index',{
			Admin,
		
		});
			
		});
	});


// Login
router.get('/Admin/login', function(req, res){
	res.render('AdminLogin',{
		Admin:req.Admin
	});
});
router.post('/Admin/login',
  passport.authenticate('local', {successRedirect:'/Admin/Profile', failureRedirect:'/users/login',failureFlash: true}),
  function(req, res) {
    res.redirect('AdminProfile');
  });

// admin view Profile
router.get('/Admin/Profile', ensureAuthenticated,  function(req, res){
	res.render('AdminProfile',{
		user:req.user
	});
});

passport.use(new LocalStrategy(
  function(username, password, done) {
   User.getAdminByUsername(username, function(err, user){
   	if(err) throw err;
   	if(!user){
   		return done(null, false, {message: 'Unknown User'});
   	}

   	User.comparePassword(password, user.password, function(err, isMatch){
   		if(err) throw err;
   		if(isMatch){
   			return done(null, user);
   		} else {
   			return done(null, false, {message: 'Invalid password'});
   		}
   	});
   });
  }));
app.use(flash());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getAdminId(id, function(err, user) {
    done(err, user);
  });
});



