/* Refernce link 
 * http://expressjs.com/en/resources/middleware/multer.html
 */
const multer = require("multer");
var path = require('path');

const today = new Date();
const year = today.getFullYear();
const month = ("0" + today.getMonth() + 1).slice(-2)
const date = ("0" + today.getDate()).slice(-2)
const today_date = year + '-' + month + '-' + date;

/*check if the file is image using either of 
 * (a) file.mimetype.startsWith("image")?
 * (b) if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF))$/)) 
 */
const imageFilter = (req, file, callback) => {
    if (file.mimetype.startsWith("image") && file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/))
        callback(null, true);
    else {
        callback(null, false);
    }
}

//File upload filter
const fileFilter = (req, file, callback) => {
    if (file.originalname.match(/\.(csv)$/))
        callback(null, true);
    else {
        callback(null, false);
    }
}

/* define destination directory where to store the image and also file name 
 * file.fieldname is name of the field (image)
 * path.extname get the uploaded file extension - by default, multer removes file extensions
 */
const imageStorage = multer.diskStorage({
    destination: (req, file, callBack) => {
        let filePath;
        if (path.extname(file.originalname) == '.csv')
            filePath = "public/csvFiles";
        else
            filePath = "public/images";
        callBack(null, filePath)
    },

    filename: (req, file, callBack) => {
        var fileName;
        if (path.extname(file.originalname) == '.csv')
            fileName = 'csvRecords';
        else
            fileName = 'Course-' + req.params.id;

        callBack(null, fileName + '-' + today_date + path.extname(file.originalname))
    }
})


/* Define Max size of image to upload */
const maxSize = 2 * 1024 * 1024;

var uploadImage = multer({ storage: imageStorage, limits: maxSize, fileFilter: imageFilter });
var uploadCSVFile = multer({ storage: imageStorage, fileFilter: fileFilter });
module.exports = { uploadImage, uploadCSVFile }