import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, Search, ArrowLeftRight,
  TrendingUp, Bot, FileText, Star,
  DollarSign, UserCircle
} from 'lucide-react';

const links = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/brand-analyzer', label: 'Brand Analyzer', icon: Search },
  { to: '/brand-comparison', label: 'Comparison', icon: ArrowLeftRight },
  { to: '/trend-analysis', label: 'Trend Tracker', icon: TrendingUp },
  { to: '/ai-assistant', label: 'AI Insights', icon: Bot },
  { to: '/reports-center', label: 'Reports', icon: FileText },
  { to: '/watchlist', label: 'Watchlist', icon: Star },
 
  { to: '/profile', label: 'Profile', icon: UserCircle },
];

export default function Sidebar() {
  return (
    <aside className="bg-ink-900 border-r border-ink-800 w-56 min-h-full hidden md:block">
      <nav className="flex flex-col gap-0.5 p-3">
        <p className="text-ink-400 text-xs font-semibold uppercase tracking-wider px-3 mb-2 mt-1">
          Main Menu
        </p>
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                isActive
                  ? 'bg-primary-600 text-white shadow-glow'
                  : 'text-ink-100 hover:bg-ink-800 hover:text-primary-400'
              }`
            }
          >
            <Icon size={17} />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}