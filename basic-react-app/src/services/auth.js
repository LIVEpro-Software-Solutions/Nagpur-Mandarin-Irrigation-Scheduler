import axios from '/src/utils/axiosConfig.js';

const API_URL = '/auth';

// Register user
const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  
  if (response.data.token) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  
  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL, userData);
  
  if (response.data.token) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  
  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem('user');
};

const authService = {
  register,
  login,
  logout
};

export default authService;