const jwt = require('jsonwebtoken');

const JwtMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.replace('Bearer ', '');
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = payload;
        next();
    }
    catch (err) {
        next();
    }
};

module.exports = JwtMiddleware;