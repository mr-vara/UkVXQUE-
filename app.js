/**
 * Main express App
 */
require('rootpath')();
const express = require('express');
const createError = require('http-errors');
const path = require('path');
const cors = require('cors');
const logger = require('morgan');

const errorHandler = require('_middleware/error-handler');

var app = express();

// Logger
app.use(logger('dev'));

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Static path
app.use(express.static(path.join(__dirname, 'public')));

// CORS
app.use(cors());

// api routes
require('./routes/index')(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
  });

// global error handler
app.use(errorHandler);

module.exports = app;
