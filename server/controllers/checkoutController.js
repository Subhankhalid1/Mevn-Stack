const checkoutSchema = require("../models/checkoutModel");
const couponModel = require("../models/couponModel");
const { successResponse, failureResponse } = require("../helpers/response");

exports.checkout = async (req, res) => {
  const {
    cardName,
    cardNumber,
    expiry,
    cvv,
    streetAddress,
    city,
    state,
    zipCode,
    payment,
    user,
    couponCode
  } = req.body;

  try {
    const _checkout = new checkoutSchema({
      cardName,
      cardNumber,
      expiry,
      cvv,
      streetAddress,
      city,
      state,
      zipCode,
      payment,
      user,
      couponCode
    });
    if (couponCode) {
     
      const coupon = await couponModel.findOne({ code: couponCode });
    
    coupon.used += 1;
    await coupon.save();
  }
    let save = await _checkout.save();
    if (save) {
      return res
        .status(201)
        .json(
          successResponse(
            save,
            "Order has been replaced as per your instructions."
          )
        );
    }
  } catch (err) {
    res.status(500).json(failureResponse("server error has been occurred."));
    // console.log("product Error Given: ", err);
  }
  // }
};

exports.getAllCheckout = async (req, res) => {
   
    checkoutSchema 
      .find()
      .populate("user")
      .populate("payment")
      .sort({ createdAt: -1 })
      .exec((error, items) => {
        if (error) throw error;
        if (items) return res.status(200).json(successResponse(items,"success"));
      });
  };
