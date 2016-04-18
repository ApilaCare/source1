require('dotenv').load();
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var uglifyJs = require("uglify-js");
var fs = require('fs');
var passport = require('passport');

require('./app_api/models/db');
require('./app_api/config/passport');

// (commented out because routes in the server are not used)
// var routes = require('./app_server/routes/index');
var routesApi = require('./app_api/routes/index');

var app = express();

// (commented out because not using jade to display anything in app_server/views)
// view engine setup
// app.set('views', path.join(__dirname, 'app_server', 'views'));
// app.set('view engine', 'jade');

// (commented out to debug better.  these are now in app_client/index.html)
var appClientFiles = [

  // route files
  'app_client/routes.js',

  // issue controller files
  'app_client/contentTypes/issues/issueHome/issueHome.controller.js',
  'app_client/contentTypes/issues/issueDetail/issueDetail.controller.js',
  'app_client/contentTypes/issues/addIssueModal/addIssueModal.controller.js',
  'app_client/contentTypes/issues/issueCommentModal/issueCommentModal.controller.js',

  // appointment controller files
  'app_client/contentTypes/appointments/appointmentHome/appointmentHome.controller.js',
  'app_client/contentTypes/appointments/appointmentDetail/appointmentDetail.controller.js',
  'app_client/contentTypes/appointments/addAppointmentModal/addAppointmentModal.controller.js',
  'app_client/contentTypes/appointments/updateAppointmentModal/updateAppointmentModal.controller.js',
  'app_client/contentTypes/appointments/appointmentCommentModal/appointmentCommentModal.controller.js',

  // resident controller files
  'app_client/contentTypes/residents/addResidentModal/addResidentModal.controller.js',
  'app_client/contentTypes/residents/residentDetail/residentDetail.controller.js',
  'app_client/contentTypes/residents/residentHome/residentHome.controller.js',
  'app_client/contentTypes/residents/updateResidentModal/updateResidentModal.controller.js',

  // boring pages controller files
  'app_client/contentTypes/about/about.controller.js',
  'app_client/contentTypes/home/home.controller.js',

  // user controller files
  'app_client/auth/login/login.controller.js',
  'app_client/auth/register/register.controller.js',

  // location controller files
  'app_client/contentTypes/locations/locationsHome/locationsHome.controller.js',
  'app_client/contentTypes/locations/locationDetail/locationDetail.controller.js',
  'app_client/contentTypes/locations/reviewModal/reviewModal.controller.js',

  // service files
  'app_client/common/services/authentication.service.js',
  'app_client/common/services/geolocation.service.js',
  'app_client/common/services/apilaData.service.js',
  'app_client/common/services/exportPdf.service.js',
  'app_client/common/services/wordCloud.service.js',

  // custom filter files
  'app_client/common/filters/formatDistance.filter.js',
  'app_client/common/filters/addHtmlLinebreaks.filter.js',

  // directive files
  'app_client/common/directives/navigation/navigation.controller.js',
  'app_client/common/directives/navigation/navigation.directive.js',
  'app_client/common/directives/footerGeneric/footerGeneric.directive.js',
  'app_client/common/directives/pageHeader/pageHeader.directive.js',
  'app_client/common/directives/ratingStars/ratingStars.directive.js'
];
var uglified = uglifyJs.minify(appClientFiles, { compress : false });

fs.writeFile('public/angular/loc8r.min.js', uglified.code, function (err){
  if(err) {
    console.log(err);
  } else {
    console.log("Script generated and saved:", 'loc8r.min.js');
  }
});

// (uncomment after placing your favicon in /public)
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app_client')));

// (commented out because ...)
//app.use(passport.initialize());

// (commented out because not using any routing from app_server/routes)
// app.use('/', routes);
app.use('/api', routesApi);

// says the next place to go?
app.use(function(req, res) {
  res.sendFile(path.join(__dirname, 'app_client', 'index.html'));
});


/* !!!! ERROR HANDLERS !!!! */

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
// Catch unauthorised errors
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({"message" : err.name + ": " + err.message});
  }
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

// exports all the app. stuff (to where?)
module.exports = app;
