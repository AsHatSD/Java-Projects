var express = require('express');
var path = require('path');
var logger = require('morgan');
var compression = require('compression');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var busboy = require('connect-busboy');
var expressValidator = require('express-validator');
var dotenv = require('dotenv');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var moment = require('moment');
var request = require('request');
var http = require('http');
var soap = require('soap');

// Load environment variables from .env file
dotenv.load();

// Models
var User = require('./models/User');

var app = express();


mongoose.connect(process.env.MONGODB);
mongoose.connection.on('error', function () {
  console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
  process.exit(1);
});
app.set('port', process.env.PORT || 8000);
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(busboy());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
  req.isAuthenticated = function () {
    var token = (req.headers.authorization && req.headers.authorization.split(' ')[1]) || req.cookies.token;
    try {
      return jwt.verify(token, process.env.TOKEN_SECRET);
    } catch (err) {
      return false;
    }
  };

  if (req.isAuthenticated()) {
    var payload = req.isAuthenticated();
    User.findById(payload.sub, function (err, user) {
      req.user = user;
      next();
    });
  } else {
    next();
  }
});

// Controllers
var userController = require('./controllers/user');
var jobsController = require('./controllers/jobs');
var casesController = require('./controllers/cases');
var categoriesController = require('./controllers/categories');
var ratesController = require('./controllers/rates');
var emailsController = require('./controllers/emails');
var customerController = require('./controllers/customer');
var placeController = require('./controllers/place');

var auth = userController.ensureAuthenticated;

app.post('/signup', userController.signupPost);
app.post('/login', userController.loginPost);

app.post('/api/jobs', auth, jobsController.add);
app.get('/api/jobs', auth, jobsController.find);

app.get('/api/exports', auth, jobsController.listExports);
app.post('/api/exports', auth, jobsController.createExport);

app.post('/api/cases', auth, casesController.import);
app.get('/api/cases', auth, casesController.findAll);
app.put('/api/cases/save', auth, casesController.saveCase);

app.post('/api/categories', auth, categoriesController.import);
app.get('/api/categories', auth, categoriesController.findAll);

app.post('/api/customers', auth, customerController.addCustomer);
app.get('/api/customers', auth, customerController.getCustomers);
app.get('/api/customers/findCustomer', auth, customerController.findCustomer);
app.put('/api/customers/save', auth, customerController.saveCustomer);

app.post('/api/users', auth, userController.signupPost);
app.get('/api/users', auth, userController.findUsersForAdmin);
app.get('/api/users/findUser', auth, userController.findUser);
app.put('/api/users/save', auth, userController.saveUser);
app.put('/api/users/delete', auth, userController.deleteUser);
app.get('/api/users/getForCustomer', auth, userController.getForCustomer);

app.post('/api/rates', auth, ratesController.add);
app.get('/api/rates', auth, ratesController.find);

app.post('/api/emails/sendEmail', emailsController.sendEmail);
app.get('/api/place', auth, placeController.getAll);


// serve angular front end files from root path
app.use('/', express.static('app', { redirect: false }));

// rewrite virtual urls to angular app to enable refreshing of internal pages
app.get('*', function (req, res, next) {
  res.sendFile(path.resolve('app/index.html'));
});

// Production error handler
if (app.get('env') === 'production') {
  app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.sendStatus(err.status || 500);
  });
}

app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;
