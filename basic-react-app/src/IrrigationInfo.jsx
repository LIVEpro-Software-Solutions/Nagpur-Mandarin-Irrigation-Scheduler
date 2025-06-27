import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const IrrigationInfo = () => {
  const navigate = useNavigate();
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Irrigation Info:', formData);
    // Logic to handle save or navigation
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#828E64] font-sans px-4 py-8">
      <div className="bg-[#D0D9CD] p-8 rounded-lg shadow-md w-full max-w-4xl text-black">
        <h1 className="text-3xl font-bold text-green-800 mb-2 text-center">Irrigation Scheduler</h1>
        <h2 className="text-lg text-gray-700 mb-6 font-normal text-center">Welcome Satwik Shirpurwar</h2>

        <h3 className="text-2xl font-semibold mb-6 text-left text-green-900">Irrigation Information</h3>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* All existing fields */}
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
                type="text"
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                placeholder={field.label}
                readOnly={field.readOnly}
                className={`w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 ${field.readOnly ? 'bg-gray-100' : 'focus:ring-green-500'}`}
              />
            </div>
          ))}

          {/* Buttons */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <button
              type="button"
              className="bg-green-800 hover:bg-green-900 py-3 rounded text-white font-bold w-full"
            >
              Save & Exit
            </button>
            <button onClick={() => navigate('/dashboard')}
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

export default IrrigationInfo;
