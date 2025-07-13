import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '/src/context/AuthContext.jsx';

const ViewEdit = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [farms, setFarms] = useState([]);
  const [selectedFarm, setSelectedFarm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFarms = async () => {
      try {
        const res = await axios.get('/api/farms', {
          headers: { 'x-auth-token': user?.token }
        });

        // Check if response has data array (adjust based on your API response structure)
        if (res.data?.data && Array.isArray(res.data.data)) {
          setFarms(res.data.data);
        } else {
          console.warn('Unexpected farm data structure:', res.data);
          setError('Failed to load farm data');
          setFarms([]);
        }
      } catch (err) {
        console.error('Error fetching farms:', err);
        setError('Failed to fetch farms. Please try again.');
        setFarms([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (user?.token) {
      fetchFarms();
    }
  }, [user]);

  const navigateToEdit = (section) => {
    if (!selectedFarm) {
      alert('Please select a farm first');
      return;
    }

    const farmData = farms.find(farm => farm.farmName === selectedFarm);
    if (!farmData) {
      alert('Selected farm data not found');
      return;
    }

    // Map the button labels to actual routes
    const routeMap = {
      'Farm Information': 'farm-registration',
      'Soil Information': 'soil-info',
      'Crop Information': 'crop-info',
      'Irrigation Information': 'irrigation-info'
    };

    const route = routeMap[section];
    if (!route) {
      alert('Invalid section selected');
      return;
    }

    navigate(`/${route}`, {
      state: { 
        farmData,
        isEditing: true 
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#828E64] font-sans">
      <div className="bg-[#D0D9CD] p-12 rounded-xl shadow-lg w-full max-w-3xl text-center mx-4">
        <h1 className="text-4xl font-bold text-green-800 mb-2">Farm Management</h1>
        <p className="text-gray-800 text-xl mb-8 font-medium">Welcome {user?.name || 'User'}</p>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Farm Dropdown */}
        <div className="text-left mb-8">
          <label htmlFor="farmSelect" className="block text-xl font-bold text-purple-800 mb-2">
            Select Farm
          </label>
          <select
            id="farmSelect"
            value={selectedFarm}
            onChange={(e) => setSelectedFarm(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-600 text-gray-700"
            disabled={isLoading || farms.length === 0}
          >
            <option value="">{isLoading ? 'Loading farms...' : 'Select a farm'}</option>
            {farms.length > 0 ? (
              farms.map(farm => (
                <option key={farm._id} value={farm.farmName}>
                  {farm.farmName}
                </option>
              ))
            ) : (
              <option value="" disabled>
                {isLoading ? 'Loading...' : 'No farms available'}
              </option>
            )}
          </select>
        </div>

        {/* Section Buttons */}
        <div className="space-y-6 px-4">
          {['Farm Information', 'Soil Information', 'Crop Information', 'Irrigation Information'].map((label, index) => (
            <button
              key={index}
              className={`w-full bg-orange-600 hover:bg-orange-700 py-4 text-lg rounded font-bold text-white ${
                !selectedFarm ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={() => navigateToEdit(label)}
              disabled={!selectedFarm}
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
