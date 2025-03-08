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
    <nav className="p-4 shadow-md bg-gray-900">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image src={logo} alt="Gospel Clarity Logo" width={40} height={40} className="rounded" />
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
            <Link href="/blog" className="text-gray-300 hover:text-blue-500">Blog</Link>
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
              Blog
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
