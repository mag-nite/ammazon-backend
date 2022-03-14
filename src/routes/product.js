const express = require("express");
const router = express.Router()
const { requireSignin, adminMiddleware } = require("../common-middleware");
const { addProduct, fetchProduct } = require("../controllers/product");
const multer = require('multer')
const shortid = require('shortid')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, shortid.generate() + '_' + file.originalname)
    }
  })
const upload = multer({storage})
router.post('/product/create',requireSignin,adminMiddleware,upload.single('productPictures'),addProduct)
router.get('/product/fetch', fetchProduct)
module.exports = router