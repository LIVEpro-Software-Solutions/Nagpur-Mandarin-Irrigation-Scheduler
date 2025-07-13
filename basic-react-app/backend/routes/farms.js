// backend/routes/farm.js

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Farm = require('../models/Farm');
const User = require('../models/User');

// @route    POST /api/farms
// @desc     Create a new farm
// @access   Private
router.post('/', auth, async (req, res) => {
  const { farmName, location, area } = req.body;
  const userId = req.user.id;

  try {
    // Check for existing farm name for same user
    const existing = await Farm.findOne({ farmName, user: userId });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Farm with this name already exists' });
    }

    const newFarm = new Farm({
      user: userId,
      farmName,
      location,
      area,
    });

    await newFarm.save();
    res.status(201).json({ success: true, data: newFarm });
  } catch (err) {
    console.error('Create Farm Error:', err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route    GET /api/farms
// @desc     Get all farms for logged in user
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const farms = await Farm.find({ user: req.user.id });
    res.json({ success: true, data: farms });
  } catch (err) {
    console.error('Fetch Farms Error:', err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route    PATCH /api/farms/:farmName
// @desc     Update a farm
// @access   Private
router.patch('/:farmName', auth, async (req, res) => {
  const farmName = decodeURIComponent(req.params.farmName);
  const userId = req.user.id;

  try {
    const farm = await Farm.findOneAndUpdate(
      { farmName, user: userId },
      req.body,
      { new: true }
    );

    if (!farm) {
      return res.status(404).json({ success: false, message: 'Farm not found' });
    }

    res.json({ success: true, data: farm });
  } catch (err) {
    console.error('Update Farm Error:', err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route    PATCH /api/farms/:farmName/soil
// @desc     Update soil info
// @access   Private
router.patch('/:farmName/soil', auth, async (req, res) => {
  const farmName = decodeURIComponent(req.params.farmName);

  try {
    const farm = await Farm.findOneAndUpdate(
      { farmName, user: req.user.id },
      { soil: req.body },
      { new: true }
    );

    if (!farm) {
      return res.status(404).json({ message: 'Farm not found' });
    }

    res.json({ success: true, data: farm });
  } catch (err) {
    console.error('Update Soil Error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route    PATCH /api/farms/:farmName/crop
// @desc     Update crop info
// @access   Private
router.patch('/:farmName/crop', auth, async (req, res) => {
  const farmName = decodeURIComponent(req.params.farmName);
  const { name, age, spacing, bahar, stressPeriod } = req.body;

  try {
    const farm = await Farm.findOne({ farmName, user: req.user.id });
    if (!farm) {
      return res.status(404).json({ message: 'Farm not found' });
    }

    // Validate fields
    if (!name || !age || !spacing || !bahar || stressPeriod === undefined) {
      return res.status(400).json({ message: 'Missing crop fields' });
    }

    // Update crop
    farm.crop = {
      name,
      age,
      spacing,
      bahar,
      stressPeriod,
    };

    await farm.save(); // ✅ ensure .save() is called

    res.json({ success: true, data: farm });
  } catch (err) {
    console.error('Update Crop Error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});



// @route    PATCH /api/farms/:farmName/irrigation
// @desc     Update irrigation info
// @access   Private
router.patch('/:farmName/irrigation', auth, async (req, res) => {
  const farmName = decodeURIComponent(req.params.farmName);

  try {
    // Find the farm by name and user
    const farm = await Farm.findOne({ farmName, user: req.user.id });

    if (!farm) {
      return res.status(404).json({ success: false, message: 'Farm not found' });
    }

    // Validate and assign irrigation fields
    farm.irrigation = {
      method: req.body.method || farm.irrigation?.method || 'Drip',
      wettedAreaFactor: req.body.wettedAreaFactor,
      efficiency: req.body.efficiency,
      lateralGeometry: req.body.lateralGeometry,
      lateralSpacing: req.body.lateralSpacing,
      emissionUniformity: req.body.emissionUniformity,
      emitterDischarge: req.body.emitterDischarge,
      emittersPerPlant: req.body.emittersPerPlant
    };

    // Save changes to DB
    await farm.save();

    res.json({ success: true, data: farm });
  } catch (err) {
    console.error('Update Irrigation Error:', err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
