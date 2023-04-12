const express = require("express");
const router = express.Router();

const { cart, getCartData,syncCartData,deleteCartProduct,updateCartQty } = require("../controllers/cartController");

router.post("/create",cart);
// router.post("/syncCartData", syncCartData);
router.get("/", getCartData);
router.post("/delete",deleteCartProduct)
router.post("/update",updateCartQty)

module.exports = router;
