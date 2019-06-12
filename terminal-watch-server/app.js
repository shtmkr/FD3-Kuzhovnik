var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
const cors = require('cors');

var indexRouter = require('./routes/index');
var dataRouter = require('./routes/data');
var cmdRouter = require('./routes/cmd');
var authRouter = require('./routes/auth');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(cors());
app.options('*', cors());

app.use('/', indexRouter);
app.use('/data', dataRouter);
app.use('/cmd', cmdRouter);
app.use('/auth', authRouter);

module.exports = app;
