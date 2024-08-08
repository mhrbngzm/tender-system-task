import React from 'react';
import './assets/css/backend.css';
import './Dashboard.css'; // CSS dosyasını ekleyin

const Dashboard = () => {
  return (
    <div className="card auth-card">
  <div className="card-body p-0">
    <div className="d-flex align-items-center auth-content">
      <div className="col-lg-6 content-left">
        <div className="p-3">
          <h3>Welcome</h3>
        </div>
      </div>
      <div className="col-lg-6 content-right">
        {/* Image or other content here */}
      </div>
    </div>
  </div>
</div>

  );
};

export default Dashboard;
