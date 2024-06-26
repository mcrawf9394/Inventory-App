var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const compression = require("compression")
const helmet = require("helmet")
var indexRouter = require('./routes/index');
var catalogRouter = require('./routes/catalog');

var app = express();
const mongoose = require("mongoose")
const {callTracker} = require("assert")
mongoose.set("strictQuery", false)
const dev_db_url = "mongodb+srv://Admin:hde5ccrsjEfCagq1@cluster0.2xc9jlt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const mongoDb = process.env.MONGODB_URI || dev_db_url;
main().catch((err) => console.log(err))
async function main () {
  await mongoose.connect(mongoDb)
}
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
const RateLimit = require("express-rate-limit");
const limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 20,
});
app.use(limiter);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression())
app.use(helmet())
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/catalog', catalogRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
