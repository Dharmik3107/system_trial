import mongoose from "mongoose";

const distributorSchema = new mongoose.Schema(
  {
    distributorName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    productsSupplied: [
      {
        productName: String,
        productCode: mongoose.Schema.Types.ObjectId,
        quantity: Number,
        suppliedDate: Date,
      },
    ],
    productsSold: [
      {
        productName: String,
        productCode: mongoose.Schema.Types.ObjectId,
        quantity: Number,
        suppliedDate: Date,
      },
    ],
    createdBy: {
      type: String, // store email or ID of employee who created
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    collection: "distributors",
  }
);

const Distributor = mongoose.models.Distributor || mongoose.model("Distributor", distributorSchema);
export default Distributor;
