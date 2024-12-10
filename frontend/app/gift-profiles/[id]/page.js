"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getGiftProfileById } from "@/services/profiles";
import ProfilePageClient from "@/components/profiles/ProfilePageClient";

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  );
}

export default function ProfilePage() {
  const params = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const data = await getGiftProfileById(params.id);
        setProfile(data);
      } catch (error) {
        console.error("Error loading profile:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    if (params.id) {
      fetchProfile();
    }
  }, [params.id]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !profile) {
    return (
      <div className="mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Profile Not Found</h1>
        <p>The requested gift profile could not be found.</p>
      </div>
    );
  }

  return <ProfilePageClient profile={profile} />;
}
