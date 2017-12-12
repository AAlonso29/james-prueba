'use strict';

// NPM dependencies.
var express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    sequelize = require('sequelize'),
    passport = require('passport'),
    jwt = require('jsonwebtoken'),
    path = require('path');
    // itemRouter = require('./routes/item');

// App related modules.
var hookJWTStrategy = require('./services/passportStrategy');

// Initializations.
var app = express();

// Parse as urlencoded and json.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Hook up the HTTP logger.
app.use(morgan('dev'));

// Hook up Passport.
app.use(passport.initialize());

// Hook the passport JWT strategy.
hookJWTStrategy(passport);

// Set the static files location.
app.use(express.static(__dirname + '/../public'));

// Bundle API routes.
app.use('/api', require('./routes/api')(passport));

// console.log('Antes');
// app.use('/api', itemRouter);
// console.log('Despues');

// Catch all route.
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + '/../public/app/views/index.html'));
});

// Start the server.
app.listen('3200', function() {
    console.log('Magic happens at http://localhost:8080/! We are now all now doomed!');
});
