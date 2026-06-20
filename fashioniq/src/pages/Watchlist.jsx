import React, { useState, useEffect } from 'react';
import { Star, Trash2, RefreshCw, TrendingUp, TrendingDown, Plus } from 'lucide-react';

export default function Watchlist() {
  const [brands, setBrands] = useState(() => {
    try { return JSON.parse(localStorage.getItem('fiq_watchlist') || '[]'); }
    catch { return []; }
  });
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState({});
  const [scores, setScores] = useState({});

  useEffect(() => {
    localStorage.setItem('fiq_watchlist', JSON.stringify(brands));
  }, [brands]);

  function addBrand() {
    const name = input.trim();
    if (!name || brands.includes(name)) return;
    setBrands(prev => [...prev, name]);
    setInput('');
    fetchScore(name);
  }

  function removeBrand(name) {
    setBrands(prev => prev.filter(b => b !== name));
    setScores(prev => { const n = { ...prev }; delete n[name]; return n; });
  }

  async function fetchScore(name) {
    setLoading(prev => ({ ...prev, [name]: true }));
    try {
      const res = await fetch('/api/brand', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ brand: name }),
      });
      const data = await res.json();
      setScores(prev => ({ ...prev, [name]: data }));
    } catch {
      setScores(prev => ({ ...prev, [name]: { error: true } }));
    } finally {
      setLoading(prev => ({ ...prev, [name]: false }));
    }
  }

  async function refreshAll() {
    for (const b of brands) await fetchScore(b);
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Watchlist</h1>
          <p className="text-ink-400 text-sm mt-1">Track your favourite brands with daily score updates.</p>
        </div>
        {brands.length > 0 && (
          <button onClick={refreshAll}
            className="flex items-center gap-2 bg-ink-900 border border-ink-800 text-ink-100 px-4 py-2 rounded-xl text-sm hover:border-primary-600/40 transition">
            <RefreshCw size={15} /> Refresh All
          </button>
        )}
      </div>

      {/* Add brand */}
      <div className="bg-ink-900 rounded-2xl border border-ink-800 p-5">
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addBrand()}
            placeholder="Add a brand to watch — e.g. Prada"
            className="flex-1 px-4 py-3 bg-ink-800 border border-ink-700 text-white placeholder-ink-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <button onClick={addBrand}
            className="bg-primary-600 text-white px-5 py-3 rounded-xl font-semibold hover:bg-primary-700 transition flex items-center gap-2">
            <Plus size={18} /> Add
          </button>
        </div>
      </div>

      {brands.length === 0 && (
        <div className="bg-ink-900 rounded-2xl border border-ink-800 p-10 text-center">
          <Star size={32} className="text-ink-600 mx-auto mb-3" />
          <p className="text-ink-400 text-sm">No brands in your watchlist yet.</p>
          <p className="text-ink-400 text-xs mt-1">Add brands above to track their daily scores.</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {brands.map(name => {
          const s = scores[name];
          const isLoading = loading[name];
          return (
            <div key={name} className="bg-ink-900 rounded-2xl border border-ink-800 p-5 hover:border-primary-600/40 transition">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-white text-lg">{name}</h3>
                <div className="flex gap-2">
                  <button onClick={() => fetchScore(name)} disabled={isLoading}
                    className="text-ink-400 hover:text-primary-400 transition disabled:opacity-40">
                    <RefreshCw size={15} className={isLoading ? 'animate-spin' : ''} />
                  </button>
                  <button onClick={() => removeBrand(name)} className="text-ink-400 hover:text-red-400 transition">
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>

              {isLoading && (
                <div className="space-y-2 animate-pulse">
                  <div className="h-8 bg-ink-800 rounded"></div>
                  <div className="h-4 bg-ink-800 rounded w-3/4"></div>
                  <div className="h-4 bg-ink-800 rounded w-1/2"></div>
                </div>
              )}

              {!isLoading && !s && (
                <button onClick={() => fetchScore(name)}
                  className="w-full py-2 text-sm text-primary-400 border border-primary-600/20 rounded-xl hover:bg-primary-600/10 transition">
                  Click to load score
                </button>
              )}

              {!isLoading && s && !s.error && (
                <div className="space-y-3">
                  <div className="flex items-end gap-2">
                    <span className="text-4xl font-bold text-primary-500">{s.overallScore}</span>
                    <span className="text-ink-400 text-sm mb-1">/ 100</span>
                    <span className={`ml-auto text-xs font-bold px-2 py-0.5 rounded-full ${
                      s.outlook === 'positive' ? 'bg-emerald-500/10 text-emerald-400' :
                      s.outlook === 'negative' ? 'bg-red-500/10 text-red-400' :
                      'bg-amber-500/10 text-amber-400'
                    }`}>
                      {(s.outlook || 'neutral').toUpperCase()}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-1.5 text-xs">
                    {[
                      ['Trend', s.trendScore, '#ec4899'],
                      ['Innovation', s.innovationScore, '#a855f7'],
                      ['Sustainability', s.sustainabilityScore, '#10b981'],
                      ['Sentiment', s.sentimentScore, '#f59e0b'],
                    ].map(([label, val, color]) => (
                      <div key={label} className="bg-ink-800 rounded-lg p-2">
                        <p className="text-ink-400">{label}</p>
                        <p className="font-bold mt-0.5" style={{ color }}>{val}</p>
                      </div>
                    ))}
                  </div>

                  <div>
                    <p className="text-xs text-ink-400 mb-1">Top Trend</p>
                    <p className="text-xs text-white flex items-center gap-1">
                      <TrendingUp size={12} className="text-emerald-400" />
                      {s.trendingProducts?.[0] || 'N/A'}
                    </p>
                  </div>

                  <p className="text-xs text-ink-400">
                    Updated: {new Date(s.lastUpdated).toLocaleDateString()}
                  </p>
                </div>
              )}

              {!isLoading && s?.error && (
                <p className="text-xs text-red-400">Failed to load. Try again.</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}