import apiClient from './apiClient';

export async function loginRequest({ email, password }) {
  const response = await apiClient.post('/users/login', {
    email,
    senha: password
  });
  return response.data;
}

export async function registerRequest({ name, email, password }) {
  const response = await apiClient.post('/users/register', {
    name,
    email,
    password
  });
  return response.data;
}

export async function getUserById(id) {
  const response = await apiClient.get(`/users/${id}`);
  return response.data;
}

export async function updateUserProfile(id, payload) {
  const response = await apiClient.put(`/users/${id}/profile`, payload);
  return response.data;
}

export async function updateUserPreferences(id, payload) {
  const response = await apiClient.patch(`/users/${id}/preferences`, payload);
  return response.data;
}
