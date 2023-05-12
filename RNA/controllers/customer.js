var Customer = require('../models/Customer');
var ObjectId = require('mongoose').Types.ObjectId;

/**
 * POST addCustomer
 */
exports.addCustomer = function (req, res, next) {

  Customer.findOne({ code: req.body.code }, function (err, customer) {
    if (customer) {
      return res.status(400).send({ msg: 'Firma eksistere allerede.' });
    }

    customer = new Customer({
      name: req.body.name,
      code: req.body.code
    });
   
    customer.save(function (err) {
      res.send({customer: customer });
    });
  });
};


/**
 * GET getCustomers
 */
exports.getCustomers = function (req, res, next) {

  Customer.find(function (err, customers) {
    if (err) {
      return res.status(400).send({ msg: err });
    }

      res.send({ customers: customers });
  });
};

exports.findCustomer = function (req, res, next) {
  var errors = req.validationErrors();

  var id = req.query.customerId;

  if (errors) {
    return res.status(400).send(errors);
  }
  Customer.findOne({ _id: ObjectId(id) }, function (err, customer) {
    if (customer) {
      res.send({ customer: customer });
    }
  });
};

/*
 *PUT api/customers/saveCustomer
 */
exports.saveCustomer = function (req, res, next) {
  Customer.findOne({ _id: ObjectId(req.body._id) }, function (err, customer) {
    if (customer) {
      customer.name = req.body.name;
      customer.code = req.body.code;
      customer.state = req.body.state;
    }
    customer.save(function (err) {
      res.send({ customer: customer });
    });
  });
};