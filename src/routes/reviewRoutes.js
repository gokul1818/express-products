const express = require("express");
const router = express.Router();

const { createProductReview, getProductReviews, } = require("../controllers/reviewsController");


router.post("/create-review", createProductReview);
router.post("/get-review", getProductReviews);

module.exports = router;