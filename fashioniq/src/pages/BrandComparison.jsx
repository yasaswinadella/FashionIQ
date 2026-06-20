import React, { useState } from 'react';
import { RefreshCw, ArrowLeftRight, TrendingUp, TrendingDown } from 'lucide-react';

function ScoreBar({ label, score1, score2 }) {
  return (
    <div className="mb-3">
      <div className="flex justify-between text-xs mb-1.5">
        <span className="text-primary-400 font-bold w-8">{score1 || 0}</span>
        <span className="text-ink-400">{label}</span>
        <span className="text-purple-400 font-bold w-8 text-right">{score2 || 0}</span>
      </div>
      <div className="flex gap-1 items-center h-2">
        <div className="flex-1 bg-ink-800 rounded-full overflow-hidden flex justify-end">
          <div className="h-full bg-primary-600 rounded-full" style={{ width: `${score1 || 0}%` }}></div>
        </div>
        <div className="w-1.5 h-1.5 bg-ink-600 rounded-full shrink-0"></div>
        <div className="flex-1 bg-ink-800 rounded-full overflow-hidden">
          <div className="h-full bg-purple-500 rounded-full" style={{ width: `${score2 || 0}%` }}></div>
        </div>
      </div>
    </div>
  );
}

export default function BrandComparison() {
  const [brand1, setBrand1] = useState('');
  const [brand2, setBrand2] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  async function compare() {
    if (!brand1.trim() || !brand2.trim()) return;
    setLoading(true);
    setError('');
    setData(null);
    try {
      const [r1, r2] = await Promise.all([
        fetch('/api/brand', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ brand: brand1 }) }),
        fetch('/api/brand', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ brand: brand2 }) }),
      ]);
      const [d1, d2] = await Promise.all([r1.json(), r2.json()]);
      if (d1.error || d2.error) throw new Error(d1.error || d2.error);
      setData({ brand1: d1, brand2: d2 });
    } catch (err) {
      setError(err.message || 'Comparison failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  const d1 = data?.brand1;
  const d2 = data?.brand2;
  const winner = d1 && d2 ? ((d1.overallScore || 0) >= (d2.overallScore || 0) ? d1.brand : d2.brand) : null;

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-white">Brand Comparison</h1>
        <p className="text-ink-400 text-sm mt-1">Compare two fashion brands head-to-head with real AI data.</p>
      </div>

      <div className="bg-ink-900 rounded-2xl border border-ink-800 p-5">
        <div className="flex flex-col sm:flex-row gap-3 items-center">
          <input type="text" value={brand1} onChange={(e) => setBrand1(e.target.value)}
            placeholder="Brand 1 — e.g. Zara"
            className="flex-1 px-4 py-3 bg-ink-800 border border-primary-600/30 text-white placeholder-ink-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500" />
          <div className="bg-ink-800 p-2 rounded-full border border-ink-700">
            <ArrowLeftRight size={18} className="text-primary-400" />
          </div>
          <input type="text" value={brand2} onChange={(e) => setBrand2(e.target.value)}
            placeholder="Brand 2 — e.g. H&M"
            className="flex-1 px-4 py-3 bg-ink-800 border border-purple-500/30 text-white placeholder-ink-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500" />
          <button onClick={compare} disabled={loading}
            className="bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700 transition disabled:opacity-50 flex items-center gap-2 whitespace-nowrap">
            {loading ? <><RefreshCw size={18} className="animate-spin" />Comparing...</> : <><ArrowLeftRight size={18} />Compare</>}
          </button>
        </div>
      </div>

      {error && <div className="bg-red-500/10 text-red-400 border border-red-500/20 rounded-xl px-4 py-3 text-sm">❌ {error}</div>}

      {loading && (
        <div className="space-y-4 animate-pulse">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-ink-900 rounded-2xl border border-ink-800 h-40"></div>
            <div className="bg-ink-900 rounded-2xl border border-ink-800 h-40"></div>
          </div>
          <div className="bg-ink-900 rounded-2xl border border-ink-800 h-64"></div>
        </div>
      )}

      {data && !loading && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {[d1, d2].map((d, i) => (
              <div key={i} className={`bg-ink-900 rounded-2xl border p-5 text-center ${i === 0 ? 'border-primary-600/40' : 'border-purple-500/40'}`}>
                <h2 className={`text-2xl font-bold mb-2 ${i === 0 ? 'text-primary-400' : 'text-purple-400'}`}>{d?.brand}</h2>
                <div className={`text-5xl font-bold ${i === 0 ? 'text-primary-500' : 'text-purple-400'}`}>{d?.overallScore}</div>
                <div className="text-xs text-ink-400 mt-1 mb-2">Overall Score</div>
                <p className="text-xs text-ink-400">{d?.summary}</p>
              </div>
            ))}
          </div>

          <div className="bg-ink-900 rounded-2xl border border-ink-800 p-5">
            <div className="flex justify-between text-xs font-bold mb-4">
              <span className="text-primary-400">{d1?.brand}</span>
              <span className="text-ink-400">Score Comparison</span>
              <span className="text-purple-400">{d2?.brand}</span>
            </div>
            <ScoreBar label="Trend Score" score1={d1?.trendScore} score2={d2?.trendScore} />
            <ScoreBar label="Innovation" score1={d1?.innovationScore} score2={d2?.innovationScore} />
            <ScoreBar label="Sustainability" score1={d1?.sustainabilityScore} score2={d2?.sustainabilityScore} />
            <ScoreBar label="Sentiment" score1={d1?.sentimentScore} score2={d2?.sentimentScore} />
            <ScoreBar label="Google Trends" score1={d1?.googleTrendScore} score2={d2?.googleTrendScore} />
          </div>

          {winner && (
            <div className="bg-primary-600/10 border border-primary-600/30 rounded-2xl p-5 text-center">
              <p className="text-xs text-ink-400 mb-1">🏆 Overall Winner</p>
              <p className="text-2xl font-bold text-white">{winner}</p>
              <p className="text-primary-400 text-sm mt-1">
                by {Math.abs((d1?.overallScore || 0) - (d2?.overallScore || 0))} points
              </p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            {[d1, d2].map((d, i) => (
              <div key={i} className="bg-ink-900 rounded-2xl border border-ink-800 p-4 space-y-3">
                <h3 className={`font-semibold text-sm ${i === 0 ? 'text-primary-400' : 'text-purple-400'}`}>{d?.brand}</h3>
                <div>
                  <p className="text-xs text-ink-400 mb-1 flex items-center gap-1"><TrendingUp size={12} className="text-emerald-400" /> Strengths</p>
                  {(d?.strengths || []).slice(0, 3).map((s, j) => (
                    <p key={j} className="text-xs text-ink-100 py-0.5">✓ {s}</p>
                  ))}
                </div>
                <div>
                  <p className="text-xs text-ink-400 mb-1 flex items-center gap-1"><TrendingDown size={12} className="text-red-400" /> Weaknesses</p>
                  {(d?.weaknesses || []).slice(0, 3).map((w, j) => (
                    <p key={j} className="text-xs text-ink-100 py-0.5">✗ {w}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}