const Joi = require('joi');


 const validation=Joi.object({
  
    category: Joi.string().required(),
    subCategory:Joi.string()
    
})


const categoryValidation = async (req, res, next) => {
  const payload = {
   category:req.body.category,
   subCategory:req.body.subCategory
  };

  const { error } = validation.validate(payload);
  if (error) {
    res.status(406);
    return res.status(406).json({status:false, message:'Error in Product Data', error});
    
  } else {
    next();
  }
};
module.exports = categoryValidation;
