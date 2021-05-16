var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true, dropDups: true },
  password: { type: String, required: true },
  address: { type: String, required: false },
  _token: { type: String },
});

module.exports = mongoose.model("User", userSchema);
