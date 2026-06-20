import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

const colorData = [
  { name: 'Hot Pink', value: 41, hex: '#ec4899' },
  { name: 'Sage Green', value: 35, hex: '#84a98c' },
  { name: 'Cream', value: 32, hex: '#fdf6e3' },
  { name: 'Chocolate Brown', value: 28, hex: '#5c4033' },
  { name: 'Berry Red', value: 24, hex: '#a4133c' },
  { name: 'Slate Blue', value: 19, hex: '#6b7a99' },
];

export default function ColorIntelligence() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Color Intelligence</h1>
        <p className="text-ink-400 text-sm mt-1">
          The colors dominating fashion collections this season.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {colorData.map((color) => (
          <div
            key={color.name}
            className="bg-ink-900 rounded-2xl border border-ink-800 overflow-hidden hover:border-primary-600/40 transition"
          >
            <div className="h-20 w-full" style={{ backgroundColor: color.hex }}></div>
            <div className="p-3">
              <p className="font-medium text-sm text-white">{color.name}</p>
              <p className="text-xs text-ink-400 mt-1">
                Appears in {color.value}% of collections
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-ink-900 rounded-2xl border border-ink-800 p-5">
        <h3 className="text-lg font-semibold text-white mb-4">Color Popularity (% of Collections)</h3>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={colorData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2e2e2e" />
            <XAxis dataKey="name" stroke="#6b6b6b" fontSize={12} />
            <YAxis stroke="#6b6b6b" fontSize={12} />
            <Tooltip
              contentStyle={{
                borderRadius: '8px',
                border: '1px solid #2e2e2e',
                backgroundColor: '#161616',
                color: '#fff',
                fontSize: '13px',
              }}
            />
            <Bar dataKey="value" radius={[6, 6, 0, 0]}>
              {colorData.map((entry, index) => (
                <Cell key={index} fill={entry.hex} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-ink-900 rounded-2xl border border-ink-800 p-5">
        <h3 className="text-lg font-semibold text-white mb-2">Insight</h3>
        <p className="text-ink-400 text-sm">
          Bold and earthy tones continue to dominate, with{' '}
          <span className="font-semibold text-primary-400">Hot Pink</span> leading
          for the third consecutive month. Cool tones like{' '}
          <span className="font-semibold" style={{ color: '#6b7a99' }}>Slate Blue</span> are emerging
          as a contrast trend for accessories.
        </p>
      </div>
    </div>
  );
}