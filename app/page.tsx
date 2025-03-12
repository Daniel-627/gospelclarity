// app/blog/page.tsx
import { fetchAllPosts } from "@/lib/api";
import { Post } from "@/types/blog";
import Link from "next/link";

export default async function HomePage() {
  const posts: Post[] = await fetchAllPosts();

  return (
    <div className="container mx-auto p-4 bg-gray-900 text-gray-300 border-b border-gray-700 pt-[72px] md:pt-20">
      <h1 className="text-4xl font-bold mb-8 text-center text-white">All Blog Posts</h1>
      {posts.length === 0 ? (
        <p className="text-center text-gray-400">No blog posts available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
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
    </div>
  );
}

export const revalidate = 60; // Revalidate the page every 60 seconds
