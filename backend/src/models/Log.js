const mongoose = require('mongoose');

const { Schema } = mongoose;

const logSchema = new Schema(
  {
    mensagem: {
      type: String,
      required: true,
      trim: true
    },
    nivel: {
      type: String,
      required: true,
      enum: ['info', 'warning', 'error'],
      default: 'info',
      index: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Log', logSchema);

