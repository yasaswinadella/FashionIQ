import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Palette, Building2, Bot, ArrowRight, Sparkles } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">

      {/* Glowing background blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-600/30 rounded-full blur-3xl animate-blob"></div>
      <div className="absolute top-40 right-1/4 w-96 h-96 bg-primary-400/20 rounded-full blur-3xl animate-blob" style={{ animationDelay: '4s' }}></div>
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-blob" style={{ animationDelay: '8s' }}></div>

      <div className="relative z-10">
        {/* Top Nav */}
        <header className="px-6 sm:px-12 py-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary-600 text-white p-2 rounded-xl shadow-glow">
              <Sparkles size={20} />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">
              Fashion<span className="text-primary-500">IQ</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-sm font-medium text-ink-100 hover:text-primary-400 transition">
              Login
            </Link>
            <Link
              to="/register"
              className="bg-primary-600 text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-primary-700 transition shadow-glow"
            >
              Get Started
            </Link>
          </div>
        </header>

        {/* Hero */}
        <section className="px-6 sm:px-12 pt-12 sm:pt-24 pb-20 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 glass text-primary-300 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 animate-float">
            <Sparkles size={14} />
            AI-Powered Fashion Intelligence
          </div>
          <h1 className="text-5xl sm:text-7xl font-bold leading-tight mb-6 text-white">
            Know the trend <br className="hidden sm:block" />
            <span className="gradient-text">before it's everywhere.</span>
          </h1>
          <p className="text-lg text-ink-400 max-w-2xl mx-auto mb-10">
            FashionIQ analyzes thousands of data points across collections, colors, and competitor
            brands — giving you the insight to design, source, and merchandise ahead of the curve.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/register"
              className="bg-primary-600 text-white px-8 py-3.5 rounded-full font-semibold hover:bg-primary-700 transition shadow-glow-lg flex items-center gap-2 hover:scale-105"
            >
              Start Free <ArrowRight size={18} />
            </Link>
            <Link
              to="/login"
              className="glass px-8 py-3.5 rounded-full font-semibold text-white hover:bg-ink-800 transition"
            >
              I have an account
            </Link>
          </div>
        </section>

        {/* Feature Cards */}
        <section className="px-6 sm:px-12 pb-20 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: TrendingUp, title: 'Trend Analysis', desc: 'Spot rising styles and silhouettes weeks before they peak.' },
              { icon: Palette, title: 'Color Intelligence', desc: 'See which palettes are dominating collections in real time.' },
              { icon: Building2, title: 'Brand Intelligence', desc: 'Benchmark your line against top competitors instantly.' },
              { icon: Bot, title: 'AI Assistant', desc: 'Ask natural questions and get instant fashion insights.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="glass rounded-2xl p-6 hover:shadow-glow transition hover:-translate-y-1 group"
              >
                <div className="inline-flex p-3 rounded-xl bg-primary-600/10 text-primary-400 mb-4 group-hover:bg-primary-600 group-hover:text-white transition">
                  <Icon size={22} />
                </div>
                <h3 className="font-semibold text-white mb-1">{title}</h3>
                <p className="text-sm text-ink-400">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        

        <footer className="text-center text-sm text-ink-400 pb-8">
          © {new Date().getFullYear()} FashionIQ. All rights reserved.
        </footer>
      </div>
    </div>
  );
}