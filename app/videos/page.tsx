"use client";

import { motion } from "framer-motion";
import { FaYoutube, FaTiktok } from "react-icons/fa";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-6">
      {/* Animated "Coming Soon" Text */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl md:text-6xl font-bold text-white"
      >
        Coming Soon
      </motion.h1>

      {/* Animated Description */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="mt-4 text-gray-300 max-w-lg text-lg"
      >
        We are working on something amazing! Stay tuned for engaging videos on faith, apologetics, and deep Bible study.
      </motion.p>

      {/* Animated Social Links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="mt-6 flex space-x-6"
      >
        {/* YouTube Link */}
        <Link href="https://www.youtube.com/@yourchannel" target="_blank">
          <FaYoutube className="text-red-500 text-4xl hover:text-red-600 transition" />
        </Link>

        {/* TikTok Link */}
        <Link href="https://www.tiktok.com/@yourusername" target="_blank">
          <FaTiktok className="text-gray-300 text-4xl hover:text-white transition" />
        </Link>
      </motion.div>

      {/* Additional Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
        className="mt-8 max-w-md text-gray-400"
      >
        <p>Follow us on YouTube and TikTok for updates. New content dropping soon! 🎬🔥</p>
      </motion.div>
    </div>
  );
}
