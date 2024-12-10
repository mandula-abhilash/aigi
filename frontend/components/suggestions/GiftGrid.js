import { motion } from "framer-motion";
import GiftCard from "./GiftCard";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export default function GiftGrid({ results }) {
  if (!results?.length) return null;

  return (
    <div className="mt-12 w-full mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold mb-3">
          <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Perfect Gift Ideas
          </span>
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Curated with care, just for you
        </p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {results.map((suggestion, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="h-full"
          >
            <GiftCard suggestion={suggestion} index={index} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
