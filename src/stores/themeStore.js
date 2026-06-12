import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const applyDarkClass = (dark) =>
  document.documentElement.classList.toggle('dark', dark);

const useThemeStore = create(
  persist(
    (set, get) => ({
      dark: false,

      setDark(dark) {
        applyDarkClass(dark);
        set({ dark });
      },

      toggle() {
        get().setDark(!get().dark);
      },
    }),
    {
      name: 'loop.theme',
      partialize: (state) => ({ dark: state.dark }),
      onRehydrateStorage: () => (state) => {
        if (state) applyDarkClass(state.dark);
      },
    }
  )
);

export default useThemeStore;
