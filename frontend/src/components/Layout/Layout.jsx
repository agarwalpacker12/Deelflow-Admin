import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
      <div className="flex">
        {/* Sidebar placeholder */}
        <div className="w-64 bg-black/20 backdrop-blur-md border-r border-white/10 min-h-screen">
          <div className="p-6">
            <h1 className="text-xl font-bold text-white">DealFlow</h1>
          </div>
        </div>
        
        {/* Main content */}
        <div className="flex-1">
          <main className="p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
