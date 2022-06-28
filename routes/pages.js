const router = require("express").Router();
const express = require("express");
const app = express();

const {
    memebersPage,
    contactPage,
    makeEvent
} = require("../controllers/pageController");

const { isLoggedin, isNotLoggedin } = require('../lib/check_authentication');

router.get('/contact', isLoggedin, contactPage);
router.post('/contact', isLoggedin, contactPage);

router.get('/event/makeEvent', isLoggedin, makeEvent)
router.post('/event/makeEvent', isLoggedin, makeEvent)


module.exports = router;