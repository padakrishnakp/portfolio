// Layout.jsx
import React from 'react';
import Sidebar from './pages/Sidebar';
import Header from './pages/Header';

const Layout = ({ children }) => {
    const notificationCount = 5;
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 bg-gray-200">
        <Header notificationCount={notificationCount} />
        {children}
      </main>
    </div>
  );
};

export default Layout;
