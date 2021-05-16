const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var msgSchema = new Schema({
    giver: { type: String, required: true},
    receiver:{type: String, required: true},
    content: {type: String, required: true}
})

module.exports = mongoose.model("Msg", msgSchema);