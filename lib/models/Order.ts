import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    customerClerkId: {
      type: String,
      required: true,
    },
    customerName: {
      type: String,
      required: true,
    },
    customerEmail:
    {
      type: String,
      required: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Basic validation for email addresses
      
    },
    phoneNumber: {
      type: String,
      required: true,
      match: /^[0-9]{10,15}$/, // Basic validation for phone numbers (10-15 digits)
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        color: String,
        size: String,
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected", "shipped"],
      default: "pending",
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt`
  }
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
