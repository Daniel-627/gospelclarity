"use client";

import Link from "next/link";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="w-full flex flex-col items-center justify-center text-center px-6">
      {/* Background Animation (Optional) */}

      {/* Logo */}
      <Image src="/logo1.png" alt="Gospel Clarity Logo" width={120} height={120} className="mb-4" />

      {/* Title */}
      <h1 className="text-4xl sm:text-6xl font-extrabold text-white mb-4">
        Gospel Clarity
      </h1>

      {/* Description */}
      <p className="text-lg text-gray-300 max-w-2xl mx-auto">
        A platform dedicated to Christian apologetics, Bible studies, and sermon summaries—bringing clarity to the Gospel.
      </p>

      {/* About Us Link */}
      <div className="mt-6">
        <Link
          href="/about"
          className="px-6 py-3 bg-gray-950 rounded-md text-lg font-semibold transition hover:bg-gray-800"
        >
          Learn More
        </Link>
      </div>
    </section>
  );
};

export default Hero;
