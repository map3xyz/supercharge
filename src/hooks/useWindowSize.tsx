import { useEffect, useState } from 'react';

const breakpoints = {
  '2xl': 1536,
  lg: 1024,
  md: 768,
  sm: 640,
  xl: 1280,
};

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<{
    breakpoint?: '2xl' | 'lg' | 'md' | 'sm' | 'xl';
    height?: number;
    width?: number;
  }>({
    height: undefined,
    width: undefined,
  });
  useEffect(() => {
    function handleResize() {
      const { innerHeight, innerWidth } = window;
      const breakpoint = Object.entries(breakpoints)
        .filter(([, value]) => value > innerWidth)
        ?.sort((a, b) => a[1] - b[1])[0]?.[0] as
        | '2xl'
        | 'lg'
        | 'md'
        | 'sm'
        | 'xl';

      setWindowSize({
        breakpoint,
        height: innerHeight,
        width: innerWidth,
      });
    }

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const minWidth = (breakpoint: '2xl' | 'lg' | 'md' | 'sm' | 'xl') => {
    return windowSize.width && windowSize.width >= breakpoints[breakpoint];
  };

  return { ...windowSize, minWidth };
};
