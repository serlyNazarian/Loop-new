import api from '../utils/apiClient';

export const getMyWorkspaces = () => api.get('/api/workspace/mine');

export const getInvitePreview = (token) => api.get(`/api/workspace/invites/${token}`);

export const acceptInvite = (token) => api.post(`/api/workspace/invites/${token}/accept`);
