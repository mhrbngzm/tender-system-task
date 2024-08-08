// src/components/Navbar.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './assets/css/backend.css';

const Navbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleSignOut = () => {
    navigate('/login'); // Yönlendirme işlemi
  };

  return (
    <div className="iq-top-navbar">
      <div className="iq-navbar-custom">
        <nav className="navbar navbar-expand-lg navbar-light p-0">
          <div className="iq-navbar-logo d-flex align-items-center justify-content-between">
            <i className="ri-menu-line wrapper-menu"></i>
            <Link to="/" className="header-logo">
              <h4 className="logo-title text-uppercase">GLARE</h4>
            </Link>
          </div>
          <div className="navbar-breadcrumb">
            <h2 className="ml-2">Welcome back</h2>
          </div>
          <div className="d-flex align-items-center">
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-label="Toggle navigation"
            >
              <i className="ri-menu-3-line"></i>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ml-auto navbar-list align-items-center">
                <li className="nav-item nav-icon nav-item-icon dropdown">
                  <button
                    className="search-toggle dropdown-toggle"
                    id="dropdownMenuButton"
                    aria-haspopup="true"
                    aria-expanded={isDropdownOpen}
                    onClick={toggleDropdown}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      height="20px"
                      width="20px"
                    >
                      <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                    </svg>
                    <span className="bg-secondary dots"></span>
                  </button>
                  {isDropdownOpen && (
                    <div
                      className="iq-sub-dropdown dropdown-menu mt-2"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <div className="card mb-0">
                        <div className="card-body">
                          <div className="profile-header">
                            <div className="cover-container text-center">
                              <h5>
                                <Link to="/profile">Profile</Link>
                              </h5>
                              <p>user@example.com</p>
                              <button
                                className="btn btn-primary"
                                onClick={handleSignOut}
                              >
                                Sign Out
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
