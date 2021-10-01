const mongoose = require("mongoose");
const shortid = require("shortid");
const Schema = mongoose.Schema;

const schema = new Schema({
  _id: {
    type: String,
    default: shortid.generate,
  },
  type: {
    type: String,
    enum: ["app"],
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  payload: {
    type: mongoose.Schema.Types.Mixed,
    default: null,
  },
  user: {
    type: Schema.ObjectId,
    ref: "Short",
  },
});

const Short = mongoose.model("short", schema);

module.exports = Short;
