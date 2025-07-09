import axios from '/src/utils/axiosConfig.js';

// Constants
const API_URL = '/auth';
const USER_STORAGE_KEY = 'currentUser'; // More descriptive key name

// Register user
const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    
    if (response.data.token) {
      storeUserData(response.data);
    }
    
    return response.data;
  } catch (error) {
    // Handle specific error cases
    if (error.response) {
      // Server responded with error status (4xx, 5xx)
      throw new Error(error.response.data.message || 'Registration failed');
    } else if (error.request) {
      // Request was made but no response received
      throw new Error('Network error - please check your connection');
    } else {
      // Something happened in setting up the request
      throw new Error('Request setup error');
    }
  }
};

// Login user
const login = async (userData) => {
  try {
    const response = await axios.post(API_URL, userData);
    
    if (response.data.token) {
      storeUserData(response.data);
    }
    
    return response.data;
  } catch (error) {
    // Handle specific error cases
    if (error.response?.status === 401) {
      throw new Error('Invalid credentials');
    }
    throw handleApiError(error);
  }
};

// Logout user
const logout = () => {
  localStorage.removeItem(USER_STORAGE_KEY);
  // Optional: Clear axios authorization header
  delete axios.defaults.headers.common['Authorization'];
};

// Get current user from storage
const getCurrentUser = () => {
  const user = localStorage.getItem(USER_STORAGE_KEY);
  return user ? JSON.parse(user) : null;
};

// Set axios auth header if user exists
const initializeAuthState = () => {
  const user = getCurrentUser();
  if (user?.token) {
    setAuthToken(user.token);
  }
};

// Helper function to set auth token
const setAuthToken = (token) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

// Helper function to store user data
const storeUserData = (data) => {
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(data));
  setAuthToken(data.token);
};

// Generic API error handler
const handleApiError = (error) => {
  if (error.response) {
    return new Error(error.response.data.message || 'Request failed');
  } else if (error.request) {
    return new Error('No response from server');
  } else {
    return new Error('Request setup error');
  }
};

const authService = {
  register,
  login,
  logout,
  getCurrentUser,
  initializeAuthState,
  setAuthToken
};

// Initialize auth state when module loads
initializeAuthState();

export default authService;