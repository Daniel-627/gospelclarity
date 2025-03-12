"use client";

import { fetchAllPosts } from "@/lib/api";
import { Post } from "@/types/blog";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const POSTS_PER_PAGE = 6;

export default async function HomePage({ searchParams }: { searchParams: { page?: string } }) {
  const currentPage = Number(searchParams.page) || 1;
  const allPosts: Post[] = await fetchAllPosts();

  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = allPosts.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE);

  return (
    <div className="bg-gray-900 text-gray-300">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="flex flex-col items-center text-center pt-20 pb-16 px-4"
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <Image src="/logo1.png" alt="Gospel Clarity Logo" width={120} height={120} priority />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-5xl font-bold text-white mt-4"
        >
          Gospel Clarity
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="text-lg text-gray-400 mt-4 max-w-2xl"
        >
          A platform dedicated to Christian apologetics, Bible studies, and sermon summaries, helping believers
          grow in faith and understanding.
        </motion.p>

        {/* About Us Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-6"
        >
          <Link href="/about">
            <button className="px-6 py-3 bg-gray-950 text-white rounded-md hover:bg-gray-800 transition">
              Learn More About Us
            </button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Blog Posts Section */}
      <div className="container mx-auto p-4 border-b border-gray-700">
        <h2 className="text-4xl font-bold text-center text-white mb-8">Recent Blog Posts</h2>

        {paginatedPosts.length === 0 ? (
          <p className="text-center text-gray-400">No blog posts available.</p>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {paginatedPosts.map((post) => (
              <Link key={post._id} href={`/blog/${post.slug}`} className="group">
                <div className="p-4 rounded-md bg-gray-900 hover:bg-gray-950 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-semibold text-[#ffdb99] group-hover:text-[#fdeded] transition-colors duration-300">
                    {post.title}
                  </h3>
                  <div className="flex items-center text-xs font-thin text-gray-500 mt-2">
                    <p className="mr-4">{post.author || "Unknown"}</p>
                    <p>{new Date(post.publishedAt).toLocaleDateString()}</p>
                  </div>
                  <p className="text-sm text-gray-400 font-extralight mt-4">
                    {post.description || "No description available"}
                  </p>
                </div>
              </Link>
            ))}
          </motion.div>
        )}

        {/* Pagination Controls */}
        <div className="flex justify-center items-center mt-8 space-x-4">
          {currentPage > 1 && (
            <Link href={`/?page=${currentPage - 1}`} className="px-4 py-2 text-gray-300 bg-gray-950 rounded-md hover:bg-gray-800">
              Previous
            </Link>
          )}
          <span className="text-white">
            Page {currentPage} of {totalPages}
          </span>
          {currentPage < totalPages && (
            <Link href={`/?page=${currentPage + 1}`} className="px-4 py-2 text-gray-300 bg-gray-950 rounded-md hover:bg-gray-800">
              Next
            </Link>
          )}
        </div>

        {/* Navigation Buttons at Bottom */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-12 flex flex-wrap justify-center gap-4"
        >
          <Link href="/blog" className="px-4 py-2 bg-gray-950 text-white rounded-md hover:bg-gray-800 transition">
            All Blogs
          </Link>
          <Link href="/categories" className="px-4 py-2 bg-gray-950 text-white rounded-md hover:bg-gray-800 transition">
            All Categories
          </Link>
          <Link href="/authors" className="px-4 py-2 bg-gray-950 text-white rounded-md hover:bg-gray-800 transition">
            All Authors
          </Link>
          <Link href="/about" className="px-4 py-2 bg-gray-950 text-white rounded-md hover:bg-gray-800 transition">
            About Us
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

export const revalidate = 60;
