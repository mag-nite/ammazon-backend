// import statements 
const express = require("express");
const {signup,signin} = require("../../controllers/admin/auth")
const { requireSignin } = require('../../common-middleware');

const router = express.Router()

// admin signup and signin post request 
router.post('/admin/signup',signup)
router.post('/admin/signin',signin)
module.exports = router