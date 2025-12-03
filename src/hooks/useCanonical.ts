import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const BASE_URL = "https://poisedgentlemen.com";

export const useCanonical = (customPath?: string) => {
  const location = useLocation();
  
  useEffect(() => {
    const path = customPath ?? location.pathname;
    const canonicalUrl = `${BASE_URL}${path === "/" ? "" : path}`;
    
    // Remove existing canonical link if present
    const existingCanonical = document.querySelector('link[rel="canonical"]');
    if (existingCanonical) {
      existingCanonical.remove();
    }
    
    // Create and append new canonical link
    const link = document.createElement("link");
    link.rel = "canonical";
    link.href = canonicalUrl;
    document.head.appendChild(link);
    
    return () => {
      link.remove();
    };
  }, [location.pathname, customPath]);
};
