const reviews = require("../models/Review");

// GET all reviews
const getAllReviews = (req, res) => {
  res.status(200).json(reviews);
};

// POST a new review
const createReview = (req, res) => {
  const { review, sentiment, theme, rating } = req.body;

  const newReview = {
    id: reviews.length + 1,
    review,
    sentiment,
    theme,
    rating,
  };

  reviews.push(newReview);

  res.status(201).json(newReview);
};
// GET single review by ID
const getReviewById = (req, res) => {
  const id = parseInt(req.params.id);

  const review = reviews.find((r) => r.id === id);

  if (!review) {
    return res.status(404).json({
      message: "Review not found",
    });
  }

  res.status(200).json(review);
};
// PUT update review
const updateReview = (req, res) => {
  const id = parseInt(req.params.id);

  const review = reviews.find((r) => r.id === id);

  if (!review) {
    return res.status(404).json({
      message: "Review not found",
    });
  }

  const { review: newReview, sentiment, theme, rating } = req.body;

  review.review = newReview;
  review.sentiment = sentiment;
  review.theme = theme;
  review.rating = rating;

  res.status(200).json(review);
};
// DELETE review
const deleteReview = (req, res) => {
  const id = parseInt(req.params.id);

  const index = reviews.findIndex((r) => r.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: "Review not found",
    });
  }

  reviews.splice(index, 1);

  res.status(204).send();
};

// SEARCH reviews
const searchReviews = (req, res) => {
  const query = req.query.q?.toLowerCase();

  if (!query) {
    return res.status(400).json({
      message: "Search query is required",
    });
  }

  const filteredReviews = reviews.filter(
    (r) =>
      r.review.toLowerCase().includes(query) ||
      r.theme.toLowerCase().includes(query) ||
      r.sentiment.toLowerCase().includes(query)
  );

  res.status(200).json(filteredReviews);
};

module.exports = {
  getAllReviews,
  createReview,
  getReviewById,
  updateReview,
  deleteReview,
  searchReviews,
};