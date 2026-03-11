const router = require("express").Router()
const Banner = require("../models/Banner")

router.get("/", async (req,res)=>{

 const banners = await Banner.find({active:true})

 res.json(banners)

})

module.exports = router