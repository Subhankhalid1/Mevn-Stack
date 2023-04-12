const express = require("express");
const router = express.Router();

const {
  favourite,
  getFavData,
  deleteFavProduct,
} = require("../controllers/favController");

router.post("/create", favourite);
// router.post("/syncCartData", syncCartData);
router.get("/", getFavData);
router.post("/delete", deleteFavProduct);

module.exports = router;
