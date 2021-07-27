var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const bodyParser = require("body-parser");

var usersRouter = require('./routes/users');
var indexRouter = require('./routes/index');
var catelogyRouter = require('./routes/catelogie');
var servicetypeRouter =require('./routes/servicetype');
var infoRouter = require('./routes/info');
var productRouter = require('./routes/product');
var slideRouter = require('./routes/slide');
var serviceRouter = require('./routes/service');
var promotionRouter = require('./routes/promotion');

//connect database
const mongoose = require('mongoose');
// process.env.DATA_URL_MONGOOSE
mongoose.connect(process.env.DATA_URL_MONGOOSE || 'mongodb://localhost:27017/dienlanh', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useFindAndModify', false);
var cors = require('cors');

var app = express();
app.use(cors());

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/info', infoRouter);
app.use('/catelogies', catelogyRouter);
app.use('/servicetype', servicetypeRouter);
app.use('/delete', indexRouter);
app.use('/service', serviceRouter);
app.use('/products', productRouter);
app.use('/slide', slideRouter);
app.use('/promotion', promotionRouter);

app.use(express.static(path.join(__dirname, 'build')));


app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
