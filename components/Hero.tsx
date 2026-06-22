import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-950 dark:via-gray-900 dark:to-black py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 border border-green-200 dark:border-green-800">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          AI-Powered Review Intelligence
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight tracking-tight mb-6">
          Transform Guest Feedback into{" "}
          <span className="text-green-600 dark:text-green-400">
            Actionable Insights
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl text-gray-500 dark:text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
          AI-powered review analysis for homestays and eco-tourism businesses.
          Understand sentiment, detect themes, and respond professionally —
          automatically.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/dashboard"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all"
          >
            Analyze Reviews
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>

          <Link
            href="/about"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white dark:bg-gray-800 hover:bg-green-50 dark:hover:bg-gray-700 text-green-700 dark:text-green-400 font-semibold px-8 py-3.5 rounded-xl border border-green-200 dark:border-gray-700 transition-all"
          >
            Learn More
          </Link>
        </div>

        {/* Social proof strip */}
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 text-sm text-gray-400 dark:text-gray-500">
          <div className="flex items-center gap-2">
            <span className="text-green-500 dark:text-green-400 font-bold text-base">
              250+
            </span>
            Reviews analyzed
          </div>

          <div className="hidden sm:block w-px h-4 bg-gray-200 dark:bg-gray-700" />

          <div className="flex items-center gap-2">
            <span className="text-green-500 dark:text-green-400 font-bold text-base">
              3
            </span>
            Sentiment categories
          </div>

          <div className="hidden sm:block w-px h-4 bg-gray-200 dark:bg-gray-700" />

          <div className="flex items-center gap-2">
            <span className="text-green-500 dark:text-green-400 font-bold text-base">
              6
            </span>
            Theme tags
          </div>
        </div>
      </div>
    </section>
  );
}