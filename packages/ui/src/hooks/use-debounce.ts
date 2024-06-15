import { useEffect, useRef, useState } from 'react';

const useDebounce = (value: string, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
