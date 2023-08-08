const express = require('express')



//controller
const{ signupUser , loginUser }= require('../controller/userController')

const router = express.Router()

//login'
router.post('/login' ,()=>{})


//signup
router.post('/signup' ,()=>{})

module.exports = router