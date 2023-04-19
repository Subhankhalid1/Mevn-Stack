const checkoutSchema = require("../models/checkoutModel");
const couponModel = require("../models/couponModel");
const orderModel=require("../models/orderModel")
const orderDetailModel=require("../models/orderDetailModel")
const cartModel = require("../models/cartModel");
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
    couponCode,
    total
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
      user:req.user._id,
      couponCode
    });
    if (couponCode) {
     
      const coupon = await couponModel.findOne({ code: couponCode });
    
    coupon.used += 1;
    await coupon.save();
  }
    let save = await _checkout.save();

    const _order = new orderModel({
      total:payment,
      user:req.user._id
      })
      
     await _order.save();
    //  console.log("order id--------->",_order._id)


     const cart = await cartModel
     .find({ user: req.user._id })
     .populate("product")
     .sort({ createdAt: -1 });
     const _orderDetail = new orderDetailModel({
      product:cart,
      order:_order._id
      });
     const detail_order=await _orderDetail.save();
    //  console.log("orderDetail--------->", cart)


     if(detail_order){
    //     const result = await cartModel.deleteMany({ user: req.user._id });
    // console.log(`Deleted ${result.deletedCount} items from cart`);
     }

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
  
    // if(save){
    //  const result = await cartModel.deleteMany({ user: req.user._id });
    // console.log(`Deleted ${result.deletedCount} items from cart`);
    // }
   
  } catch (err) {
    res.status(500).json(failureResponse("server error has been occurred."));
    // console.log("product Error Given: ", err);
  }
  // }
};

exports.getAllCheckout = async (req, res) => {
   
    checkoutSchema 
      .find({ user: req.user._id })
      .populate("cart")
      .populate("user")
      .sort({ createdAt: -1 })
      .exec((error, items) => {
        if (error) throw error;
        if (items) return res.status(200).json(successResponse(items,"success"));
      });
  };
