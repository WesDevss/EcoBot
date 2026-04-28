const { fetchAirQualityByLocation, fetchAirQualityByCity, normalizeOpenAQData } = require('../services/openaq.service');
const AirQuality = require('../models/AirQuality');

async function getAirQualityByLocation(req, res) {
  try {
    const { location } = req.params;

    if (!location) {
      return res.status(400).json({ error: 'Parâmetro location é obrigatório' });
    }

    const measurements = await fetchAirQualityByLocation(location);

    res.json({
      location,
      measurements: measurements,
      count: measurements.length
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getAirQualityByCity(req, res) {
  try {
    const { city, country } = req.query;

    if (!city || !country) {
      return res.status(400).json({ error: 'Parâmetros city e country são obrigatórios' });
    }

    const measurements = await fetchAirQualityByCity(city, country);

    res.json({
      city,
      country,
      measurements: measurements,
      count: measurements.length
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function saveAirQualityData(req, res) {
  try {
    const { location, city, country, measurements } = req.body;

    if (!location || !city || !country) {
      return res.status(400).json({ error: 'Campos location, city e country são obrigatórios' });
    }

    const airQuality = await AirQuality.create({
      location,
      country,
      city,
      measurements,
      source: 'OpenAQ'
    });

    res.status(201).json(airQuality);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getStoredAirQuality(req, res) {
  try {
    const { location } = req.params;

    const data = await AirQuality.find({ location })
      .sort({ timestamp: -1 })
      .limit(100);

    res.json({
      location,
      measurements: data,
      count: data.length
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAirQualityByLocation,
  getAirQualityByCity,
  saveAirQualityData,
  getStoredAirQuality
};
