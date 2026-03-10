const mongoose = require("mongoose")

const CourseSchema = new mongoose.Schema({

 title: String,

 price: Number,

 image: String,

 description: String,

 active: {
   type:Boolean,
   default:true
 },

 createdAt:{
   type:Date,
   default:Date.now
 }

})

module.exports = mongoose.model("Course",CourseSchema)
