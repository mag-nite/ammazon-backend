// import statement 
const express = require("express");
const router = express.Router()
const {signup,signin} = require("../controllers/auth")


// user signup and signin post request  
router.post('/signin',signin)
router.post('/signup',signup)
module.exports = router