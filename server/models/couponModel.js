const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema({
    code: {
      type: String,
      required: true,
      unique: true
    },
    maxUses: {
      type: Number,
      default: 100
    },
    used: {
      type: Number,
      default: 0
    },
    discountPercentage: { type: Number, required: true },
    cart: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cartSchema",
    },
  },  { timestamps: true }
  );
  
  module.exports = mongoose.model("couponSchema", couponSchema);