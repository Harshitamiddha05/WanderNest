const reviews = require("../models/Review");

// GET all reviews
const getAllReviews = (req, res) => {
  res.status(200).json(reviews);
};

module.exports = {
  getAllReviews,
};