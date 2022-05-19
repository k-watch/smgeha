import { useState, useEffect } from 'react';

export function useScroll() {
  const [scrollY, setScrollY] = useState<number>(0);

  const listener = () => {
    setScrollY(window.pageYOffset);
  };

  useEffect(() => {
    let mounted = true;
    window.addEventListener('scroll', () => {
      if (mounted) return listener;
    });
    return () => {
      mounted = false;
      window.removeEventListener('scroll', listener);
    };
  }, []);

  return {
    scrollY,
  };
}
