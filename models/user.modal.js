const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    agreementAccepted: {
      type: Boolean,
      required: true,
      default: false,
    },
    verified: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

const Users = mongoose.model("users", userSchema);
module.exports = Users;
