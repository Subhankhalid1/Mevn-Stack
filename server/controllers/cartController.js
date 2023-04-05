const cartModel = require("../models/cartModel");
const User=require("../models/userModel")
const Product=require("../models/productModel")
const auth =require("../middleware/authMiddleware")
exports.cart = async (req, res) => {
    const _decode=auth(req,res)
    if(_decode){
      try {
        const { productId, quantity } = req.body
    
        // Check if the user exists
        // const user = await User.findById(userId)
        // if (!user) {
        //   return res.status(404).json({ message: 'User not found' })
        // }
    
        // Check if the product exists
        // const product = await Product.findById(productId)
        // if (!product) {
        //   return res.status(404).json({ message: 'Product not found' })
        // }
    
        // Check if the product is already in the cart
        const cart = await cartModel.findOne({ 'products.product': productId })
        if (cart) {
          // If the product is already in the cart, update the quantity
          await cartModel.updateOne(
            { 'products.product': productId },
            { $inc: { 'products.$.quantity': quantity } }
          )
        } else {
          // If the product is not in the cart, add it
          await cartModel.create({ products: [{ product: productId, quantity }] })
        }
    
        res.status(201).json({ message: 'Product added to cart' })
      } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server error' })
      }
    
}
};
exports.getCartData = async (req, res) => {
    const _decode=auth(req,res)
    if(_decode){
  // await cartModel.find({ user: req.body._id })
  // .sort({ createdAt: 1 })
  // .exec((error, data) => {
  //   if (error) throw error;
  //   if (data)
  //     return res.status(200).json({status:true, message: "success", data });
  // });
  // const { userId } = req.params;
  
  try {
    const cart = await cartModel.find().populate('products.product');
    
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found.' });
    }
    
    res.status(200).json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while getting the cart.' });
  }
}
} 

 
