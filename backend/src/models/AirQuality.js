const mongoose = require('mongoose');

const { Schema } = mongoose;

const airQualitySchema = new Schema(
  {
    location: {
      type: String,
      required: true,
      index: true
    },
    country: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    airQuality: {
      pm25: {
        type: Number,
        default: null
      },
      pm10: {
        type: Number,
        default: null
      },
      no2: {
        type: Number,
        default: null
      },
      o3: {
        type: Number,
        default: null
      },
      co: {
        type: Number,
        default: null
      },
      so2: {
        type: Number,
        default: null
      },
      aqi: {
        type: Number,
        default: null
      }
    },
    esgMetrics: {
      co2Emissions: {
        type: Number,
        default: null,
        unit: 'kg'
      },
      energyConsumption: {
        type: Number,
        default: null,
        unit: 'kWh'
      },
      waterConsumption: {
        type: Number,
        default: null,
        unit: 'm³'
      },
      wasteGenerated: {
        type: Number,
        default: null,
        unit: 'kg'
      },
      renewableEnergy: {
        type: Number,
        default: null,
        unit: '%'
      },
      recyclingRate: {
        type: Number,
        default: null,
        unit: '%'
      }
    },
    sustainabilityScore: {
      type: Number,
      default: null,
      min: 0,
      max: 100
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
    source: {
      type: String,
      default: 'OpenAQ'
    }
  },
  {
    timestamps: true
  }
);

airQualitySchema.index({ location: 1, timestamp: -1 });

module.exports = mongoose.model('AirQuality', airQualitySchema);
