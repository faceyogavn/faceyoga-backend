const mongoose = require("mongoose")

const BannerSchema = new mongoose.Schema({

 title:String,

 image:String,

 link:String,

 active:{
  type:Boolean,
  default:true
 },

 createdAt:{
  type:Date,
  default:Date.now
 }

})

module.exports = mongoose.model("Banner",BannerSchema)