import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

export default function TrendChart({ data, title }) {
  return (
    <div className="bg-ink-900 rounded-2xl border border-ink-800 p-5">
      {title && <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
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
            labelStyle={{ color: '#f9a8d4' }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="value"
            name="Trend Score"
            stroke="#ec4899"
            strokeWidth={3}
            dot={{ r: 4, fill: '#ec4899' }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}