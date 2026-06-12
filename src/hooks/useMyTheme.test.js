import useMyTheme from './useMyTheme';
import { ConfigProvider } from 'antd';
import { buildTheme } from '../config/antdTheme';
import useThemeStore from '../stores/themeStore';
import { act, renderHook } from '@testing-library/react';

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  });
});

afterEach(() => act(() => useThemeStore.getState().setDark(false)));

const wrapper = ({ children }) => (
  <ConfigProvider theme={buildTheme(false)}>{children}</ConfigProvider>
);

describe('useMyTheme', () => {
  it('exposes the antd token from the project theme (incl. custom tokens)', () => {
    const { result } = renderHook(() => useMyTheme(), { wrapper });
    expect(result.current.token).toBeTruthy();
    expect(result.current.token.borderRadiusM).toBe(10);
    expect(result.current.token.fontSizeXS).toBe(11);
  });

  it('reflects the themeStore dark flag and updates when it changes', () => {
    const { result } = renderHook(() => useMyTheme(), { wrapper });
    expect(result.current.isDark).toBe(false);

    act(() => useThemeStore.getState().setDark(true));
    expect(result.current.isDark).toBe(true);

    act(() => useThemeStore.getState().setDark(false));
    expect(result.current.isDark).toBe(false);
  });
});
