import { useEffect, useState } from 'react';
import breakpoints from '../utils/breakpoints';

const useBreakPoints = () => {
  const [breakpoint, setBreakPoint] = useState('');
  const [windowSize, setWindowSize] = useState<{width: number, height: number}>({
    width: 0,
    height: 0,
  });

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();

    if (0 < windowSize.width && windowSize.width < 480) {
      setBreakPoint(breakpoints[0]);
    }
    if (480 < windowSize.width && windowSize.width < 768) {
        setBreakPoint(breakpoints[480]);
      }
    if (768 < windowSize.width && windowSize.width < 960) {
      setBreakPoint(breakpoints[768]);
    }
    if (960 < windowSize.width && windowSize.width < 1280) {
      setBreakPoint(breakpoints[960]);
    }
    if (1280 < windowSize.width && windowSize.width < 1920) {
      setBreakPoint(breakpoints[1280]);
    }
    if (windowSize.width >= 1920) {
      setBreakPoint(breakpoints[1920]);
    }

    return () => window.removeEventListener('resize', handleResize);
  }, [windowSize.width]);
  return breakpoint;
};

export default useBreakPoints;