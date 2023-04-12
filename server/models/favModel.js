const mongoose = require("mongoose");

const favSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "productSchema",
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

module.exports = mongoose.model("favSchema", favSchema);
