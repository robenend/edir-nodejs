// const bcrypt = require('bcryptjs');
const md5 = require('md5');


exports.encryptPassword = async(password) => {
    const encryptedPass = md5(password);
    return encryptedPass;
}

exports.matchPassword = async(password, savedPassword) => {
    try {
        if (password == savedPassword) {
            return true;
        } else {
            return false;
        }
        // return await savedPassword.localeCompare(password);
        // (md5(password), savedPassword);
        // return await bcrypt.compare(password, savedPassword);
    } catch (e) {
        console.log(e);
    }
}