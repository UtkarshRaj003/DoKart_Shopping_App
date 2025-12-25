const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: Number,
        price: Number,
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    shippingAddress: {
      street: String,
      city: String,
      state: String,
      zip: String,
      country: String,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    orderStatus: {
      type: String,
      enum: ["processing", "shipped", "delivered", "cancelled"],
      default: "processing",
    },
    paymentId: String, // for payment gateway integration later
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
