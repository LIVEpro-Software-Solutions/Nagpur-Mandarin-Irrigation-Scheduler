import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '/src/context/AuthContext';
import LogoHeader from './LogoHeader';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#828E64] font-sans px-4 py-8">
      <div className="bg-[#D0D9CD] p-6 sm:p-8 md:p-12 rounded-xl shadow-lg w-full max-w-3xl text-center">

        <LogoHeader/>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-800 mb-2">Nagpur Mandarin</h1>
        <h2 className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-6 font-normal">Irrigation Scheduler</h2>
        <p className="text-gray-800 text-base sm:text-lg md:text-xl mb-8 font-medium">
          Welcome {user?.name || 'User'}
        </p>

        <div className="space-y-4 sm:space-y-5 md:space-y-6 px-2 sm:px-6 md:px-10">
          <button
            onClick={() => navigate('/farm-registration')}
            className="w-full bg-orange-600 hover:bg-orange-700 py-3 sm:py-4 text-sm sm:text-base md:text-lg rounded font-bold text-white"
          >
            Farm Registration
          </button>

          <button
            onClick={() => navigate('/view-edit')}
            className="w-full bg-orange-600 hover:bg-orange-700 py-3 sm:py-4 text-sm sm:text-base md:text-lg rounded font-bold text-white"
          >
            View/Edit Farm
          </button>

          <button
            onClick={() => navigate('/daily-access')}
            className="w-full bg-orange-600 hover:bg-orange-700 py-3 sm:py-4 text-sm sm:text-base md:text-lg rounded font-bold text-white"
          >
            Daily Access
          </button>

          <button
            onClick={() => navigate('/')}
            className="w-full bg-orange-600 hover:bg-orange-700 py-3 sm:py-4 text-sm sm:text-base md:text-lg rounded font-bold text-white"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
