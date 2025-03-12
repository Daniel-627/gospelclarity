"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center text-white bg-gray-950 text-center px-6">
      {/* Background Animation (Optional) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }}
        className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black opacity-60"
      />

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <Image src="/logo1.png" alt="Gospel Clarity Logo" width={120} height={120} className="mb-4" />
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="text-4xl sm:text-6xl font-extrabold text-white mb-4"
      >
        Gospel Clarity
      </motion.h1>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="text-lg text-gray-300 max-w-2xl mx-auto"
      >
        A platform dedicated to Christian apologetics, Bible studies, and sermon summaries—bringing clarity to the Gospel.
      </motion.p>

      {/* About Us Link */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="mt-6"
      >
        <Link
          href="/about"
          className="px-6 py-3 bg-blue-600 rounded-md text-lg font-semibold transition hover:bg-blue-700"
        >
          Learn More
        </Link>
      </motion.div>
    </section>
  );
};

export default Hero;
