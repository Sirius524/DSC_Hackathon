const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var msgSchema = new Schema({
    name: {type: String, required: true},
    data: {type: String, required: true}
})

module.exports = mongoose.model("Msg", msgSchema);