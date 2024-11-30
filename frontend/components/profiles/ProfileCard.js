import { motion } from "framer-motion";
import { ExternalLink, Gift, Tag, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";

export default function ProfileCard({ profile }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700"
    >
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent z-10" />
        <Image
          src={profile.image}
          alt={profile.title}
          width={500}
          height={300}
          unoptimized
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
        />
        {profile.imageCredit && (
          <div className="absolute bottom-0 right-0 z-20 p-1 text-xs text-white/70 bg-black/30">
            {profile.imageCredit}
          </div>
        )}
        <div className="absolute top-4 left-4 right-4 z-20">
          <h3 className="text-lg font-semibold text-white line-clamp-2">
            {profile.title}
          </h3>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 space-y-4">
        <div className="flex flex-wrap gap-2">
          {profile.interests.map((interest, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="bg-primary/10 text-primary hover:bg-primary/20 px-2"
            >
              {interest}
            </Badge>
          ))}
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
          {profile.description}
        </p>

        <div className="flex items-center justify-between pt-2">
          <Link href={`/profiles/${profile.id}`}>
            <Button variant="outline" size="sm" className="gap-2">
              <Gift className="w-4 h-4" />
              View Gifts
            </Button>
          </Link>
          {/* <Button
            variant="ghost"
            size="icon"
            className="text-gray-500 hover:text-primary"
          >
            <Heart className="w-4 h-4" />
          </Button> */}
        </div>
      </div>
    </motion.div>
  );
}
