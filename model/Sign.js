const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var signSchema = new Schema({
    owner: { type: String, required: true },
    img: { type: String, required: true },
});

module.exports = mongoose.model("Sign", signSchema);
