var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true, dropDups: true },
  password: { type: String, required: true },
  _token: { type: String },
});

module.exports = mongoose.model("User", userSchema);
