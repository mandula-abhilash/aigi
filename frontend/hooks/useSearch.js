"use client";

import { useState, useCallback } from "react";
import { debounce } from "@/lib/utils";

export function useSearch({ onSearch, debounceMs = 300 }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const debouncedSearch = useCallback(
    debounce(async (value) => {
      setIsSearching(true);
      try {
        await onSearch(value);
      } finally {
        setIsSearching(false);
      }
    }, debounceMs),
    [onSearch, debounceMs]
  );

  const handleSearch = useCallback(
    (value) => {
      setSearchTerm(value);
      debouncedSearch(value);
    },
    [debouncedSearch]
  );

  const clearSearch = useCallback(() => {
    setSearchTerm("");
    onSearch("");
  }, [onSearch]);

  return {
    searchTerm,
    isSearching,
    handleSearch,
    clearSearch,
  };
}
