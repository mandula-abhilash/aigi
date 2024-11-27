"use client";

import { useState, useEffect } from "react";
import { getGiftProfiles } from "@/services/profiles";
import SearchFilters from "@/components/profiles/SearchFilters";
import { motion } from "framer-motion";
import ProfileGrid from "@/components/profiles/ProfileGrid";

export default function ProfilesPage() {
  const [profiles, setProfiles] = useState([]);
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      setLoading(true);
      const data = await getGiftProfiles();
      setProfiles(data);
      setFilteredProfiles(data);
    } catch (error) {
      console.error("Failed to fetch profiles:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (searchTerm) => {
    if (!searchTerm.trim()) {
      setFilteredProfiles(profiles);
      return;
    }

    const filtered = profiles.filter(
      (profile) =>
        profile.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        profile.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        profile.interests.some((interest) =>
          interest.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );
    setFilteredProfiles(filtered);
  };

  const handleFilter = (filterType) => {
    let filtered = [...profiles];
    switch (filterType) {
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
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Gift Profiles</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Browse our curated collection of gift profiles for every occasion
          </p>
        </div>

        <SearchFilters onSearch={handleSearch} onFilter={handleFilter} />
        <ProfileGrid profiles={filteredProfiles} />
      </motion.div>
    </div>
  );
}
