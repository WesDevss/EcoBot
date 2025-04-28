import axios from 'axios';
import config from '../config';

const api = axios.create({
  baseURL: config.api.baseUrl,
  timeout: config.api.timeout,
});

// Interceptor para adicionar token nas requisições
api.interceptors.request.use((config) => {
  const token = localStorage.getItem(config.auth.tokenKey);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para tratamento de erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirecionar para login em caso de token inválido
      localStorage.removeItem(config.auth.tokenKey);
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authService = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },
  
  loginWithSocial: async (provider, token) => {
    const response = await api.post(`/auth/${provider}`, { token });
    return response.data;
  },

  logout: () => {
    localStorage.removeItem(config.auth.tokenKey);
    localStorage.removeItem(config.auth.storageKey);
  },

  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  forgotPassword: async (email) => {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  },

  resetPassword: async (token, newPassword) => {
    const response = await api.post('/auth/reset-password', { token, newPassword });
    return response.data;
  },
};

export const metricsService = {
  getDashboardMetrics: async () => {
    const response = await api.get('/metrics/dashboard');
    return response.data;
  },

  getDetailedMetrics: async (params) => {
    const response = await api.get('/metrics/detailed', { params });
    return response.data;
  },

  exportMetrics: async (format, params) => {
    const response = await api.get(`/metrics/export/${format}`, { 
      params,
      responseType: 'blob'
    });
    return response.data;
  },
};

export const suggestionsService = {
  getSuggestions: async (params) => {
    const response = await api.get('/suggestions', { params });
    return response.data;
  },

  createSuggestion: async (data) => {
    const response = await api.post('/suggestions', data);
    return response.data;
  },

  updateSuggestion: async (id, data) => {
    const response = await api.put(`/suggestions/${id}`, data);
    return response.data;
  },

  deleteSuggestion: async (id) => {
    const response = await api.delete(`/suggestions/${id}`);
    return response.data;
  },

  implementSuggestion: async (id) => {
    const response = await api.post(`/suggestions/${id}/implement`);
    return response.data;
  },
};

export const esgService = {
  getESGMetrics: async () => {
    const response = await api.get('/esg/metrics');
    return response.data;
  },

  generateESGReport: async (params) => {
    const response = await api.get('/esg/report', { 
      params,
      responseType: 'blob'
    });
    return response.data;
  },
};

export const chatService = {
  sendMessage: async (message) => {
    const response = await api.post('/chat/message', { message });
    return response.data;
  },

  getHistory: async () => {
    const response = await api.get('/chat/history');
    return response.data;
  },
};

export default api; 