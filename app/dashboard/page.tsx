"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface MetricCardProps {
  label: string;
  value: number;
  emoji: string;
  color: string;
  bg: string;
  percent: number;
}
interface Review {
  _id: string;
  review: string;
  sentiment: "Positive" | "Neutral" | "Negative";
  theme: string;
  rating: number;
}

function MetricCard({
  label,
  value,
  emoji,
  color,
  bg,
  percent,
}: MetricCardProps) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 flex flex-col gap-3 transition-colors">
      <div className="flex items-center justify-between">
        <span
          className={`text-xs font-semibold uppercase tracking-widest ${color}`}
        >
          {label}
        </span>
        <span className="text-xl">{emoji}</span>
      </div>

      <p className="text-4xl font-extrabold text-gray-900 dark:text-white">
        {value}
      </p>

      <div className="w-full h-1.5 rounded-full bg-gray-100 dark:bg-gray-800">
        <div
          className={`h-1.5 rounded-full ${bg}`}
          style={{ width: `${percent}%` }}
        />
      </div>

      <p className="text-xs text-gray-400 dark:text-gray-500">
        {percent}% of total reviews
      </p>
    </div>
  );
}

export default function DashboardPage() {
  const router = useRouter();

  const [user, setUser] = useState<{
    name: string;
    email: string;
  } | null>(null);

  const [stats, setStats] = useState({
  totalReviews: 0,
  positive: 0,
  neutral: 0,
  negative: 0,
  averageRating: 0,
});

const [loadingStats, setLoadingStats] = useState(true);
const [recentReviews, setRecentReviews] = useState<Review[]>([]);
useEffect(() => {
  const token = localStorage.getItem("token");
  const userData = localStorage.getItem("user");

  // Check if user is logged in
  if (!token) {
    router.replace("/login");
    return;
  }

  // Load user details
  if (userData) {
    setUser(JSON.parse(userData));
  }

  // Fetch dashboard statistics
  const fetchDashboardStats = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/dashboard/stats`
      );

      setStats(res.data.data);
    } catch (err) {
      console.error("Dashboard Error:", err);
    } finally {
      setLoadingStats(false);
    }
  };

  const fetchRecentReviews = async () => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/dashboard/recent-reviews`
    );

    setRecentReviews(res.data.data);
  } catch (err) {
    console.error(err);
  }
};
fetchDashboardStats();
fetchRecentReviews();
}, [router]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <p className="text-gray-500 dark:text-gray-400">Loading...</p>
      </div>
    );
  }
  const metrics = [
  {
    label: "Total Reviews",
    value: stats.totalReviews,
    emoji: "📋",
    color: "text-gray-500",
    bg: "bg-gray-400",
    percent: 100,
  },
  {
    label: "Positive Reviews",
    value: stats.positive,
    emoji: "😊",
    color: "text-green-600",
    bg: "bg-green-500",
    percent:
      stats.totalReviews === 0
        ? 0
        : Math.round((stats.positive / stats.totalReviews) * 100),
  },
  {
    label: "Neutral Reviews",
    value: stats.neutral,
    emoji: "😐",
    color: "text-yellow-600",
    bg: "bg-yellow-400",
    percent:
      stats.totalReviews === 0
        ? 0
        : Math.round((stats.neutral / stats.totalReviews) * 100),
  },
  {
    label: "Negative Reviews",
    value: stats.negative,
    emoji: "😞",
    color: "text-red-500",
    bg: "bg-red-400",
    percent:
      stats.totalReviews === 0
        ? 0
        : Math.round((stats.negative / stats.totalReviews) * 100),
  },
];
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <Navbar />

      <main className="flex-1 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">

         {/* Header */}
<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
  <div>
    <p className="text-xs font-semibold text-green-600 uppercase tracking-widest mb-1">
      Analytics
    </p>

    <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
      Review Analytics Dashboard
    </h1>

    <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
      Welcome, <span className="font-semibold">{user.name}</span>
    </p>

    <p className="text-xs text-gray-400 dark:text-gray-500">
      {user.email}
    </p>

    <p className="mt-2 text-sm text-yellow-500 font-semibold">
    ⭐ Average Rating: {stats.averageRating.toFixed(1)} / 5
    </p>
  </div>
</div>

          {/* Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {loadingStats ? (
  <div className="col-span-4 text-center py-8 text-gray-500">
    Loading dashboard...
  </div>
) : (
  metrics.map((m) => (
    <MetricCard key={m.label} {...m} />
  ))
)}
          </div>

          {/* Sentiment Breakdown */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 transition-colors">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
              Sentiment Breakdown
            </h2>

            <div className="flex rounded-full overflow-hidden h-4 w-full">
              <div className="bg-green-500" style={{
  width: `${metrics[1].percent}%`,}} />
              <div className="bg-yellow-400" style={{
  width: `${metrics[2].percent}%`,
}} />
              <div className="bg-red-400" style={{
  width: `${metrics[3].percent}%`,
}}/>
            </div>

            <div className="flex gap-5 mt-3 flex-wrap">
              {[
  {
    label: "Positive",
    color: "bg-green-500",
    val: `${metrics[1].percent}%`,
  },
  {
    label: "Neutral",
    color: "bg-yellow-400",
    val: `${metrics[2].percent}%`,
  },
  {
    label: "Negative",
    color: "bg-red-400",
    val: `${metrics[3].percent}%`,
  },
].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400"
                >
                  <div
                    className={`w-2.5 h-2.5 rounded-full ${item.color}`}
                  />
                  {item.label} —
                  <span className="font-semibold text-gray-700 dark:text-gray-300">
                    {item.val}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Reviews */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden transition-colors">
            <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800">
              <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
                Recent Reviews
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 dark:bg-gray-800 text-xs text-gray-400 uppercase tracking-widest">
                  <tr>
                    <th className="text-left px-6 py-3 font-medium">
                      Review
                    </th>
                    <th className="text-left px-6 py-3 font-medium">
                      Sentiment
                    </th>
                    <th className="text-left px-6 py-3 font-medium">
                      Theme
                    </th>
                  </tr>
                </thead>

<tbody className="divide-y divide-gray-50 dark:divide-gray-800">
  {recentReviews.length === 0 ? (
    <tr>
      <td
        colSpan={3}
        className="text-center py-10 text-gray-500 dark:text-gray-400"
      >
        No reviews available.
      </td>
    </tr>
  ) : (
    recentReviews.map((r) => (
      <tr
        key={r._id}
        className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
      >
        <td className="px-6 py-4 text-gray-600 dark:text-gray-300 max-w-xs">
          {r.review}
        </td>

        <td className="px-6 py-4">
          <span
            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
              r.sentiment === "Positive"
                ? "bg-green-100 text-green-700"
                : r.sentiment === "Neutral"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {r.sentiment}
          </span>
        </td>

        <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
          {r.theme}
        </td>
      </tr>
    ))
  )}
</tbody>
              </table>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}