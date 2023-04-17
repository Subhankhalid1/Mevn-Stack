const couponModel = require("../models/couponModel");
const paymentModel = require("../models/paymentModel");
const { successResponse, failureResponse } = require("../helpers/response");
const cartModel = require("../models/cartModel");

exports.coupon = async (req, res) => {
  try {
    const { code, discountPercentage, used, maxUses } = req.body;

    const coupon = await couponModel.create({
      code: code,
      discountPercentage: discountPercentage,
      used,
      maxUses,
    });

    res
      .status(201)
      .json(successResponse(coupon, "Coupon Code is created now!"));
  } catch (error) {
    console.error(error);
    res.status(500).json(failureResponse("Server error"));
  }
};

exports.getAllCoupon = async (req, res) => {
  couponModel
    .find()
    .sort({ createdAt: -1 })
    .exec((error, coupons) => {
      if (error) throw error;
      if (coupons)
        return res.status(200).json(successResponse(coupons, "success"));
    });
};

exports.applyCouponOnPayment = async (req, res) => {
  let { couponCode, totalAmount, userId } = req.body;

  try {
    // Find the coupon in the database
    // let coupon = await  couponModel.findOne({ code: couponCode });

    // if (!coupon) {
    //   return res.status(400).json(failureResponse("Invalid Coupon Code."));
    // }

    // if (coupon.usageCount >= coupon.maxUsageCount) {
    //   return res.status(400).json(failureResponse("Coupon has reached maximum usage count"));
    // }
    // let discount = totalAmount * coupon.discountPercentage / 100;
    // totalAmount -= discount;

    // let payment = new paymentModel({totalAmount});
    // await payment.save();
    // coupon.used += 1;
    // await coupon.save();
    // res.json(successResponse(payment, "Success"));
    const cart = await cartModel
      .find({ user: req.user._id })
      .populate("product");
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

   
    let total = 0;
    for (const item of cart) {
      const product = item.product;
      const price = product.price * item.quantity;
      total += price;
    }

    if (couponCode) {
     
      const coupon = await couponModel.findOne({ code: couponCode });
      if (!coupon) {
        return res.status(404).json({ error: "Coupon not found" });
      }
      if (coupon.usageCount >= coupon.maxUsageCount) {
        return res
          .status(400)
          .json(failureResponse("Coupon has reached maximum usage count"));
      }
      const discount = (total * coupon.discountPercentage) / 100;
      total -= discount;
      // coupon.used += 1;
      await coupon.save();
    }

    res.json(successResponse(total, "Success"));
    console.log("cart-------->", total);
  } catch (err) {
    console.error(err);
    res.status(500).json(failureResponse("Server error"));
  }
};
