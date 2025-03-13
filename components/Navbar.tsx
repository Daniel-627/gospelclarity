"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { fetchCategories } from "@/lib/api";
import { FaBars, FaX } from "react-icons/fa6";
import logo from "@/public/logo1.png";

const Navbar = () => {
  const [categories, setCategories] = useState<{ title: string; slug: string }[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    async function getCategories() {
      const fetchedCategories = await fetchCategories(3);
      setCategories(fetchedCategories.filter((cat) =>
        ["Apologetics", "Bible Studies", "Sermons"].includes(cat.title)
      ));
    }
    getCategories();
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="fixed top-0 left-0 w-full z-[1000] p-4 shadow-md bg-black/20 backdrop-blur-md">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center flex-row">
          <Image src={logo} alt="Gospel Clarity Logo" width={40} height={40} className="rounded" />
          <h1 className='pr-1 text-2xl font-semibold'>Gospel Clarity</h1>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6">
          {categories.map((category) => (
            <li key={category.slug}>
              <Link href={`/categories/${category.slug}`} className="text-gray-300 hover:text-blue-500">
                {category.title}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/blog" className="text-gray-300 hover:text-blue-500">Articles</Link>
          </li>
          <li>
            <Link href="/videos" className="text-gray-300 hover:text-blue-500">Videos</Link>
          </li>
          <li>
            <Link href="/about" className="text-gray-300 hover:text-blue-500">About Us</Link>
          </li>
          <li>
            <Link href="/contact" className="text-gray-300 hover:text-blue-500">Contact</Link>
          </li>
        </ul>

        {/* Mobile Menu Toggle */}
        <button className="text-2xl md:hidden text-white" onClick={toggleMenu} aria-label="Toggle Menu">
          {isMenuOpen ? <FaX /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <ul className="md:hidden flex flex-col space-y-4 mt-4">
          {categories.map((category) => (
            <li key={category.slug}>
              <Link href={`/categories/${category.slug}`} className="block text-gray-300 hover:text-blue-500" onClick={toggleMenu}>
                {category.title}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/blog" className="block text-gray-300 hover:text-blue-500" onClick={toggleMenu}>
              Articles
            </Link>
          </li>
          <li>
            <Link href="/videos" className="block text-gray-300 hover:text-blue-500" onClick={toggleMenu}>
              Videos
            </Link>
          </li>
          <li>
            <Link href="/about" className="block text-gray-300 hover:text-blue-500" onClick={toggleMenu}>
              About Us
            </Link>
          </li>
          <li>
            <Link href="/contact" className="block text-gray-300 hover:text-blue-500" onClick={toggleMenu}>
              Contact
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export const revalidate = 60; // Revalidate the page every 60 seconds

export default Navbar;
