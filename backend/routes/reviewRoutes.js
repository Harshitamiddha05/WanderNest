const express = require("express");
const router = express.Router();

const { getAllReviews } = require("../controllers/reviewController");

// GET /api/reviews
router.get("/", getAllReviews);

module.exports = router;