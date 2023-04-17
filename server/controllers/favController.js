const favModel = require("../models/favModel");
const { successResponse, failureResponse } = require("../helpers/response");

exports.favourite = async (req, res) => {
  console.log("req.user---->", req);
  try {
    const { productId } = req.body;

    // Check if the product is already in the cart
    const favourite =  await favModel.create({
          product: productId,
          user: req.user._id,
        });

    res.status(201).json(successResponse(favourite, "Product added to Favourite List"));
  } catch (error) {
    console.error(error);
    res.status(500).json(failureResponse("Server error"));
  }
};

exports.getFavData = async (req, res) => {
  try {
    const favourite = await favModel
      .find({ user: req.user._id })
      .populate("product")
      .sort({ createdAt: -1 });

    res.status(200).json(successResponse(favourite));
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json(
        failureResponse(
          "An error occurred while getting the favourite product."
        )
      );
  }
};
exports.deleteFavProduct = async (req, res) => {
  try {
    const favourite = await favModel.findOneAndDelete({
      "product._id": req.body._id,
      user: req.user._id,
    });
    res
      .status(200)
      .json(successResponse(favourite, "favourite Product Deleted Now!"));
  } catch (error) {
    res
      .status(500)
      .json(
        failureResponse(
          "An error occurred while deleting the favourite product."
        )
      );
  }
};
