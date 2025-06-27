import React, { useState } from 'react';

const CropInfo = () => {
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

  const handleSaveExit = () => {
    console.log('Save & Exit:', formData);
  };

  const handleSaveNext = () => {
    console.log('Save & Next:', formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-700 to-green-300 font-sans text-white flex flex-col items-center px-4 py-8">
      <h1 className="text-3xl font-bold text-center">Nagpur Mandarin</h1>
      <h2 className="text-2xl font-semibold text-center">Irrigation Scheduler</h2>
      <p className="mt-2 mb-6 text-lg text-center">Welcome Satwik Shirpurwar</p>

      <div className="w-full max-w-5xl bg-white rounded-lg shadow-md p-8 text-black">
        <h3 className="text-2xl font-semibold mb-6 text-left text-black">Crop Information</h3>

        <form className="space-y-5">
          {/* Crop Name */}
          <div>
            <label className="block text-purple-800 font-semibold mb-1">Crop Name</label>
            <input
              type="text"
              name="cropName"
              value={formData.cropName}
              readOnly
              className="w-full px-4 py-2 border rounded bg-gray-100"
            />
          </div>

          {/* Age of Crop */}
          <div>
            <label className="block text-purple-800 font-semibold mb-1">Age of Crop (Years)</label>
            <select
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-600"
            >
              <option value="">Select</option>
              {[...Array(10)].map((_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>
          </div>

          {/* Crop Spacing */}
          <div>
            <label className="block text-purple-800 font-semibold mb-1">Crop Spacing</label>
            <select
              name="spacing"
              value={formData.spacing}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-600"
            >
              <option value="">Select</option>
              <option value="6 X 6">6 X 6</option>
              <option value="5 X 5">5 X 5</option>
              <option value="4 X 4">4 X 4</option>
            </select>
          </div>

          {/* Bahar */}
          <div>
            <label className="block text-purple-800 font-semibold mb-1">Bahar</label>
            <select
              name="bahar"
              value={formData.bahar}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-600"
            >
              <option value="">Select</option>
              <option value="Ambia">Ambia</option>
              <option value="Mrig">Mrig</option>
              <option value="Hasth Bahar">Hasth Bahar</option>
            </select>
          </div>

          {/* Stress Period */}
          <div>
            <label className="block text-purple-800 font-semibold mb-1">Stress Period (days)</label>
            <input
              type="text"
              name="stress"
              value={formData.stress}
              readOnly
              className="w-full px-4 py-2 border rounded bg-gray-100"
            />
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <button
              type="button"
              onClick={handleSaveExit}
              className="bg-orange-600 hover:bg-orange-700 py-3 rounded text-white font-bold w-full"
            >
              Save & Exit
            </button>
            <button
              type="button"
              onClick={handleSaveNext}
              className="bg-orange-600 hover:bg-orange-700 py-3 rounded text-white font-bold w-full"
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
