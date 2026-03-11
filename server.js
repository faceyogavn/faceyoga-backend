require("dotenv").config()

const express = require("express")
const cors = require("cors")
const helmet = require("helmet")
const compression = require("compression")
const rateLimit = require("express-rate-limit")

const connectDB = require("./config/db")

const app = express()

// connect mongo
connectDB()

// security headers
app.use(helmet())

// gzip response
app.use(compression())

// rate limit
const limiter = rateLimit({
 windowMs: 15 * 60 * 1000,
 max: 100
})

app.use(limiter)

// CORS whitelist
const allowedOrigins = [
 "https://faceyoga.vn",
 "https://faceyogavn.netlify.app"
]

app.use(cors({
 origin: function(origin, callback){

  if(!origin) return callback(null,true)

  if(allowedOrigins.indexOf(origin) !== -1){

   callback(null,true)

  }else{

   callback(new Error("CORS blocked"))

  }

 }
}))

app.use(express.json())

// routes
app.use("/api/orders", require("./routes/orders"))
app.use("/api/products", require("./routes/products"))
app.use("/api/courses", require("./routes/courses"))
app.use("/api/banners", require("./routes/banners"))
app.use("/api/admin", require("./routes/admin"))

const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
 console.log("Server running on", PORT)
})
