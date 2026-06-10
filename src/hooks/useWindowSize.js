import { useEffect, useState } from 'react';

const getWindowSize = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  const isWatch = width <= 300;
  const isMobile = width <= 768;
  const isTablet = width > 768 && width <= 1024;
  const isLaptop = width > 1024 && width <= 1440;
  const isDesktop = width > 1440 && width <= 1920;
  const isBigScreen = width > 1920;

  return {
    width,
    height,
    isWatch,
    isMobile,
    isTablet,
    isLaptop,
    isDesktop,
    isBigScreen,
    isSmallScreen: isMobile || isTablet,
    devicePixelRatio: window.devicePixelRatio || 1,
  };
};

export default function useWindowSize() {
  const [windowSize, setWindowSize] = useState(getWindowSize);

  useEffect(() => {
    const handleResize = () => setWindowSize(getWindowSize());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}
