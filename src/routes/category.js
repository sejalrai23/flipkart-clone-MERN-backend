const express = require('express');
const { requireSignin, adminMiddleware } = require('../common-middleware/index');
const router = express.Router();
const { addCategory, getCategory } = require('../controller/category');
const shortid = require("Shortid");
const path = require("path");
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), 'uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  }
});

const upload = multer({storage});


router.post("/category/create", requireSignin, adminMiddleware, upload.single('categoryImage'), addCategory);
router.get("/category/view", getCategory);

module.exports = router;