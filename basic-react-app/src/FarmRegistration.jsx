import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '/src/utils/axiosConfig.js'; // Your configured Axios instance
import { useAuth } from '/src/context/AuthContext.jsx';

const FarmRegistration = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // Get user and token from context

  const [farmName, setFarmName] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [elevation, setElevation] = useState('');
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [area, setArea] = useState('');

  useEffect(() => {
    const l = parseFloat(length);
    const w = parseFloat(width);
    if (!isNaN(l) && !isNaN(w)) {
      setArea(((l * w) / 10000).toFixed(2)); // Convert to hectares
    } else {
      setArea('');
    }
  }, [length, width]);

// FarmRegistration.jsx - Update handleSubmit
const handleSubmit = async (e) => {
  e.preventDefault();

  // Basic client-side validation
  if (!farmName || !latitude || !longitude || !elevation || !length || !width) {
    alert('Please fill all required fields');
    return;
  }

  const farmData = {
    farmName,
    location: {
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      elevation: parseFloat(elevation)
    },
    area: {
      length: parseFloat(length),
      width: parseFloat(width),
      totalHectares: parseFloat(area)
    },
    soil: {}, // Initialize empty soil object
    crop: {}, // Initialize empty crop object
    irrigation: {} // Initialize empty irrigation object
  };

  try {
    await axios.post('/farms', farmData, {
      headers: {
        'x-auth-token': user?.token
      }
    });
    navigate('/soil-info');
  } catch (err) {
    console.error('Error:', err.response?.data || err.message);
    alert(`Error: ${err.response?.data?.msg || 'Failed to save farm'}`);
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-[#828E64] font-sans px-4 py-8">
      <div className="bg-[#D0D9CD] p-8 rounded-lg shadow-md w-full max-w-4xl text-black">
        <h1 className="text-3xl font-bold text-green-800 mb-2 text-center">Nagpur Mandarin</h1>
        <h2 className="text-lg text-gray-700 mb-6 font-normal text-center">Irrigation Scheduler</h2>

        <h3 className="text-2xl font-semibold mb-6 text-left text-green-900">Farm Registration</h3>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-green-800 font-semibold mb-1">Farm Name</label>
            <input
              type="text"
              placeholder="Farm name"
              value={farmName}
              onChange={(e) => setFarmName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-green-800 font-semibold mb-1">Latitude</label>
            <input
              type="text"
              placeholder="Latitude"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-green-800 font-semibold mb-1">Longitude</label>
            <input
              type="text"
              placeholder="Longitude"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-green-800 font-semibold mb-1">Elevation of Location (in meters)</label>
            <input
              type="text"
              placeholder="Elevation"
              value={elevation}
              onChange={(e) => setElevation(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-green-800 font-semibold mb-1">Total Area of Farm (in Ha.)</label>
            <div className="grid grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Length in meters"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
              <input
                type="text"
                placeholder="Width in meters"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
              <input
                type="text"
                placeholder="Total area in Hectares"
                value={area}
                readOnly
                className="px-4 py-2 border border-gray-300 rounded bg-gray-100"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <button
              type="button"
              className="bg-green-800 hover:bg-green-900 py-3 rounded text-white font-bold w-full"
            >
              Save & Exit
            </button>
            <button
              type="submit"
              className="bg-green-800 hover:bg-green-900 py-3 rounded text-white font-bold w-full"
            >
              Save & Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FarmRegistration;
