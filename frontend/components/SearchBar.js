"use client";

import { useState, useCallback } from "react";
import { debounce } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Search } from "lucide-react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const { user } = useAuth();
  const { toast } = useToast();

  const debouncedFetch = useCallback(
    debounce(async (searchQuery) => {
      if (!searchQuery.trim()) {
        setSuggestions([]);
        return;
      }

      try {
        // Simulated API call for demo
        const mockSuggestions = [
          "Gift for new mom",
          "Birthday gift for dad",
          "Anniversary present",
          "Graduation gift",
        ];
        setSuggestions(mockSuggestions);
      } catch (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      }
    }, 300),
    []
  );

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    debouncedFetch(value);
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setSuggestions([]);
    onSearch(suggestion);
  };

  return (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Enter gift details..."
          className="w-full px-4 py-3 pl-4 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white dark:bg-gray-800 dark:border-gray-700"
        />
        <Search className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
      </div>

      {suggestions.length > 0 && (
        <div className="absolute w-full mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}

      {!user && (
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Log in to save your suggestions and get more recommendations
        </p>
      )}
    </div>
  );
};

export default SearchBar;
