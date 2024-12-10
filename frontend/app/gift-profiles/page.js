"use client";

import { Suspense } from "react";
import { getGiftProfiles } from "@/services/profiles";
import ProfileGrid from "@/components/profiles/ProfileGrid";
import SearchFilters from "@/components/profiles/SearchFilters";
import AddGiftProfileButton from "@/components/profiles/AddGiftProfileButton";
import { useState, useEffect } from "react";

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  );
}

export default function ProfilesPage() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfiles() {
      try {
        const data = await getGiftProfiles();
        setProfiles(data);
      } catch (error) {
        console.error("Error fetching profiles:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProfiles();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto mb-32">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Gift Profiles</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Browse our curated collection of gift profiles for every occasion
          </p>
        </div>

        <div className="flex justify-between items-start mb-8">
          <SearchFilters />
          <AddGiftProfileButton />
        </div>

        <Suspense fallback={<LoadingSpinner />}>
          <ProfileGrid initialProfiles={profiles} />
        </Suspense>
      </div>
    </div>
  );
}
