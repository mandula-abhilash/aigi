import { motion } from "framer-motion";
import { ExternalLink, Gift, Tag } from "lucide-react";
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
      className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700"
    >
      <div className="p-6">
        {/* Header: Title and Buy Button */}
        <div className="flex items-start justify-between gap-4 mb-4">
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
            {/* <div className="flex items-center gap-2 mt-2 text-sm text-gray-500 dark:text-gray-400">
              <Gift className="w-4 h-4" />
              <span>Perfect for {product.keywords[0]}</span>
            </div> */}
          </div>

          {/* Amazon Button */}
          <motion.a
            href={product.link}
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex group shrink-0"
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
            <div className="absolute -inset-1 rounded-lg  opacity-70 blur-lg transition-all duration-300 group-hover:opacity-100" />
            {/* Button */}
            <div className="relative flex items-center justify-center gap-2 px-4 py-2 font-bold text-white bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg leading-none shadow-md hover:shadow-lg">
              <span className="font-semibold text-sm whitespace-nowrap">
                Buy on Amazon
              </span>
            </div>
          </motion.a>
        </div>

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
      </div>
    </motion.div>
  );
}
