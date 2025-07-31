import React from 'react';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      <h1>Welcome To NED University</h1>
      <div className="center-button">
        <button className="register-btn" onClick={() => navigate('/register')}>
          Register Now
        </button>
      </div>
    </div>
  );
};

export default Welcome;
