import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter> {/* ✅ This is the only <BrowserRouter> you need */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
);
