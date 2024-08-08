import React from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate'ı import ettik
import './assets/css/backend.css'; // CSS dosyanızı import edin
import signupImage from './assets/images/login/01.png';
import mailIcon from './assets/images/login/mail.png'; // mail.png'yi import ettik

const SignupSuccess = () => {
  const navigate = useNavigate(); // useNavigate'ı tanımladık

  const handleGoToLogin = () => {
    navigate('/login'); // Butona basıldığında Login sayfasına yönlendirme
  };

  return (
    <div style={{ 
      background: 'url(/assets/images/background.png)', // public dizininden erişim
      backgroundAttachment: 'fixed',
      backgroundSize: 'cover',
      minHeight: '100vh' // Yüksekliği tüm ekranı kaplayacak şekilde ayarlama
    }}>
      <section className="login-content">
        <div className="container">
          <div className="row align-items-center justify-content-center height-self-center">
            <div className="col-lg-8">
              <div className="card auth-card">
                <div className="card-body p-0">
                  <div className="d-flex align-items-center auth-content">
                    <div className="col-lg-6 content-left">
                      <div className="p-3">
                        <img src={mailIcon} className="img-fluid" width="80" alt="Mail Icon" /> {/* Resmi import ettik */}
                        <h2 className="mt-3 mb-0">Success!</h2>
                        <p className="cnf-mail mb-1">
                          Your account has been created successfully. Please proceed to the login page.
                        </p>
                        <div className="d-inline-block w-100">
                          <button onClick={handleGoToLogin} className="btn btn-primary mt-3">Go to Login</button>
                        </div>
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

export default SignupSuccess;
