import React, { useEffect, useState } from "react";

export default function useDebounce(value, delay = 1000) {
  const [debounced, setDebounced] = useState("");
  useEffect(() => {
    const timout = setTimeout(() => {
      setDebounced(value);
    }, delay);
    return () => clearTimeout(timout);
  }, [value, delay]);
  return debounced;
}
