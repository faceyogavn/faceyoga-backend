const router = require("express").Router()
const Product = require("../models/Product")
const Course = require("../models/Course")

const auth = require("../middleware/auth")

router.post("/product",auth, async (req,res)=>{

 const product = new Product(req.body)

 await product.save()

 res.json(product)

})

router.post("/course",auth, async (req,res)=>{

 const course = new Course(req.body)

 await course.save()

 res.json(course)

})

module.exports = router