const categoriesModel = require("../models/categoryModel");
const subCategoriesModel = require("../models/subCategoryModel");

exports.createCategory = async (req, res) => {
  const { category } = req.body;
  try {
    const _category = new categoriesModel({
      category,
    });

    await _category.save((error, data) => {
      if (error) throw error;
      if (data) {
        return res.status(201).json({status:true, message: "sucessfully created", data });
      }
    });
  } catch (errors) {
    
    res.status(500).json({ status:false,message: "server internal error", res: errors });
  }
};

exports.addSubCategory = async (req, res) => {
  const { subCategory } = req.body;
  const _subCategory = new subCategoriesModel({
    category: req.body.category,
    subCategory,
  });
//   if (!_subCategory) {

//     res.status(404).json({status:"fail", message:"Can't added subCategory due to its syntax."})
// }
  try {
    await _subCategory.save((error, data) => {
      if (error) throw error;
      if (data) {
        categoriesModel
          .findOneAndUpdate(
            { _id: req.body.category },
            { $push: { subCategory: data._id } },
            { new: true }
          )
          .exec((error, subCategories) => {
            if (error) throw error;
            if (subCategories)
              return res
                .status(201)
                .json({
                  status:true,
                  message: "subcategory successfully created!",
                  subCategories,
                });
          });
      }
    
    });
  } catch (error) {
    // console.log("Sub-Category Error Given: ", error);
    res.status(500).json({ message: "server internal error", res: error });
  }
};

exports.getAllCategories = (req, res) => {
  try {
    categoriesModel
      .find()
      .populate("subCategory", "subCategory")
      .sort({ createdAt: 1 })
      .exec((error, categories) => {
        if (error) throw error;
        if (categories)
          return res.status(200).json({status:true, message: "success", categories });
      });
  } catch (error) {
    // console.log("ALl Category Error Given: ", error);
    res.status(500).json({ message: "server internal error", res: error });
  }
};
