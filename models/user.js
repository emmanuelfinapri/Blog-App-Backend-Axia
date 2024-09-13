const mongoose = require("mongoose");

// createt the schema object
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
// create user's model and export
const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
