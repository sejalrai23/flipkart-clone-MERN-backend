const express = require('express');
const router = express.Router();
const { register, login } = require('../controller/auth');
const { validateRequest, isRequestValidated } = require('../validators/auth');

const jwt = require('jsonwebtoken');

router.post('/register', register);

router.post('/login', login);

// router.post('/profile', requireSignin, (req, res) => {
//     res.status(200).json({ user: "profile" });
// })

module.exports = router;