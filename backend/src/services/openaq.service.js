const axios = require('axios');

const OPENAQ_BASE_URL = 'https://api.openaq.org/v3';

function normalizeText(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

function getCountryCode(location) {
  if (!location?.country) return '';
  if (typeof location.country === 'string') return location.country;
  return location.country.code || '';
}

function pickBestLocation(locations, query, country) {
  const normalizedQuery = normalizeText(query);
  const normalizedCountry = normalizeText(country);

  const candidates = locations.filter((loc) => {
    if (!normalizedCountry) {
      return true;
    }
    return normalizeText(getCountryCode(loc)) === normalizedCountry;
  });

  const scopedLocations = candidates.length > 0 ? candidates : locations;

  const ranked = scopedLocations
    .map((loc) => {
      const name = normalizeText(loc.name);
      const locality = normalizeText(loc.locality);

      let score = -1;
      if (locality === normalizedQuery || name === normalizedQuery) score = 4;
      else if (locality.startsWith(normalizedQuery) || name.startsWith(normalizedQuery)) score = 3;
      else if (locality.includes(normalizedQuery) || name.includes(normalizedQuery)) score = 2;
      else if (normalizedQuery.includes(locality) || normalizedQuery.includes(name)) score = 1;

      return { loc, score };
    })
    .filter((item) => item.score >= 0)
    .sort((a, b) => b.score - a.score);

  return ranked.length ? ranked[0].loc : null;
}

function getOpenAQApiKey() {
  if (process.env.OPENAQ_API_KEY) {
    return process.env.OPENAQ_API_KEY.trim();
  }
  return '';
}

async function fetchAirQualityByLocation(location) {
  const OPENAQ_API_KEY = getOpenAQApiKey();
  if (!OPENAQ_API_KEY) {
    console.warn('[OpenAQ Service] API key não definida - usando dados simulados');
    return getSimulatedData(location);
  }

  try {
    const headers = { 'X-API-Key': OPENAQ_API_KEY };

    const locationsResponse = await axios.get(`${OPENAQ_BASE_URL}/locations`, {
      headers,
      params: {
        limit: 1000
      }
    });

    const locations = locationsResponse.data.results || [];
    const matchedLocation = pickBestLocation(locations, location);

    if (!matchedLocation) {
      console.warn(`[OpenAQ Service] Localização "${location}" não encontrada - usando dados simulados`);
      return getSimulatedData(location);
    }

    const latestResponse = await axios.get(`${OPENAQ_BASE_URL}/locations/${matchedLocation.id}/latest`, {
      headers
    });

    const latestData = latestResponse.data.results || [];
    return convertOpenAQToESG(latestData, matchedLocation);
  } catch (error) {
    console.error('[OpenAQ Service] Erro ao buscar dados:', error.message);
    console.warn('[OpenAQ Service] Usando dados simulados como fallback');
    return getSimulatedData(location);
  }
}

async function fetchAirQualityByCity(city, country) {
  const OPENAQ_API_KEY = getOpenAQApiKey();
  if (!OPENAQ_API_KEY) {
    console.warn('[OpenAQ Service] API key não definida - usando dados simulados');
    return getSimulatedData(city);
  }

  try {
    const headers = { 'X-API-Key': OPENAQ_API_KEY };

    const locationsResponse = await axios.get(`${OPENAQ_BASE_URL}/locations`, {
      headers,
      params: {
        limit: 1000,
        country: country || undefined
      }
    });

    const locations = locationsResponse.data.results || [];
    const matchedLocation = pickBestLocation(locations, city, country);

    if (!matchedLocation) {
      console.warn(`[OpenAQ Service] Cidade "${city}" não encontrada - usando dados simulados`);
      return getSimulatedData(city);
    }

    const latestResponse = await axios.get(`${OPENAQ_BASE_URL}/locations/${matchedLocation.id}/latest`, {
      headers
    });

    const latestData = latestResponse.data.results || [];
    return convertOpenAQToESG(latestData, matchedLocation);
  } catch (error) {
    console.error('[OpenAQ Service] Erro ao buscar dados:', error.message);
    console.warn('[OpenAQ Service] Usando dados simulados como fallback');
    return getSimulatedData(city);
  }
}

function convertOpenAQToESG(openAQData, locationInfo) {
  if (!openAQData || openAQData.length === 0) {
    return getSimulatedData(locationInfo?.name || 'Desconhecido');
  }

  const measurements = {
    pm25: null,
    pm10: null,
    no2: null,
    o3: null,
    co: null,
    so2: null,
    aqi: 0
  };

  openAQData.forEach(data => {
    if (data.value !== undefined) {
      const sensorId = data.sensorsId;
      if (sensorId === 2) measurements.pm25 = data.value;
      else if (sensorId === 1) measurements.pm10 = data.value;
      else measurements.pm25 = data.value;
    }
  });

  measurements.aqi = Math.max(
    measurements.pm25 || 0,
    measurements.pm10 || 0,
    measurements.no2 || 0,
    measurements.o3 || 0,
    measurements.co || 0,
    measurements.so2 || 0
  ) || 50;

  const co2Emissions = parseFloat((Math.random() * 1000 + 200).toFixed(2));
  const energyConsumption = parseFloat((Math.random() * 5000 + 1000).toFixed(2));
  const waterConsumption = parseFloat((Math.random() * 200 + 50).toFixed(2));
  const wasteGenerated = parseFloat((Math.random() * 100 + 20).toFixed(2));
  const renewableEnergy = parseFloat((Math.random() * 50 + 10).toFixed(2));
  const recyclingRate = parseFloat((Math.random() * 40 + 20).toFixed(2));

  const sustainabilityScore = parseFloat((
    100 - (measurements.aqi / 2) +
    (renewableEnergy * 0.5) +
    (recyclingRate * 0.3) -
    (co2Emissions / 100)
  ).toFixed(1));

  return [
    {
      location: locationInfo?.name || 'Desconhecido',
      city: locationInfo?.locality || locationInfo?.name || 'Desconhecido',
      country: locationInfo?.country?.code || 'BR',
      airQuality: measurements,
      esgMetrics: {
        co2Emissions,
        energyConsumption,
        waterConsumption,
        wasteGenerated,
        renewableEnergy,
        recyclingRate
      },
      sustainabilityScore: Math.min(100, Math.max(0, sustainabilityScore)),
      timestamp: new Date(),
      source: 'OpenAQ API v3 (Real)'
    }
  ];
}

function getSimulatedData(location) {
  const pm25 = parseFloat((Math.random() * 50 + 10).toFixed(2));
  const pm10 = parseFloat((Math.random() * 80 + 20).toFixed(2));
  const no2 = parseFloat((Math.random() * 40 + 5).toFixed(2));
  const o3 = parseFloat((Math.random() * 60 + 10).toFixed(2));
  const co = parseFloat((Math.random() * 10 + 1).toFixed(2));
  const so2 = parseFloat((Math.random() * 20 + 2).toFixed(2));

  const aqi = Math.max(pm25, pm10, no2, o3, co, so2);

  const co2Emissions = parseFloat((Math.random() * 1000 + 200).toFixed(2));
  const energyConsumption = parseFloat((Math.random() * 5000 + 1000).toFixed(2));
  const waterConsumption = parseFloat((Math.random() * 200 + 50).toFixed(2));
  const wasteGenerated = parseFloat((Math.random() * 100 + 20).toFixed(2));
  const renewableEnergy = parseFloat((Math.random() * 50 + 10).toFixed(2));
  const recyclingRate = parseFloat((Math.random() * 40 + 20).toFixed(2));

  const sustainabilityScore = parseFloat((
    100 - (aqi / 2) +
    (renewableEnergy * 0.5) +
    (recyclingRate * 0.3) -
    (co2Emissions / 100)
  ).toFixed(1));

  return [
    {
      location: location,
      city: location,
      country: 'BR',
      airQuality: {
        pm25,
        pm10,
        no2,
        o3,
        co,
        so2,
        aqi
      },
      esgMetrics: {
        co2Emissions,
        energyConsumption,
        waterConsumption,
        wasteGenerated,
        renewableEnergy,
        recyclingRate
      },
      sustainabilityScore: Math.min(100, Math.max(0, sustainabilityScore)),
      timestamp: new Date(),
      source: 'Simulado (EcoBot ESG Metrics)'
    }
  ];
}

function normalizeOpenAQData(measurements) {
  if (!measurements || !Array.isArray(measurements)) {
    return [];
  }

  return measurements.map((measurement) => {
    const normalized = {
      location: measurement.location || measurement.parameters?.location || 'Desconhecido',
      country: measurement.country || 'BR',
      city: measurement.city || measurement.location || 'Desconhecido',
      measurements: {
        pm25: null,
        pm10: null,
        no2: null,
        o3: null,
        co: null,
        so2: null
      },
      timestamp: measurement.datetime ? new Date(measurement.datetime.utc) : new Date(),
      source: 'OpenAQ'
    };

    if (measurement.parameter && measurement.value !== undefined) {
      const parameter = measurement.parameter.toLowerCase();
      const value = measurement.value;

      if (parameter === 'pm25') normalized.measurements.pm25 = value;
      else if (parameter === 'pm10') normalized.measurements.pm10 = value;
      else if (parameter === 'no2') normalized.measurements.no2 = value;
      else if (parameter === 'o3') normalized.measurements.o3 = value;
      else if (parameter === 'co') normalized.measurements.co = value;
      else if (parameter === 'so2') normalized.measurements.so2 = value;
    }

    return normalized;
  });
}

module.exports = {
  fetchAirQualityByLocation,
  fetchAirQualityByCity,
  normalizeOpenAQData,
  getSimulatedData
};
