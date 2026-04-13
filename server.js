const app = require('./backend/src/app');
const { connectDatabase } = require('./backend/src/config/database');

let isConnected = false;

module.exports = async (req, res) => {
  if (!isConnected) {
    await connectDatabase();
    isConnected = true;
  }

  return app(req, res);
};