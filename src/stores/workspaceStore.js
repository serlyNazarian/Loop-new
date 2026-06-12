/**
 * Active workspace + the list the user belongs to.
 *
 * `permissions === null` means full access (owner); otherwise it's an
 * allowlist of feature keys ('conversations', 'contacts', ...). The
 * PermissionGuard and the InsideLayout nav both read `can()`.
 *
 * Only `activeId` is persisted (via the `persist` middleware) so the chosen
 * workspace survives reloads; `workspaces` is always re-fetched from the API.
 */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getMyWorkspaces } from '../actions/workspaceActions';

const useWorkspaceStore = create(
  persist(
    (set, get) => ({
      workspaces: [],
      activeId: null,
      loaded: false,

      async fetchWorkspaces() {
        const res = await getMyWorkspaces();
        const workspaces = res?.workspaces || res || [];
        let activeId = get().activeId;
        // fall back to the first workspace if the stored one is gone
        if (!activeId || !workspaces.some((w) => w.id === activeId)) {
          activeId = workspaces[0]?.id || null;
        }
        set({ workspaces, activeId, loaded: true });
      },

      setActive(id) {
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
    }),
    {
      name: 'loop.workspace',
      partialize: (state) => ({ activeId: state.activeId }),
    }
  )
);

export default useWorkspaceStore;
