var mongoose = require('mongoose');

var schemaOptions = {
  timestamps: true
};

var jobSchema = new mongoose.Schema({
  user: Object,
  case: Object,
  type: { type: String, enum: 'time_based agreement'.split(' '), required: true },
  place: String,
  category: Object,
  usedMaterials: [],
  usedExtraMaterials : [],
  timeType: Object,
  hours: Number,
  price: Number,
  salary: Number,
  consumptionType: String,
  consumption: Number,
  note: String,
  lift: String,
  car: String,
  distance: Number,
  qualityCheck:String
}, schemaOptions);


var Job = mongoose.model('Job', jobSchema);

module.exports = Job;
