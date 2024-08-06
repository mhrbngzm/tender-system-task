import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'; // Menü stil dosyasını ekleyin

const Sidebar = () => {
  return (
    <div className="sidebar">
        <h2>MAIN</h2>
      <ul>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/new-offer">New Offer</Link>
        </li>
        <li>
          <Link to="/offers">Offer List</Link>
        </li>
        <li>
          <Link to="/acquisition-items">Acquisition Items</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
