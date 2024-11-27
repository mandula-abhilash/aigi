"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const profiles = [
  {
    id: "husband-birthday-jogging",
    title: "Gifts for Husband on His Birthday (Likes Jogging)",
    description: "Perfect gifts for the fitness enthusiast husband",
    interests: ["Jogging", "Fitness", "Sports"],
  },
  {
    id: "grandmother-thanksgiving-dogs",
    title: "Gifts for Grandmother on Thanksgiving (Loves Dogs)",
    description: "Thoughtful gifts for the dog-loving grandmother",
    interests: ["Dogs", "Pets", "Family"],
  },
  // Add more profiles as needed
];

export default function ProfilesPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProfiles = profiles.filter(
    (profile) =>
      profile.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.interests.some((interest) =>
        interest.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  return (
    <div className="mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Gift Profiles</h1>

      <div className="max-w-xl mx-auto mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="search"
            placeholder="Search profiles..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProfiles.map((profile) => (
          <Link key={profile.id} href={`/profiles/${profile.id}`}>
            <Card className="h-full transition-transform hover:scale-105">
              <CardHeader>
                <CardTitle>{profile.title}</CardTitle>
                <CardDescription>{profile.description}</CardDescription>
                <div className="flex flex-wrap gap-2 mt-2">
                  {profile.interests.map((interest) => (
                    <span
                      key={interest}
                      className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
