import React, { useState } from 'react';
import { Search, TrendingUp, TrendingDown, ExternalLink, RefreshCw } from 'lucide-react';

const popularBrands = ['Nike', 'Zara', 'Gucci', 'H&M', 'Prada', 'Dior', 'Reformation', 'Balenciaga'];

function ScoreRing({ score, label, color = '#ec4899' }) {
  const radius = 28;
  const circ = 2 * Math.PI * radius;
  const offset = circ - ((score || 0) / 100) * circ;
  return (
    <div className="flex flex-col items-center gap-1">
      <svg width="72" height="72" viewBox="0 0 72 72">
        <circle cx="36" cy="36" r={radius} fill="none" stroke="#2e2e2e" strokeWidth="6" />
        <circle cx="36" cy="36" r={radius} fill="none" stroke={color} strokeWidth="6"
          strokeDasharray={circ} strokeDashoffset={offset}
          strokeLinecap="round" transform="rotate(-90 36 36)" />
        <text x="36" y="41" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">
          {score || 0}
        </text>
      </svg>
      <span className="text-xs text-ink-400 text-center">{label}</span>
    </div>
  );
}

export default function BrandAnalyzer() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  async function analyze(brandName) {
    const name = (brandName || query).trim();
    if (!name) return;
    setLoading(true);
    setError('');
    setData(null);
    try {
      const res = await fetch('/api/brand', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ brand: name }),
      });
      const result = await res.json();
      if (result.error) throw new Error(result.error);
      setData(result);
    } catch (err) {
      setError(err.message || 'Analysis failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-white">Brand Analyzer</h1>
        <p className="text-ink-400 text-sm mt-1">Search any fashion brand — get real-time AI scores, trends and news.</p>
      </div>

      {/* Search box */}
      <div className="bg-ink-900 rounded-2xl border border-ink-800 p-5">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && analyze()}
              placeholder="Search any brand — Nike, Gucci, Zara..."
              className="w-full pl-10 pr-4 py-3 bg-ink-800 border border-ink-700 text-white placeholder-ink-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <button
            onClick={() => analyze()}
            disabled={loading}
            className="bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700 transition disabled:opacity-50 flex items-center gap-2"
          >
            {loading
              ? <><RefreshCw size={18} className="animate-spin" /> Analyzing...</>
              : <><Search size={18} /> Analyze</>
            }
          </button>
        </div>
        <div className="flex gap-2 flex-wrap mt-3">
          {popularBrands.map(b => (
            <button key={b} onClick={() => { setQuery(b); analyze(b); }}
              className="px-3 py-1 text-xs bg-ink-800 text-ink-100 rounded-full hover:bg-primary-600 hover:text-white transition border border-ink-700">
              {b}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 text-red-400 border border-red-500/20 rounded-xl px-4 py-3 text-sm">❌ {error}</div>
      )}

      {loading && (
        <div className="space-y-4 animate-pulse">
          <div className="bg-ink-900 rounded-2xl border border-ink-800 h-48"></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-ink-900 rounded-2xl border border-ink-800 h-48"></div>
            <div className="bg-ink-900 rounded-2xl border border-ink-800 h-48"></div>
          </div>
        </div>
      )}

      {data && !loading && (
        <div className="space-y-4">
          {/* Main score card */}
          <div className="bg-ink-900 rounded-2xl border border-ink-800 p-6">
            <div className="flex flex-col sm:flex-row justify-between gap-4 mb-5">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-3xl font-bold text-white">{data.brand}</h2>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
                    data.outlook === 'positive' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                    data.outlook === 'negative' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                    'bg-amber-500/10 text-amber-400 border-amber-500/20'
                  }`}>
                    {(data.outlook || 'NEUTRAL').toUpperCase()} OUTLOOK
                  </span>
                </div>
                <p className="text-ink-400 text-sm max-w-xl">{data.summary}</p>
                <p className="text-xs text-ink-400 mt-2">
                  📊 Google Trend Score: <span className="text-white font-semibold">{data.googleTrendScore}/100</span>
                  &nbsp;·&nbsp; Last updated: {new Date(data.lastUpdated).toLocaleString()}
                </p>
              </div>
              <div className="text-center shrink-0">
                <div className="text-6xl font-bold text-primary-500">{data.overallScore}</div>
                <div className="text-xs text-ink-400 mt-1">Overall Score</div>
                <div className="text-xs text-ink-400">/ 100</div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-5 border-t border-ink-800">
              <ScoreRing score={data.trendScore} label="Trend Score" color="#ec4899" />
              <ScoreRing score={data.innovationScore} label="Innovation" color="#a855f7" />
              <ScoreRing score={data.sustainabilityScore} label="Sustainability" color="#10b981" />
              <ScoreRing score={data.sentimentScore} label="Sentiment" color="#f59e0b" />
            </div>
          </div>

          {/* Strengths + Weaknesses */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-ink-900 rounded-2xl border border-ink-800 p-5">
              <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                <TrendingUp size={18} className="text-emerald-400" /> Strengths
              </h3>
              <ul className="space-y-2">
                {(data.strengths || []).map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-ink-100 bg-emerald-500/5 rounded-lg px-3 py-2">
                    <span className="text-emerald-400 font-bold mt-0.5">✓</span> {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-ink-900 rounded-2xl border border-ink-800 p-5">
              <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                <TrendingDown size={18} className="text-red-400" /> Weaknesses
              </h3>
              <ul className="space-y-2">
                {(data.weaknesses || []).map((w, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-ink-100 bg-red-500/5 rounded-lg px-3 py-2">
                    <span className="text-red-400 font-bold mt-0.5">✗</span> {w}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Trending + Declining */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-ink-900 rounded-2xl border border-ink-800 p-5">
              <h3 className="font-semibold text-white mb-3">🔥 Trending Now</h3>
              <ul className="space-y-2">
                {(data.trendingProducts || []).map((t, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm p-2 rounded-lg hover:bg-ink-800 transition">
                    <span className="w-6 h-6 bg-primary-600/20 text-primary-400 rounded-full flex items-center justify-center text-xs font-bold shrink-0">{i+1}</span>
                    <span className="text-ink-100 flex-1">{t}</span>
                    <TrendingUp size={14} className="text-emerald-400" />
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-ink-900 rounded-2xl border border-ink-800 p-5">
              <h3 className="font-semibold text-white mb-3">📉 Declining</h3>
              <ul className="space-y-2">
                {(data.decliningProducts || []).map((t, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm p-2 rounded-lg hover:bg-ink-800 transition">
                    <span className="w-6 h-6 bg-red-500/10 text-red-400 rounded-full flex items-center justify-center text-xs font-bold shrink-0">{i+1}</span>
                    <span className="text-ink-100 flex-1">{t}</span>
                    <TrendingDown size={14} className="text-red-400" />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* News */}
          <div className="bg-ink-900 rounded-2xl border border-ink-800 p-5">
            <h3 className="font-semibold text-white mb-3">📰 Latest News</h3>
            <div className="space-y-2">
              {(data.recentNews || []).map((n, i) => (
                <a key={i} href={n.url} target="_blank" rel="noopener noreferrer"
                  className="flex items-start justify-between gap-3 p-3 bg-ink-800 rounded-xl hover:bg-ink-700 transition group">
                  <div>
                    <p className="text-sm text-white group-hover:text-primary-400 transition">{n.title}</p>
                    <p className="text-xs text-ink-400 mt-1">{n.source} · {n.date}</p>
                  </div>
                  <ExternalLink size={14} className="text-ink-400 shrink-0 mt-1" />
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}