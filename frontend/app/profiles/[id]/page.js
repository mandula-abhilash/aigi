"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { ExternalLink, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

const profiles = {
  "husband-birthday-jogging": {
    title: "Gifts for Husband on His Birthday (Likes Jogging)",
    description: "Perfect gifts for the fitness enthusiast husband",
    suggestions: [
      {
        title: "Running Shoes for Daily Jogging",
        description:
          "High-quality running shoes designed for comfort and performance",
        price: "$120-$200",
        affiliateLinks: [
          {
            title: "Premium Running Shoes",
            url: "https://www.amazon.com/s?k=premium+running+shoes&tag=yourtag",
          },
          {
            title: "Professional Running Shoes",
            url: "https://www.amazon.com/s?k=professional+running+shoes&tag=yourtag",
          },
          {
            title: "Comfortable Running Shoes",
            url: "https://www.amazon.com/s?k=comfortable+running+shoes&tag=yourtag",
          },
        ],
      },
      {
        title: "Fitness Tracker",
        description:
          "Smart fitness tracker to monitor running performance and health metrics",
        price: "$80-$150",
        affiliateLinks: [
          {
            title: "Smart Fitness Tracker",
            url: "https://www.amazon.com/s?k=smart+fitness+tracker&tag=yourtag",
          },
          {
            title: "Running Watch",
            url: "https://www.amazon.com/s?k=running+watch&tag=yourtag",
          },
          {
            title: "Activity Tracker",
            url: "https://www.amazon.com/s?k=activity+tracker&tag=yourtag",
          },
        ],
      },
      // Add more suggestions
    ],
  },
  // Add more profiles
};

export default function ProfilePage() {
  const params = useParams();
  const profile = profiles[params.id];

  if (!profile) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Profile not found</h1>
        <p>The requested profile does not exist.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{profile.title}</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          {profile.description}
        </p>

        <div className="space-y-6">
          {profile.suggestions.map((suggestion, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Gift className="h-5 w-5 text-primary" />
                  <CardTitle>{suggestion.title}</CardTitle>
                </div>
                <CardDescription>{suggestion.description}</CardDescription>
                <div className="text-sm font-medium text-primary">
                  Price Range: {suggestion.price}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {suggestion.affiliateLinks.map((link, linkIndex) => (
                    <a
                      key={linkIndex}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <Button
                        variant="outline"
                        className="w-full text-left flex items-center justify-between"
                      >
                        <span>{link.title}</span>
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
