const express = require('express');
const router = express.Router();

const {coupon,getAllCoupon,applyCouponOnPayment,} = require('../controllers/couponController');


router.post("/create", coupon);
router.get("/", getAllCoupon);
router.post("/applyCoupon", applyCouponOnPayment);




module.exports = router;