import api from '../utils/apiClient';

export const getAppointments = ({ from, to, status } = {}) => {
  const qs = new URLSearchParams();
  if (from) qs.set('from', from);
  if (to) qs.set('to', to);
  if (status) qs.set('status', status);
  const q = qs.toString();
  return api.get(`/api/customer/appointments${q ? `?${q}` : ''}`);
};

export const createAppointment = (payload) =>
  api.post('/api/customer/appointments', payload);

export const updateAppointment = (id, payload) =>
  api.patch(`/api/customer/appointments/${id}`, payload);

export const deleteAppointment = (id) =>
  api.del(`/api/customer/appointments/${id}`);

export const approveAppointment = (id) =>
  api.post(`/api/customer/appointments/${id}/approve`);

export const declineAppointment = (id, reason) =>
  api.post(`/api/customer/appointments/${id}/decline`, { reason });
