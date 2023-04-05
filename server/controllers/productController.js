const productModel = require("../models/productModel");
//unCatch error
//Validation with JOI
//Status, message and Data

exports.createProduct = async (req, res) => {
  const {
    product_name,
    price,
    short_description,
    display_moq,
    stock_inUsa,
    featuredProduct,
    slug,
    unit,
  } = req.body;
  const { path } = req.file;

  try {
   
    const _product = new productModel({
      product_name,
      price,
      short_description,
      category_name: req.body.category_name,
      subCategory: req.body.subCategory,
      productPic: path,
      display_moq,
      stock_inUsa,
      featuredProduct,
      slug,
      unit,
    });
    let save = await _product.save();
    if (save) {
      return res.status(201).json({ status:true,success: "product created Sucessfully." });
    }
  } catch (err) {
    res.status(500).json({ status:false,message: "server internal error", res: err });
    // console.log("product Error Given: ", err);
  }
  // }
};

exports.getAllProducts = async (req, res) => {
  // let page=Number(req.query.page)||1;
  // let limit=Number(req.query.limit)||6;
  // let skip=(page-1)*limit

  // .skip(skip)
  // .limit(limit)
  productModel
    .find()
    .populate("category_name", "category")
    .populate("subCategory", "subCategory")
    .sort({ createdAt: -1 })
    .exec((error, products) => {
      if (error) throw error;
      if (products) return res.status(200).json({status:true,message:"success",products});
    });
};

exports.deleteProduct = (req, res) => {
  productModel.findOneAndDelete({ _id: req.body._id }).exec((error, data) => {
    if (error) throw error;
    if (data) {
      return res.status(200).json({});
    }
    else {
      res.status(404).send("Data Not Found.");
    }
  });
};

//Search product using Query  String..
exports.ProductsByCategory = async (req, res) => {
  await productModel
    .find({ category_name: req.body.category_name })
    .populate("category_name", "category")
    .populate("subCategory", "subCategory")
    .sort({ createdAt: -1 })
    .exec((error, data) => {
      if (error) throw error;
      if (data) {
        return res.status(200).json({status:true,message:"success",data});
      }
    });
};

exports.filterProducts = async (req, res) => {
  const data = await productModel
    .find({
      $or: [
        { display_moq: { $regex: req.params.val } },
        { product_name: { $regex: req.params.val } },
        { category: { $regex: req.query.category } },
      ],
    })
    .populate("category_name", "category")
    .populate("subCategory", "subCategory");

    if (!data) {

      res.status(404).json({status:false, message:"No document found with that range"})
  }
  res.json(data);
};

//filter between in price range
exports.filterBetweenPrice = (req, res) => {
  const minPrice = req.query.minPrice || 0;
  const maxPrice = req.query.maxPrice || Number.MAX_SAFE_INTEGER;

  productModel.find(
    { price: { $gte: minPrice, $lte: maxPrice } },
    (err, products) => {
      if (err) {
        res.status(404).send({ error: "Products Not Found" });
      } else {
        res.send(products);
      }
    }
  );
};
