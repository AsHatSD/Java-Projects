var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');

var schemaOptions = {
  timestamps: true
};

var userSchema = new mongoose.Schema({
  number: { type: String, unique: true },
  name: String,
  type: { type: String, enum: 'system_admin admin user'.split(' '), required: true },
  password: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId },
  company: { type: mongoose.Schema.Types.ObjectId },
  state: {type: String, enum: 'active inactive'.split(' '), default: 'active'}
}, schemaOptions);

userSchema.pre('save', function (next) {
  var user = this;

  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(user.password, salt, null, function (err, hash) {
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function (password, cb) {
  bcrypt.compare(password, this.password, function (err, isMatch) {
    cb(err, isMatch);
  });
};

userSchema.options.toJSON = {
  transform: function (doc, ret, options) {
    delete ret.password;
  }
};

var User = mongoose.model('User', userSchema);

module.exports = User;
