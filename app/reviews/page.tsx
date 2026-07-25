"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Loader } from "@/components/ui/Loader";
import ReviewForm from "@/components/reviews/ReviewForm";
import DeleteDialog from "@/components/reviews/DeleteDialog";

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
  const [showForm, setShowForm] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
 const fetchReviews = async () => {
  try {
    setLoading(true);

    const response = await axios.get(
      "http://localhost:5000/api/reviews"
    );

    setReviews(response.data);
    setError("");
  } catch {
    setError("Failed to load reviews from backend.");
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchReviews();
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
  const handleSaveReview = async (data: {
  review: string;
  sentiment: "Positive" | "Neutral" | "Negative";
  theme: string;
  rating: number;
}) => {
  try {
    setSaving(true);

    if (editingReview) {
      await axios.put(
        `http://localhost:5000/api/reviews/${editingReview._id}`,
        data
      );
    } else {
      await axios.post(
        "http://localhost:5000/api/reviews",
        data
      );
    }

    await fetchReviews();

    setShowForm(false);
    setEditingReview(null);
    setSelectedReview(null);

  } catch {
    alert("Failed to save review.");
  } finally {
    setSaving(false);
  }
};
const handleDeleteReview = async () => {
  if (!selectedReview) return;

  try {
    setDeleting(true);

    await axios.delete(
      `http://localhost:5000/api/reviews/${selectedReview._id}`
    );

    await fetchReviews();

    setShowDeleteDialog(false);
    setSelectedReview(null);

  } catch {
    alert("Failed to delete review.");
  } finally {
    setDeleting(false);
  }
};
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Reviews Management
          </h1>

          <button
            onClick={() => {
            setEditingReview(null);
            setShowForm(true);
            }}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg font-medium transition">
              + Add Review
            </button>
        </div>

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
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>

          <tbody>
  {reviews.length === 0 ? (
    <tr>
      <td colSpan={5} className="text-center py-8 text-gray-500">
        No reviews found.
      </td>
    </tr>
  ) : (
    reviews.map((review) => (
      <tr
        key={review._id}
        className="border-b dark:border-gray-700"
      >
        <td className="p-3">{review.review}</td>

        <td className="p-3">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              review.sentiment === "Positive"
                ? "bg-green-100 text-green-700"
                : review.sentiment === "Neutral"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {review.sentiment}
          </span>
        </td>

        <td className="p-3">{review.theme}</td>

        <td className="p-3">{review.rating} ⭐</td>
        <td className="p-3">
          <div className="flex justify-center gap-3">
            <button
              onClick={() => {
                setEditingReview(review);
                setShowForm(true);
              }}
              className="rounded-lg bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 transition"
            >
              ✏️
            </button>
            <button
              onClick={() => {
                setSelectedReview(review);
                setShowDeleteDialog(true);
              }}
              className="rounded-lg bg-red-500 hover:bg-red-600 text-white px-3 py-1 transition"
              >
               🗑️
            </button>
          </div>
        </td>
      </tr>
    ))
  )}
</tbody>  
          </table>
        )}
      </main>
      {showForm && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
    <div className="w-full max-w-2xl rounded-xl bg-white dark:bg-gray-900 p-6 shadow-xl">

      <h2 className="text-2xl font-bold mb-6">
        {editingReview ? "Edit Review" : "Add Review"}
      </h2>

      <ReviewForm
        loading={saving}
        initialData={
          editingReview
            ? {
                review: editingReview.review,
                sentiment: editingReview.sentiment as
                  | "Positive"
                  | "Neutral"
                  | "Negative",
                theme:
                    editingReview.theme.charAt(0).toUpperCase() +
                    editingReview.theme.slice(1).toLowerCase(),
                rating: editingReview.rating,
              }
            : undefined
        }
        onCancel={() => {
          setShowForm(false);
          setEditingReview(null);
        }}
        onSubmit={handleSaveReview}
      />

    </div>
  </div>
)}
<DeleteDialog
  open={showDeleteDialog}
  loading={deleting}
  onCancel={() => {
    setShowDeleteDialog(false);
    setSelectedReview(null);
  }}
  onConfirm={handleDeleteReview}
/>
      <Footer />
    </div>
  );
}