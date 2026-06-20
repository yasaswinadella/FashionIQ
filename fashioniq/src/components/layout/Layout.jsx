import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';

export default function Layout() {
  return (
    <div className="app-container bg-ink-900">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 page-content bg-black">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}