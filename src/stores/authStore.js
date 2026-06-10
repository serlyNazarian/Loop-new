/**
 * Auth state. Replaces the old cookie/JWT-in-middleware gatekeeping with
 * a client-side store. The actual JWT still lives in an httpOnly cookie
 * set by the backend — we never see it. `fetchMe` is how we learn whether
 * that cookie is valid.
 *
 *   status: 'idle'    — not checked yet (initial)
 *           'loading' — /auth/me in flight
 *           'authed'  — valid session, `user` populated
 *           'guest'   — no/invalid session
 */
import { create } from 'zustand';
import { ApiError } from '../utils/apiClient';
import * as authActions from '../actions/authActions';

const useAuthStore = create((set, get) => ({
  user: null,
  status: 'idle',

  async fetchMe() {
    // avoid duplicate in-flight checks (RequireAuth can mount more than once)
    if (get().status === 'loading') return;
    set({ status: 'loading' });
    try {
      const user = await authActions.getMe();
      set({ user, status: 'authed' });
    } catch (err) {
      if (err instanceof ApiError && err.status === 0) {
        // network error — don't bounce the user to /login over a flaky API
        set({ status: 'guest' });
        throw err;
      }
      set({ user: null, status: 'guest' });
    }
  },

  async login(email, password, rememberMe = false) {
    await authActions.login(email, password, rememberMe);
    await get().fetchMe();
    return get().user;
  },

  async logout() {
    try {
      await authActions.logout();
    } finally {
      set({ user: null, status: 'guest' });
    }
  },

  setUser(user) {
    set({ user });
  },
}));

export default useAuthStore;
