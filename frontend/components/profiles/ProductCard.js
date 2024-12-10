import { motion } from "framer-motion";
import { ExternalLink, Heart, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ProductCard({ product, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden h-full"
    >
      <div className="p-6 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <h3 className="text-lg font-semibold line-clamp-2">
            {product.title}
          </h3>
          {/* <Button variant="ghost" size="icon" className="shrink-0">
            <Heart className="w-5 h-5 text-gray-400 hover:text-red-500 transition-colors" />
          </Button> */}
        </div>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
          {product.description}
        </p>

        {/* Why It's Perfect Section */}
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 mb-4 flex-grow">
          <p className="text-sm font-medium text-primary mb-2">
            Why It's Perfect:
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300 whitespace-pre-line">
            {/* {product.whyItsGreat} */}
            For the mom who loves to bake, decorate her home, and enjoy cozy
            crafts like knitting, the Rossmann Stand Mixer makes the perfect
            gift! This versatile and powerful tool helps her take her baking to
            the next level, whether she's making holiday treats or everyday
            family favorites. With its sleek black design, it also doubles as a
            chic addition to her kitchen décor. Ideal for Christmas, this gift
            combines functionality with elegance, making her holiday season even
            sweeter and more creative. It's a thoughtful way to support her
            passions and bring extra joy to her kitchen this season!
          </p>
        </div>

        {/* Keywords */}
        <div className="flex flex-wrap gap-2 mb-4">
          {product.keywords.map((keyword, i) => (
            <Badge key={i} variant="secondary" className="text-xs px-2 py-0.5">
              {keyword}
            </Badge>
          ))}
        </div>

        {/* Footer */}
        <div className="pt-4 flex justify-between items-center border-t border-gray-100 dark:border-gray-700 mt-auto">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            <span>Added recently</span>
          </div>
          <a
            href={product.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex"
          >
            <Button variant="outline" size="sm" className="gap-2 text-xs">
              <ExternalLink className="h-4 w-4" />
              View on Amazon
            </Button>
          </a>
        </div>
      </div>
    </motion.div>
  );
}
