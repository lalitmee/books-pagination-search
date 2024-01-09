import { useEffect, useState } from "react";

export default function useDebounce(value, delay = 500) {
  const [debouncedSearchString, setDebouncedSearchString] = useState("");

  useEffect(() => {
    const delayInputTimeoutId = setTimeout(() => {
      setDebouncedSearchString(value);
    }, delay);
    return () => clearTimeout(delayInputTimeoutId);
  }, [value, delay]);

  return { debouncedSearchString };
}
