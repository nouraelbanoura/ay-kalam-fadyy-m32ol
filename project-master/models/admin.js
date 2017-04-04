var mongoose = require('mongoose');
var adminSchema = mongoose.Schema({
username:{
  type:String,
},
password:{
  type:String,
},
email:{
  type:String,

}


})

var admins = mongoose.model('admins',adminSchema);
module.exports = admins;

module.exports.createAdmin = function(newUser, callback){
  bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(newUser.password, salt, function(err, hash) {
          newBusinessProvider.password = hash;
          newBusinessProvider.save(callback);
      });
  });
}

module.exports.getAdminByUsername = function(username, callback){
  var query = {username: username};
  User.findOne(query, callback);
}

module.exports.getAdminById = function(id, callback){
  User.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
      if(err) throw err;
      callback(null, isMatch);
  });
}