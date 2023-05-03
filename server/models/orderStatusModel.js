const mongoose = require("mongoose");

const orderStatusSchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "orderSchema",
      required: true,
    },
    status:{type:String, default:"In Progress"}

  },
  { timestamps: true }
);

module.exports = mongoose.model("orderStatusSchema", orderStatusSchema);
