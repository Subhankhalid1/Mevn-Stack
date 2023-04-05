
const express = require('express');
const router = express.Router();
const multer = require("multer");
const { createProduct, getAllProducts, deleteProduct, ProductsByCategory,filterProducts,filterBetweenPrice } = require('../controllers/productController');
const productValidation=require("../JoiValidation/productValidate")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads/products");
    },
    filename: function (req, file, cb) {
           cb(null,Date.now() + "_ " + file.originalname);
    }
});
const upload = multer({ storage: storage });

router.post("/create", upload.single('productPic'),productValidation, createProduct);
router.post("/delete", deleteProduct);
router.get("/getAllProducts", getAllProducts);
router.post("/ProductsByCategory", ProductsByCategory);
router.get("/filterProducts/:val", filterProducts);
router.get("/filterBetweenPrice",filterBetweenPrice);
module.exports = router;