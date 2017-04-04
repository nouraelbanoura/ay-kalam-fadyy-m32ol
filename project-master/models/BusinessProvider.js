var mongoose = require('mongoose');
var BusinessProviderSchema = mongoose.Schema({
  username:{
    type:String,
    required:true,
    index:true,
    unique:true,

  },
  password:{
    type:String,
    required:true
  },
  email:{
    type:String,
    index:true,
    unique:true,
    required:true
  },

image: {
    type: String
  },
  Title: {
    type: String,
  }




})

var BusinessProvider = mongoose.model('BusinessProvider',BusinessProviderSchema);
module.exports = BusinessProvider;


module.exports.createBusinessProvider = function(newUser, callback){
  bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(newUser.password, salt, function(err, hash) {
          newBusinessProvider.password = hash;
          newBusinessProvider.save(callback);
      });
  });
}

module.exports.getBusinessProviderByUsername = function(username, callback){
  var query = {username: username};
  User.findOne(query, callback);
}

module.exports.getBusinessProviderById = function(id, callback){
  User.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
      if(err) throw err;
      callback(null, isMatch);
  });
}