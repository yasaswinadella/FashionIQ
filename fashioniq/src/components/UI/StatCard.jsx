import React from 'react';

export default function StatCard({ title, value, change, icon: Icon, color = 'primary' }) {
  const isPositive = change >= 0;

  const colorClasses = {
    primary: 'bg-primary-600/10 text-primary-400 group-hover:bg-primary-600 group-hover:text-white',
    green: 'bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white',
    orange: 'bg-orange-500/10 text-orange-400 group-hover:bg-orange-500 group-hover:text-white',
    pink: 'bg-pink-500/10 text-pink-400 group-hover:bg-pink-500 group-hover:text-white',
  };

  return (
    <div className="bg-ink-900 rounded-2xl border border-ink-800 p-5 flex items-center justify-between hover:border-primary-600/50 hover:shadow-glow transition group hover:-translate-y-1">
      <div>
        <p className="text-sm text-ink-400 mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-white">{value}</h3>
        {change !== undefined && (
          <p className={`text-xs mt-1 font-medium ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
            {isPositive ? '▲' : '▼'} {Math.abs(change)}% vs last month
          </p>
        )}
      </div>
      {Icon && (
        <div className={`p-3 rounded-xl transition ${colorClasses[color]}`}>
          <Icon size={24} />
        </div>
      )}
    </div>
  );
}