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
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

export default function GiftCard({ suggestion }) {
  const [isSaved, setIsSaved] = useState(false);
  const { toast } = useToast();

  const handleSave = () => {
    setIsSaved(true);
    toast({
      title: "Gift Saved",
      description: "This gift has been added to your saved items.",
    });
  };

  // Construct the Amazon affiliate link
  const amazonSearchUrl = `https://${
    process.env.NEXT_PUBLIC_AMAZON_DOMAIN
  }/s?k=${encodeURIComponent(suggestion.keywords)}&tag=${
    process.env.NEXT_PUBLIC_AMAZON_AFFILIATE_TAG
  }`;

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-4">
              {/* <Gift className="h-5 w-5 text-primary shrink-0" /> */}
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {suggestion.gift}
              </h3>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <Tag className="h-4 w-4 text-gray-500 mt-1 shrink-0" />
                <div className="flex flex-wrap gap-1">
                  {suggestion.keywords.split(",").map((keyword, i) => (
                    <Badge
                      key={i}
                      variant="secondary"
                      className="text-xs px-2 py-0.5"
                    >
                      {keyword.trim()}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                <Users className="h-4 w-4 shrink-0" />
                <span>{suggestion.demographic}</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                <FolderIcon className="h-4 w-4 shrink-0" />
                <span>{suggestion.category}</span>
              </div>
            </div>
          </div>
          {/* TODO: Add Save Gift Suggestions */}
          {/* <Button
            variant="ghost"
            size="icon"
            onClick={handleSave}
            disabled={isSaved}
            className="text-gray-500 hover:text-primary shrink-0"
          >
            <BookmarkPlus
              className={`h-5 w-5 ${isSaved ? "text-primary" : ""}`}
            />
          </Button> */}
        </div>

        <div className="mt-6 flex justify-end">
          <a
            href={amazonSearchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm"
          >
            <Button variant="outline" size="sm" className="gap-2">
              <ExternalLink className="h-4 w-4" />
              View on Amazon
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
