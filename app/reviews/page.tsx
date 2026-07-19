"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Loader } from "@/components/ui/Loader";

interface Review {
  _id: string;
  review: string;
  sentiment: string;
  theme: string;
  rating: number;
}

interface AIAnalysis {
  sentiment: string;
  confidence: string;
  summary: string;
  positive_themes: string[];
  negative_themes: string[];
  business_suggestions: string[];
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [reviewText, setReviewText] = useState("");
  const [analysis, setAnalysis] = useState<AIAnalysis | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/reviews")
      .then((response) => {
        setReviews(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load reviews from backend.");
        setLoading(false);
      });
  }, []);

  const analyzeReview = async () => {
    if (!reviewText.trim()) {
      setAnalysisError("Please enter a guest review.");
      return;
    }

    setAnalyzing(true);
    setAnalysis(null);
    setAnalysisError("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/ai/review-analysis",
        {
          review: reviewText,
        }
      );

      setAnalysis(response.data.data);
    } catch (err) {
      setAnalysisError("Failed to analyze review.");
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
          Reviews from Backend API
        </h1>

        {/* AI Review Analyzer */}
        <div className="w-full bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 mb-10">
          <h2 className="text-2xl font-bold mb-4 text-green-600">
            AI Guest Review Analyzer
          </h2>

          <textarea
            rows={6}
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Paste a guest review here..."
            className="w-full border rounded-lg p-4 dark:bg-gray-800 dark:text-white"
          />

          <button
            onClick={analyzeReview}
            disabled={analyzing}
            className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition flex items-center gap-2 disabled:opacity-60"
          >
            {analyzing ? (
              <>
                <Loader size="sm" />
                Analyzing...
              </>
            ) : (
              "Analyze Review"
            )}
          </button>

          {analysisError && (
            <div className="mt-4 bg-red-100 text-red-700 p-3 rounded-lg">
              {analysisError}
            </div>
          )}

          {analysis && (
            <div className="mt-8 space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-900/20 border border-green-700 p-4 rounded-lg">
                 <h3 className="font-bold">😊 Sentiment</h3>
                  <p>{analysis.sentiment}</p>
                </div>

                <div className="bg-blue-900/20 border border-blue-700 p-4 rounded-lg">
                  <h3 className="font-bold">📊 Confidence</h3>
                  <p>{analysis.confidence}</p>
                </div>
              </div>

              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                <h3 className="font-bold mb-2">📝 Summary</h3>
                <p>{analysis.summary}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold mb-2 text-green-700">
                    ✅ Positive Themes
                  </h3>

                  <ul className="list-disc pl-5">
                    {analysis.positive_themes.map((theme, index) => (
                      <li key={index}>{theme}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold mb-2 text-red-700">
                    ❌ Negative Themes
                  </h3>

                  <ul className="list-disc pl-5">
                    {analysis.negative_themes.map((theme, index) => (
                      <li key={index}>{theme}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="font-bold mb-2 text-blue-700">
                  💡 Business Suggestions
                </h3>

                <ul className="list-disc pl-5">
                  {analysis.business_suggestions.map((suggestion, index) => (
                    <li key={index}>{suggestion}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {loading && (
          <div className="flex justify-center py-10">
            <Loader size="lg" />
          </div>
        )}

        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {!loading && !error && (
          <table className="w-full bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="p-3 text-left">Review</th>
                <th className="p-3 text-left">Sentiment</th>
                <th className="p-3 text-left">Theme</th>
                <th className="p-3 text-left">Rating</th>
              </tr>
            </thead>

            <tbody>
              {reviews.map((review) => (
                <tr
                  key={review._id}
                  className="border-b dark:border-gray-700"
                >
                  <td className="p-3">{review.review}</td>
                  <td className="p-3">{review.sentiment}</td>
                  <td className="p-3">{review.theme}</td>
                  <td className="p-3">{review.rating} ⭐</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>

      <Footer />
    </div>
  );
}