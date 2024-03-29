const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const DB = require("./config/db");
// require("dotenv").config();

const dotenv = require("dotenv");
const decodeUser = require("./middleware/authMiddleware");
dotenv.config({
  path: "./.env",
});

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION!!! shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});
//middleware
app.use(morgan("dev"));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.use(
  cors({
    origin: function (origin, callback) {
      return callback(null, true);
    },
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
app.use("/uploads", express.static("uploads"));

// starting route

app.use(express.json({ extended: false }));
app.use("/api/product", require("./routes/product"));
app.use("/api/category", require("./routes/category"));
app.use("/api/user", require("./routes/user"));
app.use("/api/cart", decodeUser, require("./routes/cart"));
app.use("/api/favourite", decodeUser, require("./routes/favourite"));
app.use("/api/coupon", decodeUser,require("./routes/coupon"));
app.use("/api/checkout",decodeUser, require("./routes/checkout"));
app.use("/api/order",decodeUser, require("./routes/order"));
app.use("/api/query",require("./routes/query"));
app.use("/api/returnOrder", require("./routes/returnOrder"));
app.get("/", (req, res) => {
  res.json(`BuyHive Server is Running Successfully.`);
});

// database connection
DB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`BuyHive Server App Listening on port ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION!!!  shutting down ...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
