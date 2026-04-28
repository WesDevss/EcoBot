const mongoose = require('mongoose');

const { Schema } = mongoose;

const metricSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    consumoEnergia: {
      type: Number,
      default: 0,
      min: 0
    },
    consumoAgua: {
      type: Number,
      default: 0,
      min: 0
    },
    emissaoCarbono: {
      type: Number,
      default: 0,
      min: 0
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Metric', metricSchema);

