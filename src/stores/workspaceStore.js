/**
 * Active workspace + the list the user belongs to. The old app threaded
 * a "workspace context" through nearly every API call (the server read a
 * workspace cookie); here we keep the active workspace id in the store
 * and persist it to localStorage so it survives reloads.
 *
 * `permissions === null` means full access (owner); otherwise it's an
 * allowlist of feature keys ('conversations', 'contacts', ...). The
 * PermissionGuard and the InsideLayout nav both read `can()`.
 */
import { create } from 'zustand';
import { getMyWorkspaces } from '../actions/workspaceActions';

const ACTIVE_KEY = 'loop.activeWorkspaceId';

const useWorkspaceStore = create((set, get) => ({
  workspaces: [],
  activeId: localStorage.getItem(ACTIVE_KEY) || null,
  loaded: false,

  async fetchWorkspaces() {
    const res = await getMyWorkspaces();
    const workspaces = res?.workspaces || res || [];
    let activeId = get().activeId;
    // fall back to the first workspace if the stored one is gone
    if (!activeId || !workspaces.some((w) => w.id === activeId)) {
      activeId = workspaces[0]?.id || null;
    }
    if (activeId) localStorage.setItem(ACTIVE_KEY, activeId);
    set({ workspaces, activeId, loaded: true });
  },

  setActive(id) {
    localStorage.setItem(ACTIVE_KEY, id);
    set({ activeId: id });
    // the old app hard-reloaded on workspace switch to flush cached data;
    // simplest correct behavior until per-page refetch is wired everywhere.
    window.location.reload();
  },

  active() {
    return get().workspaces.find((w) => w.id === get().activeId) || null;
  },

  can(featureKey) {
    const active = get().active();
    if (!active) return false;
    if (active.permissions == null) return true; // owner / full access
    return active.permissions.includes(featureKey);
  },
}));

export default useWorkspaceStore;
