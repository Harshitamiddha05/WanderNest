const axios = require("axios");

const HF_API_URL = "https://router.huggingface.co/v1/chat/completions";
const MODEL = "Qwen/Qwen2.5-7B-Instruct";
async function analyzeReview(review) {
    if (!review || review.trim() === "") {
  throw new Error("Review cannot be empty.");
}
  try {
    const response = await axios.post(
      HF_API_URL,
      {
        model: MODEL,
        messages: [
          {
            role: "system",
            content: `
You are WanderNest AI, an intelligent assistant for homestay owners.

Your task is to analyze guest reviews and provide business insights.

Return ONLY valid JSON.

The JSON MUST follow this exact format:

{
  "sentiment": "",
  "confidence": "",
  "summary": "",
  "positive_themes": [],
  "negative_themes": [],
  "business_suggestions": []
}

Rules:

- Do not return markdown.
- Do not use triple backticks.
- Do not explain anything.
- Return only valid JSON.
- Sentiment should be Positive, Neutral, or Negative.
- Confidence should be like "92%".
- Summary should be 1 concise sentence describing this single guest review.
- Positive themes should list strengths.
- Negative themes should list complaints.
- Business suggestions should be short, practical, and directly related to the issues found in the review.
`
          },
          {
            role: "user",
            content: review,
          },
        ],
        temperature: 0.3,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        timeout: 30000,
      }
    );

    // Get AI response
let aiText = response.data.choices[0].message.content;

// Remove markdown if AI returns it
aiText = aiText
  .replace(/```json/g, "")
  .replace(/```/g, "")
  .trim();

// Safely convert AI response to JSON
try {
  return JSON.parse(aiText);
} catch (err) {
  console.error("Invalid AI JSON:", aiText);

  return {
    sentiment: "Unknown",
    confidence: "0%",
    summary: aiText,
    positive_themes: [],
    negative_themes: [],
    business_suggestions: []
  };
}
  } catch (error) {
    console.error(
      "AI Service Error:",
      error.response?.data || error.message
    );

    throw new Error("Failed to analyze review.");
  }
}

module.exports = {
  analyzeReview,
};