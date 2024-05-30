const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  ID: {
    type: Schema.Types.ObjectId,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  dateOfAccountOpen: {
    type: Date,
    default: Date.now,
  },
  playlists: { type: [String], default: [] },
});

module.exports = mongoose.model("User", userSchema);
