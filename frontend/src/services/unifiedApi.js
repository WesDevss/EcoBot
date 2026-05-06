import axios from 'axios';
import {
  getCities as getLocalCities,
  getDataForCityAndMonth as getLocalDataForCityAndMonth,
  getMetricsForCity as getLocalMetricsForCity,
  monthOrder
} from '../data/unified.data';

const api = axios.create({
  baseURL: '/api',
  timeout: 10000
});

async function getCities() {
  try {
    const response = await api.get('/unified/cities');
    return response.data;
  } catch (error) {
    return getLocalCities();
  }
}

async function getMonths() {
  try {
    const response = await api.get('/unified/months');
    return response.data;
  } catch (error) {
    return monthOrder;
  }
}

async function getDataForCityAndMonth(city, month) {
  try {
    const params = { city };
    if (month) {
      params.month = month;
    }

    const response = await api.get('/unified/data', { params });
    return response.data;
  } catch (error) {
    return getLocalDataForCityAndMonth(city, month);
  }
}

async function getMetricsForCity(city) {
  try {
    const response = await api.get('/unified/metrics', { params: { city } });
    return response.data;
  } catch (error) {
    return getLocalMetricsForCity(city);
  }
}

export {
  getCities,
  getMonths,
  getDataForCityAndMonth,
  getMetricsForCity
};
