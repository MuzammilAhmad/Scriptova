import axios from 'axios';

// Create a custom axios instance with proper configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8090/api/v1',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});

export default api;