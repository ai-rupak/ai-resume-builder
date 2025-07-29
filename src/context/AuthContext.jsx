import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import LoadingScreen from '@/components/custom/LoadingScreen';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('authToken') || null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          await fetchUserData(token);
        } catch (error) {
          console.error('Auth initialization failed:', error);
        }
      }
      setIsLoading(false);
    };
    initAuth();
  }, []);

  const fetchUserData = async (token) => {
    try {
      const response = await axios.get(`${baseURL}/api/auth/user`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(response.data);
      return response.data;
    } catch (error) {
      localStorage.removeItem('authToken');
      setUser(null);
      throw error;
    }
  };

//   const handleLogin = async (token) => {
//     try {
//       localStorage.setItem('authToken', token);
//       await fetchUserData(token);
//       navigate('/dashboard');
//       toast.success('Login successful!');
//     } catch (error) {
//       localStorage.removeItem('authToken');
//       toast.error('Authentication failed');
//       throw error;
//     }
//   };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
    navigate('/auth/sign-in');
    toast.success('Logged out successfully');
  };

  const value={
    token,
    user,
    isLoading,
    // handleLogin,
    handleLogout,
    fetchUserData
  }
  return (
    <AuthContext.Provider value={value}>
      {isLoading ? <LoadingScreen /> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);