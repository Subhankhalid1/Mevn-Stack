const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userSchema",
      required: true,
    },
    total:{type:Number}

  },
  { timestamps: true }
);

module.exports = mongoose.model("orderSchema", orderSchema);
