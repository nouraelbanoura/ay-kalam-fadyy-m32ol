var mongoose = require('mongoose');
var businessSchema = mongoose.Schema({
BusinessProviderid:{
  type:Number,
},
BusinessName:{
  type:String,
},
location:{
  type:String,
},
phone:{
  type:Number,
},
rating:{
  type:Number,
},
announcements:[],
reviews:[],
description:{
  type:String,
},
profilepicture:{
  type:String,
},
info:{
  type:String,
},
questions:[],
isApproved:{
  type:Boolean,
  default:false,
},
services:[],
image: {
    type: String
  },
  Title: {
    type: String,
  },
  username:{
    type:String
  }





})

var business = mongoose.model('business',businessSchema);
module.exports = business;
