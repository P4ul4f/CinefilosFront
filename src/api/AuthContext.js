import React, { createContext, useContext, useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';

const AuthContext = createContext();

export const useLoggedInUser = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useLoggedInUser debe ser utilizado dentro de un AuthProvider');
  }
  return context;
};

const decodeToken = (token) => {
  try {
    return jwtDecode(token);
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [token, setToken] = useState(null);

  const login = (user, token) => {
    setLoggedInUser(user);
    setToken(token);
    localStorage.setItem('token', token);
    localStorage.setItem('userId', user.userId);
  };

  const logout = () => {
    setLoggedInUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    console.log('Token almacenado en localStorage:', token);
  
    if (token && userId) {
      const decodedToken = decodeToken(token);
      if (decodedToken && decodedToken.sub) {
        setLoggedInUser({ userId, username: decodedToken.sub }); // Asume que el sub del token es el username
        setToken(token);
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ loggedInUser, setLoggedInUser, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

