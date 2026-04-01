const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", function (req, res) {
  res.send("Alpha Store Backend Running!");
});

app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

mongoose
  .connect(process.env.MONGO_URI)
  .then(function () {
    console.log("MongoDB Connected!");
    app.listen(process.env.PORT, function () {
      console.log("Server running on port 5000");
    });
  })
  .catch(function (err) {
    console.log("Failed:", err.message);
  });
