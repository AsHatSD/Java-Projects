var mongoose = require('mongoose');

var schemaOptions = {
  timestamps: true
};

var ratesSchema = new mongoose.Schema({
  text: String,
  saved_by: { type: mongoose.Schema.Types.ObjectId }
}, schemaOptions);


var Rates = mongoose.model('Rates', ratesSchema);

module.exports = Rates;
