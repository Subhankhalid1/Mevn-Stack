const productModel = require("../models/productModel");

exports.createProduct = async (req, res) => {
  const {
    product_name,
    price,
    short_description,
    display_moq,
    stock_inUsa,
    featuredProduct,
    slug,
    unit
  } = req.body;

  let images = req.files;
  if (images.length !== 3) {
    return res.json({
      error: "Must be need to provide atleast 3 pictures of your product.",
    });
  } else {
    try {
      let allImages = [];
      for (const img of images) {
        allImages.push(img.path);
      }
      const _product = new productModel({
        product_name,
        price,
        short_description,
        category_name:req.body.category_name,
        subCategory:req.body.subCategory,
        productPic: allImages,
        display_moq,
        stock_inUsa,
        featuredProduct,
        slug,
        unit
      });
      let save = await _product.save();
      if (save) {
        return res.json({ success: "product created Sucessfully." });
      }
    } catch (err) {
      console.log("product Error Given: ", err);
    }
  }
};


exports.getAllProducts = async (req, res) => {

  // let page=Number(req.query.page)||1;
  // let limit=Number(req.query.limit)||6;
  // let skip=(page-1)*limit

  // .skip(skip)
  // .limit(limit)
  productModel
    .find()
    .populate("category_name","category")
    .populate("subCategory","subCategory")
    .sort({ createdAt: -1 })
    .exec((error, products) => {
      if (error) throw error;
      if (products) return res.json(products);
    });

};


exports.deleteProduct = (req, res) => {
  productModel
    .findOneAndDelete({ _id: req.body._id })
    .exec((error, data) => {
      if (error) throw error;
      if (data) {
        return res.json(data);
      }
    });
};



//Search product using Query  String..
exports.ProductsByCategory = async (req, res) => {
  await productModel.find({category_name:req.body.category_name})
  .populate("category_name","category")
  .populate("subCategory","subCategory")
  .sort({ createdAt: -1 })
    .exec((error, data) => {
      if (error) throw error;
      if (data) {
        return res.json(data);
      }
    });

};

exports.filterProducts = async (req, res) => {
  
  const data = await productModel.find({
    "$or": [
      { display_moq: { $regex: req.params.val } },
      {product_name:{ $regex: req.params.val } },
      { category: { $regex: req.query.category } },
    ],
  })
  .populate("category_name","category")
  .populate("subCategory","subCategory")
    res.json(data)

};

//filter between in price range
exports.filterBetweenPrice =  (req, res) => {
  const minPrice = req.query.minPrice || 0;
  const maxPrice = req.query.maxPrice || Number.MAX_SAFE_INTEGER;

  productModel.find({ price: { $gte: minPrice, $lte: maxPrice } }, (err, products) => {
    if (err) {
      res.status(500).send({ error: 'Internal server error' });
    } else {
      res.send(products);
    }
  })

}
