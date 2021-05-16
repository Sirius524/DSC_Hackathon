const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const giftSchema = new Schema({
  userId: { type: mongoose.Types.ObjectId, required: true, unique: true, dropDups: true },
  bear: { type: Number, default: 0 },
  flower: { type: Number, default: 0 },
});

module.exports = mongoose.model("Gift", giftSchema);
