import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './assets/css/backend.css';
import './Login.css';
import loginImage from './assets/images/login/01.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/login', { email, password });
      alert('Login successful');
      navigate('/dashboard'); 
    } catch (err) {
      setError('Login failed');
    }
  };

  const isFormValid = email !== '' && password !== '';

  return (
    <div className="wrapper">
      <section className="login-content">
        <div className="container">
          <div className="row align-items-center justify-content-center height-self-center">
            <div className="col-lg-8">
              <div className="card auth-card">
                <div className="card-body p-0">
                  <div className="d-flex align-items-center auth-content">
                    <div className="col-lg-6 content-left">
                      <div className="p-3">
                        <h2 className="mb-2">Sign In</h2>
                        <p>Login to your Glare account.</p>
                        {error && <p className="error">{error}</p>}
                        <form onSubmit={handleSubmit}>
                          <div className="floating-label form-group">
                            <input
                              className="floating-input form-control"
                              type="email"
                              placeholder=" "
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                            />
                            <label>Email</label>
                          </div>
                          <div className="floating-label form-group">
                            <input
                              className="floating-input form-control"
                              type="password"
                              placeholder=" "
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              required
                            />
                            <label>Password</label>
                          </div>
                          <button type="submit" className="btn btn-primary" disabled={!isFormValid}>Sign In</button>
                          <p className="mt-3">
                            Don't have an Account? <Link to="/signup" className="text-underline">Sign Up</Link>
                          </p>
                        </form>
                      </div>
                    </div>
                    <div className="col-lg-6 content-right">
                      <img src={loginImage} className="img-fluid image-right" alt="Login" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
