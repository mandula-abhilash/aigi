"use client";

import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";

export default function SearchBar({
  searchTerm,
  onSearch,
  onClear,
  placeholder,
  className,
}) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <Input
        type="search"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
        className={`pl-10 pr-10 ${className}`}
      />
      {searchTerm && (
        <button
          onClick={onClear}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
