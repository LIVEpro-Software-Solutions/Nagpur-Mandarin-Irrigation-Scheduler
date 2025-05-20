import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.css'; // Reusing the same CSS

function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Registration data:', formData);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="app-title">Nagpur Mandarin</h1>
        <h2 className="app-subtitle">Irrigation Scheduler</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              required
            />
          </div>
          
          <div className="form-group">
            <input
              type="tel"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              placeholder="Mobile Number"
              required
            />
          </div>
          
          <div className="form-group">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              required
            />
          </div>
          
          <div className="form-group">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
          </div>
          
          <button type="submit" className="login-button">Register</button>
        </form>
        
        <div className="register-section">
          <Link to="/" className="register-link">Back to Login</Link>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;