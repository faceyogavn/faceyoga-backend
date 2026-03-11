const router = require("express").Router()
const Course = require("../models/Course")

router.get("/", async (req,res)=>{

 const courses = await Course.find({active:true})

 res.json(courses)

})

module.exports = router