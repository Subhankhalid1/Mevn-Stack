const mongoose = require("mongoose");

const checkoutSchema = new mongoose.Schema(
  {
    cardName: { type: String },
    cardNumber: { type: Number },
    expiry: { type: Number },
    cvv: { type: Number },
    streetAddress: { type: String },
    city: { type: String },
    state: { type: String },
    zipCode: { type: String },
    payment: { type: Number },
    couponCode:{ type: String },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userSchema",
    },
  },
  { timestamps: true }
);
// paymentSchema
module.exports = mongoose.model("checkoutSchema", checkoutSchema);
