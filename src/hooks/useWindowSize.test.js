import { act, renderHook } from '@testing-library/react';
import useWindowSize from './useWindowSize';

const setWindowWidth = (width) => {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  });
  act(() => window.dispatchEvent(new Event('resize')));
};

describe('useWindowSize', () => {
  afterEach(() => setWindowWidth(1024));

  it('returns width and height', () => {
    const { result } = renderHook(() => useWindowSize());
    expect(result.current.width).toBe(window.innerWidth);
    expect(result.current.height).toBe(window.innerHeight);
  });

  it('detects isWatch (<= 300px)', () => {
    setWindowWidth(280);
    const { result } = renderHook(() => useWindowSize());
    expect(result.current.isWatch).toBe(true);
    expect(result.current.isMobile).toBe(true);
  });

  it('detects isMobile (<= 768px)', () => {
    setWindowWidth(430);
    const { result } = renderHook(() => useWindowSize());
    expect(result.current.isMobile).toBe(true);
    expect(result.current.isTablet).toBe(false);
  });

  it('detects isTablet (769px - 1024px)', () => {
    setWindowWidth(900);
    const { result } = renderHook(() => useWindowSize());
    expect(result.current.isTablet).toBe(true);
    expect(result.current.isMobile).toBe(false);
    expect(result.current.isLaptop).toBe(false);
  });

  it('detects isLaptop (1025px - 1440px)', () => {
    setWindowWidth(1280);
    const { result } = renderHook(() => useWindowSize());
    expect(result.current.isLaptop).toBe(true);
    expect(result.current.isTablet).toBe(false);
    expect(result.current.isDesktop).toBe(false);
  });

  it('detects isDesktop (1441px - 1920px)', () => {
    setWindowWidth(1600);
    const { result } = renderHook(() => useWindowSize());
    expect(result.current.isDesktop).toBe(true);
    expect(result.current.isLaptop).toBe(false);
    expect(result.current.isBigScreen).toBe(false);
  });

  it('detects isBigScreen (> 1920px)', () => {
    setWindowWidth(2560);
    const { result } = renderHook(() => useWindowSize());
    expect(result.current.isBigScreen).toBe(true);
    expect(result.current.isDesktop).toBe(false);
  });

  it('updates on resize', () => {
    const { result } = renderHook(() => useWindowSize());
    setWindowWidth(500);
    expect(result.current.isMobile).toBe(true);
    setWindowWidth(1200);
    expect(result.current.isLaptop).toBe(true);
  });

  it('only one breakpoint is true at a time (excluding isWatch/isMobile overlap)', () => {
    setWindowWidth(900);
    const { result } = renderHook(() => useWindowSize());
    const { isTablet, isLaptop, isDesktop, isBigScreen } = result.current;
    const active = [isTablet, isLaptop, isDesktop, isBigScreen].filter(Boolean);
    expect(active.length).toBe(1);
  });
});
