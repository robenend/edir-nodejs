
const fs = require('fs')
const path = require('path')
const csvtojson = require('csvtojson');
var Json2csvParser = require('json2csv').Parser;

const dbConn = require("../config/db_Connection")
const { uploadImage, uploadCSVFile } = require('../lib/fileUpload');

// Record import Page
exports.importRecordPage = (req, res, next) => {
	error = req.flash('error')
	message = req.flash('msg')
    res.render("pages/importCSV", {
									error: error,
									msg: message,
									title:'Import Records'
								});
};

// download CSV template
exports.downloadFile = (req, res, next) => {

	// here the res.download() Method is used to download CSV File 
	//Alternative Methods: https://www.webmound.com/download-file-using-express-nodejs-server/
    const filePath = 'public/csvFiles/csvSampleFormat.csv'
    res.download(filePath, function(err) {
        if(err) {
			console.log(err)
			req.flash('error', "File doesn't found")
            return  err;
        }
		req.flash('msg', "You download the template. Prepare as per the template and uplaod it here")
    });
}
 
 
// Importing new Records from CSV file
exports.importRecord = async(req, res, next) => {
	
	/* Checking if the CSV file upload or not */
	const CSVFile = uploadCSVFile.single('csvFile')
	CSVFile(req, res, function(err) {
		if (req.file == undefined || err) {
			req.flash("error", "Error: No file/wrong file selected! Please select CSV file!")
			req.flash ("title", "Import Records")
			return res.redirect("./importCSV");
		}
		
		//The file is uploaded and Now read the records.
		filePath = 'public/csvFiles/' + req.file.filename
		csvtojson().fromFile(filePath).then(source => {
			let userId;
			if (req.session.level == 1)
				userId = 0;
			else
				userId = req.session.userID;
		
			// Fetching the data from each row and inserting to the table "courses"
			for (var i = 0; i < source.length; i++) {
				var code = source[i]["code"],
					title = source[i]["title"],
					description = source[i]["description"],
					category = source[i]["category"]
					certificate = source[i]["certificate"]
					duration = source[i]["duration"]
					cost = source[i]["cost"]
					imagePath = source[i]["imagePath"]
					
				var records = [
							code, title, 
							description, category, 
							certificate, duration, 
							cost, imagePath, userId
						];
				//Import the record to Mysql database, courses table
				let query3 = `INSERT INTO courses (code, title, description, category,` +
											`certificate, duration, cost, imagePath, user_id) ` +
											`VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
															
				dbConn.query(query3, records, (error, results, fields) => {
					if (error)
					{
						console.log(error);
						fs.unlinkSync(filePath)
						error = req.flash("error", "Something wrong! Records are not imported")
						return res.redirect("../pages/importCSV");
					}		
				});
			}
			fs.unlinkSync(filePath)
			req.flash("msg", "Records are imported successfully! \r\n Go back to Home page & check it.")
			return res.redirect("../pages/importCSV");
		});
	});	
}

// Export Mysql table "courses" into CSV & download it.
exports.exportMysql2CSV = (req, res, next) => {
	
	let query = "SELECT * FROM courses";
	dbConn.query(query, function (err, results, fields) {
		if (err) 
			throw err;
     
		const jsonCoursesRecord = JSON.parse(JSON.stringify(results));
		 
		// -> Convert JSON to CSV data
		const csvFields = ['id', 'code', 'title', 'description','category', 
							'certificate', 'duration', 'cost', 'imagePath', 'user_id']
								 
		const json2csvParser = new Json2csvParser({ csvFields });
		const csv = json2csvParser.parse(jsonCoursesRecord);
 
		res.setHeader("Content-Type", "text/csv");
		res.setHeader("Content-Disposition", "attachment; filename=Courses_Record.csv");
		res.status(200).end(csv);
  });
}