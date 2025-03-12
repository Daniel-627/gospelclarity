import { fetchAllPosts } from "@/lib/api";
import { Post } from "@/types/blog";
import Link from "next/link";

const POSTS_PER_PAGE = 6; // Set the number of posts per page

export default async function HomePage({ searchParams }: { searchParams: { page?: string } }) {
  const currentPage = Number(searchParams.page) || 1; // Get page number from query params, default to 1
  const allPosts: Post[] = await fetchAllPosts();

  // Paginate posts
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = allPosts.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE);

  return (
    <div className="container mx-auto p-4 bg-gray-900 text-gray-300 border-b border-gray-700 pt-[72px] md:pt-20">
      <h1 className="text-4xl font-bold mb-8 text-center text-white">All Blog Posts</h1>

      {/* Navigation Buttons */}
      <div className="flex justify-center space-x-4 mb-6">
        <Link href="/blog" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          All Blogs
        </Link>
        <Link href="/categories" className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
          All Categories
        </Link>
        <Link href="/authors" className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
          All Authors
        </Link>
      </div>

      {paginatedPosts.length === 0 ? (
        <p className="text-center text-gray-400">No blog posts available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedPosts.map((post) => (
            <Link key={post._id} href={`/blog/${post.slug}`} className="group">
              <div className="p-4 rounded-md bg-gray-900 hover:bg-gray-950 hover:shadow-lg transition-shadow">
                {/* Blog Title */}
                <h2 className="text-xl font-semibold text-[#ffdb99] group-hover:text-[#fdeded] transition-colors duration-300">
                  {post.title}
                </h2>

                {/* Author and Date */}
                <div className="flex items-center text-xs font-thin text-gray-500 mt-2">
                  <p className="mr-4">{post.author || "Unknown"}</p>
                  <p>{new Date(post.publishedAt).toLocaleDateString()}</p>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-400 font-extralight mt-4">
                  {post.description || "No description available"}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-8 space-x-4">
        {/* Previous Page Button */}
        {currentPage > 1 && (
          <Link href={`/blog?page=${currentPage - 1}`} className="px-4 py-2 text-gray-300 bg-gray-800 rounded-md hover:bg-gray-700">
            Previous
          </Link>
        )}

        <span className="text-white">
          Page {currentPage} of {totalPages}
        </span>

        {/* Next Page Button */}
        {currentPage < totalPages && (
          <Link href={`/blog?page=${currentPage + 1}`} className="px-4 py-2 text-gray-300 bg-gray-800 rounded-md hover:bg-gray-700">
            Next
          </Link>
        )}
      </div>
    </div>
  );
}

export const revalidate = 60; // Revalidate the page every 60 seconds
