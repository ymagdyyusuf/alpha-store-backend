const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const Product = require("../models/Product");

router.post("/login", function (req, res) {
  const { password } = req.body;
  if (password === process.env.ADMIN_PASSWORD) {
    res.json({ success: true, token: "alpha-admin-token" });
  } else {
    res.status(401).json({ success: false, message: "Wrong password" });
  }
});

router.get("/stats", async function (req, res) {
  try {
    const totalOrders = await Order.countDocuments();
    const totalProducts = await Product.countDocuments();
    const orders = await Order.find();
    const totalRevenue = orders.reduce(function (sum, o) {
      return sum + o.totalPrice;
    }, 0);
    const pendingOrders = await Order.countDocuments({ status: "Pending" });
    res.json({ totalOrders, totalProducts, totalRevenue, pendingOrders });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
