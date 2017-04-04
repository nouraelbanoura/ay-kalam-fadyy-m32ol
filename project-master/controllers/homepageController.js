var business = require('../models/business');
var BusinessProvider = require('../models/BusinessProvider');
var clients = require('../models/clients');
var admin = require('../models/admin');


var homepageController = {
  loadHomepage : function(req,res){
    res.render('index');
  }
}

module.exports = homepageController;

