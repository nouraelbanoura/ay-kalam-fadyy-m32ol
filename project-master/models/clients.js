var mongoose = require('mongoose');
var clientsSchema = mongoose.Schema({
firstname:{
  type:String,
},
lastname:{
  type:String,
},
username:{
  type:String,
},
password:{
  type:String,
},
email:{
  type:String,
},
address:{
  type:String,
},
creditcardinfo:{
  type:String,
},
birthdate:{
  type:String,
},
isBanned:{
  type:Boolean,
  default:false,
}




})

var clients = mongoose.model('clients',clientsSchema);
module.exports = clients;
