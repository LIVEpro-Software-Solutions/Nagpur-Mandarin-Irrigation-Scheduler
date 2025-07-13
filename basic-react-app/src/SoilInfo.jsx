import React, { useState, useEffect } from 'react';
import axios from '/src/utils/axiosConfig';
import { useAuth } from '/src/context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import LogoHeader from './LogoHeader';

const SoilInfo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    soilType: '',
    whc: '',
    drainout: '',
  });

  const [farmName, setFarmName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const farmData = location.state?.farmData;
    if (!farmData) {
      setError('Farm not identified. Please start from farm registration.');
      return;
    }

    setFarmName(farmData.farmName);

    if (farmData.soil) {
      setFormData({
        soilType: farmData.soil.type || '',
        whc: farmData.soil.waterHoldingCapacity?.toString() || '',
        drainout: farmData.soil.drainoutPeriod?.toString() || '',
      });
    }
  }, [location.state]);

  const handleSoilTypeChange = (e) => {
    const selected = e.target.value;
    const soilPresets = {
      Sand: { whc: '120', drainout: '4' },
      Loam: { whc: '150', drainout: '6' },
      Clay: { whc: '180', drainout: '8' }
    };

    setFormData({
      soilType: selected,
      whc: soilPresets[selected]?.whc || '',
      drainout: soilPresets[selected]?.drainout || ''
    });
  };

  const validate = () => {
    if (!formData.soilType) {
      setError('Please select a soil type.');
      return false;
    }
    return true;
  };

  const saveSoilData = async (redirectPath) => {
    if (!validate()) return;

    try {
      setIsSubmitting(true);
      setError('');

      await axios.patch(`/farms/${encodeURIComponent(farmName)}/soil`, {
        type: formData.soilType,
        waterHoldingCapacity: parseFloat(formData.whc),
        drainoutPeriod: parseFloat(formData.drainout)
      });

      navigate(redirectPath, {
        state: {
          farmData: {
            farmName: farmName,
            soil: {
              type: formData.soilType,
              waterHoldingCapacity: formData.whc,
              drainoutPeriod: formData.drainout
            }
          },
          isEditing: true
        }
      });
    } catch (err) {
      console.error('Save error:', err);
      setError(err.response?.data?.message || 'Failed to save soil info.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#828E64] font-sans px-4 py-8">
      <div className="bg-[#D0D9CD] p-6 sm:p-8 rounded-lg shadow-md w-full max-w-3xl text-black">
        <LogoHeader />
        <h2 className="text-center text-xl text-gray-700 mb-4">Irrigation Scheduler</h2>
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
              className="w-full px-4 py-2 border border-gray-300 rounded"
              disabled={isSubmitting}
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
              value={formData.whc}
              readOnly
              className="w-full px-4 py-2 border border-gray-300 rounded bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-purple-800 font-semibold mb-1">Drainout Period (days)</label>
            <input
              type="number"
              value={formData.drainout}
              readOnly
              className="w-full px-4 py-2 border border-gray-300 rounded bg-gray-100"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <button
              type="button"
              onClick={() => saveSoilData('/dashboard')}
              className="bg-orange-600 hover:bg-orange-700 py-3 rounded text-white font-bold"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save & Exit'}
            </button>
            <button
              type="button"
              onClick={() => saveSoilData('/crop-info')}
              className="bg-orange-600 hover:bg-orange-700 py-3 rounded text-white font-bold"
              disabled={isSubmitting}
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
