import { motion } from "framer-motion";
import { Gift, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useAnalytics } from "@/hooks/use-analytics";

export default function ProductCard({ product, index }) {
  const { trackAffiliate } = useAnalytics();

  const handleAmazonClick = (e) => {
    trackAffiliate("link-click", {
      product,
      context: {
        position: index,
        marketplace: "amazon",
      },
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 flex flex-col"
    >
      <div className="p-6 flex-1">
        {/* Title */}
        <h3 className="text-xl font-semibold text-primary mb-4">
          {product.title}
        </h3>

        {/* Description */}
        <div className="mb-4">
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Why It's Perfect */}
        {product.whyItsGreat && (
          <div className="mb-4 bg-primary/5 dark:bg-primary/10 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-primary mb-2 flex items-center gap-2">
              <Gift className="w-4 h-4 text-orange-500" />
              Why It's Perfect
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              {product.whyItsGreat}
            </p>
          </div>
        )}

        {/* Tags and Buy Button Container */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2">
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

          {/* Desktop/Tablet Amazon Button */}
          <div className="hidden sm:block">
            <motion.a
              href={product.link}
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex group"
              whileHover="hover"
              onClick={handleAmazonClick}
              whileTap="tap"
              initial="rest"
              variants={{
                rest: { scale: 1 },
                hover: { scale: 1.05 },
                tap: { scale: 0.95 },
              }}
            >
              {/* Gradient Glow */}
              <div className="absolute -inset-1 rounded-lg opacity-70 blur-lg transition-all duration-300 group-hover:opacity-100" />
              {/* Button */}
              <div className="relative flex items-center justify-center gap-2 px-4 py-2 font-bold text-white bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg leading-none shadow-md hover:shadow-lg">
                <span className="font-semibold text-sm whitespace-nowrap">
                  Buy on Amazon
                </span>
              </div>
            </motion.a>
          </div>
        </div>
      </div>

      {/* Mobile Amazon Button */}
      <motion.a
        href={product.link}
        target="_blank"
        rel="noopener noreferrer"
        className="sm:hidden w-full mt-auto"
        whileHover="hover"
        onClick={handleAmazonClick}
        whileTap="tap"
        initial="rest"
        variants={{
          rest: { scale: 1 },
          hover: { scale: 1.02 },
          tap: { scale: 0.98 },
        }}
      >
        <div className="relative flex items-center justify-center gap-2 py-4 font-bold text-white bg-gradient-to-br from-yellow-500 to-orange-600 leading-none">
          <span className="font-semibold">Buy on Amazon</span>
        </div>
      </motion.a>
    </motion.div>
  );
}
