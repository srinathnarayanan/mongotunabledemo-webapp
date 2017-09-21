var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var DocumentClient = require('documentdb').DocumentClient;
//db
var mongo = require('mongodb');
var monk = require('monk');

var config = require('./config/config');
var routes = require('./routes/index');
var users = require('./routes/user');
//create db
var db = monk(config.db);

var app = express();

var env = process.env.NODE_ENV || 'development';
app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = env === 'development';

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/views'));

// app.use(favicon(__dirname + '/public/img/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});


app.use('/', routes);
app.use('/users', users);
app.post('/init', function (request, response) {
    var client = new DocumentClient(config.constants.documentDbEndPoint, { masterKey: config.constants.password });
    var offers = client.readOffers();
    offers.toArray(function (err, res) {
        if (err) {
            console.log(err);
            return;
        }
        client.readCollection("dbs/nodetest/colls/demodata", function (err, collection) {
            if (err) {
                console.log(err);
                return;
            }
            for (var k = 0; k < res.length; k++) {
                if (res[k].resource === collection._self) {
                    response.setHeader('Content-Type', 'application/json');
                    response.send(JSON.stringify({ 'current_throughput': res[k].content.offerThroughput}));
                }
            }
        });
    });
});

app.post('/throughput', function (req, res) {
    var new_throughput = req.body.throughput;
    var client = new DocumentClient(config.constants.documentDbEndPoint, { masterKey: config.constants.password });
    var offers = client.readOffers();
    offers.toArray(function (err, res) {
        if (err) {
            console.log(err);
            return;
        }
        client.readCollection("dbs/nodetest/colls/demodata", function (err, collection) {
            if (err) {
                console.log(err);
                return;
            }
            for (var k = 0; k < res.length; k++) {
                if (res[k].resource === collection._self) {
                    res[k].content.offerThroughput = new_throughput;
                    client.replaceOffer(res[k]._self, res[k], function (err, result) {
                        if (err) {
                            console.log(err);
                            return;
                        }
                        console.log(result);
                    });
                    break;
                }
            }
        });
    });
    res.redirect('/');
});

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
            title: 'error'
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},
        title: 'error'
    });
});


module.exports = app;
