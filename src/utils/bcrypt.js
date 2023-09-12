const bcrypt = require('bcrypt');

const bcryptHash = async (password) => await bcrypt.hash(password, 12);
const bcryptCompare = async (password, oldPassword) => await bcrypt.compare(password, oldPassword);

module.exports = {
    bcryptHash, 
    bcryptCompare
}