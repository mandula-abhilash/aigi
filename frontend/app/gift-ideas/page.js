import { Suspense } from "react";
import { getGiftProfiles } from "@/services/profiles";
import ProfileGrid from "@/components/profiles/ProfileGrid";
import AddGiftProfileButton from "@/components/profiles/AddGiftProfileButton";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

// Disable static rendering and cache
export const dynamic = "force-dynamic";
export const revalidate = 0;

async function getInitialProfiles() {
  try {
    const data = await getGiftProfiles({ page: 1, limit: 10 });
    return {
      profiles: data.profiles || [],
      hasMore: data.hasMore || false,
      total: data.total || 0,
    };
  } catch (error) {
    console.error("Error fetching initial profiles:", error);
    return {
      profiles: [],
      hasMore: false,
      total: 0,
    };
  }
}

export default async function ProfilesPage() {
  const initialData = await getInitialProfiles();

  return (
    <div className="mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto mb-32">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Gift Ideas</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Browse our curated collection of gift ideas for every occasion
          </p>
        </div>

        <div className="flex justify-end mb-8">
          <AddGiftProfileButton />
        </div>

        <Suspense fallback={<LoadingSpinner />}>
          <ProfileGrid initialData={initialData} />
        </Suspense>
      </div>
    </div>
  );
}
