import Link from "next/link";
import Image from "next/image";
import { FaXTwitter, FaYoutube } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      {/* Top Part */}
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10 border-b border-gray-700 pb-10">
        {/* Left Side - Newsletter Subscription */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Subscribe to our Newsletter</h3>
          <p className="mb-4 text-sm">
            Stay updated with the latest apologetics resources, Bible studies, and sermons.
          </p>
          <form className="flex items-center space-x-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-2 w-full rounded border border-gray-700 bg-transparent focus:outline-none"
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Subscribe</button>
          </form>
        </div>

        {/* Right Side - Donate */}
        <div className="text-right">
          <h3 className="text-lg font-semibold mb-4">Support Us</h3>
          <p className="mb-4 text-sm">
            Your donations help us continue sharing the gospel through apologetics and Bible teachings.
          </p>
          <Link href="/donate">
            <button className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600">Donate</button>
          </Link>
        </div>
      </div>

      {/* Bottom Part */}
      <div className="container mx-auto px-4 mt-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left Side - Logo & Mission */}
        <div className="flex items-center space-x-4">
          <Image src="/logo1.png" alt="Gospel Clarity Logo" width={40} height={40} />
          <p className="text-sm">
            Gospel Clarity - Defending the Faith, Studying the Word, Preaching the Truth.
          </p>
        </div>

        {/* Right Side - Social Icons & Contact Button */}
        <div className="flex justify-end items-center space-x-4">
          <Link href="https://x.com" target="_blank" aria-label="X Twitter">
            <FaXTwitter className="text-2xl hover:text-blue-500" />
          </Link>
          <Link href="https://youtube.com" target="_blank" aria-label="YouTube">
            <FaYoutube className="text-2xl hover:text-red-500" />
          </Link>
          <Link href="/contact">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Contact Us
            </button>
          </Link>
        </div>
      </div>

      {/* Copyright and Details */}
      <div className="text-center text-sm text-gray-400 mt-10">
        © {new Date().getFullYear()} Gospel Clarity. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
