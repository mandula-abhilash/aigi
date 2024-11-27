"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Gift,
  Tag,
  Users,
  BookmarkPlus,
  ExternalLink,
  FolderIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";

export default function GiftCard({ suggestion, index }) {
  const [isSaved, setIsSaved] = useState(false);
  const { toast } = useToast();

  const handleSave = () => {
    setIsSaved(true);
    toast({
      title: "Gift Saved",
      description: "This gift has been added to your saved items.",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-4">
              <Gift className="h-5 w-5 text-primary" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {suggestion.gift}
              </h3>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <Tag className="h-4 w-4 text-gray-500 mt-1 shrink-0" />
                <div className="flex flex-wrap gap-1">
                  {suggestion.keywords.split(",").map((keyword, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      {keyword.trim()}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                <Users className="h-4 w-4" />
                <span>{suggestion.demographic}</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                <FolderIcon className="h-4 w-4" />
                <span>{suggestion.category}</span>
              </div>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={handleSave}
            disabled={isSaved}
            className="text-gray-500 hover:text-primary shrink-0"
          >
            <BookmarkPlus
              className={`h-5 w-5 ${isSaved ? "text-primary" : ""}`}
            />
          </Button>
        </div>

        <div className="mt-6 flex justify-end">
          <Button variant="outline" size="sm" className="gap-2">
            <ExternalLink className="h-4 w-4" />
            View Details
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
