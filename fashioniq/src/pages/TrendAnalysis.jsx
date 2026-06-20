import React, { useState } from 'react';
import TrendCard from '../components/UI/TrendCard';
import TrendChart from '../components/charts/TrendChart';

const allTrends = [
  { name: 'Oversized Blazers', category: 'Outerwear', score: 92, change: 34, image: '🧥' },
  { name: 'Cargo Pants', category: 'Bottoms', score: 85, change: 18, image: '👖' },
  { name: 'Platform Sneakers', category: 'Footwear', score: 78, change: -5, image: '👟' },
  { name: 'Mesh Tops', category: 'Tops', score: 71, change: 22, image: '👚' },
  { name: 'Mini Bags', category: 'Accessories', score: 88, change: 14, image: '👜' },
  { name: 'Wide-Leg Denim', category: 'Bottoms', score: 80, change: 9, image: '👖' },
  { name: 'Crochet Dresses', category: 'Dresses', score: 75, change: -8, image: '👗' },
  { name: 'Chunky Boots', category: 'Footwear', score: 83, change: 27, image: '👢' },
];

const monthlyData = [
  { name: 'Jan', value: 50 },
  { name: 'Feb', value: 58 },
  { name: 'Mar', value: 55 },
  { name: 'Apr', value: 64 },
  { name: 'May', value: 72 },
  { name: 'Jun', value: 78 },
  { name: 'Jul', value: 85 },
];

const categories = ['All', 'Outerwear', 'Bottoms', 'Footwear', 'Tops', 'Accessories', 'Dresses'];

export default function TrendAnalysis() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredTrends =
    activeCategory === 'All'
      ? allTrends
      : allTrends.filter((t) => t.category === activeCategory);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Trend Analysis</h1>
        <p className="text-ink-400 text-sm mt-1">
          Track rising and falling fashion trends across categories.
        </p>
      </div>

      <TrendChart data={monthlyData} title="Industry-wide Trend Momentum" />

      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition ${
              activeCategory === cat
                ? 'bg-primary-600 text-white'
                : 'bg-ink-900 border border-ink-800 text-ink-100 hover:bg-ink-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredTrends.map((trend) => (
          <TrendCard key={trend.name} {...trend} />
        ))}
      </div>
    </div>
  );
}