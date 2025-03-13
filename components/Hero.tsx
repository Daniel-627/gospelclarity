"use client";

import Link from "next/link";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="w-full flex flex-col md:flex-row items-center justify-center text-center px-6 py-2 border-b-2">
      
      {/* Left Side: Logo & Title Centered */}
      <div className="flex flex-col items-center justify-center flex-1 text-center">
        <Image src="/logo1.png" alt="Gospel Clarity Logo" width={240} height={240} className="mb-4" />
        <h1 className="text-4xl font-semibold text-[#ffdb99] mb-4">Gospel Clarity</h1>
      </div>

      {/* Right Side: Left-Aligned Paragraph & Centered Button */}
      <div className="flex flex-col justify-start flex-1 text-left">
        <p className="text-lg text-gray-300 max-w-2xl">
          Gospel Clarity is a platform focused on Christian apologetics, Bible studies, and sermon summaries. 
          Our goal is to help believers strengthen their faith by providing clear, well-researched insights into Scripture and theology. 
          We simplify complex biblical concepts, making them accessible to all. Whether you are seeking answers to faith-related questions or looking to grow spiritually, 
          Gospel Clarity offers reliable resources to guide you in understanding God’s Word with clarity and truth.
        </p>

        <div className="mt-6 self-center">
          <Link
            href="/about"
            className="px-6 py-3 bg-gray-950 rounded-md text-base font-medium transition hover:bg-gray-800"
          >
            Learn More
          </Link>
        </div>
      </div>

    </section>
  );
};

export default Hero;
