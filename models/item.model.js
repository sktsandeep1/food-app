const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      set: (value) => parseFloat(value.toString().replace("$", "")),
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// export const Item = mongoose.model("Item", itemSchema);

// const itemModel = mongoose.model("Item", itemSchema);
// module.exports = mongoose.model("Item", itemSchema);
// export default itemModel;

const itemModel = mongoose.model("Item", itemSchema);
module.exports = itemModel;
