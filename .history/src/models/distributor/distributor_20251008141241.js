import mongoose from "mongoose";

const distributorSchema = new mongoose.Schema(
  {
    distributorName: {
      type: String,
      required: true,
      trim: true,
    },
    contactPerson: {
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
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      street: { type: String, trim: true },
      city: { type: String, trim: true },
      state: { type: String, trim: true },
      country: { type: String, trim: true },
      postalCode: { type: String, trim: true },
    },
    gstNumber: {
      type: String,
      trim: true,
      unique: true,
      sparse: true, // allows some distributors without GST
    },
    distributorCode: {
      type: String,
      unique: true,
      required: true,
      uppercase: true,
      trim: true,
    },
    productsSupplied: [
      {
        productName: String,
        productCode: String,
        quantity: Number,
        lastSuppliedDate: Date,
      },
    ],
    assignedManager: {
      type: String, // or mongoose.Schema.Types.ObjectId if referencing Employee
      trim: true,
    },
    status: {
      type: String,
      enum: ["Active", "Inactive", "Suspended"],
      default: "Active",
    },
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
