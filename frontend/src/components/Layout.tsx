import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="min-h-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout; 