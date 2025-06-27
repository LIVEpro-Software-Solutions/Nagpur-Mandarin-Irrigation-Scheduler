import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CropInfo = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cropName: 'Nagpur Mandarin',
    age: '',
    spacing: '',
    bahar: '',
    stress: '50',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Crop Info:', formData);
    navigate('/next-page'); // change this route to where you want to go next
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#828E64] font-sans px-4 py-8">
      <div className="bg-[#D0D9CD] p-8 rounded-lg shadow-md w-full max-w-4xl text-black">
        <h1 className="text-3xl font-bold text-green-800 mb-2 text-center">Nagpur Mandarin</h1>
        <h2 className="text-lg text-gray-700 mb-6 font-normal text-center">Irrigation Scheduler</h2>

        <h3 className="text-2xl font-semibold mb-6 text-left text-green-900">Crop Information</h3>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Crop Name */}
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

          {/* Age of Crop */}
          <div>
            <label className="block text-green-800 font-semibold mb-1">Age of Crop (Years)</label>
            <select
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select</option>
              {[...Array(10)].map((_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>
          </div>

          {/* Crop Spacing */}
          <div>
            <label className="block text-green-800 font-semibold mb-1">Crop Spacing</label>
            <select
              name="spacing"
              value={formData.spacing}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select</option>
              <option value="6 X 6">6 X 6</option>
              <option value="5 X 5">6 X 4</option>
              <option value="4 X 4">6 X 3</option>
            </select>
          </div>

          {/* Bahar */}
          <div>
            <label className="block text-green-800 font-semibold mb-1">Bahar</label>
            <select
              name="bahar"
              value={formData.bahar}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select</option>
              <option value="Ambia">Ambia</option>
              <option value="Mrig">Mruga</option>
              <option value="Hasth Bahar">Hasta</option>
            </select>
          </div>

          {/* Stress Period */}
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

          {/* Buttons */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <button
              type="button"
              className="bg-green-800 hover:bg-green-900 py-3 rounded text-white font-bold w-full"
            >
              Save & Exit
            </button>
            <button onClick={() => navigate('/irrigation-info')}
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

export default CropInfo;
