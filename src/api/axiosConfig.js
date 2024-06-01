import axios from 'axios';

const apiKey = 'b9d0f880d08f6f661a756fd3f73c754e'; // Reemplaza 'TU_API_KEY' con tu clave API real de TMDb

const apiClient = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    "ngrok-skip-browser-warning": "true"
  }
});

// Interceptor para agregar la clave API a cada solicitud
apiClient.interceptors.request.use(config => {
  config.params = config.params || {};
  config.params['api_key'] = apiKey;
  return config;
}, error => {
  return Promise.reject(error);
});

export default apiClient;
