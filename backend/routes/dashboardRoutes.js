const express = require("express");
const router = express.Router();

const {
  getDashboardStats,
  getRecentReviews,
} = require("../controllers/dashboardController");

// Optional: protect with auth middleware later
router.get("/stats", getDashboardStats);
router.get("/recent-reviews", getRecentReviews);

module.exports = router;