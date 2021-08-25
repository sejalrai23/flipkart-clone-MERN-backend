const express = require('express');
const router = express.Router();
const { register, login, signout } = require('../../controller/admin/auth');
const { validateRegisterRequest, validateSigninRequest, isRequestValidated } = require('../../validators/auth')
const jwt = require('jsonwebtoken');
const { requireSignin } = require("../../common-middleware/index");

router.post('/admin/login', login);

router.post('/admin/register', register);
router.post('/admin/signout', requireSignin, signout);

// router.post('/profile', requireSignin, (req, res) => {
//     res.status(200).json({ user: "profile" });
// })

module.exports = router;