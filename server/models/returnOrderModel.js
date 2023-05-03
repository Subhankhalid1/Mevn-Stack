const mongoose = require("mongoose");

const returnSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "productSchema",
      required: true,
    },
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "orderSchema",
      required: true,
    },
    productPic: { type: Array },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("returnSchema", returnSchema);
