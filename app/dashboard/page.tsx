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

function MetricCard({ label, value, emoji, color, bg, percent }: MetricCardProps) {
  return (
    <div className={`bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-3`}>
      <div className="flex items-center justify-between">
        <span className={`text-xs font-semibold uppercase tracking-widest ${color}`}>{label}</span>
        <span className="text-xl">{emoji}</span>
      </div>
      <p className="text-4xl font-extrabold text-gray-900">{value}</p>
      {/* Mini progress bar */}
      <div className="w-full h-1.5 rounded-full bg-gray-100">
        <div
          className={`h-1.5 rounded-full ${bg}`}
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="text-xs text-gray-400">{percent}% of total reviews</p>
    </div>
  );
}

const metrics = [
  { label: "Total Reviews", value: 250, emoji: "📋", color: "text-gray-500", bg: "bg-gray-400", percent: 100 },
  { label: "Positive Reviews", value: 180, emoji: "😊", color: "text-green-600", bg: "bg-green-500", percent: 72 },
  { label: "Neutral Reviews", value: 40, emoji: "😐", color: "text-yellow-600", bg: "bg-yellow-400", percent: 16 },
  { label: "Negative Reviews", value: 30, emoji: "😞", color: "text-red-500", bg: "bg-red-400", percent: 12 },
];

const recentReviews = [
  { review: "The stay was absolutely wonderful. The host was warm and the surroundings were beautiful.", sentiment: "Positive", theme: "Host", sentiment_color: "bg-green-100 text-green-700" },
  { review: "Room was decent but could use better cleaning. Food was good though.", sentiment: "Neutral", theme: "Cleanliness", sentiment_color: "bg-yellow-100 text-yellow-700" },
  { review: "Location is perfect, very close to the waterfall trek. Highly recommend!", sentiment: "Positive", theme: "Location", sentiment_color: "bg-green-100 text-green-700" },
  { review: "The food served was absolutely delicious — fresh and organic.", sentiment: "Positive", theme: "Food", sentiment_color: "bg-green-100 text-green-700" },
  { review: "Checkout was delayed and no one was available to help with luggage.", sentiment: "Negative", theme: "Experience", sentiment_color: "bg-red-100 text-red-700" },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">

          {/* Page header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-xs font-semibold text-green-600 uppercase tracking-widest mb-1">Analytics</p>
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Review Analytics Dashboard</h1>
              <p className="text-sm text-gray-400 mt-1">Trishul Eco-Homestays · Last updated: June 2026</p>
            </div>
            <button className="self-start sm:self-auto inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Analyze New Reviews
            </button>
          </div>

          {/* Metric cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {metrics.map((m) => (
              <MetricCard key={m.label} {...m} />
            ))}
          </div>

          {/* Sentiment breakdown bar */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-sm font-semibold text-gray-900 mb-4">Sentiment Breakdown</h2>
            <div className="flex rounded-full overflow-hidden h-4 w-full">
              <div className="bg-green-500" style={{ width: "72%" }} title="Positive 72%" />
              <div className="bg-yellow-400" style={{ width: "16%" }} title="Neutral 16%" />
              <div className="bg-red-400" style={{ width: "12%" }} title="Negative 12%" />
            </div>
            <div className="flex gap-5 mt-3 flex-wrap">
              {[
                { label: "Positive", color: "bg-green-500", val: "72%" },
                { label: "Neutral", color: "bg-yellow-400", val: "16%" },
                { label: "Negative", color: "bg-red-400", val: "12%" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2 text-xs text-gray-500">
                  <div className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
                  {item.label} — <span className="font-semibold text-gray-700">{item.val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent reviews table */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-sm font-semibold text-gray-900">Recent Reviews</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-xs text-gray-400 uppercase tracking-widest">
                  <tr>
                    <th className="text-left px-6 py-3 font-medium">Review</th>
                    <th className="text-left px-6 py-3 font-medium">Sentiment</th>
                    <th className="text-left px-6 py-3 font-medium">Theme</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {recentReviews.map((r, i) => (
                    <tr key={i} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-gray-600 max-w-xs">{r.review}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${r.sentiment_color}`}>
                          {r.sentiment}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-500">{r.theme}</td>
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