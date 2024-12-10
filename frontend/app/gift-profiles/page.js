"use client";

import { useState, useEffect } from "react";
import { getGiftProfiles } from "@/services/profiles";
import ProfileGrid from "@/components/profiles/ProfileGrid";
import SearchFilters from "@/components/profiles/SearchFilters";
import AddGiftProfileButton from "@/components/profiles/AddGiftProfileButton";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

export default function ProfilesPage() {
  const [profiles, setProfiles] = useState([]);
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    fetchProfiles();
  }, []);

  useEffect(() => {
    filterProfiles();
  }, [searchTerm, activeFilter, profiles]);

  const fetchProfiles = async () => {
    try {
      setLoading(true);
      const data = await getGiftProfiles();
      setProfiles(data);
      setFilteredProfiles(data);
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to fetch profiles",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filterProfiles = () => {
    let filtered = [...profiles];

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (profile) =>
          profile.title.toLowerCase().includes(term) ||
          profile.description.toLowerCase().includes(term) ||
          profile.interests.some((interest) =>
            interest.toLowerCase().includes(term)
          )
      );
    }

    // Apply sorting filter
    switch (activeFilter) {
      case "popular":
        filtered.sort((a, b) => b.views - a.views);
        break;
      case "recent":
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      default:
        break;
    }

    setFilteredProfiles(filtered);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilter = (filter) => {
    setActiveFilter(filter);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto mb-32"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Gift Profiles</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Browse our curated collection of gift profiles for every occasion
          </p>
        </div>

        <div className="flex justify-between items-start mb-8">
          <SearchFilters onSearch={handleSearch} onFilter={handleFilter} />
          <AddGiftProfileButton onProfileAdded={fetchProfiles} />
        </div>

        <ProfileGrid profiles={filteredProfiles} />
      </motion.div>
    </div>
  );
}
