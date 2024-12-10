"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Gift, Tag, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { getGiftProfileById } from "@/services/profiles";
import AddProductDialog from "./AddProductDialog";
import Image from "next/image";
import ImageCredit from "./ImageCredit";

export default function ProfilePageClient({ profile: initialProfile }) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState(initialProfile);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const isAdmin = user?.role === "admin";

  const refreshProfile = useCallback(async () => {
    try {
      setRefreshing(true);
      const updatedProfile = await getGiftProfileById(profile._id);
      setProfile(updatedProfile);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to refresh profile data",
        variant: "destructive",
      });
    } finally {
      setRefreshing(false);
    }
  }, [profile._id, toast]);

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
            <ImageCredit
              creditAuthor={profile.creditAuthor}
              creditAuthorLink={profile.creditAuthorLink}
              creditPlatformLink={profile.creditPlatformLink}
            />
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
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Suggested Gifts</h2>
              {isAdmin && (
                <Button onClick={() => setIsAddProductOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Product
                </Button>
              )}
            </div>

            <div className="grid gap-4">
              {profile.products.map((product, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Gift className="h-5 w-5 text-primary" />
                      <CardTitle>{product.title}</CardTitle>
                    </div>
                    <CardDescription>{product.description}</CardDescription>
                    <div className="mt-2 text-sm">
                      <p className="font-medium text-primary">
                        Why It's a Great Gift:
                      </p>
                      <p className="mt-1">{product.whyItsGreat}</p>
                    </div>
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

              {profile.products.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No products added yet.
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      <AddProductDialog
        isOpen={isAddProductOpen}
        onClose={() => setIsAddProductOpen(false)}
        profileId={profile._id}
        onSuccess={() => {
          setIsAddProductOpen(false);
          refreshProfile();
        }}
      />
    </div>
  );
}
