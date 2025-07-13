import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from '/src/utils/axiosConfig.js';
import { useAuth } from '/src/context/AuthContext.jsx';
import LogoHeader from './LogoHeader';

const CropInfo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    cropName: 'Nagpur Mandarin',
    age: '',
    spacing: '',
    bahar: '',
    stress: '50',
  });

  const [farmName, setFarmName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (location.state?.farmData) {
      const { farmData, isEditing } = location.state;
      setFarmName(farmData.farmName);
      setIsEditing(isEditing ?? false);
      localStorage.setItem('activeFarm', JSON.stringify(farmData));

      if (farmData.crop) {
        setFormData({
          cropName: farmData.crop.name || 'Nagpur Mandarin',
          age: farmData.crop.age?.toString() || '',
          spacing: farmData.crop.spacing || '',
          bahar: farmData.crop.bahar || '',
          stress: farmData.crop.stressPeriod?.toString() || '50',
        });
      }
    } else {
      const storedFarm = localStorage.getItem('activeFarm');
      if (storedFarm) {
        const farmData = JSON.parse(storedFarm);
        setFarmName(farmData.farmName);
        if (farmData.crop) {
          setFormData({
            cropName: farmData.crop.name || 'Nagpur Mandarin',
            age: farmData.crop.age?.toString() || '',
            spacing: farmData.crop.spacing || '',
            bahar: farmData.crop.bahar || '',
            stress: farmData.crop.stressPeriod?.toString() || '50',
          });
        }
      }
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const validateForm = () => {
    if (!formData.age) return setError('Please select crop age') || false;
    if (!formData.spacing) return setError('Please select crop spacing') || false;
    if (!formData.bahar) return setError('Please select bahar') || false;
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (!farmName) return setError('Farm not identified - please start from farm registration');

    setIsSubmitting(true);
    setError('');

    try {
      const response = await axios.patch(
        `/farms/${encodeURIComponent(farmName)}/crop`,
        {
          name: formData.cropName,
          age: parseInt(formData.age),
          spacing: formData.spacing,
          bahar: formData.bahar,
          stressPeriod: parseFloat(formData.stress)
        },
        {
          headers: {
            'x-auth-token': user?.token
          }
        }
      );

      navigate('/irrigation-info', {
        state: { farmData: response.data.data, isEditing: true }
      });

      localStorage.setItem('activeFarm', JSON.stringify(response.data.data));
    } catch (err) {
      console.error('Error saving crop info:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Failed to save crop info. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveExit = async () => {
    if (!validateForm()) return;
    if (!farmName) return setError('Farm not identified - please start from farm registration');

    setIsSubmitting(true);
    setError('');

    try {
      const response = await axios.patch(
        `/farms/${encodeURIComponent(farmName)}/crop`,
        {
          name: formData.cropName,
          age: parseInt(formData.age),
          spacing: formData.spacing,
          bahar: formData.bahar,
          stressPeriod: parseFloat(formData.stress)
        },
        {
          headers: {
            'x-auth-token': user?.token
          }
        }
      );

      localStorage.setItem('activeFarm', JSON.stringify(response.data.data));
      navigate('/dashboard');
    } catch (err) {
      console.error('Error saving crop info:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Failed to save crop info. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#828E64] font-sans px-4 py-8">
      <div className="bg-[#D0D9CD] p-8 rounded-lg shadow-md w-full max-w-4xl text-black">
        <LogoHeader />
        <h1 className="text-3xl font-bold text-green-800 mb-2 text-center">{formData.cropName}</h1>
        <h2 className="text-lg text-gray-700 mb-6 font-normal text-center">Irrigation Scheduler</h2>
        <h3 className="text-2xl font-semibold mb-6 text-left text-green-900">Crop Information</h3>

        {!isEditing && (
          <div className="bg-yellow-100 text-yellow-800 font-medium px-4 py-2 rounded mb-4 text-center">
            Viewing in read-only mode
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-green-800 font-semibold mb-1">Crop Name</label>
            <input
              type="text"
              name="cropName"
              value={formData.cropName}
              readOnly
              className="w-full px-4 py-2 border border-gray-300 rounded bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-green-800 font-semibold mb-1">Age of Crop (Years)</label>
            <select
              name="age"
              value={formData.age}
              onChange={handleChange}
              disabled={!isEditing || isSubmitting}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select</option>
              {[...Array(10)].map((_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-green-800 font-semibold mb-1">Crop Spacing</label>
            <select
              name="spacing"
              value={formData.spacing}
              onChange={handleChange}
              disabled={!isEditing || isSubmitting}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select</option>
              <option value="6 X 6">6 X 6</option>
              <option value="5 X 5">5 X 5</option>
              <option value="4 X 4">4 X 4</option>
            </select>
          </div>

          <div>
            <label className="block text-green-800 font-semibold mb-1">Bahar</label>
            <select
              name="bahar"
              value={formData.bahar}
              onChange={handleChange}
              disabled={!isEditing || isSubmitting}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select</option>
              <option value="Ambia">Ambia</option>
              <option value="Mrig">Mrig</option>
              <option value="Hasth Bahar">Hasta</option>
            </select>
          </div>

          <div>
            <label className="block text-green-800 font-semibold mb-1">Stress Period (days)</label>
            <input
              type="text"
              name="stress"
              value={formData.stress}
              readOnly
              className="w-full px-4 py-2 border border-gray-300 rounded bg-gray-100"
            />
          </div>

          {isEditing && (
            <div className="grid grid-cols-2 gap-4 mt-6">
              <button
                type="button"
                className="bg-green-800 hover:bg-green-900 py-3 rounded text-white font-bold w-full disabled:opacity-50"
                onClick={handleSaveExit}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Saving...' : 'Save & Exit'}
              </button>
              <button
                type="submit"
                className="bg-green-800 hover:bg-green-900 py-3 rounded text-white font-bold w-full disabled:opacity-50"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Saving...' : 'Save & Next'}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default CropInfo;
