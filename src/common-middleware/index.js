const jwt = require('jsonwebtoken');
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