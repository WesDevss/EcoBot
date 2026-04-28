const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const app = require('./backend/src/app');
const { connectDatabase } = require('./backend/src/config/db');

let isConnected = false;

module.exports = async (req, res) => {
  if (!isConnected) {
    await connectDatabase();
    isConnected = true;
  }

  return app(req, res);
};