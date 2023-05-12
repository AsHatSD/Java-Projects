var mongoose = require('mongoose');

var caseSchema = new mongoose.Schema({
  number: { type: String, unique: true },
  location: String,
  name: String,
  extraInfo: String,
  finished: String
});

caseSchema.options.toJSON = {
  transform: function (doc, ret, options) {
    delete ret._id;
  }
};

var Case = mongoose.model('Case', caseSchema);

module.exports = Case;
