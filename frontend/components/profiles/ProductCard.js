import { motion } from "framer-motion";
import { ExternalLink, Gift, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function ProductCard({ product, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700"
    >
      <div className="p-6 h-full flex flex-col">
        {/* Main content container with flex-1 to take remaining height */}
        <div className="flex-1">
          <div className="grid md:grid-cols-2 gap-6 h-full">
            {/* Left Column */}
            <div className="flex flex-col h-full">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <a
                    href={product.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <h3 className="text-xl font-semibold text-primary">
                      {product.title}
                    </h3>
                  </a>

                  <div className="flex items-center gap-2 mt-2 text-sm text-gray-500 dark:text-gray-400">
                    <Gift className="w-4 h-4" />
                    <span>Perfect for {product.keywords[0]}</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mt-4">
                {product.description}
              </p>

              <div className="flex flex-wrap items-center gap-2 mt-auto pt-4">
                <Tag className="w-4 h-4 text-primary/60" />
                {product.keywords.map((keyword, i) => (
                  <Badge
                    key={i}
                    variant="secondary"
                    className="bg-primary/5 text-primary hover:bg-primary/10 transition-colors text-sm px-2.5 py-0.5"
                  >
                    {keyword}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Right Column */}
            <div className="flex flex-col h-full">
              {product.whyItsGreat && (
                <div className="bg-primary/5 dark:bg-primary/10 rounded-lg shadow-lg p-5 backdrop-blur-sm h-full">
                  <h4 className="text-md font-semibold text-primary mb-3 flex items-center gap-2">
                    <Gift className="w-4 h-4 text-orange-500" />
                    Why It's Perfect
                  </h4>
                  <p className="text-md text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                    {product.whyItsGreat}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Amazon Button - Always at bottom */}
        <div className="flex items-center justify-center sm:justify-end pt-4 mt-4 border-t border-gray-100 dark:border-gray-700">
          <motion.a
            href={product.link}
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex group w-full sm:w-auto"
            whileHover="hover"
            whileTap="tap"
            initial="rest"
            variants={{
              rest: { scale: 1 },
              hover: { scale: 1.05 },
              tap: { scale: 0.95 },
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
          >
            {/* Gradient Glow */}
            <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 opacity-70 blur-lg transition-all duration-300 group-hover:opacity-100" />
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
