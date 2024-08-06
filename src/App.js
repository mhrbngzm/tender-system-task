import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import NewOffer from './components/NewOffer';
import OfferList from './components/OfferList';
import OfferDetails from './components/OfferDetails';
import AcquisitionItems from './components/AcquisitionItems'; // Alım Kalemleri bileşenini ekleyin
import Sidebar from './components/Sidebar'; // Menü bileşenini ekleyin
import './App.css'; // Stil dosyasını ekleyin

const Layout = () => {
  const location = useLocation();

  // Menüyü gizlemek istediğimiz sayfalar
  const noSidebarPaths = ['/login', '/signup', '/'];

  const showSidebar = !noSidebarPaths.includes(location.pathname);

  return (
    <div className="app-container">
      {showSidebar && <Sidebar />}
      <div className="content">
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/new-offer" element={<NewOffer />} />
          <Route path="/offers" element={<OfferList />} />
          <Route path="/offers/:id" element={<OfferDetails />} />
          <Route path="/acquisition-items" element={<AcquisitionItems />} />
        </Routes>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
