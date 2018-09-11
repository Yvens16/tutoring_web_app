const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    lastname: { type: String, required: true },
    firstname: { type: String, required: true },
    phoneparent: {
      type: String,
      // required: true,
      unique: true,
      match: /^(?:(?:\+|00)33|0)\s*[6-7](?:[\s.-]*\d{2}){4}$/
    },
    phonestudent: {
      type: String,
      // required: true,
      unique: true,
      match: /^(?:(?:\+|00)33|0)\s*[6-7](?:[\s.-]*\d{2}){4}$/
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
