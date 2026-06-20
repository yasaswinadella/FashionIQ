export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-zinc-950 text-white">
      <div className="max-w-5xl text-center px-6">
        <h1 className="text-7xl font-black leading-tight">
          AI-Powered Fashion Intelligence
        </h1>

        <p className="text-zinc-400 text-xl mt-8">
          Predict trends, analyze luxury brands,
          and discover the future of fashion.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <button className="bg-white text-black px-8 py-4 rounded-xl font-semibold">
            Get Started
          </button>

          <button className="border border-zinc-700 px-8 py-4 rounded-xl">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}