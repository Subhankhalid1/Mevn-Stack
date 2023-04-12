const cartModel = require("../models/cartModel");
const { successResponse, failureResponse } = require("../helpers/response");

exports.cart = async (req, res) => {
  console.log("req.user---->", req);
  try {
    const { productId, quantity } = req.body;

    // Check if the product is already in the cart
    const cart = await cartModel.findOne({
      product: productId,
      user: req.user._id,
    });
    const product = cart
      ? await cartModel.updateOne(
          { product: productId },
          { $inc: { quantity: quantity } }
        )
      : await cartModel.create({
          product: productId,
          quantity,
          user: req.user._id,
        });

    res.status(201).json(successResponse(product, "Product added to cart"));
  } catch (error) {
    console.error(error);
    res.status(500).json(failureResponse("Server error"));
  }
};
exports.getCartData = async (req, res) => {
  try {
    const cart = await cartModel
      .find({ user: req.user._id })
      .populate("product")
      .sort({ createdAt: -1 });

    res.status(200).json(successResponse(cart));
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json(failureResponse("An error occurred while getting the cart."));
  }
};
exports.deleteCartProduct = async (req, res) => {
  try {
    const cart = await cartModel.findOneAndDelete({
      _id: req.body._id,
      user: req.user._id,
    });
    res.status(200).json(successResponse(cart, "Product Deleted Now!"));
  } catch (error) {
    res
      .status(500)
      .json(
        failureResponse("An error occurred while deleting the cart product.")
      );
  }
};

exports.updateCartQty = async (req, res) => {
  try {
    const { _id, quantity } = req.body;
    const productObject = {};
    if (quantity) {
      productObject.quantity = quantity;
    }
    const cart = await cartModel.findOneAndUpdate(
      { _id: _id },
      { $set: productObject },
      { new: true }
    );
    res.status(203).json(successResponse(cart, "Product updated Now!"));
  } catch (error) {
    res
      .status(500)
      .json(
        failureResponse(
          "An error occurred while updating the cart product quantity."
        )
      );
  }
};
