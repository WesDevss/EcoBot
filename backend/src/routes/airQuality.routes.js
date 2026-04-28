const express = require('express');
const {
  getAirQualityByLocation,
  getAirQualityByCity,
  saveAirQualityData,
  getStoredAirQuality
} = require('../controllers/airQuality.controller');

const router = express.Router();

router.get('/location/:location', getAirQualityByLocation);
router.get('/city', getAirQualityByCity);
router.post('/', saveAirQualityData);
router.get('/stored/:location', getStoredAirQuality);

module.exports = router;
