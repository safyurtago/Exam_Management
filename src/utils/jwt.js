const jwt = require('jsonwebtoken');

const {jwt_secret} = require('../../config');

const generateToken = (payload) => { return jwt.sign(payload, jwt_secret); };
const verifyToken = (payload, callback) => { return jwt.verify(payload, jwt_secret, callback); };

module.exports = {
    generateToken,
    verifyToken,
}