import {
  mockUser,
  mockOverview,
  mockWorkspaces,
  mockNotifications,
} from './mockData';
import { appointmentHandlers } from './mockAppointments';

export const USE_MOCKS = process.env.REACT_APP_USE_MOCKS === 'true';

const handlers = {
  'GET /api/auth/me': () => mockUser,
  'GET /api/workspace/mine': () => ({ workspaces: mockWorkspaces }),
  'GET /api/customer/notifications': () => mockNotifications,
  'GET /api/customer/overview-snapshot': () => mockOverview,
  'POST /api/customer/presence': () => ({ ok: true }),
};

export const getMockHandler = (method, path) => {
  const clean = path.split('?')[0];
  return handlers[`${method} ${clean}`] || appointmentHandlers(method, clean);
};
