const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true },
    customerPhone: { type: String, required: true },
    customerEmail: { type: String, required: true },
    customerAddress: { type: String, required: true },
    customerCity: { type: String, required: true },
    items: [
      {
        productId: String,
        name: String,
        price: Number,
        quantity: Number,
        brand: String,
      },
    ],
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      default: "Pending",
      enum: ["Pending", "Confirmed", "Shipped", "Delivered", "Cancelled"],
    },
    paymentMethod: { type: String, default: "Cash on Delivery" },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Order", orderSchema);
