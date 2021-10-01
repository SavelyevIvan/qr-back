const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  login: {
    type: String,
    required: true,
    trim: true,
    dropDups: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    dropDups: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  limitCodes: {
    type: Number,
    default: 0,
  },
});

const User = mongoose.model("User", schema);

module.exports = User;
