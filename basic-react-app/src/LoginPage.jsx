import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempted with:', { username, password });
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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
            />
          </div>
          
          <div className="form-group">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>
          
          <button type="submit" className="login-button">Sign In</button>
        </form>
        
        <div className="register-section">
          <p>Already Registered?</p>
          <Link to="/register" className="register-link">Register</Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;