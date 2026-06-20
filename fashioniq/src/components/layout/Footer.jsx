import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 px-6 py-3 text-center text-sm text-gray-400">
      © {new Date().getFullYear()} FashionIQ. All rights reserved.
    </footer>
  );
}