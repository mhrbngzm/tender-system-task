import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/Login';
import SignupSuccess from './components/SignupSuccess'; 
import Dashboard from './components/Dashboard';
import NewOffer from './components/NewOffer';
import OfferDetails from './components/OfferDetails';
import OfferList from './components/OfferList';
import AcquisitionItems from './components/AcquisitionItems';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import backgroundImage from './components/assets/images/background.png';

const Layout = ({ children }) => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/signup-success';

  const layoutStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundAttachment: 'fixed',
    backgroundSize: 'cover',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  };

  return (
    <div style={layoutStyle}>
      {!isAuthPage && <Navbar />}
      <div style={{ display: 'flex', flexGrow: 1 }}>
        {!isAuthPage && <Sidebar />}
        <main style={{ flexGrow: 1, padding: '20px' }}>
          {children}
        </main>
      </div>
    </div>
  );
};

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Layout><Dashboard /></Layout>} />
      <Route path="/signup" element={<Layout><SignUp /></Layout>} />
      <Route path="/login" element={<Layout><Login /></Layout>} />
      <Route path="/signup-success" element={<Layout><SignupSuccess /></Layout>} />
      <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
      <Route path="/new-offer" element={<Layout><NewOffer /></Layout>} />
      <Route path="/offers/:id" element={<Layout><OfferDetails /></Layout>} />
      <Route path="/offers" element={<Layout><OfferList /></Layout>} />
      <Route path="/acquisition-items" element={<Layout><AcquisitionItems /></Layout>} />
    </Routes>
  </Router>
);

export default App;
