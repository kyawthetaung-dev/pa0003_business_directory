var createError = require('http-errors');
var express = require('express');
var path = require('path');
require('dotenv').config();
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var apiResponse = require('./utils/apiResponses');
var sessions = require('./utils/sessions');

var app = express();

var port = process.env.PORT;
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
sessions.appSessionStore(app);

require('./routes/mobile.routes')(app);
require('./routes/app.routes')(app);
require('./routes/portal_api.routes.js')(app);
require('./routes/users.routes')(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // <<<<<<< Updated upstream
    //   // render the error page
    //   res.status(err.status || 500);
    //   // res.render('error');
    //   var frm = {
    //     "code" : err.status,
    //     "message": err.message,
    //     "details": err.stack
    //   }
    //   apiResponse.internalServerErrorResponse(req, res, frm);
    // =======
    //     // render the error page
    //     res.status(err.status || 500);
    //     res.render('error');
    // >>>>>>> Stashed changes
});

app.listen(port, () => {
    console.log('Server is running on port ' + port);
});