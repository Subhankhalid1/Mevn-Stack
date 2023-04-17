const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    totalAmount: { type: Number },
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("paymentSchema", paymentSchema);
