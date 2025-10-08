import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderID: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    distributorID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Distributor",
      required: true,
    },
    products: [
      {
        productID: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
    orderDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    collection: "Orders",
  }
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default Order;
