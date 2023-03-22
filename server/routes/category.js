const express = require('express');
const router = express.Router();

const {createCategory,addSubCategory,getAllCategories } = require('../controllers/categoryController');


// routes

router.post("/create", createCategory);
router.post("/addSubCategory", addSubCategory);
router.get("/", getAllCategories);




module.exports = router;