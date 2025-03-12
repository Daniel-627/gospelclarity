"use client";

import { fetchAllPosts } from "@/lib/api";
import { Post } from "@/types/blog";
import Link from "next/link";
import { motion } from "framer-motion";

const POSTS_PER_PAGE = 6;

export default async function HomePage({ searchParams }: { searchParams: { page?: string } }) {
  const currentPage = Number(searchParams.page) || 1;
  const allPosts: Post[] = await fetchAllPosts();

  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = allPosts.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE);

  return (
    <div className="container mx-auto p-4 bg-gray-900 text-gray-300 border-b border-gray-700 pt-[72px] md:pt-20">
      {/* Animated Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-white">Explore Our Blog</h1>
        <p className="text-lg text-gray-400 mt-2">
          Stay updated with insightful articles, industry trends, and expert opinions.
        </p>
      </motion.div>

      {/* Blog Posts Grid */}
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
                <h2 className="text-xl font-semibold text-[#ffdb99] group-hover:text-[#fdeded] transition-colors duration-300">
                  {post.title}
                </h2>
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
          <Link href={`/?page=${currentPage - 1}`} className="px-4 py-2 text-gray-300 bg-gray-800 rounded-md hover:bg-gray-700">
            Previous
          </Link>
        )}
        <span className="text-white">
          Page {currentPage} of {totalPages}
        </span>
        {currentPage < totalPages && (
          <Link href={`/?page=${currentPage + 1}`} className="px-4 py-2 text-gray-300 bg-gray-800 rounded-md hover:bg-gray-700">
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
  );
}

export const revalidate = 60;
