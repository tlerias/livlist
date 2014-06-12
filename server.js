var express = require('express'),
    swig = require('swig'),
    passport = require('passport'),
    flash = require('connect-flash');

    require('./config/passport')(passport);

var sass = require('node-sass'),
    path = require('path'),
    favicon = require('static-favicon'),
    mongoose = require('mongoose'),
    cookieParser = require('cookie-parser'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    MongoStore = require('connect-mongostore')(session),


    routes = require('./routes'),
    home = require('./routes/home'),
    login_routes = require('./routes/login'),
    signup_routes = require('./routes/signup');



var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', swig.renderFile);


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());

app.use(
  sass.middleware({
    src: __dirname + '/assets', //where the sass files are
    dest: __dirname + '/public', //where css should go
    // includePaths: __dirname + '/assets/stylesheets',
    debug: true // obvious
  })
);

app.use(express.static(__dirname + '/public'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));

app.use(session({ secret: 'taraiscool', store: new MongoStore({db: process.env.MONGOLAB_URI}) })); // session secret, the salt used to encrypt the session ids which are stored in the client's browser.
app.use(passport.initialize()); //creates our passport object
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored

app.use('/', routes);
app.use('/home', home);
app.use('/login', login_routes);
app.use('/signup', signup_routes);


app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    swig.setDefaults({ cache: false });
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
module.exports = app;
