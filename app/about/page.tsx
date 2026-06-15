import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">

          {/* Header */}
          <div className="mb-10">
            <p className="text-xs font-semibold text-green-600 uppercase tracking-widest mb-3">
              Our Story
            </p>
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
              About WanderNest
            </h1>
            <div className="w-12 h-1 bg-green-500 rounded-full" />
          </div>

          {/* Content */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 sm:p-10 space-y-6 text-gray-600 leading-relaxed text-base">
            <p>
              <span className="font-semibold text-gray-900">WanderNest</span> is an AI-powered review intelligence platform built specifically for homestay operators and eco-tourism businesses. We help property owners cut through the noise of guest feedback and surface what truly matters — fast.
            </p>

            <p>
              Managing reviews across platforms like Google, TripAdvisor, and Airbnb is time-consuming and inconsistent. Staff members read reviews one by one, manually identify themes, and write individual responses — a process that doesn't scale. WanderNest changes that by automating the entire workflow using Large Language Model (LLM) technology.
            </p>

            <p>
              Paste one review or a hundred. WanderNest instantly classifies the sentiment of each review (Positive, Neutral, or Negative), identifies the primary theme — whether it's about food, the host, location, cleanliness, value, or overall experience — and generates a professional one-line management response.
            </p>

            <p>
              Built as part of the <span className="font-semibold text-gray-900">AI-Assisted Full Stack Web Development</span> internship program, WanderNest is designed to demonstrate how real-world AI integrations can solve genuine business problems for small hospitality operators.
            </p>

            <div className="pt-2 border-t border-gray-100">
              <p className="text-sm text-gray-400">
                Project Code: <span className="font-mono text-green-600">AI-03</span> &nbsp;|&nbsp; Domain: Homestay & Eco-Tourism &nbsp;|&nbsp; Stack: Next.js · React · TypeScript · Tailwind CSS · LLM Integration
              </p>
            </div>
          </div>

          {/* Values */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: "🌿", label: "Eco-first", desc: "Built for sustainable, community-driven hospitality businesses." },
              { icon: "⚡", label: "Instant results", desc: "AI processes reviews in seconds, not hours." },
              { icon: "🎯", label: "Actionable", desc: "Every output is a clear signal you can act on today." },
            ].map((v) => (
              <div key={v.label} className="bg-white rounded-xl border border-gray-100 p-5 flex flex-col gap-2 shadow-sm">
                <span className="text-2xl">{v.icon}</span>
                <span className="text-sm font-semibold text-gray-900">{v.label}</span>
                <span className="text-xs text-gray-400 leading-relaxed">{v.desc}</span>
              </div>
            ))}
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}