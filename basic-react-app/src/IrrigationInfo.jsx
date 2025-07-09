import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from '/src/utils/axiosConfig.js';
import { useAuth } from '/src/context/AuthContext.jsx';

const IrrigationInfo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    method: 'Drip',
    wettedAreaFactor: '',
    conservationFactor: '',
    lateralGeometry: '',
    lateralSpacing: '',
    emissionUniformity: '',
    emitterDischarge: '',
    emitterPerPlant: ''
  });
  const [farmName, setFarmName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Load existing data if coming from edit flow
  useEffect(() => {
    if (location.state?.farmData) {
      const { farmData } = location.state;
      setFarmName(farmData.farmName);
      
      // Pre-fill form if editing existing data
      if (farmData.irrigation) {
        setFormData({
          method: farmData.irrigation.method || 'Drip',
          wettedAreaFactor: farmData.irrigation.wettedAreaFactor?.toString() || '',
          conservationFactor: farmData.irrigation.efficiency?.toString() || '',
          lateralGeometry: farmData.irrigation.lateralGeometry || '',
          lateralSpacing: farmData.irrigation.lateralSpacing?.toString() || '',
          emissionUniformity: farmData.irrigation.emissionUniformity?.toString() || '',
          emitterDischarge: farmData.irrigation.emitterDischarge?.toString() || '',
          emitterPerPlant: farmData.irrigation.emittersPerPlant?.toString() || ''
        });
      }
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(''); // Clear error when user changes input
  };

  const validateForm = () => {
    const requiredFields = [
      'wettedAreaFactor',
      'conservationFactor',
      'emissionUniformity',
      'emitterDischarge',
      'emitterPerPlant'
    ];

    for (const field of requiredFields) {
      if (!formData[field] || isNaN(parseFloat(formData[field]))) {
        setError(`Please enter a valid number for ${field.replace(/([A-Z])/g, ' $1').trim()}`);
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    if (!farmName) {
      setError('Farm not identified - please start from farm registration');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      await axios.patch(
        `/api/farms/${encodeURIComponent(farmName)}/irrigation`,
        {
          method: formData.method,
          wettedAreaFactor: parseFloat(formData.wettedAreaFactor),
          efficiency: parseFloat(formData.conservationFactor),
          emissionUniformity: parseFloat(formData.emissionUniformity),
          emitterDischarge: parseFloat(formData.emitterDischarge),
          emittersPerPlant: parseFloat(formData.emitterPerPlant),
          lateralGeometry: formData.lateralGeometry,
          lateralSpacing: formData.lateralSpacing ? parseFloat(formData.lateralSpacing) : undefined
        },
        {
          headers: {
            'x-auth-token': user?.token
          }
        }
      );
      navigate('/dashboard');
    } catch (err) {
      console.error('Error saving irrigation info:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Failed to save irrigation info. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveExit = async () => {
    if (!validateForm()) return;
    if (!farmName) {
      setError('Farm not identified - please start from farm registration');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      await axios.patch(
        `/api/farms/${encodeURIComponent(farmName)}/irrigation`,
        {
          method: formData.method,
          wettedAreaFactor: parseFloat(formData.wettedAreaFactor),
          efficiency: parseFloat(formData.conservationFactor),
          emissionUniformity: parseFloat(formData.emissionUniformity),
          emitterDischarge: parseFloat(formData.emitterDischarge),
          emittersPerPlant: parseFloat(formData.emitterPerPlant),
          lateralGeometry: formData.lateralGeometry,
          lateralSpacing: formData.lateralSpacing ? parseFloat(formData.lateralSpacing) : undefined
        },
        {
          headers: {
            'x-auth-token': user?.token
          }
        }
      );
      navigate('/dashboard');
    } catch (err) {
      console.error('Error saving irrigation info:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Failed to save irrigation info. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#828E64] font-sans px-4 py-8">
      <div className="bg-[#D0D9CD] p-8 rounded-lg shadow-md w-full max-w-4xl text-black">
        <h1 className="text-3xl font-bold text-green-800 mb-2 text-center">Irrigation Scheduler</h1>
        <h2 className="text-lg text-gray-700 mb-6 font-normal text-center">Welcome {user?.name || 'User'}</h2>

        <h3 className="text-2xl font-semibold mb-6 text-left text-green-900">Irrigation Information</h3>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {[
            { label: 'Irrigation Method', name: 'method', readOnly: true },
            { label: 'Wetted Area Factor', name: 'wettedAreaFactor' },
            { label: 'Wetted Conservation Factor (Irrigation Efficiency)', name: 'conservationFactor' },
            { label: 'Lateral Geometry', name: 'lateralGeometry' },
            { label: 'Lateral Spacing', name: 'lateralSpacing' },
            { label: 'Emission Uniformity (%)', name: 'emissionUniformity' },
            { label: 'Emitter Discharge (lph)', name: 'emitterDischarge' },
            { label: 'Emitter Per Plant', name: 'emitterPerPlant' }
          ].map((field, idx) => (
            <div key={idx}>
              <label className="block text-green-800 font-semibold mb-1">{field.label}</label>
              <input
                type={field.readOnly ? 'text' : 'number'}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                placeholder={field.label}
                readOnly={field.readOnly}
                className={`w-full px-4 py-2 border ${error.includes(field.label) ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring-2 ${field.readOnly ? 'bg-gray-100' : 'focus:ring-green-500'}`}
                step={field.name.includes('Factor') || field.name.includes('Uniformity') ? '0.01' : '1'}
              />
            </div>
          ))}

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
        </form>
      </div>
    </div>
  );
};

export default IrrigationInfo;