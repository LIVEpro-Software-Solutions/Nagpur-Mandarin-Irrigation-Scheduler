const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Farm = require('../models/Farm');

// Helper function to standardize crop bahar values
const standardizeBahar = (bahar) => {
  const mappings = {
    'Ambia': 'Ambe',
    'Mruga': 'Mrig',
    'Hasth Bahar': 'Hasta'
  };
  return mappings[bahar] || bahar;
};

// ================= UPDATED PATCH ROUTES ================= //

// @route   PATCH /api/farms/:farmName/soil
// @desc    Update soil info of a specific farm
// @access  Private
router.patch('/:farmName/soil', auth, async (req, res) => {
  try {
    const { type, waterHoldingCapacity, drainoutPeriod } = req.body;
    
    // Validate input
    if (!type || !['Sand', 'Loam', 'Clay'].includes(type)) {
      return res.status(400).json({ msg: 'Invalid soil type' });
    }
    if (isNaN(waterHoldingCapacity)) {
      return res.status(400).json({ msg: 'Invalid water holding capacity' });
    }
    if (isNaN(drainoutPeriod)) {
      return res.status(400).json({ msg: 'Invalid drainout period' });
    }

    const farm = await Farm.findOneAndUpdate(
      { user: req.user.id, farmName: req.params.farmName },
      {
        $set: {
          'soil.type': type,
          'soil.waterHoldingCapacity': waterHoldingCapacity,
          'soil.drainoutPeriod': drainoutPeriod
        }
      },
      { new: true, runValidators: true }
    );

    if (!farm) return res.status(404).json({ msg: 'Farm not found' });
    res.json({ msg: 'Soil info updated', farm });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PATCH /api/farms/:farmName/crop
// @desc    Update crop info of a specific farm
// @access  Private
router.patch('/:farmName/crop', auth, async (req, res) => {
  try {
    const { name, age, spacing, bahar, stressPeriod } = req.body;
    
    // Validate input
    if (!name) return res.status(400).json({ msg: 'Crop name is required' });
    if (!age || isNaN(age) || age < 1 || age > 50) {
      return res.status(400).json({ msg: 'Invalid crop age (1-50 years)' });
    }
    if (!spacing || !['6 X 6', '5 X 5', '4 X 4'].includes(spacing)) {
      return res.status(400).json({ msg: 'Invalid crop spacing' });
    }
    if (!bahar || !['Ambe', 'Mrig', 'Hasta', 'Ambia', 'Mruga', 'Hasth Bahar'].includes(bahar)) {
      return res.status(400).json({ msg: 'Invalid bahar selection' });
    }
    if (!stressPeriod || isNaN(stressPeriod) || stressPeriod < 0) {
      return res.status(400).json({ msg: 'Invalid stress period' });
    }

    const farm = await Farm.findOneAndUpdate(
      { user: req.user.id, farmName: req.params.farmName },
      {
        $set: {
          'crop.name': name,
          'crop.age': age,
          'crop.spacing': spacing,
          'crop.bahar': standardizeBahar(bahar),
          'crop.stressPeriod': stressPeriod
        }
      },
      { new: true, runValidators: true }
    );

    if (!farm) return res.status(404).json({ msg: 'Farm not found' });
    res.json({ msg: 'Crop info updated', farm });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PATCH /api/farms/:farmName/irrigation
// @desc    Update irrigation info of a specific farm
// @access  Private
router.patch('/:farmName/irrigation', auth, async (req, res) => {
  try {
    const {
      method,
      wettedAreaFactor,
      efficiency,
      emissionUniformity,
      emitterDischarge,
      emittersPerPlant,
      lateralGeometry,
      lateralSpacing
    } = req.body;
    
    // Validate required fields
    if (!method || !['Drip', 'Sprinkler', 'Flood'].includes(method)) {
      return res.status(400).json({ msg: 'Invalid irrigation method' });
    }
    if (wettedAreaFactor === undefined || isNaN(wettedAreaFactor) || wettedAreaFactor < 0 || wettedAreaFactor > 1) {
      return res.status(400).json({ msg: 'Invalid wetted area factor (0-1)' });
    }
    if (efficiency === undefined || isNaN(efficiency) || efficiency < 0 || efficiency > 1) {
      return res.status(400).json({ msg: 'Invalid efficiency (0-1)' });
    }
    if (emissionUniformity === undefined || isNaN(emissionUniformity) || emissionUniformity < 0 || emissionUniformity > 100) {
      return res.status(400).json({ msg: 'Invalid emission uniformity (0-100)' });
    }
    if (emitterDischarge === undefined || isNaN(emitterDischarge) || emitterDischarge < 0) {
      return res.status(400).json({ msg: 'Invalid emitter discharge' });
    }
    if (emittersPerPlant === undefined || isNaN(emittersPerPlant) || emittersPerPlant < 1) {
      return res.status(400).json({ msg: 'Invalid emitters per plant (minimum 1)' });
    }

    const updateData = {
      'irrigation.method': method,
      'irrigation.wettedAreaFactor': wettedAreaFactor,
      'irrigation.efficiency': efficiency,
      'irrigation.emissionUniformity': emissionUniformity,
      'irrigation.emitterDischarge': emitterDischarge,
      'irrigation.emittersPerPlant': emittersPerPlant
    };

    // Optional fields
    if (lateralGeometry) updateData['irrigation.lateralGeometry'] = lateralGeometry;
    if (lateralSpacing) updateData['irrigation.lateralSpacing'] = lateralSpacing;

    const farm = await Farm.findOneAndUpdate(
      { user: req.user.id, farmName: req.params.farmName },
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!farm) {
      return res.status(404).json({ msg: 'Farm not found' });
    }

    res.json({ msg: 'Irrigation info updated', farm });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// ================= POST & GET/DELETE ROUTES ================= //

// @route   POST /api/farms
// @desc    Create or update farm (multi-step form)
// @access  Private
router.post(
  '/',
  [
    auth,
    check('farmName', 'Farm name is required').not().isEmpty().trim(),
    check('location.latitude', 'Valid latitude (-90 to 90) required').isFloat({ min: -90, max: 90 }),
    check('location.longitude', 'Valid longitude (-180 to 180) required').isFloat({ min: -180, max: 180 }),
    check('location.elevation', 'Positive elevation required').isFloat({ min: 0 }),
    check('area.length', 'Positive length required (minimum 0.1m)').isFloat({ min: 0.1 }),
    check('area.width', 'Positive width required (minimum 0.1m)').isFloat({ min: 0.1 }),
    check('area.totalHectares', 'Positive area required (minimum 0.01ha)').isFloat({ min: 0.01 }),
    check('soil.type').optional().isIn(['Sand', 'Loam', 'Clay']),
    check('soil.waterHoldingCapacity').optional().isFloat({ min: 0 }),
    check('soil.drainoutPeriod').optional().isFloat({ min: 0 }),
    check('crop.age').optional().isInt({ min: 1, max: 50 }),
    check('crop.spacing').optional().isIn(['6 X 6', '5 X 5', '4 X 4']),
    check('crop.bahar').optional().isIn(['Ambe', 'Mrig', 'Hasta', 'Ambia', 'Mruga', 'Hasth Bahar']),
    check('crop.stressPeriod').optional().isFloat({ min: 0 }),
    check('irrigation.method').optional().isIn(['Drip', 'Sprinkler', 'Flood']),
    check('irrigation.wettedAreaFactor').optional().isFloat({ min: 0, max: 1 }),
    check('irrigation.efficiency').optional().isFloat({ min: 0, max: 1 }),
    check('irrigation.lateralGeometry').optional().isString(),
    check('irrigation.lateralSpacing').optional().isFloat({ min: 0 }),
    check('irrigation.emissionUniformity').optional().isFloat({ min: 0, max: 100 }),
    check('irrigation.emitterDischarge').optional().isFloat({ min: 0 }),
    check('irrigation.emittersPerPlant').optional().isFloat({ min: 1 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array().map(err => ({
          param: err.param,
          message: err.msg
        }))
      });
    }

    try {
      const { farmName } = req.body;
      const userId = req.user.id;

      if (req.body.crop?.bahar) {
        req.body.crop.bahar = standardizeBahar(req.body.crop.bahar);
      }

      let farm = await Farm.findOne({ user: userId, farmName });

      if (farm) {
        const updateFields = {};

        if (req.body.location) updateFields.location = req.body.location;
        if (req.body.area) updateFields.area = req.body.area;

        if (req.body.soil) {
          updateFields.$set = updateFields.$set || {};
          updateFields.$set['soil'] = {
            ...farm.soil.toObject(),
            ...req.body.soil
          };
        }

        if (req.body.crop) {
          updateFields.$set = updateFields.$set || {};
          updateFields.$set['crop'] = {
            ...farm.crop.toObject(),
            ...req.body.crop
          };
        }

        if (req.body.irrigation) {
          updateFields.$set = updateFields.$set || {};
          updateFields.$set['irrigation'] = {
            ...farm.irrigation.toObject(),
            ...req.body.irrigation
          };
        }

        farm = await Farm.findOneAndUpdate(
          { user: userId, farmName },
          updateFields,
          { new: true, runValidators: true }
        );

        return res.json({
          success: true,
          message: 'Farm updated successfully',
          data: farm
        });
      }

      // Create new farm
      farm = new Farm({
        user: userId,
        farmName,
        ...req.body.location && { location: req.body.location },
        ...req.body.area && { area: req.body.area },
        ...req.body.soil && { soil: req.body.soil },
        ...req.body.crop && { crop: req.body.crop },
        ...req.body.irrigation && { irrigation: req.body.irrigation }
      });

      await farm.save();

      res.status(201).json({
        success: true,
        message: 'Farm created successfully',
        data: farm
      });

    } catch (err) {
      console.error('Farm save error:', err.message);

      if (err.code === 11000) {
        return res.status(400).json({
          success: false,
          message: 'Farm with this name already exists for your account'
        });
      }

      res.status(500).json({
        success: false,
        message: 'Server error'
      });
    }
  }
);

// @route   GET /api/farms
// @desc    Get all farms for current user
router.get('/', auth, async (req, res) => {
  try {
    const farms = await Farm.find({ user: req.user.id })
      .sort({ updatedAt: -1 })
      .select('-__v');

    res.json({
      success: true,
      count: farms.length,
      data: farms
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/farms/:farmName
// @desc    Get farm by name
router.get('/:farmName', auth, async (req, res) => {
  try {
    const farm = await Farm.findOne({
      user: req.user.id,
      farmName: req.params.farmName
    }).select('-__v');

    if (!farm) {
      return res.status(404).json({
        success: false,
        message: 'Farm not found'
      });
    }

    res.json({
      success: true,
      data: farm
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   DELETE /api/farms/:farmName
// @desc    Delete farm
router.delete('/:farmName', auth, async (req, res) => {
  try {
    const farm = await Farm.findOneAndDelete({
      user: req.user.id,
      farmName: req.params.farmName
    });

    if (!farm) {
      return res.status(404).json({
        success: false,
        message: 'Farm not found'
      });
    }

    res.json({
      success: true,
      message: 'Farm deleted successfully'
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;
