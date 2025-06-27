import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempted with:', { username, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#828E64] font-sans">
      <div className="bg-[#D0D9CD] p-8 rounded-lg shadow-md w-full max-w-md text-center mx-4">
        <h1 className="text-3xl font-bold text-green-800 mb-2">Nagpur Mandarin</h1>
        <h2 className="text-lg text-gray-700 mb-6 font-normal">Irrigation Scheduler</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-6 relative flex justify-center">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
              className="w-3/4 pl-10 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 bg-[url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27555%27%3E%3Cpath d=%27M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z%27/%3E%3C/svg%3E')] bg-no-repeat bg-[10px_center] bg-[20px_20px]"
            />
          </div>

          <div className="mb-6 relative flex justify-center">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-3/4 pl-10 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 bg-[url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27555%27%3E%3Cpath d=%27M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM9 8V6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9z%27/%3E%3C/svg%3E')] bg-no-repeat bg-[10px_center] bg-[20px_20px]"
            />
          </div>

          <button
            type="submit"
            className="w-3/4 py-2 bg-green-800 hover:bg-green-900 text-white rounded font-semibold transition-colors duration-300"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 text-gray-600">
          <p>Already Registered?</p>
          <Link to="/register" className="text-green-800 font-bold hover:underline">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
