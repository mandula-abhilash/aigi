"use client";

import { useSearch } from "@/hooks/useSearch";
import SearchBar from "./Searchbar";

export default function SearchFilters({ onSearch }) {
  const { searchTerm, isSearching, handleSearch, clearSearch } = useSearch({
    onSearch,
  });

  return (
    <div className="flex-1 max-w-3xl space-y-4 mx-auto mb-8 md:mb-12 lg:mb-16">
      <SearchBar
        searchTerm={searchTerm}
        onSearch={handleSearch}
        onClear={clearSearch}
        placeholder="Search by title, description, or interests..."
      />
    </div>
  );
}
