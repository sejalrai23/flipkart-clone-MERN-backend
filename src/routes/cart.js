const express = require('express');
const { requireSignin, userMiddleware } = require('../common-middleware/index');
const router = express.Router();
const { addItemToCart } = require("../controller/cart");


router.post("/cart/add", requireSignin, userMiddleware, addItemToCart);
// router.get("/category/view", getCategory);

module.exports = router;