const express = require('express');
const router = express.Router();

const {createCategory,addSubCategory,getAllCategories } = require('../controllers/categoryController');
const categoryValidation= require("../JoiValidation/categoryValidate")

// routes

router.post("/create",categoryValidation, createCategory);
router.post("/addSubCategory",categoryValidation, addSubCategory);
router.get("/", getAllCategories);




module.exports = router;