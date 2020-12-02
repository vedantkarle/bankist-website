const mongoose = require("mongoose");

const transferSchema = mongoose.Schema({
  sender: String,
  receiver: String,
  amount: Number,
});

const Transfer = mongoose.model("Transfer", transferSchema);

module.exports = Transfer;
