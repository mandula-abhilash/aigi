import ProfilePageClient from "@/components/profiles/ProfilePageClient";
import { getGiftProfiles, getGiftProfileById } from "@/services/profiles";
import { notFound } from "next/navigation";

// Disable static generation completely
export const dynamic = "force-dynamic";
export const revalidate = 0;

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

export const dynamicParams = true;

export default async function ProfilePage({ params }) {
  try {
    const profile = await getGiftProfileById(params.id);

    if (!profile) {
      notFound();
    }

    return <ProfilePageClient profile={profile} />;
  } catch (error) {
    console.error("Error loading profile:", error);
    notFound();
  }
}
