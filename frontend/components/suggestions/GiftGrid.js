"use client";

import { motion } from "framer-motion";
import GiftCard from "./GiftCard";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function GiftGrid({ results }) {
  if (!results?.length) return null;

  return (
    <div className="mt-12 container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
          Perfect Gift Ideas
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          We've curated these suggestions just for you
        </p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex flex-col gap-4 max-w-3xl mx-auto"
      >
        {results.map((suggestion, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <GiftCard suggestion={suggestion} index={index} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
