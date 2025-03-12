import { fetchAllPosts } from "@/lib/api";
import { Post } from "@/types/blog";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

const POSTS_PER_PAGE = 6;

export default async function HomePage({ searchParams }: { searchParams: { page?: string } }) {
  const currentPage = Number(searchParams.page) || 1;
  const allPosts: Post[] = await fetchAllPosts();

  // Paginate posts
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = allPosts.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE);

  return (
    <div className="container mx-auto p-4 bg-gray-900 text-gray-300 border-b border-gray-700 pt-[72px] md:pt-20">
      
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: -50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1 }}
        className="text-center mb-12"
      >
        <Image 
          src="/logo.png" 
          alt="Gospel Clarity Logo" 
          width={150} 
          height={150} 
          className="mx-auto"
        />
        <h1 className="text-5xl font-bold text-white mt-4">Gospel Clarity</h1>
        <p className="text-lg text-gray-400 mt-4 max-w-2xl mx-auto">
          A platform dedicated to Christian apologetics, Bible studies, and sermon summaries.
        </p>
        <Link 
          href="/about" 
          className="mt-6 inline-block px-6 py-3 bg-[#ff073a] text-white font-semibold rounded-lg hover:bg-[#ff5c00] transition"
        >
          About Us
        </Link>
      </motion.div>

      {/* Blog Section */}
      <h2 className="text-4xl font-bold mb-8 text-center text-white">All Blog Posts</h2>

      {paginatedPosts.length === 0 ? (
        <p className="text-center text-gray-400">No blog posts available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedPosts.map((post) => (
            <Link key={post._id} href={`/blog/${post.slug}`} className="group">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }} 
                transition={{ duration: 0.5 }}
                className="p-4 rounded-md bg-gray-900 hover:bg-gray-950 hover:shadow-lg transition-shadow"
              >
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
              </motion.div>
            </Link>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-8 space-x-4">
        {currentPage > 1 && (
          <Link href={`/?page=${currentPage - 1}`} className="px-4 py-2 bg-gray-950 text-white rounded-md hover:bg-gray-800">
            Previous
          </Link>
        )}

        <span className="text-white">Page {currentPage} of {totalPages}</span>

        {currentPage < totalPages && (
          <Link href={`/?page=${currentPage + 1}`} className="px-4 py-2 bg-gray-950 text-white rounded-md hover:bg-gray-800">
            Next
          </Link>
        )}
      </div>

      {/* Navigation at Bottom */}
      <nav className="mt-12 bg-gray-950 p-4 text-center text-white">
        <Link href="/" className="mx-4 hover:underline">Home</Link>
        <Link href="/about" className="mx-4 hover:underline">About</Link>
        <Link href="/blog" className="mx-4 hover:underline">Blog</Link>
        <Link href="/contact" className="mx-4 hover:underline">Contact</Link>
      </nav>
      
    </div>
  );
}
