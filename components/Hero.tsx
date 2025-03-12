"use client";

import Link from "next/link";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="w-full flex flex-col md:flex-row items-center justify-center text-center px-6 py-2 border border-b-2">

      <div className="flex flex-col">
        {/* Logo */}
        <Image src="/logo1.png" alt="Gospel Clarity Logo" width={200} height={200} className="mb-4" />

        {/* Title */}
        <h1 className="text-4xl font-semibold text-white mb-4">
            Gospel Clarity
        </h1>
      </div>

      <div>
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
      </div>
    </section>
  );
};

export default Hero;
