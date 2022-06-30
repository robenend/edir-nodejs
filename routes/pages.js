const router = require("express").Router();
const express = require("express");
const app = express();

const {
    homePage
} = require("../controllers/authController");

const {
    membersPage,
    contactPage,
    makeEvent,
    eventPage,
    servicePage,
    singlePost,
    productDetail,
    aboutPage,
    editEvent,
    download
} = require("../controllers/pageController");

const { isLoggedin } = require('../lib/check_authentication');

router.get('/contact', isLoggedin, contactPage);
router.post('/contact', isLoggedin, contactPage);

router.get('/about', isLoggedin, aboutPage);
router.post('/about', isLoggedin, aboutPage);


router.get('/event/makeEvent', isLoggedin, makeEvent);
router.post('/event/makeEvent', isLoggedin, makeEvent);

router.get('/event', isLoggedin, eventPage);
router.post('/event', isLoggedin, eventPage);

router.get('/event/edit/:slug', isLoggedin, editEvent);
router.post('/event/edit/:slug', isLoggedin, editEvent);

router.get('/event/download/:path', isLoggedin, download);
router.post('/event/download/:path', isLoggedin, download);

router.get('/timeline/single_post/:slug', isLoggedin, singlePost);
router.post('/timeline/single_post/:slug', isLoggedin, singlePost);


router.get('/product_detail/:id', isLoggedin, productDetail);
router.post('/product_detail/:id', isLoggedin, productDetail);

router.get('/service', isLoggedin, servicePage);
router.post('/service', isLoggedin, servicePage);

router.get('/members', isLoggedin, membersPage);
router.post('/members', isLoggedin, membersPage);

router.get('/timeline', isLoggedin, homePage);
router.post('/timeline', isLoggedin, homePage);


module.exports = router;