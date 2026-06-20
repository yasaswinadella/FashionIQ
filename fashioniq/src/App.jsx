import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import BrandAnalyzer from './pages/BrandAnalyzer';
import BrandComparison from './pages/BrandComparison';
import TrendAnalysis from './pages/TrendAnalysis';
import ColorIntelligence from './pages/ColorIntelligence';
import BrandIntelligence from './pages/BrandIntelligence';
import AIAssistant from './pages/AIAssistant';
import ReportsCenter from './pages/ReportsCenter';
import Watchlist from './pages/Watchlist';

import Profile from './pages/Profile';

import './App.css';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      

        <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/brand-analyzer" element={<BrandAnalyzer />} />
          <Route path="/brand-comparison" element={<BrandComparison />} />
          <Route path="/trend-analysis" element={<TrendAnalysis />} />
          <Route path="/color-intelligence" element={<ColorIntelligence />} />
          <Route path="/brand-intelligence" element={<BrandIntelligence />} />
          <Route path="/ai-assistant" element={<AIAssistant />} />
          <Route path="/reports-center" element={<ReportsCenter />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;