"use client";

import Link from "next/link";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="w-full flex flex-col md:flex-row items-center justify-center text-center px-6 py-2 border-b-2">

      <div className="flex flex-col">
        {/* Logo */}
        <Image src="/logo1.png" alt="Gospel Clarity Logo" width={210} height={210} className="mb-4" />

        {/* Title */}
        <h1 className="text-4xl font-semibold text-[#ffdb99] mb-4">
            Gospel Clarity
        </h1>
      </div>

      <div>
        {/* Description */}
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Gospel Clarity is a platform focused on Christian apologetics, Bible studies, and sermon summaries. 
            Our goal is to help believers strengthen their faith by providing clear, well-researched insights into Scripture and theology. 
            We simplify complex biblical concepts, making them accessible to all. Whether you are seeking answers to faith-related questions or looking to grow spiritually, 
            Gospel Clarity offers reliable resources to guide you in understanding God’s Word with clarity and truth.
        </p>

        {/* About Us Link */}
        <div className="mt-6">
            <Link
            href="/about"
            className="px-6 py-3 bg-gray-900 rounded-md text-base font-medium transition hover:bg-gray-950"
            >
            Learn More
            </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
