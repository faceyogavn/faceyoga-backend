const jwt = require("jsonwebtoken")

module.exports = function(req,res,next){

 const authHeader = req.headers.authorization

 if(!authHeader){

  return res.status(401).json({error:"No token"})

 }

 const token = authHeader.split(" ")[1]

 try{

  jwt.verify(token,process.env.JWT_SECRET)

  next()

 }catch(e){

  res.status(403).json({error:"Invalid token"})

 }

}