const { getCities, getDataForCityAndMonth, getMetricsForCity, monthOrder } = require('../data/unified.data');

function getUnifiedData(req, res) {
  try {
    const { city = 'São Paulo', month } = req.query;

    const cities = getCities();
    const cityNames = cities.map(c => c.name);

    if (!cityNames.includes(city)) {
      return res.status(400).json({ error: `Cidade não encontrada. Disponíveis: ${cityNames.join(', ')}` });
    }

    const data = getDataForCityAndMonth(city, month);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

function getUnifiedMetrics(req, res) {
  try {
    const { city = 'São Paulo' } = req.query;
    const metrics = getMetricsForCity(city);
    if (!metrics) {
      return res.status(400).json({ error: 'Cidade não encontrada' });
    }
    res.json(metrics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

function getAvailableCities(req, res) {
  res.json(getCities());
}

function getAvailableMonths(req, res) {
  res.json(monthOrder);
}

module.exports = {
  getUnifiedData,
  getUnifiedMetrics,
  getAvailableCities,
  getAvailableMonths
};
