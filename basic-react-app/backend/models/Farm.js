const mongoose = require('mongoose');

const FarmSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  farmName: {
    type: String,
    required: [true, 'Farm name is required'],
    trim: true,
    unique: false // If user-specific, keep false. If global uniqueness is needed, set to true.
  },
  location: {
    latitude: {
      type: Number,
      min: -90,
      max: 90,
      required: false
    },
    longitude: {
      type: Number,
      min: -180,
      max: 180,
      required: false
    },
    elevation: {
      type: Number,
      min: 0,
      required: false
    }
  },
  area: {
    length: {
      type: Number,
      min: 0.1,
      required: false
    },
    width: {
      type: Number,
      min: 0.1,
      required: false
    },
    totalHectares: {
      type: Number,
      min: 0.01,
      required: false
    }
  },
  soil: {
    type: {
      type: String,
      enum: ['Sand', 'Loam', 'Clay'],
      required: false
    },
    waterHoldingCapacity: {
      type: Number,
      min: 0,
      required: false
    },
    drainoutPeriod: {
      type: Number,
      min: 0,
      required: false
    }
  },
  crop: {
    name: {
      type: String,
      default: 'Nagpur Mandarin'
    },
    age: {
      type: Number,
      min: 1,
      max: 50,
      required: false
    },
    spacing: {
      type: String,
      enum: ['6 X 6', '5 X 5', '4 X 4'],
      required: false
    },
    bahar: {
      type: String,
      enum: ['Ambe', 'Mrig', 'Hasta', 'Ambia', 'Mruga', 'Hasth Bahar'],
      required: false
    },
    stressPeriod: {
      type: Number,
      default: 50,
      min: 0,
      required: false
    }
  },
  irrigation: {
    method: {
      type: String,
      enum: ['Drip', 'Sprinkler', 'Flood'],
      required: false
    },
    wettedAreaFactor: {
      type: Number,
      min: 0,
      max: 1,
      required: false
    },
    efficiency: {
      type: Number,
      min: 0,
      max: 1,
      required: false
    },
    lateralGeometry: {
      type: String,
      required: false
    },
    lateralSpacing: {
      type: Number,
      required: false
    },
    emissionUniformity: {
      type: Number,
      min: 0,
      max: 100,
      required: false
    },
    emitterDischarge: {
      type: Number,
      min: 0,
      required: false
    },
    emittersPerPlant: {
      type: Number,
      min: 1,
      required: false
    }
  }
}, {
  timestamps: true // Automatically includes createdAt and updatedAt
});

module.exports = mongoose.model('Farm', FarmSchema);
