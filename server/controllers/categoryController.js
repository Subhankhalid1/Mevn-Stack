const categoriesModel=require("../models/categoryModel")
const subCategoriesModel = require("../models/subCategoryModel");

exports.createCategory = (req, res) => {
    const { category }=req.body;
    const _category = new categoriesModel({
        category
  });

  _category.save((error, data) => {
    if (error) throw error;
    if (data) {
      return res.json(data);
    }
  });
}


exports.addSubCategory = (req, res) => {
    const { subCategory }=req.body;
    const _subCategory = new subCategoriesModel({
    category:req.body.category,
    subCategory
  });

  _subCategory.save((error, data) => {
    if (error) throw error;
    if (data) {
        categoriesModel.findOneAndUpdate({_id:req.body.category},{ $push: {subCategory:data._id}},{new:true}).
        exec((error, subCategories) => {
      if (error) throw error;
      if (subCategories) return res.json(subCategories);
    });
    }
  });
}


exports.getAllCategories = (req, res) => {
    categoriesModel
      .find()
      .populate("subCategory", "subCategory")
      .sort({ createdAt: 1 })
      .exec((error, categories) => {
        if (error) throw error;
        if (categories) return res.json(categories);
      });
  };