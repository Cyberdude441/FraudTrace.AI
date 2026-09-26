import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('fraudtrace_user');
    return saved ? JSON.parse(saved) : {
      id: 'USR-DEMO',
      name: 'Agent Alex Vance',
      email: 'analyst@fraudtrace.ai',
      role: 'Lead Digital Evidence Analyst',
      badgeNumber: 'FT-9942',
      isDemo: true
    };
  });
  const [token, setToken] = useState(() => localStorage.getItem('fraudtrace_token') || 'demo-token');

  const login = async (email, password) => {
    try {
      const res = await api.login(email, password, false);
      if (res && res.success) {
        setUser(res.user);
        setToken(res.token);
        localStorage.setItem('fraudtrace_user', JSON.stringify(res.user));
        localStorage.setItem('fraudtrace_token', res.token);
        return { success: true };
      }
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  const loginDemo = async () => {
    try {
      const res = await api.login('', '', true);
      const demoUser = res.user || {
        id: 'USR-DEMO',
        name: 'Agent Alex Vance',
        email: 'analyst@fraudtrace.ai',
        role: 'Lead Digital Evidence Analyst',
        badgeNumber: 'FT-9942',
        isDemo: true
      };
      setUser(demoUser);
      setToken('demo-token-active');
      localStorage.setItem('fraudtrace_user', JSON.stringify(demoUser));
      localStorage.setItem('fraudtrace_token', 'demo-token-active');
      return { success: true };
    } catch {
      return { success: true };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('fraudtrace_user');
    localStorage.removeItem('fraudtrace_token');
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: Boolean(user), login, loginDemo, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
