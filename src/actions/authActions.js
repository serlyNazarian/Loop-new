import api from '../utils/apiClient';

export const getMe = () => api.get('/api/auth/me');

export const login = (email, password, rememberMe = false) =>
  api.post('/api/auth/login', { email, password, rememberMe });

export const logout = () => api.post('/api/auth/logout');

export const signup = (payload) => api.post('/api/auth/signup', payload);

export const verifyEmail = (email, code) => api.post('/api/auth/verify', { email, code });

export const resendVerification = (email) => api.post('/api/auth/verify', { email, resend: true });

export const forgotPassword = (email) => api.post('/api/auth/forgot-password', { email });

export const resetPassword = (payload) => api.post('/api/auth/reset-password', payload);
