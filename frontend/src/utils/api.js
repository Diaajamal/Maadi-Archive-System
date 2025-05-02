// src/utils/api.js
import axios from 'axios';

const backendHost = window.location.hostname;
const BASE_URL = `http://${backendHost}:8083/`;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    // You can add authentication headers here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle global errors here
    const message = error.response?.data?.message || 'حدث خطأ، الرجاء المحاولة مرة أخرى';
    console.error('API Error:', message);
    return Promise.reject(error);
  }
);

export default api;
