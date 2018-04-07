// /app.js

var express = require('express'),
    session = require('express-session'),
    errorhandler = require('errorhandler'),
    //bodyParser = require('body-parser'),
    cors = require('cors');

var app = express();
app.use(cors());

app.use(require('morgan')('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(session({
    secret: 'some-secret',
    cookie: { maxAge: 6000 },
    resave: false,
    saveUninitialized: false
}));
app.use(errorhandler());

var db = require('./db/db');

var routes = require('./src/routes');
app.use('/', routes);

app.use(function (req, res, next) {
    var err = new Error('Not found');
    err.status = 404;
    next(err);
});

app.use(function (err, req, res, next) {
    console.log(err.stack);
    res.status(err.staatus || 500);
    res.json({
        'errors': {
            message: err.message,
            error: err
        }
    });
});

module.exports = app;