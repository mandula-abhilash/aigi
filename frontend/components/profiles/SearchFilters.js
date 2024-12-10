"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X, TrendingUp, Clock } from "lucide-react";

export default function SearchFilters({ onSearch, onFilter }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch?.(value);
  };

  const clearSearch = () => {
    setSearchTerm("");
    onSearch?.("");
  };

  const handleFilter = (filterType) => {
    const newFilter = activeFilter === filterType ? "" : filterType;
    setActiveFilter(newFilter);
    onFilter?.(newFilter);
  };

  return (
    <div className="flex-1 max-w-3xl space-y-4 mx-auto">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          type="search"
          placeholder="Search by title, description, or interests..."
          value={searchTerm}
          onChange={handleSearch}
          className="pl-10 pr-10"
        />
        {searchTerm && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="flex gap-2">
        <Button
          variant={activeFilter === "popular" ? "default" : "outline"}
          size="sm"
          onClick={() => handleFilter("popular")}
          className="gap-2"
        >
          <TrendingUp className="h-4 w-4" />
          Most Popular
        </Button>
        <Button
          variant={activeFilter === "recent" ? "default" : "outline"}
          size="sm"
          onClick={() => handleFilter("recent")}
          className="gap-2"
        >
          <Clock className="h-4 w-4" />
          Most Recent
        </Button>
      </div>
    </div>
  );
}
