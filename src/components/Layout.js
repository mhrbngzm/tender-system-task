import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import './Layout.css'; 

const Layout = ({ children }) => {
  const location = useLocation();
  const hideNavbarAndSidebar = ['/login', '/signup', '/login-success'];

  return (
    <div className="layout-container">
      {!hideNavbarAndSidebar.includes(location.pathname) && <Navbar />}
      <div className="main-container">
        {!hideNavbarAndSidebar.includes(location.pathname) && <Sidebar />}
        <main className="content">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
