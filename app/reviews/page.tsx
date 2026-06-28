"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Loader } from "@/components/ui/Loader";

interface Review {
  id: number;
  review: string;
  sentiment: string;
  theme: string;
  rating: number;
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
          Reviews from Backend API
        </h1>

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
                  key={review.id}
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