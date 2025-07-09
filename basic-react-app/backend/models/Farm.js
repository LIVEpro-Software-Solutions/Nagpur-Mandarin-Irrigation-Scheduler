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
    trim: true
  },
  location: {
    latitude: {
      type: Number,
      min: -90,
      max: 90
    },
    longitude: {
      type: Number,
      min: -180,
      max: 180
    },
    elevation: {
      type: Number,
      min: 0
    }
  },
  area: {
    length: {
      type: Number,
      min: 0.1
    },
    width: {
      type: Number,
      min: 0.1
    },
    totalHectares: {
      type: Number,
      min: 0.01
    }
  },
  soil: {
    type: {
      type: String,
      enum: ['Sand', 'Loam', 'Clay']
    },
    waterHoldingCapacity: {
      type: Number,
      min: 0
    },
    drainoutPeriod: {
      type: Number,
      min: 0
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
      max: 50
    },
    spacing: {
      type: String,
      enum: ['6 X 6', '5 X 5', '4 X 4']
    },
    bahar: {
      type: String,
      enum: ['Ambe', 'Mrig', 'Hasta', 'Ambia', 'Mruga', 'Hasth Bahar']
    },
    stressPeriod: {
      type: Number,
      default: 50,
      min: 0
    }
  },
  irrigation: {
    method: {
      type: String,
      enum: ['Drip', 'Sprinkler', 'Flood']
    },
    wettedAreaFactor: {
      type: Number,
      min: 0,
      max: 1
    },
    efficiency: {
      type: Number,
      min: 0,
      max: 1
    },
    lateralGeometry: {
      type: String
    },
    lateralSpacing: {
      type: Number
    },
    emissionUniformity: {
      type: Number,
      min: 0,
      max: 100
    },
    emitterDischarge: {
      type: Number,
      min: 0
    },
    emittersPerPlant: {
      type: Number,
      min: 1
    }
  }
}, {
  timestamps: true // Adds createdAt and updatedAt
});

module.exports = mongoose.model('Farm', FarmSchema);
