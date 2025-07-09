import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '/src/context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#828E64] font-sans">
      <div className="bg-[#D0D9CD] p-12 rounded-xl shadow-lg w-full max-w-3xl text-center mx-4">
        <h1 className="text-4xl font-bold text-green-800 mb-2">Nagpur Mandarin</h1>
        <h2 className="text-2xl text-gray-700 mb-6 font-normal">Irrigation Scheduler</h2>
        <p className="text-gray-800 text-xl mb-8 font-medium">
          Welcome {user?.name || 'User'}
        </p>

        <div className="space-y-6 px-10">
          <button
            onClick={() => navigate('/farmregistration')}
            className="w-full bg-orange-600 hover:bg-orange-700 py-4 text-lg rounded font-bold text-white"
          >
            Farm Registration
          </button>

          <button
            onClick={() => navigate('/view-edit')}
            className="w-full bg-orange-600 hover:bg-orange-700 py-4 text-lg rounded font-bold text-white"
          >
            View/Edit Farm
          </button>

          <button
            onClick={() => navigate('/daily-access')}
            className="w-full bg-orange-600 hover:bg-orange-700 py-4 text-lg rounded font-bold text-white"
          >
            Daily Access
          </button>

          <button
            onClick={() => navigate('/')}
            className="w-full bg-orange-600 hover:bg-orange-700 py-4 text-lg rounded font-bold text-white"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
