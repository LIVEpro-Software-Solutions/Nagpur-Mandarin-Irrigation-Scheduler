import React, { useState } from 'react';

const ViewEdit = () => {
  const [selectedFarm, setSelectedFarm] = useState('');

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#828E64] font-sans">
      <div className="bg-[#D0D9CD] p-12 rounded-xl shadow-lg w-full max-w-3xl text-center mx-4">
        <h1 className="text-4xl font-bold text-green-800 mb-2">Farm Registration</h1>
        <p className="text-gray-800 text-xl mb-8 font-medium">Welcome Satwik Shirpurwar</p>

        {/* Farm Dropdown */}
        <div className="text-left mb-8">
          <label htmlFor="farmSelect" className="block text-xl font-bold text-purple-800 mb-2">
            Farm Name
          </label>
          <select
            id="farmSelect"
            value={selectedFarm}
            onChange={(e) => setSelectedFarm(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-600 text-gray-700"
          >
            <option value="">Select Farm</option>
            <option value="Farm A">Farm A</option>
            <option value="Farm B">Farm B</option>
          </select>
        </div>

        {/* Section Buttons */}
        <div className="space-y-6 px-4">
          {['Farm Information', 'Soil Information', 'Crop Information', 'Irrigation Information'].map((label, index) => (
            <button
              key={index}
              className="w-full bg-orange-600 hover:bg-orange-700 py-4 text-lg rounded font-bold text-white"
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewEdit;
