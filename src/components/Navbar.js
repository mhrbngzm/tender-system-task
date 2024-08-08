import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './assets/css/backend.css';

const Navbar = () => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const handleSignOut = () => {
        navigate('/login'); 
    };

    return (
        <div className="iq-top-navbar">
            <nav className="navbar navbar-expand-lg navbar-light p-0">
                <div className="d-flex align-items-center justify-content-between">
                    <h2 className="ml-2">Welcome back</h2>
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
                </div>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item dropdown">
                            <button
                                className="nav-link dropdown-toggle d-flex align-items-center"
                                onClick={toggleDropdown}
                                aria-expanded={isDropdownOpen}
                            >
                                <div className="ml-2">
                                    <h6 className="mb-0">Mason Protesters</h6>
                                </div>
                            </button>
                            {isDropdownOpen && (
                                <div className="dropdown-menu show" aria-labelledby="profileDropdown">
                                    <div className="dropdown-header text-center">
                                        <div className="rounded-circle profile-icon bg-primary mx-auto">M</div>
                                        <h5>Mason Protesters</h5>
                                        <p>mason@gmail.com</p>
                                        <button className="btn btn-primary" onClick={handleSignOut}>
                                            Sign Out
                                        </button>
                                    </div>
                                    <a className="dropdown-item" href="#">Anna Mull</a>
                                    <a className="dropdown-item" href="#">King Poilin</a>
                                    <a className="dropdown-item" href="#">Devid Worner</a>
                                </div>
                            )}
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
