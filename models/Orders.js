const mongoose = require("mongoose")

const OrderSchema = new mongoose.Schema({

 name:String,
 phone:String,

 items:Array,

 total:Number,

 status:{
  type:String,
  default:"pending"
 },

 createdAt:{
  type:Date,
  default:Date.now
 }

})

module.exports = mongoose.model("Order",OrderSchema)