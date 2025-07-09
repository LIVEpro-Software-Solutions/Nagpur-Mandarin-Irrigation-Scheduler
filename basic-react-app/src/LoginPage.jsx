import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '/src/utils/axiosConfig';
import { useAuth } from '/src/context/AuthContext';

function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Use the auth context login function
      await login({ email, password });
      navigate('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.msg || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#828E64] font-sans px-4 py-8">
      <div className="bg-[#D0D9CD] p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-green-800 mb-2">Nagpur Mandarin</h1>
        <h2 className="text-lg text-gray-700 mb-6 font-normal">Irrigation Scheduler</h2>

        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="text-left">
            <label className="block text-green-800 font-semibold mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="text-left">
            <label className="block text-green-800 font-semibold mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 bg-green-800 text-white rounded font-semibold transition-colors duration-300 ${
              loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-900'
            }`}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 text-gray-600">
          <p>Don't have an account?</p>
          <Link 
            to="/register" 
            className="text-green-800 font-bold hover:underline"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;