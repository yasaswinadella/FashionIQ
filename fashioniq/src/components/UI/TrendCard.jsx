import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function TrendCard({ name, category, score, change, image }) {
  const isPositive = change >= 0;

  return (
    <div className="bg-ink-900 rounded-2xl border border-ink-800 overflow-hidden hover:border-primary-600/40 transition">
      <div className="h-32 bg-gradient-to-br from-primary-900/40 to-ink-800 flex items-center justify-center text-4xl">
        {image || '👗'}
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-1">
          <h4 className="font-semibold text-white">{name}</h4>
          <span className="text-xs bg-ink-800 text-ink-400 px-2 py-0.5 rounded-full">
            {category}
          </span>
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-sm text-ink-400">Trend Score</span>
          <span className="font-bold text-white">{score}</span>
        </div>
        <div className="flex items-center gap-1 mt-1">
          {isPositive ? (
            <TrendingUp size={14} className="text-emerald-400" />
          ) : (
            <TrendingDown size={14} className="text-red-400" />
          )}
          <span className={`text-xs font-medium ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
            {Math.abs(change)}% this month
          </span>
        </div>
      </div>
    </div>
  );
}