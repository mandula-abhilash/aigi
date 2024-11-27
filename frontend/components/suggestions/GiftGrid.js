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
    <div className="mt-12">
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
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4"
      >
        {results.map((suggestion, index) => (
          <GiftCard key={index} suggestion={suggestion} index={index} />
        ))}
      </motion.div>
    </div>
  );
}
