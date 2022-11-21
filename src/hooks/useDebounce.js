import { useEffect, useState } from "react";
//set khoang thoi gian sau khi go tim kiem
export default function useDebounce(initializeValue = "", delay = 1000) {
  const [debounceValue, setDebounceValue] = useState(initializeValue);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(initializeValue);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [initializeValue, delay]);
  return debounceValue;
}
