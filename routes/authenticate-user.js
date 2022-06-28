const router = require("express").Router();
const { body } = require("express-validator");

/* pages route */
const {
    homePage,
    register,
    registerPage,
    login,
    loginPage,
    forgotPassword,
    sendResetPassLink,
    resetPasswordPage,
    resetPassword
} = require("../controllers/authController");


const { isLoggedin, isNotLoggedin } = require('../lib/check_authentication');
const validator = require('../lib/validation_rules');

router.get('/', isLoggedin, homePage);
router.post('/', isLoggedin, homePage);

router.get("/auth/login", isNotLoggedin, loginPage);
router.post("/auth/login", isNotLoggedin, validator.validationRules[0], login);

router.get("/auth/signup", isNotLoggedin, registerPage);
router.post("/auth/signup", isNotLoggedin, validator.validationRules[1], register);

router.get('/logout',
    (req, res, next) => {
        req.session.destroy(
            (err) => {
                next(err);
            }
        );
        res.redirect('/auth/login');
    }
);

router.get("/auth/passReset_Request", isNotLoggedin, forgotPassword);
router.post("/auth/passReset_Request", isNotLoggedin, sendResetPassLink);

router.get("/reset-password", isNotLoggedin, resetPasswordPage);
router.post("/reset-password", isNotLoggedin, validator.validationRules[3], resetPassword);

module.exports = router;