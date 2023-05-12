var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var jwt = require('jsonwebtoken');
var moment = require('moment');
var request = require('request');
var qs = require('querystring');
var User = require('../models/User');
var ObjectId = require('mongoose').Types.ObjectId;

function generateToken(user) {
  var payload = {
    sub: user.id,
    iat: moment().unix(),
    exp: moment().add(7, 'days').unix()
  };
  return jwt.sign(payload, process.env.TOKEN_SECRET);
}

/**
 * Login required middleware
 */
exports.ensureAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
};

/**
 * POST /login
 */
exports.loginPost = function (req, res, next) {
  req.assert('number', 'Employee number cannot be blank').notEmpty();
  req.assert('password', 'Password must be at least 4 characters long').len(4);

  var errors = req.validationErrors();

  if (errors) {
    return res.status(400).send(errors);
  }

  User.findOne({ number: req.body.number }, function (err, user) {
    if (!user) {
      return res.status(401).send({
        msg: 'Medarbejdernummer ' + req.body.number + ' er ikke forbundet med nogen konto. ' +
        'Dobbelttjek din medarbejdernummer, og prøv igen.'
      });
    }
    
    user.comparePassword(req.body.password, function (err, isMatch) {
      if (!isMatch) {
        return res.status(401).send({ msg: 'Incorrect password' });
      }
      if(user.state === 'inactive'){
        return res.status(401).send({ msg: 'Inaktiv bruger' });
      }
      res.send({ token: generateToken(user), user: user.toJSON() });
    });
  });
};

/**
 * POST /signup
 */
exports.signupPost = function (req, res, next) {
  req.assert('number', 'Employee number cannot be blank').notEmpty();
  req.assert('name', 'Name cannot be blank').notEmpty();
  req.assert('password', 'Password must be at least 4 characters long').len(4);

  var errors = req.validationErrors();

  if (errors) {
    return res.status(400).send(errors);
  }

  User.findOne({ number: req.body.number }, function (err, user) {
    if (user) {
      return res.status(400).send({ msg: 'Bruger eksistere allerede.' });
    }

    user = new User({
      number: req.body.number,
      name: req.body.name,
      password: req.body.password,
      type: 'system_admin'
    });
    if (req.body.type) {
      user.type = req.body.type;
    }
    if (req.body.createdBy) {
      user.createdBy = req.body.createdBy;
    }
    if(req.body.company){
      user.company = req.body.company;
    }
    if(req.body.state){
      user.state = req.body.state;
    }
    user.save(function (err) {
      res.send({ token: generateToken(user), user: user });
    });
  });
};


/*
 *PUT api/users/saveUser 
 */
exports.saveUser = function (req, res, next) {
  
// update without rehashing the password
  User.findByIdAndUpdate( ObjectId(req.body._id), {$set: {name: req.body.name, type: req.body.type, state: req.body.state}}, 
  function (err, user) {
      res.send({ user: user });
  });
};

/*
* PUT api/users/deleteUser
*/
exports.deleteUser = function (req, res, next) {
  User.findOne({ _id: ObjectId(req.body._id) }, function (err, user) {

    user.remove(function (err) {
      res.send({ msg: "User deleted" });
    });
  });
};

/*
* GET
 */
exports.findUsersForAdmin = function (req, res, next) {
  var errors = req.validationErrors();

  var id = req.user._id;

  if (errors) {
    return res.status(400).send(errors);
  }
  User.find({ createdBy: ObjectId(id) }, function (err, users) {
    if (users) {
      res.send({ users: users });
    }
  });
};

exports.findUser = function (req, res, next) {
  var errors = req.validationErrors();

  var id = req.query.userId;

  if (errors) {
    return res.status(400).send(errors);
  }
  User.findOne({ _id: ObjectId(id) }, function (err, user) {
    if (user) {
      res.send({ user: user });
    }
  });
};

exports.getForCustomer = function (req, res, next) {
  var errors = req.validationErrors();

  var customerId = req.query.customerId;

  if (errors) {
    return res.status(400).send(errors);
  }
  User.find({ company: ObjectId(customerId) }, function (err, users) {
    if (users) {
      res.send({ users: users });
    }
  });
};
