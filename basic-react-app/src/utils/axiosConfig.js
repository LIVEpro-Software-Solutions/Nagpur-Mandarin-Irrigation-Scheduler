import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Add a request interceptor to include the auth token
instance.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user'));
  
  if (user && user.token) {
    config.headers['x-auth-token'] = user.token;
  }
  
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default instance;