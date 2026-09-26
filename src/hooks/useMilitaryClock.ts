import { useState, useEffect } from 'react';

/**
 * Custom hook providing a synchronized live UTC military clock
 */
export function useMilitaryClock(): string {
  const [utcTime, setUtcTime] = useState<string>(() => {
    return new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC';
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setUtcTime(new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC');
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return utcTime;
}
