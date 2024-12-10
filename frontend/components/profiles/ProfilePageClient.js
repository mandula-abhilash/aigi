"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Plus, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { getGiftProfileById } from "@/services/profiles";
import AddProductDialog from "./AddProductDialog";
import ProductCard from "./ProductCard";
import Image from "next/image";
import ImageCredit from "./ImageCredit";

export default function ProfilePageClient({ profile: initialProfile }) {
  const [profile, setProfile] = useState(initialProfile);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const isAdmin = user?.role === "admin";

  const refreshProfile = useCallback(async () => {
    try {
      const updatedProfile = await getGiftProfileById(profile._id);
      setProfile(updatedProfile);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to refresh profile data",
        variant: "destructive",
      });
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
      <div className="max-w-6xl mx-auto mb-32">
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
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Suggested Gifts</h2>
              {isAdmin && (
                <Button onClick={() => setIsAddProductOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Product
                </Button>
              )}
            </div>

            <div className="flex flex-col gap-6">
              {profile.products.map((product, index) => (
                <ProductCard key={index} product={product} index={index} />
              ))}
            </div>

            {profile.products.length === 0 && (
              <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <Gift className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">
                  No products added yet
                </p>
              </div>
            )}
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
