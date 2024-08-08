import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate'ı import ettik
import axios from 'axios';
import './assets/css/backend.css';
import './SignUp.css';
import signupImage from './assets/images/login/01.png'; // Resim yolunu güncelledik

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // useNavigate'ı tanımladık

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    try {
      await axios.post('http://localhost:5000/signup', { email, password, fullName, lastName, phoneNumber });
      navigate('/signup-success'); // Başarılı kayıt sonrası yönlendirme
    } catch (err) {
      setError('Error registering user');
    }
  };

  const isFormValid = email !== '' && password !== '' && confirmPassword !== '' && fullName !== '' && lastName !== '' && phoneNumber !== '';

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
                        <h2 className="mb-2">Sign Up</h2>
                        <p>Create your Glare account.</p>
                        {error && <p className="error">{error}</p>}
                        <form onSubmit={handleSubmit}>
                          <div className="row">
                            <div className="col-lg-6">
                              <div className="floating-label form-group">
                                <input
                                  className="floating-input form-control"
                                  type="text"
                                  placeholder=" "
                                  value={fullName}
                                  onChange={(e) => setFullName(e.target.value)}
                                  required
                                />
                                <label>Full Name</label>
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="floating-label form-group">
                                <input
                                  className="floating-input form-control"
                                  type="text"
                                  placeholder=" "
                                  value={lastName}
                                  onChange={(e) => setLastName(e.target.value)}
                                  required
                                />
                                <label>Last Name</label>
                              </div>
                            </div>
                            <div className="col-lg-6">
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
                            </div>
                            <div className="col-lg-6">
                              <div className="floating-label form-group">
                                <input
                                  className="floating-input form-control"
                                  type="text"
                                  placeholder=" "
                                  value={phoneNumber}
                                  onChange={(e) => setPhoneNumber(e.target.value)}
                                  required
                                />
                                <label>Phone No.</label>
                              </div>
                            </div>
                            <div className="col-xl-6">
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
                            </div>
                            <div className="col-xl-6">
                              <div className="floating-label form-group">
                                <input
                                  className="floating-input form-control"
                                  type="password"
                                  placeholder=" "
                                  value={confirmPassword}
                                  onChange={(e) => setConfirmPassword(e.target.value)}
                                  required
                                />
                                <label>Confirm Password</label>
                              </div>
                            </div>
                            <div className="col-lg-12">
                              <div className="custom-control custom-checkbox mb-3">
                                <input type="checkbox" className="custom-control-input" id="customCheck1" required />
                                <label className="custom-control-label" htmlFor="customCheck1">I agree with the terms of use</label>
                              </div>
                            </div>
                          </div>
                          <button type="submit" className="btn btn-primary" disabled={!isFormValid}>Sign Up</button>
                          <p className="mt-3">
                            Already have an Account? <Link to="/login" className="text-underline">Sign In</Link>
                          </p>
                        </form>
                      </div>
                    </div>
                    <div className="col-lg-6 content-right">
                      <img src={signupImage} className="img-fluid image-right" alt="Signup" />
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

export default SignUp;
