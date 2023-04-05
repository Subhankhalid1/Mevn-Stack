const express = require("express");
const router = express.Router();

const { cart, getCartData,syncCartData } = require("../controllers/cartController");

router.post("/create", cart);
// router.post("/syncCartData", syncCartData);
router.get("/", getCartData);

module.exports = router;
