"use client";

import { motion } from "framer-motion";
import ProfileCard from "./ProfileCard";
import { useEffect, useState } from "react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export default function ProfileGrid({ initialProfiles = [] }) {
  const [profiles, setProfiles] = useState(initialProfiles);

  // Listen for profile updates via custom event
  useEffect(() => {
    const handleProfileAdded = (event) => {
      const newProfile = event.detail;
      setProfiles((currentProfiles) => [newProfile, ...currentProfiles]);
    };

    window.addEventListener("profileAdded", handleProfileAdded);
    return () => window.removeEventListener("profileAdded", handleProfileAdded);
  }, []);

  if (!profiles?.length) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">
          No gift ideas found matching your criteria
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {profiles.map((profile, index) => (
        <motion.div
          key={profile._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <ProfileCard profile={profile} />
        </motion.div>
      ))}
    </div>
  );
}
