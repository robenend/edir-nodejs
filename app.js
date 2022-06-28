/* 
 * load express module - thrid party module
 * A minimal and extensible framework that provides a set of common utilities 
 * for building servers and web applications.
 * => require the express module and then initialization it.
 */
const express = require('express');
const app = express();

/*
 * Connect-flash module for Node. js allows the developers 
 * to send a message whenever a user is redirecting to a specified web-page.
 * => require the module and mount it for your application.
 */
const flash = require('connect-flash');
app.use(flash());

/*
 * Load Express-session module - thrid party module thta used by an HTTP server-side framework 
 * to create and manage a session middleware:
 * Require session module, then setup the middleware and create a session 
 * and save it in cookies 
 */
const session = require('express-session');
app.use(session({
    name: 'session',
    secret: 'my_secret',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 3600 * 1000 }, // 1hr
}));

/* path module - nodejs core module
 * path module is used for handling and transforming file paths
 * require the path module and setup View default directory
 * View default - is the directory where the template files are located 	
 */
const path = require('path');
global.rootPath = __dirname; //defining a global variable

app.set('views', path.join(__dirname, 'views')); //setup View default
app.set('view engine', 'ejs'); //define the template engine to use.

/* Express.static function
 * A built-in middleware function used to serve static files
 * such as images, CSS files, and JavaScript files
 */
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'resources')));
app.use(express.urlencoded({ extended: false }));

/* setup port: load default from env variable or set custom */
app.set('port', process.env.PORT || 5000);

/*
 * => require local modules: route middleware and controllers
 */
app.use(require('./routes/authenticate-user'));
app.use(require('./routes/courses'));
app.use(require('./routes/pages'));

app.use((err, req, res, next) => {
    //console.log(err);
    return res.send('Internal Server Error<br>' + err);
});

/* Starting the server and listen for the request on specified port*/
app.listen(app.get('port'),
    () => {
        console.log('Server is running on port: ' + app.get('port'));
    });