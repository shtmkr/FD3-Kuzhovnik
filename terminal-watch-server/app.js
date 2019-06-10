var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
/*app.use('/test', testRouter);*/

module.exports = app;
