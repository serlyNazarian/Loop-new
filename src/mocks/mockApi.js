import {
  mockUser,
  mockOverview,
  mockWorkspaces,
  mockNotifications,
} from './mockData';

export const USE_MOCKS = process.env.REACT_APP_USE_MOCKS === 'true';

const handlers = {
  'GET /api/auth/me': () => mockUser,
  'GET /api/workspace/mine': () => ({ workspaces: mockWorkspaces }),
  'GET /api/customer/notifications': () => mockNotifications,
  'GET /api/customer/overview-snapshot': () => mockOverview,
  'POST /api/customer/presence': () => ({ ok: true }),
};

export const getMockHandler = (method, path) =>
  handlers[`${method} ${path.split('?')[0]}`];
