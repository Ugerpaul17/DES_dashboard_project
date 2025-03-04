var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Schools
var dashboardRouter = require('./routes/dashboard');
var attendenceRouter = require('./routes/attendence');
var teacherToPupilRatioRouter = require('./routes/teacherToPupilRatio');
var chartPiller    = require('./routes/chartPiller_router');
var classroomPupil    = require('./routes/classroomPupil_router');
var trend    = require('./routes/schooltrend_router');
var stancePupil    = require('./routes/stancePupil_router');
var details       = require('./routes/schoolDetails_router');
//sub county 
var subCountyRouter = require('./routes/subCounty');

//Districts
var districtsRouter = require('./routes/districts');
var districtsDetailsRouter = require('./routes/District_details_router');
var districtsAttendanceRouter = require('./routes/District_attendance_router');
var districtsEnrolmentRouter = require('./routes/District_enrolment_router');
var districtsTPRRouter = require('./routes/District_TPR_router');
var districtsSPRRouter = require('./routes/District_SPR_router');
var districtsCPRRouter = require('./routes/District_CPR_router');
 var districtsPillarsRouter = require('./routes/District_pillars_router');
 //var districtstrendRouter = require('./routes/District_trend_router');

//National 
var nationalRouter = require('./routes/national_router');
var nationalDetailsRouter = require('./routes/national_details_router');
var nationalAttendanceRouter = require('./routes/national_attendance_router');
var nationalEnrolmentRouter = require('./routes/national_enrolment_router');
var nationalTPRRouter = require('./routes/national_TPR_router');
var nationalSPRRouter = require('./routes/national_SPR_router');
var nationalCPRRouter = require('./routes/national_CPR_router');
var nationalPillarsRouter = require('./routes/national_Pillars_router');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/',express.static(path.join(__dirname, 'public')));

//Schools
app.use('/', dashboardRouter);
app.use('/chart_attendance', attendenceRouter); 
app.use('/teacher-to-pupil-ratio', teacherToPupilRatioRouter); 
app.use('/chartPiller-stats', chartPiller);
app.use('/classroomPupil-stats', classroomPupil);
app.use('/schooltrend-stats', trend );
app.use('/schooldetails-stats', details);
app.use('/stancePupil-stats', stancePupil );

//sub countys 
app.use('/subCounty', subCountyRouter); 


//Districts
app.use('/districts', districtsRouter);
app.use('/districtdetails-stats', districtsDetailsRouter);
 app.use('/districtattendance-stats', districtsAttendanceRouter);
 app.use('/districtenrolment-stats', districtsEnrolmentRouter);
 app.use('/districtTPR-stats', districtsTPRRouter);
 app.use('/districtSPR-stats', districtsSPRRouter);
 app.use('/districtCPR-stats', districtsCPRRouter);
 app.use('/districtpillars-stats',districtsPillarsRouter);
 //app.use('/districttrend-stats', districtstrendRouter);


//National
app.use('/nationals',  nationalRouter); 
 app.use('/nationalDetails-stats',  nationalDetailsRouter);
 app.use('/nationalAttendance-stats', nationalAttendanceRouter);
 app.use('/nationalEnrolment-stats',  nationalEnrolmentRouter);
 app.use('/nationalTPR-stats', nationalTPRRouter);
 app.use('/nationalSPR-stats',nationalSPRRouter);
 app.use('/nationalCPR-stats', nationalCPRRouter);
 app.use('/nationalPillars-stats', nationalPillarsRouter);








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
