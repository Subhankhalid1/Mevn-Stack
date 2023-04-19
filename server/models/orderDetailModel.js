const mongoose = require("mongoose");

const orderDetailSchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "orderSchema", // reference to the Order model
      required: true,
    },
    product:{type:Object},
    
  },
  
  { timestamps: true }
);

module.exports = mongoose.model("orderDetailSchema", orderDetailSchema);
