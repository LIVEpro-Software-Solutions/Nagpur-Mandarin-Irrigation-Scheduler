import React, { useState, useEffect } from 'react';
import axios from '/src/utils/axiosConfig';
import { useAuth } from '/src/context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

const SoilInfo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    soilType: '',
    whc: '',
    drainout: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [farmName, setFarmName] = useState('');

  // Get farm data when component mounts
  useEffect(() => {
    if (!location.state?.farmData) {
      setError('Farm not identified - please start from farm registration');
      return;
    }

    const { farmData } = location.state;
    setFarmName(farmData.farmName);
    
    // Pre-fill form if editing existing data
    if (farmData.soil) {
      setFormData({
        soilType: farmData.soil.type || '',
        whc: farmData.soil.waterHoldingCapacity?.toString() || '',
        drainout: farmData.soil.drainoutPeriod?.toString() || '',
      });
    }
  }, [location.state]);

  const handleSoilTypeChange = (e) => {
    const selectedSoil = e.target.value;
    setError('');

    // Set default values based on soil type
    const soilDefaults = {
      'Sand': { whc: '120', drainout: '4' },
      'Loam': { whc: '150', drainout: '6' },
      'Clay': { whc: '180', drainout: '8' }
    };

    setFormData({
      soilType: selectedSoil,
      whc: selectedSoil ? soilDefaults[selectedSoil]?.whc || '' : '',
      drainout: selectedSoil ? soilDefaults[selectedSoil]?.drainout || '' : ''
    });
  };

  const validateForm = () => {
    if (!formData.soilType) {
      setError('Please select a soil type');
      return false;
    }
    return true;
  };

  const saveSoilData = async (redirectPath) => {
    if (!validateForm()) return;
    if (!farmName) {
      setError('Farm not identified - please start from farm registration');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      await axios.patch(
        `/api/farms/${encodeURIComponent(farmName)}/soil`,
        {
          type: formData.soilType,
          waterHoldingCapacity: parseFloat(formData.whc),
          drainoutPeriod: parseFloat(formData.drainout)
        },
        {
          headers: {
            'x-auth-token': user?.token,
            'Content-Type': 'application/json'
          }
        }
      );
      navigate(redirectPath);
    } catch (err) {
      console.error('Error saving soil:', err);
      const errorMsg = err.response?.data?.message || 
                      err.message || 
                      'Failed to save soil info. Please try again.';
      setError(errorMsg);
      
      // If 404, suggest creating farm first
      if (err.response?.status === 404) {
        setError('Farm not found. Please register the farm first.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveNext = () => saveSoilData('/crop-info');
  const handleSaveExit = () => saveSoilData('/dashboard');

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#828E64] font-sans px-4 py-8">
      <div className="bg-[#D0D9CD] p-8 rounded-lg shadow-md w-full max-w-4xl text-black">
        <h2 className="text-xl text-center mb-2 font-normal text-gray-700">Irrigation Scheduler</h2>
        <h3 className="text-md text-center mb-6 text-white font-semibold">Welcome {user?.name || 'User'}</h3>
        <h3 className="text-2xl font-bold text-left mb-6 text-black">Soil Information</h3>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form className="space-y-5">
          <div>
            <label className="block text-purple-800 font-semibold mb-1">Soil Type *</label>
            <select
              name="soilType"
              value={formData.soilType}
              onChange={handleSoilTypeChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-600"
              disabled={isSubmitting}
              required
            >
              <option value="">Select Soil Type</option>
              <option value="Sand">Sand</option>
              <option value="Loam">Loam</option>
              <option value="Clay">Clay</option>
            </select>
          </div>

          <div>
            <label className="block text-purple-800 font-semibold mb-1">Water Holding Capacity (mm/m)</label>
            <input
              type="number"
              name="whc"
              value={formData.whc}
              onChange={(e) => setFormData({...formData, whc: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded bg-gray-100"
              readOnly
            />
          </div>

          <div>
            <label className="block text-purple-800 font-semibold mb-1">Drainout Period (days)</label>
            <input
              type="number"
              name="drainout"
              value={formData.drainout}
              onChange={(e) => setFormData({...formData, drainout: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded bg-gray-100"
              readOnly
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <button
              type="button"
              onClick={handleSaveExit}
              className="bg-orange-600 hover:bg-orange-700 py-3 rounded text-white font-bold w-full disabled:opacity-50"
              disabled={isSubmitting || !formData.soilType}
            >
              {isSubmitting ? 'Saving...' : 'Save & Exit'}
            </button>
            <button
              type="button"
              onClick={handleSaveNext}
              className="bg-orange-600 hover:bg-orange-700 py-3 rounded text-white font-bold w-full disabled:opacity-50"
              disabled={isSubmitting || !formData.soilType}
            >
              {isSubmitting ? 'Saving...' : 'Save & Next'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SoilInfo;