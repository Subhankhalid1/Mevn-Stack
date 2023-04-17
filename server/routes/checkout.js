const express = require("express");
const router = express.Router();

const { checkout,getAllCheckout} = require("../controllers/checkoutController");

router.post("/create",checkout);
router.get("/",getAllCheckout);
// router.post("/syncCartData", syncCartData);


module.exports = router;
