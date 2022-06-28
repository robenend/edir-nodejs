exports.slugify = async(password, savedPassword) => {
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