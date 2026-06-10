export const PRESENCE_STATUSES = ['online', 'busy', 'offline'];

const ACTIVE_WINDOW_MS = 2 * 60 * 1000;

export function isPresenceStatus(v) {
  return v === 'online' || v === 'busy' || v === 'offline';
}

export function effectivePresence(status, lastActiveAt) {
  if (status === 'offline') return 'offline';
  const t = lastActiveAt ? new Date(lastActiveAt).getTime() : NaN;
  const active = Number.isFinite(t) && Date.now() - t < ACTIVE_WINDOW_MS;
  if (!active) return 'offline';
  return status === 'busy' ? 'busy' : 'online';
}

export const PRESENCE_META = {
  online: { label: 'Online' },
  busy: { label: 'Busy' },
  offline: { label: 'Offline' },
};
