import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './assets/css/backend.css';
import './Sidebar.css'; 
import logo from './assets/images/logo.png';

const Sidebar = () => {
    const location = useLocation();
    const hideSidebar = ['/login', '/signup'].includes(location.pathname);

    return (
        !hideSidebar && (
            <div className="iq-sidebar sidebar-default">
                <div className="iq-sidebar-logo d-flex align-items-center">
                    <Link to="/" className="header-logo">
                    <img src={logo} alt="logo" />
                        <h2 className="light-logo">GLARE</h2>
                    </Link>
                    <div className="iq-menu-bt-sidebar ml-0">
                        <i className="las la-bars wrapper-menu"></i>
                    </div>
                </div>
                <div className="data-scrollbar" data-scroll="1">
                    <nav className="iq-sidebar-menu">
                        <h6 className="sidebar-text text-uppercase">Main</h6>
                        <ul id="iq-sidebar-toggle" className="iq-menu">
                            <li className={location.pathname === '/dashboard' ? 'active' : ''}>
                                <Link to="/dashboard" className="svg-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" width="20" height="20">
                                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                                    </svg>
                                    <span className="ml-3">Home Page</span>
                                </Link>
                            </li>
                            <li className={location.pathname === '/new-offer' ? 'active' : ''}>
                                <Link to="/new-offer" className="svg-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" width="20" height="20">
                                        <path d="M9 2a1 1 0 00-1 1v6H3a1 1 0 00-1 1v7a1 1 0 001 1h11a1 1 0 001-1v-7a1 1 0 00-1-1H10V3a1 1 0 00-1-1zM4 10h5v7H4v-7zM8 4h2v5H8V4z" />
                                    </svg>
                                    <span className="ml-3">New Offer</span>
                                </Link>
                            </li>
                            <li className={location.pathname === '/offers' ? 'active' : ''}>
                                <Link to="/offers" className="svg-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" width="20" height="20">
                                        <path d="M3 4a1 1 0 00-1 1v12a1 1 0 001 1h14a1 1 0 001-1V5a1 1 0 00-1-1H3zm0 2h14v11H3V6zm1 2v2h12V8H4zm0 4v2h12v-2H4z" />
                                    </svg>
                                    <span className="ml-3">Offer List</span>
                                </Link>
                            </li>
                            <li className={location.pathname === '/acquisition-items' ? 'active' : ''}>
                                <Link to="/acquisition-items" className="svg-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" width="20" height="20">
                                        <path d="M4 2a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V3a1 1 0 00-1-1H4zM3 4h14v12H3V4zm2 4h10v2H5v-2z" />
                                    </svg>
                                    <span className="ml-3">Acquisition Items</span>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        )
    );
}

export default Sidebar;
