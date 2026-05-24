import { useState, useEffect } from "react";
import { fetchBrandName } from "../services/api";

const CACHE_KEY = "brandName";
const FALLBACK = "MotazSec";

export function useBrandName() {
  const [brandName, setBrandName] = useState(FALLBACK);

  useEffect(() => {
    // Show cached value immediately — no flash
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) setBrandName(cached);

    // Then fetch latest from Firebase and update cache
    fetchBrandName().then((name) => {
      setBrandName(name);
      localStorage.setItem(CACHE_KEY, name);
    });
  }, []);

  return brandName;
}
