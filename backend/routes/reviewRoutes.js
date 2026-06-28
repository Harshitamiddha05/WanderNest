const express = require("express");
const router = express.Router();

const {
  getAllReviews,
  createReview,
  getReviewById,
  updateReview,
  deleteReview,
  searchReviews,
} = require("../controllers/reviewController");

// IMPORTANT: search comes BEFORE :id
router.get("/", getAllReviews);

router.get("/search", searchReviews);

router.get("/:id", getReviewById);

router.post("/", createReview);

router.put("/:id", updateReview);

router.delete("/:id", deleteReview);

module.exports = router;