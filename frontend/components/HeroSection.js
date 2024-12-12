import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Gift, Search, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import HeroPills from "./hero/HeroPills";

export default function HeroSection() {
  return (
    <section className="min-h-[calc(100vh)] flex flex-col justify-center relative pt-14 pb-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-background" />

      {/* Animated Circles */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-20 -left-20 w-60 h-60 bg-primary/10 rounded-full"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative mx-auto px-4 max-w-6xl flex-1 flex flex-col justify-center">
        <div className="text-center max-w-3xl mx-auto">
          {/* Main Tagline */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="inline-flex flex-col items-center gap-4">
              <HeroPills />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Discover Perfect Gifts
              </span>
              <br />
              <span className="text-4xl">with AIGI Gift Finder</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-gray-400 mb-8"
          >
            Let our AI help you find thoughtful and personalized gifts that will
            bring joy to your loved ones
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/find-me-a-gift">
              <Button size="lg" className="w-full sm:w-auto group">
                <Sparkles className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                Start Gift Finding
              </Button>
            </Link>
            <Link href="/gift-ideas">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto group"
              >
                <Search className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                Browse Gift Ideas
              </Button>
            </Link>
          </motion.div>

          {/* Feature Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid md:grid-cols-3 gap-6 mt-16"
          >
            <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg">
              <Gift className="h-10 w-10 text-primary mb-4 mx-auto" />
              <h3 className="font-semibold mb-2">Smart Suggestions</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                AI-powered recommendations based on personality and interests
              </p>
            </div>
            <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg">
              <Sparkles className="h-10 w-10 text-primary mb-4 mx-auto" />
              <h3 className="font-semibold mb-2">Personalized Results</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Tailored gift ideas that match your specific requirements
              </p>
            </div>
            <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg">
              <Search className="h-10 w-10 text-primary mb-4 mx-auto" />
              <h3 className="font-semibold mb-2">Curated Profiles</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Browse pre-made gift collections for common occasions
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
