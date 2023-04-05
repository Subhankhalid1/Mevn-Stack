const Joi = require('joi');


 const validation=Joi.object({
    productPic: Joi.string().required(),
    product_name: Joi.string().min(3).max(22).required(),
    short_description:Joi.string(),
    display_moq: Joi.string().required(),
    price: Joi.number().integer().required(),
    brand: Joi.string().required(),
    category_name:Joi.string().required(),
    subCategory: Joi.string().required(),
    stock_inUsa: Joi.boolean().default(false),
    slug: Joi.string(),
    unit: Joi.string(),
    featuredProduct: Joi.boolean().default(false),
})


const productValidation = async (req, res, next) => {
  const payload = {
    productPic: req.file.path,
    product_name: req.body.product_name,
    short_description: req.body.short_description,
    display_moq: req.body.display_moq,
    price: req.body.price,
    brand: req.body.brand,
    category_name: req.body.category_name,
    subCategory: req.body.subCategory,
    stock_inUsa: req.body.stock_inUsa,
    slug: req.body.slug,
    unit: req.body.unit,
    featuredProduct: req.body.featuredProduct,
  };

  const { error } = validation.validate(payload);
  if (error) {
    // res.status(406);
    return res.status(422).json({status:false, message:'Error in Product Data', error});
  } else {
    next();
  }
};
module.exports = productValidation;
