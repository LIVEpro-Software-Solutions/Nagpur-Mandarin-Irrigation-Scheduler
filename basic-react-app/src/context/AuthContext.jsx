import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '/src/utils/axiosConfig.js';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          // Verify token is still valid
          await axios.get('/auth/verify');
          setUser(parsedUser);
        } catch (err) {
          localStorage.removeItem('user');
        }
      }
      setLoading(false);
    };
    loadUser();
  }, []);

  // In your AuthContext.jsx
const login = async (credentials) => {
  try {
    const response = await axios.post('/auth', credentials);
    const { token, user } = response.data;
    
    if (token) {
      const userData = { token, ...user };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      navigate('/dashboard');
    }
  } catch (err) {
    console.error('Login error:', err);
    throw err; // This will be caught in the LoginPage component
  }
};

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (loading) return <div>Loading...</div>;

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);