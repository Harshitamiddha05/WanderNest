import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Card from "@/components/Card";
import Footer from "@/components/Footer";

const features = [
  {
    title: "Sentiment Analysis",
    description:
      "Instantly classify guest reviews as Positive, Neutral, or Negative using AI — no manual reading required.",
    icon: "😊",
  },
  {
    title: "Theme Detection",
    description:
      "Automatically tag reviews by topic: Food, Host, Location, Cleanliness, Value, or Experience.",
    icon: "🏷️",
  },
  {
    title: "AI Response Generator",
    description:
      "Generate professional, on-brand management responses for every review in seconds.",
    icon: "✍️",
  },
  {
    title: "Review Analytics",
    description:
      "Track sentiment trends, identify recurring issues, and monitor your property's reputation over time.",
    icon: "📊",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1">
        <Hero />

        {/* Features section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            {/* Section header */}
            <div className="text-center mb-12">
              <p className="text-xs font-semibold text-green-600 uppercase tracking-widest mb-3">
                Platform Features
              </p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
                Everything you need to manage guest feedback
              </h2>
              <p className="text-gray-400 max-w-xl mx-auto text-base">
                WanderNest gives eco-homestay operators a complete review intelligence toolkit — powered by AI.
              </p>
            </div>

            {/* Cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature) => (
                <Card
                  key={feature.title}
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-green-600">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
              Ready to understand your guests better?
            </h2>
            <p className="text-green-100 mb-8 text-base">
              Start analyzing reviews and building a stronger reputation today.
            </p>
            <a
              href="/dashboard"
              className="inline-flex items-center gap-2 bg-white text-green-700 font-semibold px-8 py-3.5 rounded-xl hover:bg-green-50 transition-colors shadow-md"
            >
              Go to Dashboard
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}