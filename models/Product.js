const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({

 name:String,

 price:Number,

 image:String,

 description:String,

 active:{
  type:Boolean,
  default:true
 },

 createdAt:{
  type:Date,
  default:Date.now
 }

})

module.exports = mongoose.model("Product",ProductSchema)