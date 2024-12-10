import { motion } from "framer-motion";
import { ExternalLink, Heart, Clock, Gift, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ProductCard({ product, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700"
    >
      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Column */}
          <div className="flex-1 space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <a
                  href={product.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <h3 className="text-xl font-semibold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                    {product.title}
                  </h3>
                </a>

                <div className="flex items-center gap-2 mt-2 text-sm text-gray-500 dark:text-gray-400">
                  <Gift className="w-4 h-4" />
                  <span>Perfect for {product.keywords[0]}</span>
                </div>
              </div>
              {/* <Button
                variant="ghost"
                size="icon"
                className="shrink-0 hover:bg-red-50 dark:hover:bg-red-900/20 group"
              >
                <Heart className="w-5 h-5 text-gray-400 group-hover:text-red-500 transition-colors" />
              </Button> */}
            </div>

            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {product.description}
            </p>

            <div className="flex flex-wrap items-center gap-2">
              <Tag className="w-4 h-4 text-primary/60" />
              {product.keywords.map((keyword, i) => (
                <Badge
                  key={i}
                  variant="secondary"
                  className="bg-primary/5 text-primary hover:bg-primary/10 transition-colors text-xs px-2.5 py-0.5"
                >
                  {keyword}
                </Badge>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="flex-1 space-y-4">
            <div className="bg-primary/5 dark:bg-primary/10 rounded-lg p-5 backdrop-blur-sm">
              <h4 className="text-sm font-medium text-primary mb-3 flex items-center gap-2">
                <Gift className="w-4 h-4" />
                Why It's Perfect
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                {/* {product.whyItsGreat} */}
                For the mom who loves to bake, decorate her home, and enjoy cozy
                crafts like knitting, the Rossmann Stand Mixer makes the perfect
                gift! This versatile and powerful tool helps her take her baking
                to the next level, whether she's making holiday treats or
                everyday family favorites. With its sleek black design, it also
                doubles as a chic addition to her kitchen décor. Ideal for
                Christmas, this gift combines functionality with elegance,
                making her holiday season even sweeter and more creative. It's a
                thoughtful way to support her passions and bring extra joy to
                her kitchen this season!
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                <Clock className="w-4 h-4" />
                <span>Added recently</span>
              </div>
              <motion.a
                href={product.link}
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex group"
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
                <div className="relative inline-flex items-center gap-2 px-4 py-2 font-bold text-white bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg leading-none shadow-md hover:shadow-lg">
                  <span className="font-semibold text-sm">View on Amazon</span>
                  <ExternalLink className="w-4 h-4" />
                </div>
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
