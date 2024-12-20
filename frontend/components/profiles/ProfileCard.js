"use client";

import { motion } from "framer-motion";
import { ExternalLink, Gift, Tag, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import ImageCredit from "./ImageCredit";

export default function ProfileCard({ profile }) {
  return (
    <div className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent z-10" />
        <Image
          src={profile.image}
          alt={profile.title}
          width={500}
          height={300}
          unoptimized
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
        />
        <ImageCredit
          creditAuthor={profile.creditAuthor}
          creditAuthorLink={profile.creditAuthorLink}
          creditPlatformLink={profile.creditPlatformLink}
        />

        <div className="absolute top-4 left-4 right-4 z-20">
          <h3 className="text-lg font-semibold text-white line-clamp-2">
            {profile.title}
          </h3>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 space-y-4">
        <div className="flex flex-wrap gap-2">
          {profile.interests.map((interest, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="bg-primary/10 text-primary hover:bg-primary/20 px-2"
            >
              {interest}
            </Badge>
          ))}
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
          {profile.description}
        </p>

        <div className="flex items-center justify-end pt-2">
          <Link href={`/gift-ideas/${profile.slug}`}>
            <Button variant="outline" size="sm" className="text-xs gap-2">
              <Gift className="w-4 h-4" />
              View Gift Ideas
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
