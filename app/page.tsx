import Hero from "@/components/Hero";
import TriList from "@/components/TriList";
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
    <div className="mx-auto p-4 bg-gray-900 text-gray-300 border-b border-gray-700 pt-[72px] md:pt-20">
      <Hero />
      <TriList />
      <h1 className='py-4 pl-4 text-xl font-medium text-[#ffdb99] flex text-left'>Recent Articles</h1>

      {paginatedPosts.length === 0 ? (
        <p className="text-center text-gray-400">No blog posts available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedPosts.map((post) => (
            <Link key={post._id} href={`/blog/${post.slug}`} className="group">
              <div className="p-4 rounded-md bg-gray-900 hover:bg-gray-950 hover:shadow-lg transition-all duration-300">
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
          <Link href={`/?page=${currentPage - 1}`} className="px-4 py-2 text-gray-300 bg-gray-800 rounded-md hover:bg-gray-700 transition-all duration-300">
            Previous
          </Link>
        )}

        <span className="text-white">
          Page {currentPage} of {totalPages}
        </span>

        {/* Next Page Button */}
        {currentPage < totalPages && (
          <Link href={`/?page=${currentPage + 1}`} className="px-4 py-2 text-gray-300 bg-gray-800 rounded-md hover:bg-gray-700 transition-all duration-300">
            Next
          </Link>
        )}
      </div>

      {/* Navigation Moved to Bottom */}
      <div className="p-4 flex justify-center space-x-6 transition-all duration-300">
        <Link href="/blog" className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-950 transition-all duration-300">
          All Articles
        </Link>
        <Link href="/categories" className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-950 transition-all duration-300">
          All Categories
        </Link>
      </div>
    </div>
  );
}

export const revalidate = 60; // Revalidate the page every 60 seconds
