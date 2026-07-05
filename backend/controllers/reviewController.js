const Review = require("../models/Review");

// GET all reviews
const getAllReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
};

// POST a new review
const createReview = async (req, res, next) => {
  try {
    const { review, sentiment, theme, rating } = req.body;

    const newReview = await Review.create({
      review,
      sentiment,
      theme,
      rating,
    });

    res.status(201).json(newReview);
  } catch (error) {
    next(error);
  }
};

// GET review by ID
const getReviewById = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        message: "Review not found",
      });
    }

    res.status(200).json(review);
  } catch (error) {
    next(error);
  }
};

// UPDATE review
const updateReview = async (req, res, next) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!review) {
      return res.status(404).json({
        message: "Review not found",
      });
    }

    res.status(200).json(review);
  } catch (error) {
    next(error);
  }
};

// DELETE review
const deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);

    if (!review) {
      return res.status(404).json({
        message: "Review not found",
      });
    }

    res.status(200).json({
      message: "Review deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// SEARCH reviews
const searchReviews = async (req, res, next) => {
  try {
    const query = req.query.q;

    if (!query) {
      return res.status(400).json({
        message: "Search query is required",
      });
    }

    const reviews = await Review.find({
      $or: [
        { review: { $regex: query, $options: "i" } },
        { sentiment: { $regex: query, $options: "i" } },
        { theme: { $regex: query, $options: "i" } },
      ],
    });

    res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllReviews,
  createReview,
  getReviewById,
  updateReview,
  deleteReview,
  searchReviews,
};