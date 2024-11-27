import { getGiftProfiles } from "@/services/profiles";
import ProfilePageClient from "@/components/profiles/ProfilePageClient";

// This is required for static site generation with `output: export`
export async function generateStaticParams() {
  const profiles = await getGiftProfiles();
  return profiles.map((profile) => ({
    id: profile.id.toString(),
  }));
}

export default async function ProfilePage({ params }) {
  const profiles = await getGiftProfiles();
  const profile = profiles.find((p) => p.id.toString() === params.id);

  return <ProfilePageClient profile={profile} />;
}
