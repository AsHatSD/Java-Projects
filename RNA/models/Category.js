var mongoose = require('mongoose');

var categorySchema = new mongoose.Schema({
  number: { type: Number, unique: true },
  name: String,
  unit: String,
  price: Number,
  extra: String
});

categorySchema.options.toJSON = {
  transform: function (doc, ret, options) {
    delete ret._id;
  }
};

var Category = mongoose.model('Category', categorySchema);

module.exports = Category;
