var express = require('express'),
    swig = require('swig'),
    sass = require('node-sass'),
    path = require('path'),
    favicon = require('static-favicon'),
    mongoose = require('mongoose'),
    cookieParser = require('cookie-parser'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    routes = require('./routes');



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

app.use('/', routes);



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
