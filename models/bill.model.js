const mongoose = require("mongoose");

const billSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: Number,
      required: true,
    },
    subTotal: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    cartItems: {
      type: Array,
      required: true,
    },
    userId: { type: String, required: false },
    date: { type: Date, default: Date.now() },
  },
  { timestamps: true }
);

const Bills = mongoose.model("bill", billSchema);
module.exports = Bills;
