const express = require('express');
const router = express.Router();
const { initialData } = require('../../controller/admin/initialData');
const { requireSignin } = require("../../common-middleware/index");


router.post('/initialData', requireSignin, initialData);



// router.post('/profile', requireSignin, (req, res) => {
//     res.status(200).json({ user: "profile" });
// })

module.exports = router;