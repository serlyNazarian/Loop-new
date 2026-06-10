import api from '../utils/apiClient';

export const getNotifications = () => api.get('/api/customer/notifications');

export const updatePresence = (status) => api.post('/api/customer/presence', { status });
