const { successResponse, failureResponse } = require("../helpers/response");
const orderDetailSchema = require("../models/orderDetailModel");
const orderModel = require("../models/orderModel");

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
        $group: {
          _id: "$_id",
          user: { $first: "$user" },
          total: { $first: "$total" },
          products: { $push: "$productData" },
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

// exports.order = async (req, res) => {
    
//     try {
//         const order = await orderModel
//           .find({ user: req.user._id })
//           .populate("order")
//           .sort({ createdAt: -1 });
    
//         res.status(200).json(successResponse(order));
//       } catch (err) {
//         console.error(err);
//         res
//           .status(500)
//           .json(failureResponse("An error occurred while getting the order detail."));
//       }
   
// }