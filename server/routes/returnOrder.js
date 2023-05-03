const express = require('express');
const router = express.Router();
const multer = require("multer");
const {returnOrder } = require('../controllers/returnOrderController');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads/products");
    },
    filename: function (req, file, cb) {
           cb(null,Date.now() + "_ " + file.originalname);
    }
});
const upload = multer({ storage: storage });

router.post("/create", upload.any(), returnOrder);

module.exports = router;