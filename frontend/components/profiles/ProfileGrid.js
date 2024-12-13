"use client";

import { motion } from "framer-motion";
import ProfileCard from "./ProfileCard";
import { useEffect, useState, useCallback } from "react";
import { getGiftProfiles } from "@/services/profiles";
import { useToast } from "@/hooks/use-toast";
import SearchFilters from "./SearchFilters";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export default function ProfileGrid({ initialProfiles = [] }) {
  const [profiles, setProfiles] = useState(initialProfiles);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Listen for profile updates via custom event
  useEffect(() => {
    const handleProfileAdded = (event) => {
      const newProfile = event.detail;
      setProfiles((currentProfiles) => [newProfile, ...currentProfiles]);
    };

    window.addEventListener("profileAdded", handleProfileAdded);
    return () => window.removeEventListener("profileAdded", handleProfileAdded);
  }, []);

  const handleSearch = useCallback(
    async (searchTerm) => {
      try {
        setLoading(true);
        const searchedProfiles = await getGiftProfiles(searchTerm);
        setProfiles(searchedProfiles);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to search profiles",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    },
    [toast]
  );

  return (
    <div className="space-y-8">
      <SearchFilters onSearch={handleSearch} />

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : !profiles?.length ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            No gift ideas found matching your criteria
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {profiles.map((profile, index) => (
            <motion.div
              key={profile._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ProfileCard profile={profile} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
