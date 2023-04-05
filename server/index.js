const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const DB = require("./config/db");
// require("dotenv").config();

const dotenv = require('dotenv');
dotenv.config({
    path: './.env'
});


process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION!!! shutting down...');
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
app.use("/api/cart", require("./routes/cart"));

app.get("/", (req, res) => {
  res.json(`BuyHive Server is Running Successfully.`);
});

// database connection
DB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`BuyHive Server App Listening on port ${PORT}`);
});




process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION!!!  shutting down ...');
  console.log(err.name, err.message);
  server.close(() => {
      process.exit(1);
  });
});