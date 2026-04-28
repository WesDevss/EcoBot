const metrics = require('../data/metrics.data');

function getMetrics(req, res) {
  res.json(metrics);
}

module.exports = {
  getMetrics
};
