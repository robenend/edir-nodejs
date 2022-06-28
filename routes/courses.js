const router = require("express").Router();
const express = require("express");
const app = express();

const {
    recordDisplayPage,
    addRecordPage,
    addRecord,
    recordEditPage,
    editRecord,
    imageUploadPage,
    uploadImage,
    recordDeletePage
} = require("../controllers/courseController");

const {
    importRecordPage,
    importRecord,
    downloadFile,
    exportMysql2CSV
} = require("../controllers/recordImportExport");

const { isLoggedin, isNotLoggedin } = require('../lib/check_authentication');
const validator = require('../lib/validation_rules');

router.get('/pages/display', isLoggedin, recordDisplayPage);
router.post('/pages/display', isLoggedin, recordDisplayPage);



router.get('/pages/add', isLoggedin, addRecordPage);
router.post('/pages/add', isLoggedin, validator.validationRules[2], addRecord);

router.get('/pages/importCSV', isLoggedin, importRecordPage);
router.get('/pages/download', isLoggedin, downloadFile);
router.post('/pages/importCSV', isLoggedin, importRecord);

router.get('/pages/exportCSV', isLoggedin, exportMysql2CSV);

router.get('/pages/edit/:id', isLoggedin, recordEditPage);
router.post('/pages/edit/:id', isLoggedin, validator.validationRules[2], editRecord);

router.get('/pages/addImage/:id', isLoggedin, imageUploadPage);
router.post('/pages/addImage/:id', isLoggedin, uploadImage);

router.get('/pages/delete/:id', isLoggedin, recordDeletePage);

module.exports = router;