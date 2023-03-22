const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    productPic: { type: Array, required: true },
    product_name: { type: String, required: true },
    short_description: { type: String, required: true },
    display_moq: { type: String, required: true },
    price: { type: Number, required: true },
    brand: { type: String },
    category_name: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categorySchema",
      required: true,
    },
    subCategory: [
      { type: mongoose.Schema.Types.ObjectId, ref: "subCategorySchema", required: true, },
    ],
    stock_inUsa: { type: Boolean, default: false },
    slug: { type: String },
    unit: { type: String },
    featuredProduct: { type: Boolean, default: false },
  },
  { timestamps: true }
);
module.exports = mongoose.model("productSchema", productSchema);
