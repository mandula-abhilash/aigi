import ProfilePageClient from "@/components/profiles/ProfilePageClient";
import { getGiftProfiles, getGiftProfileById } from "@/services/profiles";

export async function generateStaticParams() {
  try {
    const profiles = await getGiftProfiles();
    return profiles.map((profile) => ({
      id: profile._id.toString(),
    }));
  } catch (error) {
    console.error("generateStaticParams: Error fetching profiles:", error);
    return [];
  }
}

// Add dynamic params configuration
export const dynamicParams = true;

export default async function ProfilePage({ params }) {
  try {
    const profile = await getGiftProfileById(params.id);

    // Handle case where profile is not found
    if (!profile) {
      return (
        <div className="mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Profile Not Found</h1>
          <p>The requested gift profile could not be found.</p>
        </div>
      );
    }

    return <ProfilePageClient profile={profile} />;
  } catch (error) {
    return (
      <div className="mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Error</h1>
        <p className="text-red-500">
          {error.message || "Failed to load gift profile"}
        </p>
      </div>
    );
  }
}
