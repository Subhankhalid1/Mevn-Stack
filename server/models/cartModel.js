const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "productSchema",
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userSchema",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("cartSchema", cartSchema);
