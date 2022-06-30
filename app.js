const express = require('express');
const app = express();

const flash = require('connect-flash');
app.use(flash());

const session = require('express-session');
app.use(session({
    name: 'session',
    secret: 'my_secret',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 3600 * 1000 }, // 1hr
}));

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
app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'profile')));
app.use(express.urlencoded({ extended: false }));

/* setup port: load default from env variable or set custom */
app.set('port', process.env.PORT || 5000);

/*
 * => require local modules: route middleware and controllers
 */
app.use(require('./routes/authenticate-user'));
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