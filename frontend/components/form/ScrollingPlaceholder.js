"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ScrollingPlaceholder = ({ suggestions, interval = 3500 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % suggestions.length);
    }, interval);

    return () => clearInterval(timer);
  }, [suggestions.length, interval]);

  return (
    <div className="h-[1.5em] relative text-muted-foreground w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute whitespace-nowrap text-sm"
        >
          {suggestions[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

export default ScrollingPlaceholder;
