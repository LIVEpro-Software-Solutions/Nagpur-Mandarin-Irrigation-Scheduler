import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DailyAccess = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    farmName: '',
    etMethod: '',
    dayOfYear: '',
    date: '',
    windSpeed: '',
    sunshineHour: '',
    rainfall: '',
    maxTemp: '',
    minTemp: '',
    maxHumidity: '',
    minHumidity: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log('Submitted:', formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#828E64] font-sans px-4 py-8">
      <div className="bg-[#D0D9CD] p-8 rounded-lg shadow-md w-full max-w-5xl text-black">
        <h1 className="text-3xl font-bold text-green-800 mb-2 text-center">Nagpur Mandarin</h1>
        <h2 className="text-lg text-gray-700 mb-6 font-normal text-center">Irrigation Scheduler</h2>
        <h2 className="text-xl text-center mb-4 font-normal text-gray-700">Welcome Satwik Shirpurwar</h2>
        <h3 className="text-2xl font-bold text-left mb-6 text-green-900">Daily Access</h3>

        <form onSubmit={handleSave} className="space-y-5">
          {/* Top Form */}
          <div>
            <label className="block text-green-800 font-semibold mb-1">Farm Name</label>
            <input
              type="text"
              name="farmName"
              value={formData.farmName}
              onChange={handleChange}
              placeholder="Enter farm name"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-green-800 font-semibold mb-1">ET<sub>r</sub> Calculation Method</label>
            <input
              type="text"
              name="etMethod"
              value={formData.etMethod}
              onChange={handleChange}
              placeholder="e.g., Penman Monteith"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-green-800 font-semibold mb-1">Day of Year</label>
            <input
              type="text"
              name="dayOfYear"
              value={formData.dayOfYear}
              onChange={handleChange}
              placeholder="e.g., 178"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-green-800 font-semibold mb-1">Date</label>
            <input
              type="text"
              name="date"
              value={formData.date}
              onChange={handleChange}
              placeholder="DD/MM/YYYY"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-green-800 font-semibold mb-1">Wind Speed</label>
            <input
              type="text"
              name="windSpeed"
              value={formData.windSpeed}
              onChange={handleChange}
              placeholder="in m/s"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-green-800 font-semibold mb-1">Sunshine Hour</label>
            <input
              type="text"
              name="sunshineHour"
              value={formData.sunshineHour}
              onChange={handleChange}
              placeholder="in hours"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-green-800 font-semibold mb-1">Rainfall (mm)</label>
            <input
              type="text"
              name="rainfall"
              value={formData.rainfall}
              onChange={handleChange}
              placeholder="in millimeters"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Temperature (Max-Min) */}
          <div>
            <label className="block text-purple-800 font-semibold mb-1">Temperature (Max-Min)</label>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="maxTemp"
                value={formData.maxTemp}
                onChange={handleChange}
                placeholder="Max Temperature"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="text"
                name="minTemp"
                value={formData.minTemp}
                onChange={handleChange}
                placeholder="Min Temperature"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          {/* Relative Humidity (Max-Min) */}
          <div>
            <label className="block text-purple-800 font-semibold mb-1">Relative Humidity (Max-Min)</label>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="maxHumidity"
                value={formData.maxHumidity}
                onChange={handleChange}
                placeholder="Max Humidity"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="text"
                name="minHumidity"
                value={formData.minHumidity}
                onChange={handleChange}
                placeholder="Min Humidity"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-2 gap-4 mt-8">
            <button
              type="submit"
              className="bg-orange-600 hover:bg-orange-700 py-3 px-6 rounded text-white font-bold w-full"
            >
              Calculate & Save Water Requirement
            </button>
            <button
              type="button"
              className="bg-orange-600 hover:bg-orange-700 py-3 px-6 rounded text-white font-bold w-full"
              onClick={() => navigate('/dashboard')}
            >
              Dashboard
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DailyAccess;
