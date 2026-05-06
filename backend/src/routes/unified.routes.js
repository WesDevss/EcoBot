const express = require('express');
const {
  getUnifiedData,
  getUnifiedMetrics,
  getAvailableCities,
  getAvailableMonths
} = require('../controllers/unified.controller');

const router = express.Router();

router.get('/data', getUnifiedData);
router.get('/metrics', getUnifiedMetrics);
router.get('/cities', getAvailableCities);
router.get('/months', getAvailableMonths);

module.exports = router;
