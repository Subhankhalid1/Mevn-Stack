// const { successResponse, failureResponse } = require("../helpers/response");
// const orderDetailSchema = require("../models/orderDetailModel");
const orderModel = require("../models/orderModel");
const orderStatus =require("../models/orderStatusModel")
exports.order = async (req, res) => {
  try {
   
    const pipeline = [
      {
        $lookup: {
          from: "orderdetailschemas",
          localField: "_id",
          foreignField: "order",
          as: "product"
        }
      },
      {
        $unwind: "$product"
      },
      {
        $lookup: {
          from: "productschemas", // replace "products" with the actual name of your products collection
          localField: "product.product.product",
          foreignField: "_id",
          as: "productData"
        }
      },
      {
        $unwind: "$productData"
      },
      {
        $lookup: {
          from: "orderstatusschemas",
          localField: "_id",
          foreignField: "order",
          as: "status"
        }
      },
      {
        $lookup: {
          from: "returnschemas",
          localField: "_id",
          foreignField: "order",
          as: "returnOrder"
        }
      },
     
      {
        $group: {
          _id: "$_id",
          user: { $first: "$user" },
          total: { $first: "$total" },
          products: { $push: "$productData" },
          returnOrder: { $first: "$returnOrder" },
          status: { $first: "$status" },
          createdAt: { $first: "$createdAt" },
          updatedAt: { $first: "$updatedAt" }
        }
      }
    ];

    const results = await orderModel.aggregate(pipeline).sort({ createdAt: -1 });

    res.status(200).json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
}

exports.orderStatus = async (req, res) => {
  try {
    const {order, status}=req.body;
    const _status=new orderStatus({
      order,
      status
    });
    let save = await _status.save();
    if (save) {
      return res.status(201).json({ status:true,success: "Status Updated Sucessfully." });
    }

  } catch (error) {
          res
          .status(500)
          .json(failureResponse("An error occurred while getting the order status."));
  }
   
}