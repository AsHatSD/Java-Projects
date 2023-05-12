var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');

var schemaOptions = {
  timestamps: true
};

var customerSchema = new mongoose.Schema({
  name: String,
  code: { type: String, unique: true },
  state: {type: String, enum: 'active inactive'.split(' '), default: 'active'}
}, schemaOptions);

var Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
