"use client";

import { motion } from "framer-motion";
import ProfileCard from "./ProfileCard";
import { useEffect, useState, useCallback } from "react";
import { getGiftProfiles } from "@/services/profiles";
import { useToast } from "@/hooks/use-toast";
import SearchFilters from "./SearchFilters";
import { Loader2 } from "lucide-react";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

const ITEMS_PER_PAGE = 10;

export default function ProfileGrid({ initialData }) {
  const [profiles, setProfiles] = useState(initialData.profiles);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(initialData.hasMore);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const loadProfiles = useCallback(
    async (page, search) => {
      try {
        const response = await getGiftProfiles({
          page,
          limit: ITEMS_PER_PAGE,
          search,
        });

        if (page === 1) {
          setProfiles(response.profiles || []);
        } else {
          setProfiles((prev) => [...prev, ...(response.profiles || [])]);
        }

        setHasMore(response.hasMore || false);
        return response.profiles || [];
      } catch (error) {
        console.error("Error loading profiles:", error);
        toast({
          title: "Error",
          description: "Failed to load gift ideas",
          variant: "destructive",
        });
        return [];
      }
    },
    [toast]
  );

  const handleLoadMore = useCallback(async () => {
    if (!hasMore) return;

    const nextPage = currentPage + 1;
    await loadProfiles(nextPage, searchTerm);
    setCurrentPage(nextPage);
  }, [currentPage, searchTerm, loadProfiles, hasMore]);

  const { loadingMore } = useInfiniteScroll({
    onLoadMore: handleLoadMore,
    hasMore,
    loading,
  });

  const handleSearch = useCallback(
    async (search) => {
      setSearchTerm(search);
      setCurrentPage(1);
      setLoading(true);
      try {
        await loadProfiles(1, search);
      } finally {
        setLoading(false);
      }
    },
    [loadProfiles]
  );

  // Listen for profile updates
  useEffect(() => {
    const handleProfileAdded = (event) => {
      const newProfile = event.detail;
      setProfiles((currentProfiles) => [newProfile, ...currentProfiles]);
    };

    window.addEventListener("profileAdded", handleProfileAdded);
    return () => window.removeEventListener("profileAdded", handleProfileAdded);
  }, []);

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
            {searchTerm
              ? "No gift ideas found matching your search"
              : "No gift ideas available"}
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {profiles.map((profile, index) => (
              <motion.div
                key={profile._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(index * 0.1, 1) }}
              >
                <ProfileCard profile={profile} />
              </motion.div>
            ))}
          </div>

          {loadingMore && (
            <div className="flex justify-center py-8">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          )}

          {!hasMore && profiles.length > 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              No more gift ideas to load
            </div>
          )}
        </>
      )}
    </div>
  );
}
