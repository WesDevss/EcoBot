const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    nome: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    senha: {
      type: String,
      required: true
    },
    role: {
      type: String,
      default: 'Usuário'
    },
    avatar: {
      type: String,
      default: '/logo.png'
    },
    joinedDate: {
      type: String,
      default: () => new Date().toLocaleDateString('pt-BR')
    },
    preferences: {
      theme: {
        type: String,
        default: 'light'
      },
      notifications: {
        type: Boolean,
        default: true
      },
      language: {
        type: String,
        default: 'pt-BR'
      }
    }
  },
  {
    timestamps: true
  }
);

userSchema.index({ email: 1 }, { unique: true });

module.exports = mongoose.model('User', userSchema);

