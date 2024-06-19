import axios from 'axios';

const backendApiClient = axios.create({
  baseURL: 'http://localhost:8080/auth',  // URL de tu backend Spring Boot
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

// Interceptor para manejar solicitudes y errores si es necesario
backendApiClient.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token'); // Obtén el token desde el localStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default backendApiClient;
