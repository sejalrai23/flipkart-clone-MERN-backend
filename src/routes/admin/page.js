const express = require('express');
const router = express.Router();
const { createPage, getPage } = require('../../controller/admin/page')
const { upload, requireSignin, adminMiddleware } = require("../../common-middleware/index");

router.post('/page/create', requireSignin, adminMiddleware, upload.fields([{ name: 'banners ' }, { name: 'products' }]), createPage);
router.get(`/page/:category/:type`, getPage);



// router.post('/profile', requireSignin, (req, res) => {
//     res.status(200).json({ user: "profile" });
// })

module.exports = router;