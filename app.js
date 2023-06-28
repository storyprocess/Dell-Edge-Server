var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var useCaseRouter = require('./routes/useCases');
var sectionRouter = require('./routes/section');
var configRouter = require('./routes/config');
const { config } = require('process');
var useCaseStoryRouter = require('./routes/use_case_stories');
var umRouter = require('./routes/um');
const urbanmobilityRouter = require('./routes/urbanmobility');
var gtRouter = require('./routes/guided_tour');
const solutionsRouter = require('./routes/solutions');
const graphicsRouter = require('./routes/solution_graphics');

const PORT = process.env.PORT || 5001; // 5001-> city, 5000 -> factory



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/useCases', useCaseRouter);
app.use('/section', sectionRouter);
app.use('/config', configRouter);
app.use('/use_case_stories', useCaseStoryRouter);
app.use('/um', umRouter);
app.use('/urbanmobility', urbanmobilityRouter);
app.use('/guided_tour', gtRouter);
app.use('/solutions', solutionsRouter);
app.use('/solution_graphics', graphicsRouter);




app.use(cors());

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

app.listen(PORT);

module.exports = app;
