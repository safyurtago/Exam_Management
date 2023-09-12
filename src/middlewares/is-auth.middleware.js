const CustomError = require('../utils/custom-error');
const jwt = require('../utils/jwt');

const isAuth = (req, res, next) => {
    try {
        const token = req.headers?.token
        if (!token) { throw new CustomError('Invalid token', 401); };
        jwt.verifyToken(token, (err, result) => {
            if (err) { throw new CustomError('Invalid token', 401); }
            req.verify = result
            next();
        });
    } catch (error) {
        next(error);
    }
}

module.exports = isAuth;