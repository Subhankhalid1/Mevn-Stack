const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    category: { type: String },
    subCategory: [
      { type: mongoose.Schema.Types.ObjectId, ref: "subCategorySchema" },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("categorySchema", categorySchema);
