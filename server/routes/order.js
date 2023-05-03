const express = require('express');
const router = express.Router();

const {order,orderStatus} = require('../controllers/orderController');


router.post("/orderStatus", orderStatus);
router.get("/", order);




module.exports = router;