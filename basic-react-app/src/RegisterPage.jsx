import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '/src/services/auth.js';
import LogoHeader from './LogoHeader';

function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { name, email, password, password2 } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== password2) {
      setError('Passwords do not match');
      return;
    }

    try {
      await authService.register({ name, email, password });
      navigate('/'); // Redirect to login
    } catch (err) {
      setError(err.response?.data?.msg || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#828E64] font-sans px-4 py-8">
      <div className="bg-[#D0D9CD] p-6 sm:p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <LogoHeader/>
        <h1 className="text-3xl font-bold text-green-800 mb-2">Nagpur Mandarin</h1>
        <h2 className="text-lg text-gray-700 mb-6 font-normal">Irrigation Scheduler</h2>

        {error && <div className="mb-4 text-red-600">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {[
            {
              type: 'text',
              name: 'name',
              placeholder: 'Full Name',
              icon: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'
            },
            {
              type: 'email',
              name: 'email',
              placeholder: 'Email',
              icon: 'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z'
            },
            {
              type: 'password',
              name: 'password',
              placeholder: 'Password',
              icon: 'M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM9 8V6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9z'
            },
            {
              type: 'password',
              name: 'password2',
              placeholder: 'Confirm Password',
              icon: 'M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM9 8V6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9z'
            }
          ].map((field, i) => (
            <div key={i} className="relative flex justify-center">
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                required
                minLength={field.type === 'password' ? 6 : undefined}
                className={`w-3/4 sm:w-4/5 pl-10 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 bg-no-repeat bg-[length:20px_20px] bg-[10px_center]`}
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23555' viewBox='0 0 24 24'%3E%3Cpath d='${field.icon}'/%3E%3C/svg%3E")`
                }}
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-3/4 sm:w-4/5 py-2 bg-green-800 hover:bg-green-900 text-white rounded font-semibold transition-colors duration-300"
          >
            Register
          </button>
        </form>

        <div className="mt-6 text-gray-600">
          <Link to="/" className="text-green-800 font-bold hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
