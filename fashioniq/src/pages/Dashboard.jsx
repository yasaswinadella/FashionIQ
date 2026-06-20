import React from 'react';
import { useAuth } from '../context/AuthContext';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import { TrendingUp, Package, BarChart2, Users, MoreHorizontal } from 'lucide-react';

const lineData = [
  { time: '10am', score: 40 }, { time: '11am', score: 65 },
  { time: '12pm', score: 48 }, { time: '1pm', score: 72 },
  { time: '2pm', score: 58 }, { time: '3pm', score: 85 },
  { time: '4pm', score: 62 }, { time: '5pm', score: 90 },
  { time: '6pm', score: 75 }, { time: '7pm', score: 95 },
];

const pieData = [
  { name: 'Trending', value: 60, color: '#ec4899' },
  { name: 'Stable', value: 25, color: '#f59e0b' },
  { name: 'Declining', value: 15, color: '#6366f1' },
];

const recentBrands = [
  { id: '#BR001', name: 'Nike', category: 'Sportswear', score: 92, change: '+8%', amount: 'Rising' },
  { id: '#BR002', name: 'Zara', category: 'Fast Fashion', score: 84, change: '+5%', amount: 'Rising' },
  { id: '#BR003', name: 'Gucci', category: 'Luxury', score: 78, change: '-3%', amount: 'Stable' },
  { id: '#BR004', name: 'H&M', category: 'Fast Fashion', score: 71, change: '+2%', amount: 'Stable' },
];

const topBrands = [
  { name: 'Reformation', score: 90, category: 'Sustainable' },
  { name: 'Balenciaga', score: 88, category: 'Luxury' },
  { name: 'Nike', score: 92, category: 'Sportswear' },
  { name: 'Zara', score: 84, category: 'Fast Fashion' },
  { name: 'Gucci', score: 87, category: 'Luxury' },
];

function CustomTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    return (
      <div className="glass rounded-lg px-3 py-2 text-xs text-white border border-primary-600/30">
        <p className="font-bold text-primary-400">{payload[0].value}</p>
        <p className="text-ink-400">Trend Score</p>
      </div>
    );
  }
  return null;
}

export default function Dashboard() {
  const { currentUser } = useAuth();
  const today = new Date().toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' });

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-white">Dashboard</h1>
        <div className="glass px-3 py-1.5 rounded-lg text-xs text-ink-400 border border-ink-800">
          {today}
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: TrendingUp, label: 'Trends Tracked', value: '128+', color: 'text-primary-400', bg: 'bg-primary-600/10' },
          { icon: Package, label: 'Brands Monitored', value: '56', color: 'text-amber-400', bg: 'bg-amber-500/10' },
          { icon: BarChart2, label: 'Reports Generated', value: '190+', color: 'text-purple-400', bg: 'bg-purple-500/10' },
          { icon: Users, label: 'Active Users', value: '12+', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
        ].map((item) => (
          <div key={item.label} className="bg-ink-900 rounded-2xl border border-ink-800 p-4 flex items-center gap-4 hover:border-primary-600/40 transition hover:-translate-y-0.5">
            <div className={`${item.bg} ${item.color} p-3 rounded-xl`}>
              <item.icon size={22} />
            </div>
            <div>
              <p className="text-xl font-bold text-white">{item.value}</p>
              <p className="text-xs text-ink-400">{item.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-ink-900 rounded-2xl border border-ink-800 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-white">Trend Score Reports</h3>
            <MoreHorizontal size={18} className="text-ink-400" />
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" />
              <XAxis dataKey="time" stroke="#6b6b6b" fontSize={11} />
              <YAxis stroke="#6b6b6b" fontSize={11} />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone" dataKey="score" stroke="#ec4899"
                strokeWidth={2.5} dot={{ r: 4, fill: '#ec4899', strokeWidth: 0 }}
                activeDot={{ r: 6, fill: '#fff', stroke: '#ec4899', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-ink-900 rounded-2xl border border-ink-800 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-white">Analytics</h3>
            <MoreHorizontal size={18} className="text-ink-400" />
          </div>
          <div className="flex flex-col items-center">
            <PieChart width={160} height={160}>
              <Pie data={pieData} cx={75} cy={75} innerRadius={50} outerRadius={75} dataKey="value" strokeWidth={0}>
                {pieData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
            <div className="text-center -mt-2 mb-3">
              <p className="text-3xl font-bold text-white">80%</p>
              <p className="text-xs text-ink-400">Trend Active</p>
            </div>
            <div className="w-full space-y-2">
              {pieData.map((d) => (
                <div key={d.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }}></div>
                    <span className="text-ink-400">{d.name}</span>
                  </div>
                  <span className="text-white font-medium">{d.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-ink-900 rounded-2xl border border-ink-800 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-white">Recent Brand Analyses</h3>
            <MoreHorizontal size={18} className="text-ink-400" />
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-ink-800">
                <th className="text-left text-xs text-ink-400 pb-2 font-medium">ID</th>
                <th className="text-left text-xs text-ink-400 pb-2 font-medium">Brand</th>
                <th className="text-left text-xs text-ink-400 pb-2 font-medium">Score</th>
                <th className="text-left text-xs text-ink-400 pb-2 font-medium">Change</th>
                <th className="text-left text-xs text-ink-400 pb-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-800">
              {recentBrands.map((b) => (
                <tr key={b.id} className="hover:bg-ink-800/50 transition">
                  <td className="py-2.5 text-ink-400 text-xs">{b.id}</td>
                  <td className="py-2.5">
                    <div className="font-medium text-white">{b.name}</div>
                    <div className="text-xs text-ink-400">{b.category}</div>
                  </td>
                  <td className="py-2.5 font-bold text-primary-400">{b.score}</td>
                  <td className={`py-2.5 text-xs font-semibold ${b.change.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}>
                    {b.change}
                  </td>
                  <td className="py-2.5">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      b.amount === 'Rising'
                        ? 'bg-emerald-500/10 text-emerald-400'
                        : 'bg-amber-500/10 text-amber-400'
                    }`}>
                      {b.amount}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-ink-900 rounded-2xl border border-ink-800 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-white">Top Brands</h3>
            <MoreHorizontal size={18} className="text-ink-400" />
          </div>
          <div className="space-y-3">
            {topBrands.map((b) => (
              <div key={b.name} className="flex items-center gap-3 p-3 bg-ink-800 rounded-xl hover:bg-ink-600 transition">
                <div className="w-10 h-10 bg-primary-600/20 rounded-lg flex items-center justify-center text-primary-400 font-bold text-sm">
                  {b.name[0]}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">{b.name}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    {[0, 1, 2, 3, 4].map((j) => (
                      <div key={j} className={`w-2.5 h-2.5 rounded-full ${j < Math.round(b.score / 20) ? 'bg-primary-500' : 'bg-ink-600'}`}></div>
                    ))}
                  </div>
                  <p className="text-xs text-ink-400 mt-0.5">{b.category}</p>
                </div>
                <p className="text-sm font-bold text-white">{b.score}</p>
              </div>
            ))}

            <div className="mt-4 bg-primary-600/10 border border-primary-600/20 rounded-xl p-4 text-center">
              <p className="text-xs text-ink-400 mb-1">Welcome back</p>
              <p className="text-sm font-bold text-white">{currentUser?.displayName || 'User'}</p>
              <button className="mt-2 w-full bg-primary-600 text-white text-xs py-1.5 rounded-lg font-medium hover:bg-primary-700 transition">
                Analyze a Brand
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}