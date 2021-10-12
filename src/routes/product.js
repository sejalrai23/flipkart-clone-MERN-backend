const express = require('express');
const { requireSignin, adminMiddleware } = require('../common-middleware/index');
const router = express.Router();
const { createProducts, getProductsBySlug, getProductDetails} = require("../controller/product");
const multer = require("multer");
const shortid = require("Shortid");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), 'uploads'));
    },
    filename: function (req, file, cb) {
        cb(null, shortid.generate() + "-" + file.originalname);
    }
});

const upload = multer({ storage });



router.post("/product/create", requireSignin, adminMiddleware, upload.array('productPic'), createProducts);
router.get("/product/:slug", getProductsBySlug);
router.get("/product/:productId", getProductDetails );

module.exports = router;