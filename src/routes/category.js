const express = require("express");
const { requireSignin, adminMiddleware } = require("../common-middleware");
const { addCategory, fetchCategory } = require("../controllers/category");
const router = express.Router()
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


router.post('/category/create',requireSignin,adminMiddleware,upload.single('categoryImage'), addCategory)
router.get('/category/fetch', fetchCategory)
module.exports = router