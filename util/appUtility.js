
const bcrypt = require('bcryptjs');


exports.getHashedPassword = function (password) {
    return bcrypt.hash(password, 12);
}

exports.compareHashedPassword = function (password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword);
}
