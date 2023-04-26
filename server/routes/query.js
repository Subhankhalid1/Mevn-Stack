const express = require("express");
const router = express.Router();

const { postQuery } = require("../controllers/queryController");

router.post("/postQuery", postQuery);

module.exports = router;
