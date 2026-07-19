const { analyzeReview } = require("../services/aiService");

const analyzeReviewController = async (req, res) => {
  try {
    const { review } = req.body;

    if (!review) {
      return res.status(400).json({
        success: false,
        message: "Review text is required.",
      });
    }

    const aiResponse = await analyzeReview(review);

    return res.status(200).json({
      success: true,
      data: aiResponse,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "AI analysis failed.",
    });
  }
};

module.exports = {
  analyzeReviewController,
};