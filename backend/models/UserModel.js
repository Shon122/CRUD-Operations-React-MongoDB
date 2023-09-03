const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: false,
  },
  items: [itemSchema], // Embed the itemSchema within the User schema as an array
});

module.exports = mongoose.model("User", userSchema);
