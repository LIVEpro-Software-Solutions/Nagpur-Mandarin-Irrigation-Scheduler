import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from '/src/utils/axiosConfig.js';
import { useAuth } from '/src/context/AuthContext.jsx';
import LogoHeader from './LogoHeader';

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

  // Pre-fill form from location or localStorage
  useEffect(() => {
    let farmData = null;

    if (location.state?.farmData) {
      farmData = location.state.farmData;
      localStorage.setItem('activeFarm', JSON.stringify(farmData));
    } else {
      const stored = localStorage.getItem('activeFarm');
      if (stored) farmData = JSON.parse(stored);
    }

    if (farmData) {
      setFarmName(farmData.farmName);
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
    setError('');
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
        setError(`Please enter a valid number for ${field.replace(/([A-Z])/g, ' $1')}`);
        return false;
      }
    }

    return true;
  };

  const saveIrrigation = async (redirectPath) => {
    if (!validateForm()) return;
    if (!farmName) return setError('Farm not identified - please start from farm registration');

    setIsSubmitting(true);
    setError('');

    try {
      const response = await axios.patch(
        `/farms/${encodeURIComponent(farmName)}/irrigation`,
        {
          method: formData.method,
          wettedAreaFactor: parseFloat(formData.wettedAreaFactor),
          efficiency: parseFloat(formData.conservationFactor),
          lateralGeometry: formData.lateralGeometry,
          lateralSpacing: formData.lateralSpacing ? parseFloat(formData.lateralSpacing) : undefined,
          emissionUniformity: parseFloat(formData.emissionUniformity),
          emitterDischarge: parseFloat(formData.emitterDischarge),
          emittersPerPlant: parseFloat(formData.emitterPerPlant)
        },
        {
          headers: {
            'x-auth-token': user?.token
          }
        }
      );

      localStorage.setItem('activeFarm', JSON.stringify(response.data.data));
      navigate(redirectPath);
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
        <LogoHeader/>
        <h1 className="text-3xl font-bold text-green-800 mb-2 text-center">Irrigation Scheduler</h1>
        <h2 className="text-lg text-gray-700 mb-6 font-normal text-center">Welcome {user?.name || 'User'}</h2>

        <h3 className="text-2xl font-semibold mb-6 text-left text-green-900">Irrigation Information</h3>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={(e) => { e.preventDefault(); saveIrrigation('/dashboard'); }} className="space-y-5">
          {[ 
            { label: 'Irrigation Method', name: 'method', readOnly: true },
            { label: 'Wetted Area Factor', name: 'wettedAreaFactor' },
            { label: 'Irrigation Efficiency (Conservation Factor)', name: 'conservationFactor' },
            { label: 'Lateral Geometry', name: 'lateralGeometry' },
            { label: 'Lateral Spacing', name: 'lateralSpacing' },
            { label: 'Emission Uniformity (%)', name: 'emissionUniformity' },
            { label: 'Emitter Discharge (lph)', name: 'emitterDischarge' },
            { label: 'Emitters Per Plant', name: 'emitterPerPlant' }
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
                step="any"
              />
            </div>
          ))}

          <div className="grid grid-cols-2 gap-4 mt-6">
            <button
              type="button"
              onClick={() => saveIrrigation('/dashboard')}
              className="bg-green-800 hover:bg-green-900 py-3 rounded text-white font-bold w-full disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save & Exit'}
            </button>
            <button
              type="submit"
              className="bg-green-800 hover:bg-green-900 py-3 rounded text-white font-bold w-full disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save & Finish'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IrrigationInfo;
