const express = require('express');
const router = express.Router();
const multer = require("multer");
const {returnOrder } = require('../controllers/returnOrderController');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads/returnOrder");
    },
    filename: function (req, file, cb) {
           cb(null,Date.now() + "_ " + file.originalname);
    }
});
const upload = multer({ storage: storage });

router.post("/create", upload.single('productPic'), returnOrder);

module.exports = router;