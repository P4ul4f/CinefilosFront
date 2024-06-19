import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useLoggedInUser = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useLoggedInUser debe ser utilizado dentro de un AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [token, setToken] = useState(null);

  const login = (user, token) => {
    setLoggedInUser(user);
    setToken(token);
    localStorage.setItem('token', token);
  };

  const logout = () => {
    setLoggedInUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('Token almacenado en localStorage:', token);
  
    if (token && !loggedInUser) {
      try {
        const userFromToken = parseJwt(token); // Decodificar el token JWT aquí
        console.log('Usuario obtenido del token:', userFromToken);
        setLoggedInUser(userFromToken);
      } catch (error) {
        console.error('Error al decodificar el token:', error);
        localStorage.removeItem('token');
      }
    }
  }, [loggedInUser]);
  

  // Función para decodificar el token JWT
  const parseJwt = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  };

  return (
    <AuthContext.Provider value={{ loggedInUser, setLoggedInUser, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

