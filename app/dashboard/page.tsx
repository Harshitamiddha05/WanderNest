"use client";
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

const metrics = [
  {
    label: "Total Reviews",
    value: 250,
    emoji: "📋",
    color: "text-gray-500",
    bg: "bg-gray-400",
    percent: 100,
  },
  {
    label: "Positive Reviews",
    value: 180,
    emoji: "😊",
    color: "text-green-600",
    bg: "bg-green-500",
    percent: 72,
  },
  {
    label: "Neutral Reviews",
    value: 40,
    emoji: "😐",
    color: "text-yellow-600",
    bg: "bg-yellow-400",
    percent: 16,
  },
  {
    label: "Negative Reviews",
    value: 30,
    emoji: "😞",
    color: "text-red-500",
    bg: "bg-red-400",
    percent: 12,
  },
];

const recentReviews = [
  {
    review:
      "The stay was absolutely wonderful. The host was warm and the surroundings were beautiful.",
    sentiment: "Positive",
    theme: "Host",
    sentiment_color: "bg-green-100 text-green-700",
  },
  {
    review:
      "Room was decent but could use better cleaning. Food was good though.",
    sentiment: "Neutral",
    theme: "Cleanliness",
    sentiment_color: "bg-yellow-100 text-yellow-700",
  },
  {
    review:
      "Location is perfect, very close to the waterfall trek. Highly recommend!",
    sentiment: "Positive",
    theme: "Location",
    sentiment_color: "bg-green-100 text-green-700",
  },
  {
    review:
      "The food served was absolutely delicious — fresh and organic.",
    sentiment: "Positive",
    theme: "Food",
    sentiment_color: "bg-green-100 text-green-700",
  },
  {
    review:
      "Checkout was delayed and no one was available to help with luggage.",
    sentiment: "Negative",
    theme: "Experience",
    sentiment_color: "bg-red-100 text-red-700",
  },
];

export default function DashboardPage() {
  const router = useRouter();

  const [user, setUser] = useState<{
    name: string;
    email: string;
  } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token) {
      router.replace("/login");
      return;
    }

    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, [router]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <p className="text-gray-500 dark:text-gray-400">Loading...</p>
      </div>
    );
  }

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
  </div>
</div>

          {/* Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {metrics.map((m) => (
              <MetricCard key={m.label} {...m} />
            ))}
          </div>

          {/* Sentiment Breakdown */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 transition-colors">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
              Sentiment Breakdown
            </h2>

            <div className="flex rounded-full overflow-hidden h-4 w-full">
              <div className="bg-green-500" style={{ width: "72%" }} />
              <div className="bg-yellow-400" style={{ width: "16%" }} />
              <div className="bg-red-400" style={{ width: "12%" }} />
            </div>

            <div className="flex gap-5 mt-3 flex-wrap">
              {[
                { label: "Positive", color: "bg-green-500", val: "72%" },
                { label: "Neutral", color: "bg-yellow-400", val: "16%" },
                { label: "Negative", color: "bg-red-400", val: "12%" },
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
                  {recentReviews.map((r, i) => (
                    <tr
                      key={i}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-300 max-w-xs">
                        {r.review}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${r.sentiment_color}`}
                        >
                          {r.sentiment}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                        {r.theme}
                      </td>
                    </tr>
                  ))}
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