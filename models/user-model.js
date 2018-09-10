const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    lastname: { type: String, required: true },
    firstname: { type: String, required: true },
    phoneparent: {
      type: Number,
      required: true,
      unique: true,
      match: /^((\+|00)33\s?|0)[67](\s?\d{2}){4}$/
    },
    phonestudent: {
      type: Number,
      required: true,
      unique: true,
      match: /^((\+|00)33\s?|0)[67](\s?\d{2}){4}$/
    },
    email: { type: String, required: true, unique: true, match: /^.+@.+\..+$/ },
    encryptedPassword: { type: String }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
