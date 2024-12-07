"use client";

import { motion } from "framer-motion";
import { ExternalLink, Gift, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import Image from "next/image";

export default function ProfilePageClient({ profile }) {
  if (!profile) {
    return (
      <div className="mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Profile not found</h1>
        <p>The requested profile does not exist.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto mb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Header Section */}
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">{profile.title}</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              {profile.description}
            </p>
          </div>

          {/* Profile Image */}
          <div className="relative h-64 md:h-96 rounded-xl overflow-hidden">
            <Image
              src={profile.image}
              alt={profile.title}
              width={1200}
              height={800}
              className="w-full h-full object-cover"
            />
            {profile.imageCredit && (
              <div className="absolute bottom-0 right-0 p-2 text-sm text-white/70 bg-black/30">
                {profile.imageCredit}
              </div>
            )}
          </div>

          {/* Interests Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Interests</h2>
            <div className="flex flex-wrap gap-2">
              {profile.interests.map((interest, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>

          {/* Gift Suggestions */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Suggested Gifts</h2>
            <div className="grid gap-4">
              {profile.products.map((product, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Gift className="h-5 w-5 text-primary" />
                      <CardTitle>{product.title}</CardTitle>
                    </div>
                    <CardDescription>{product.description}</CardDescription>
                    {product.keywords && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {product.keywords.map((keyword, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 text-xs bg-secondary rounded-full"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-end">
                      <a
                        href={product.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="outline" size="sm" className="gap-2">
                          <ExternalLink className="h-4 w-4" />
                          View on Amazon
                        </Button>
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
