const mongoose = require("mongoose");
const subCategorySchema = new mongoose.Schema(
  {
    subCategory: { type: String },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categorySchema",
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("subCategorySchema", subCategorySchema);
