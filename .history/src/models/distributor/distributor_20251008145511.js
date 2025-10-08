import mongoose from "mongoose";

const distributorSchema = new mongoose.Schema(
  {
    distributorName: {
      type: String,
      required: true,
      trim: true,
    },
    distributorCode: {
      type: String,
      required: true,
      unique: true,
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
        productCode: { type: mongoose.Schema.Types.ObjectId, ref: "Orders" },
        quantity: Number,
        suppliedDate: Date,
      },
    ],
    productsSold: [
      {
        productName: String,
        productCode: { type: mongoose.Schema.Types.ObjectId, ref: "Sales" },
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
    collection: "Distributors",
  }
);

const Distributor = mongoose.models.Distributor || mongoose.model("Distributor", distributorSchema);
export default Distributor;
