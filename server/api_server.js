// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
// make sure you have installed these all by running npm install
var express = require('express');        // call express
var bodyParser = require('body-parser');
var app = express();                 // define our app using express

// Routes Files
var users  = require('./routes/user');
var bikes = require('./routes/bike');
var stations = require('./routes/station');

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


// configure app to use bodyParser()
// this will let us get the data from a POST of type x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


// Connect to our Database
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/divvy_map');


app.get('/', function (req, res) {
    res.send('Welcome')
});

//ROUTES - all return json
app.use('/bikes', bikes); // routes/bike.js
app.use('/users', users); // routes/user.js
app.use('/stations', stations)

/// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


/// Error Handlers

// development error handler
// will print stacktrace

if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500)
            .send({
                message: err.message,
                error: err,
                title: 'error'
            });
    });
}

// production error handler
// no stacktraces leaked to UserFactory
app.use(function (err, req, res, next) {
    res.status(err.status || 500)
        .send({
            message: err.message,
            error: {},
            title: 'error'
        });
});

// START THE SERVER
// =============================================================================
var port = process.env.PORT || 8080;        // set our port
app.listen(port);
console.log('You can find this app on localhost:' + port);