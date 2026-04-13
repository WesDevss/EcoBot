const mongoose = require('mongoose');
const { mongodbUri } = require('./env');

async function connectDatabase() {
  if (!mongodbUri) {
    return;
  }

  if (mongoose.connection.readyState === 1) {
    return;
  }

  await mongoose.connect(mongodbUri);
}

module.exports = {
  connectDatabase
};
