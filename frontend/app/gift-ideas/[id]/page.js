import { getGiftProfileById } from "@/services/profiles";
import ProfilePageClient from "@/components/profiles/ProfilePageClient";

export async function generateMetadata({ params }) {
  try {
    const profile = await getGiftProfileById(params.id);

    if (!profile) {
      return {
        title: "Profile Not Found",
        description: "The requested gift profile could not be found.",
      };
    }

    return {
      title: `${profile.title}`,
      description: profile.description,
      openGraph: {
        title: `${profile.title}`,
        description: profile.description,
        images: [profile.image],
      },
    };
  } catch (error) {
    return {
      title: "Error",
      description: "Failed to load the gift profile.",
    };
  }
}

export default async function ProfilePage({ params }) {
  try {
    const profile = await getGiftProfileById(params.id);

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
    console.error("Error fetching profile:", error);
    return (
      <div className="mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Error</h1>
        <p>Failed to load the gift profile. Please try again later.</p>
      </div>
    );
  }
}
