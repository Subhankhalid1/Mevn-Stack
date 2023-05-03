const returnOrderModel = require("../models/returnOrderModel");
const { successResponse, failureResponse } = require("../helpers/response");

exports.returnOrder = async (req, res) => {
  const { product, order, description } = req.body;
  const { path } = req.file;
  //   let images=req.files;
  // if(images.length!==2){
  //     return res.json({error: "Must be need to provide atleast 2 pictures of your product."})
  // }
  // else{
  try {
    // let allImages=[];
    // for(const img of images){
    //     allImages.push(img.path)
    // }
    const _returnOrder = new returnOrderModel({
      product,
      order,
      description,
      productPic: path,
    });
    let save = await _returnOrder.save();
    if (save) {
      return res.json(
        successResponse(
          save,
          "Return Order Query Successfully Submitted!"
        )
      );
    }
  } catch (err) {
    res.status(500).json(failureResponse("server error has been occurred."));
  }
  // }
};
