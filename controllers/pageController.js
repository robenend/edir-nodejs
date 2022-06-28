const fs = require('fs')
const path = require('path');
const { validationResult } = require("express-validator");
const slugify = require('slugify')
const dbConn = require("../config/db_Connection")
const validator = require('../lib/validation_rules');
const { uploadImage, uploadCSVFile } = require('../lib/fileUpload');
const { title } = require('process');

// Record Display Page
exports.contactPage = (req, res, next) => {
    var query1;
    if (req.method == 'GET') {
        res.render('pages/contact');


    } else if (req.method == 'POST') {
        const { body } = req;

        query1 = `INSERT INTO contact (name, email, subject, message) VALUES(?,?,?,?)`;

        dbConn.query(query1, [body.cname, body.cemail, body.csubject, body.cmessage], (error, result) => {

            if (error)
                throw error;

            const msg = req.flash('success')
            res.render('pages/contact', { msg: "Inserted successfully!" });
        });
    }
}

// Record Add Page
exports.membersPage = (req, res, next) => {
    if (req.method == 'GET') {


    } else if (req.method == 'POST') {
        const { body } = req;

    }
    res.render("pages/contact");
};

// Adding New Record
exports.makeEvent = async(req, res, next) => {
    if (req.method == "POST") {
        console.log(req.body);
        return;
        const errors = validationResult(req);
        const { body } = req;

        if (!errors.isEmpty()) {
            return res.render('pages/add', {
                error: errors.array()[0].msg,
            });
        }

        try {
            let userId;
            userId = req.session.userID;

            var query3 = "INSERT INTO eventpost (user_id, eventType, title, eventDescription, filename, doe, slug) VALUES(?, ?, ?, ?, ?, ?,?)";
            var slug = slugify(body.eventType + ' ' + body.title);

            console.log(req.body);

            var filename = "filename";
            dbConn.query(query3, [userId, body.eventType, body.title, body.eventDescription, filename, body.doe, slug],
                (error, rows) => {
                    if (error) {
                        console.log(error);
                        throw error;
                    }

                    if (rows.affectedRows !== 1) {
                        return res.render('pages/makeEvent', {
                            error: 'Error: Record not added.',
                            title: 'Add Record'
                        });
                    }

                    res.render("pages/event", {
                        msg: 'Record successfully added!',
                    });
                });
        } catch (e) {
            next(e);
        }
    } else if (req.method == "GET") {
        res.render("pages/makeEvent");
    }
};

// Record Editing Page
exports.recordEditPage = (req, res, next) => {

    var code = req.params.id; //extract course code attached to the URL

    var query2 = `SELECT * FROM courses WHERE code = "${code}"`;
    dbConn.query(query2, function(error, result) {
        if (error) {
            console.log(error);
            throw error;
        }
        message = req.flash('msg');
        error = req.flash('error');
        res.render('pages/edit', {
            data: result[0],
            msg: message,
            error: error,
            title: 'Edit Record'
        });
    });
}

/* Record Editing Page */
exports.editRecord = (req, res, next) => {

    const errors = validationResult(req);
    const { body } = req;
    var id = req.params.id;

    if (!errors.isEmpty()) {
        req.flash("error", errors.array()[0].msg)
        return res.redirect('../edit/' + id)
    }

    code = body.course_code
    title = body.course_title
    description = body.course_desc
    category = body.course_cat
    certificate = body.certificate
    duration = body.course_dur
    cost = body.course_cost

    var query = `UPDATE courses SET code = "${code}", title = "${title}", ` +
        `description = "${description}", category = "${category}", ` +
        `certificate = "${certificate}", duration = "${duration}", ` +
        `cost = "${cost}" WHERE code = "${id}"`;

    dbConn.query(query, function(error, data) {
        if (error) {
            throw error;
        } else {
            req.flash('success', 'Record successfully Updated');
            res.redirect('../display');
        }

    });
}

// Image uplaod Page
exports.imageUploadPage = (req, res, next) => {

    var code = req.params.id; //extract course code attached to the URL

    var query2 = `SELECT * FROM courses WHERE code = "${code}"`;
    dbConn.query(query2, function(error, result) {
        if (error) {
            console.log(error);
            throw error;
        }
        errorMsg = req.flash("error")
        message = req.flash("msg")
        res.render('pages/addImage', {
            data: result[0],
            error: errorMsg,
            msg: message,
            title: "Upload Image"
        });
    });
}

// Image uplaod middleware
exports.uploadImage = (req, res, next) => {

    var code = req.params.id; //extract course code attached to the URL

    /* Checking if course icon (image) upload success */
    const upload = uploadImage.single('course_img')
    upload(req, res, function(err) {
        if (req.file == undefined || err) {
            req.flash("error", "Error: You must select an image.\r\n Only image files [JPG | JPEG | PNG] are allowed!")
            req.flash("title", "Upload Image")
            return res.redirect("./" + code);
        }

        //retrive and check if there is image uploaded already


        var imgsrc = '/images/' + req.file.filename
            //console.log(imgsrc)

        var query2 = `UPDATE courses SET imagePath = "${imgsrc}" WHERE code = "${code}"`;
        dbConn.query(query2, function(error, result) {
            if (error) {
                //Image is path is not added to database. Remove Uplaoded file.
                // and send error to the client
                fs.unlinkSync('public' + imgsrc);
                console.log(error)
                return res.send(error);
            }

            //remove existing image
            else {
                if (oldImagePath && oldImagePath != "None" && oldImagePath != imgsrc)
                    fs.unlinkSync('public' + oldImagePath);
            }
            req.flash("msg", "Image is uploaded. Go back to Home page & check it.")
            req.flash("title", "Upload Image")
            return res.redirect("./" + code);
        });
    });
}

// Record deletion Page
exports.recordDeletePage = (req, res, next) => {

    var code = req.params.id; //Get course code to delete

    var query3 = `DELETE FROM courses WHERE code = "${code}"`;
    dbConn.query(query3, function(error) {

        if (error) {
            console.log(error);
            throw error;
        } else {
            req.flash('success', 'Record has been deleted');
            res.redirect('../display');
        }

    });
}