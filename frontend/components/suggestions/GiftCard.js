import { motion } from "framer-motion";
import { Gift, Tag, Users, FolderIcon, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function GiftCard({ suggestion, index }) {
  // Construct the Amazon affiliate link
  const amazonSearchUrl = `https://${
    process.env.NEXT_PUBLIC_AMAZON_DOMAIN
  }/s?k=${encodeURIComponent(suggestion.keywords)}&tag=${
    process.env.NEXT_PUBLIC_AMAZON_AFFILIATE_TAG
  }`;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="relative h-full overflow-hidden bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 flex flex-col"
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/5 rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="relative p-6 md:p-8 flex flex-col flex-1">
        {/* Content Section */}
        <div className="flex-1 space-y-4">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              {suggestion.gift}
            </h3>

            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Users className="h-4 w-4" />
              <span>{suggestion.demographic}</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <FolderIcon className="h-4 w-4" />
              <span>{suggestion.category}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Tag className="h-4 w-4 text-primary/60" />
            {suggestion.keywords.split(",").map((keyword, i) => (
              <Badge
                key={i}
                variant="secondary"
                className="bg-primary/5 text-primary hover:bg-primary/10 transition-colors"
              >
                {keyword.trim()}
              </Badge>
            ))}
          </div>
        </div>

        {/* Action Section */}
        <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700 flex justify-center sm:justify-end">
          <motion.a
            href={amazonSearchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex group w-full sm:w-auto"
            whileHover="hover"
            whileTap="tap"
            initial="rest"
            variants={{
              rest: { scale: 1 },
              hover: { scale: 1.02 },
              tap: { scale: 0.98 },
            }}
          >
            {/* Gradient Glow */}
            <div className="absolute -inset-1 rounded-lg opacity-70 blur-lg transition-all duration-300 group-hover:opacity-100" />
            {/* Button */}
            <div className="relative w-full flex items-center justify-center gap-2 px-6 py-3 font-bold text-white bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg leading-none shadow-md hover:shadow-lg">
              <span className="font-semibold text-sm">Buy on Amazon</span>
              {/* <ExternalLink className="w-4 h-4" /> */}
            </div>
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}
