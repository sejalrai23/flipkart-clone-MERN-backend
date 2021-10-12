const jwt = require('jsonwebtoken');
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
exports.upload = multer({ storage });


exports.requireSignin = (req, res, next) => {

    if (req.headers.authorization) {
        const token = req.headers.authorization;
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
        console.log(user);


    } else {
        return res.status(400).json({ message: "Authorization required" });

    }
    next();


}

exports.userMiddleware = (req, res, next) => {
    if (req.user.role !== 'user') {
        return res.status(400).json({ message: ' userAccess Denied' });
    }
    next();

}

exports.adminMiddleware = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(400).json({ message: ' Admin Access Denied' });
    }
    next();
}