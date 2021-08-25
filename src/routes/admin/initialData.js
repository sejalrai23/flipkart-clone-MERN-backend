const express = require('express');
const router = express.Router();
const {initialData} = require('../../controller/admin/initialData');


router.post('/initialData', initialData);



// router.post('/profile', requireSignin, (req, res) => {
//     res.status(200).json({ user: "profile" });
// })

module.exports = router;