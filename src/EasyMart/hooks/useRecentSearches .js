import { useState, useEffect } from "react";

const useRecentSearches = (maxEntries = 5) => {
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    const storedSearches = JSON.parse(localStorage.getItem("recentSearches")) || [];
    setRecentSearches(storedSearches);
  }, []);

  const addSearch = (search) => {
    if (!search) return;

    let updatedSearches = [search, ...recentSearches];
    updatedSearches = [...new Set(updatedSearches)].slice(0, maxEntries); // Remove duplicates and limit entries

    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
    setRecentSearches(updatedSearches);
  };

  return { recentSearches, addSearch };
};

export default useRecentSearches;
