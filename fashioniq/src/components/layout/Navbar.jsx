import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LogOut, User, Menu, X,
  LayoutDashboard, Search, ArrowLeftRight,
  TrendingUp, Bot, FileText, Star, UserCircle
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

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  async function handleLogout() {
  try {
    await logout();
    navigate('/login', { replace: true });
    window.location.href = '/login';
  } catch (error) {
    console.error('Logout failed', error);
  }
}

  return (
    <>
      <nav className="bg-ink-900 border-b border-ink-800 px-4 py-2 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-3">
          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-ink-400 hover:text-white transition p-1"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          {/* Logo */}
          <img src="/logo.png" alt="FashionIQ" className="h-9 w-auto" />
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 text-ink-100">
            <div className="bg-ink-800 p-1.5 rounded-full">
              <User size={15} />
            </div>
            <span className="text-sm font-medium">
              {currentUser?.displayName || currentUser?.email}
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 text-sm text-ink-400 hover:text-primary-500 transition"
          >
            <LogOut size={16} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="md:hidden bg-ink-900 border-b border-ink-800 px-3 py-3 sticky top-[52px] z-10">
          <nav className="flex flex-col gap-0.5">
            {links.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                    isActive
                      ? 'bg-primary-600 text-white'
                      : 'text-ink-100 hover:bg-ink-800 hover:text-primary-400'
                  }`
                }
              >
                <Icon size={17} />
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}