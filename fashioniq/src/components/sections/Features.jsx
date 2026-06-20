export default function Features() {
  const features = [
    "AI Trend Forecasting",
    "Luxury Brand Intelligence",
    "Color Trend Analytics",
    "Market Insights",
    "Automated Reports",
    "Competitive Analysis",
  ];

  return (
    <section className="bg-zinc-950 text-white py-24">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-5xl font-bold text-center mb-16">
          Platform Features
        </h2>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8"
            >
              <h3 className="text-xl font-semibold">
                {feature}
              </h3>

              <p className="text-zinc-400 mt-3">
                Powerful AI-driven insights designed
                for modern fashion businesses.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}