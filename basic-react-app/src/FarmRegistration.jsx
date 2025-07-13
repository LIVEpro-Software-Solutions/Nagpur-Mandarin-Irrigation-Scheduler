// FarmRegistration.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from '/src/utils/axiosConfig.js';
import { useAuth } from '/src/context/AuthContext.jsx';
import LogoHeader from './LogoHeader';

const FarmRegistration = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const isEditing = location.state?.isEditing || false;
  const farmData = location.state?.farmData;

  const [farmName, setFarmName] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [elevation, setElevation] = useState('');
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [area, setArea] = useState('');

  useEffect(() => {
    if (isEditing && farmData) {
      setFarmName(farmData.farmName || '');
      setLatitude(farmData.location?.latitude || '');
      setLongitude(farmData.location?.longitude || '');
      setElevation(farmData.location?.elevation || '');
      setLength(farmData.area?.length || '');
      setWidth(farmData.area?.width || '');
      setArea(farmData.area?.totalHectares || '');
    }
  }, [isEditing, farmData]);

  useEffect(() => {
    const l = parseFloat(length);
    const w = parseFloat(width);
    if (!isNaN(l) && !isNaN(w)) {
      setArea(((l * w) / 10000).toFixed(2));
    } else {
      setArea('');
    }
  }, [length, width]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const farmPayload = {
      farmName,
      location: {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        elevation: parseFloat(elevation),
      },
      area: {
        length: parseFloat(length),
        width: parseFloat(width),
        totalHectares: parseFloat(area),
      },
    };

    try {
      const res = isEditing
        ? await axios.patch(`/farms/${encodeURIComponent(farmName)}`, farmPayload, {
            headers: { 'x-auth-token': user?.token },
          })
        : await axios.post('/farms', farmPayload, {
            headers: { 'x-auth-token': user?.token },
          });

      const updatedFarm = res.data.data;
      alert(isEditing ? 'Farm updated!' : 'Farm saved!');

      navigate('/soil-info', {
        state: {
          farmData: updatedFarm,
          isEditing: true
        }
      });
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert('Error saving farm.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#828E64] font-sans px-4 py-8">
      <div className="bg-[#D0D9CD] p-6 sm:p-8 rounded-lg shadow-md w-full max-w-4xl text-black">
        <LogoHeader />
        <h1 className="text-2xl sm:text-3xl font-bold text-green-800 mb-2 text-center">Nagpur Mandarin</h1>
        <h2 className="text-md sm:text-lg text-gray-700 mb-6 font-normal text-center">Irrigation Scheduler</h2>

        <h3 className="text-xl sm:text-2xl font-semibold mb-6 text-left text-green-900">
          {isEditing ? 'Edit Farm Information' : 'Farm Registration'}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-green-800 font-semibold mb-1">Farm Name</label>
            <input
              type="text"
              placeholder="Farm name"
              value={farmName}
              onChange={(e) => setFarmName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              readOnly={isEditing}
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
            <label className="block text-green-800 font-semibold mb-1">Elevation (in meters)</label>
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
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <button
              type="button"
              className="bg-green-800 hover:bg-green-900 py-3 rounded text-white font-bold w-full"
              onClick={() => navigate('/view-edit')}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-800 hover:bg-green-900 py-3 rounded text-white font-bold w-full"
            >
              {isEditing ? 'Update & Next' : 'Save & Next'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FarmRegistration;
