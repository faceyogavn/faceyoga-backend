const mongoose = require("mongoose")

module.exports = function connectDB(){

 mongoose.connect(process.env.MONGO_URI)

 mongoose.connection.on("connected", ()=>{
  console.log("Mongo connected")
 })

}