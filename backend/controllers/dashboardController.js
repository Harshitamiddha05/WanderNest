const Review = require("../models/Review");

const getDashboardStats = async (req, res) => {
  try {
    const totalReviews = await Review.countDocuments();

    const positive = await Review.countDocuments({
      sentiment: "Positive",
    });

    const neutral = await Review.countDocuments({
      sentiment: "Neutral",
    });

    const negative = await Review.countDocuments({
      sentiment: "Negative",
    });

    const avg = await Review.aggregate([
      {
        $group: {
          _id: null,
          averageRating: {
            $avg: "$rating",
          },
        },
      },
    ]);

    res.json({
      success: true,
      data: {
        totalReviews,
        positive,
        neutral,
        negative,
        averageRating:
          avg.length > 0
            ? Number(avg[0].averageRating.toFixed(1))
            : 0,
      },
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Unable to fetch dashboard statistics",
    });
  }
};
const getRecentReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      success: true,
      data: reviews,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Unable to fetch recent reviews",
    });
  }
};
module.exports = {
  getDashboardStats,
  getRecentReviews,
};