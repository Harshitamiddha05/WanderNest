const express = require("express");
const router = express.Router();

const {
  analyzeReviewController,
} = require("../controllers/aiController");

// POST /api/ai/review-analysis
router.post("/review-analysis", analyzeReviewController);

module.exports = router;