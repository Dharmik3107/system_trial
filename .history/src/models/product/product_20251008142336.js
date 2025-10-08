// models/Product.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    collection: "products",
  }
);

// Add an index for SKU for faster lookup
productSchema.index({ sku: 1 });

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);
export default Product;
