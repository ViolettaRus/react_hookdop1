import { useState, useCallback } from 'react';
import { useWindowEvent } from './useWindowEvent';

export function useWindowScroll() {
  const [scroll, setScroll] = useState(() => {
    if (typeof window !== 'undefined') {
      return {
        x: window.scrollX || window.pageXOffset || 0,
        y: window.scrollY || window.pageYOffset || 0,
      };
    }
    return { x: 0, y: 0 };
  });

  useWindowEvent('scroll', () => {
    setScroll({
      x: window.scrollX || window.pageXOffset || 0,
      y: window.scrollY || window.pageYOffset || 0,
    });
  });

  const scrollTo = useCallback(({ x, y }) => {
    if (typeof window !== 'undefined') {
      window.scrollTo({
        left: x !== undefined ? x : window.scrollX,
        top: y !== undefined ? y : window.scrollY,
        behavior: 'smooth',
      });
    }
  }, []);

  return [scroll, scrollTo];
}

