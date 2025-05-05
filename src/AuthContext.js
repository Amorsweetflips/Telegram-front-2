// src/AuthContext.js
import React, { createContext, useContext, useState } from 'react';
import { signIn } from './api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  const login = async (username) => {
    const t = await signIn(username);
    localStorage.setItem('token', t);
    setToken(t);
  };
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
