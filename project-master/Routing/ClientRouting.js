var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var multer = require('multer');
var crypto = require('crypto');
var Client = require('../models/clients');
var path = require('path');


// eDIT PROFILE

router.get('Client/EditProfile', function(req, res){
	res.render('EditProfile',{
     Client:req.Client
	});
});
 
 router.post('Client/EditProfile'), function(req,res){

if(req.user.isBannes!= true){
	var firstname= req.body.firstname;
	var lastname= req.body.lastname;
	var address= req.body.address;
	var creditcardinfo= req.body.creditcardinfo;
	var birthdate= req.body.birthdate;
	var password= req.body.password;
	var password2= req.body.password2;

if(req.checkBody('firstname', 'Name is required').notEmpty())
{ 	req.user.firstname= req.body.firstname;
}
 	req.user.lastname=req.body.lastname;
 	req.user.address=req.body.address;
 	req.user.creditcardinfo=req.body.creditcardinfo;
 	req.user.birthdate=req.body.birthdate;
 	req.user.password=req.body.password;
 	req.user.password2=req.body.password2;
 	

	var errors = req.validationErrors();
 }
/*
    req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

 */
}