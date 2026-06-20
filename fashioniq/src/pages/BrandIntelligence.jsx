import React from 'react';
import { Building2, TrendingUp, TrendingDown } from 'lucide-react';

const brands = [
  { name: 'Zara', score: 88, change: 6, focus: 'Fast Fashion', topTrend: 'Oversized Blazers' },
  { name: 'H&M', score: 81, change: -2, focus: 'Fast Fashion', topTrend: 'Cargo Pants' },
  { name: 'Mango', score: 79, change: 9, focus: 'Contemporary', topTrend: 'Mesh Tops' },
  { name: 'COS', score: 85, change: 12, focus: 'Minimalist', topTrend: 'Wide-Leg Denim' },
  { name: 'Reformation', score: 90, change: 15, focus: 'Sustainable', topTrend: 'Crochet Dresses' },
  { name: 'Massimo Dutti', score: 76, change: -4, focus: 'Premium Casual', topTrend: 'Chunky Boots' },
];

export default function BrandIntelligence() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Brand Intelligence</h1>
        <p className="text-ink-400 text-sm mt-1">
          See how top fashion brands are tracking against current trends.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {brands.map((brand) => {
          const isPositive = brand.change >= 0;
          return (
            <div key={brand.name} className="bg-ink-900 rounded-2xl border border-ink-800 p-5 hover:border-primary-600/40 transition">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="bg-primary-600/10 text-primary-400 p-2 rounded-xl">
                    <Building2 size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{brand.name}</h4>
                    <p className="text-xs text-ink-400">{brand.focus}</p>
                  </div>
                </div>
                <span className="text-xl font-bold text-white">{brand.score}</span>
              </div>

              <div className="flex items-center gap-1 mb-2">
                {isPositive ? (
                  <TrendingUp size={14} className="text-emerald-400" />
                ) : (
                  <TrendingDown size={14} className="text-red-400" />
                )}
                <span className={`text-xs font-medium ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
                  {Math.abs(brand.change)}% alignment score change
                </span>
              </div>

              <p className="text-sm text-ink-400">
                Top trend adopted: <span className="font-medium text-ink-100">{brand.topTrend}</span>
              </p>
            </div>
          );
        })}
      </div>

      <div className="bg-ink-900 rounded-2xl border border-ink-800 p-5 overflow-x-auto">
        <h3 className="text-lg font-semibold text-white mb-4">Brand Comparison</h3>
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="border-b border-ink-800 text-ink-400">
              <th className="py-2 pr-4">Brand</th>
              <th className="py-2 pr-4">Focus</th>
              <th className="py-2 pr-4">Trend Score</th>
              <th className="py-2 pr-4">Monthly Change</th>
            </tr>
          </thead>
          <tbody>
            {brands.map((brand) => (
              <tr key={brand.name} className="border-b border-ink-800/50">
                <td className="py-2 pr-4 font-medium text-white">{brand.name}</td>
                <td className="py-2 pr-4 text-ink-400">{brand.focus}</td>
                <td className="py-2 pr-4 text-ink-100">{brand.score}</td>
                <td className={`py-2 pr-4 font-medium ${brand.change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {brand.change >= 0 ? '+' : ''}{brand.change}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}