// app/blog/page.tsx
import { fetchAllPosts } from "@/lib/api";
import { Post } from "@/types/blog";
import Link from "next/link";

export default async function HomePage() {
  const posts: Post[] = await fetchAllPosts();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8 text-center">All Blog Posts</h1>
      {posts.length === 0 ? (
        <p className="text-center">No blog posts available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link key={post._id} href={`/blog/${post.slug}`} className="group">
              <div className="p-4 hover:shadow-lg transition-shadow">
                {/* Blog Title */}
                <h2 className="text-xl font-semibold group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h2>

                {/* Author and Date */}
                <div className="flex items-center text-sm text-gray-600 mt-2">
                  <p className="mr-4">{post.author || "Unknown"}</p>
                  <p>{new Date(post.publishedAt).toLocaleDateString()}</p>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-500 mt-4">
                  {post.description || "No description available"}
                </p>

                {/* Categories */}
                {post.latestCategories && post.latestCategories.length > 0 ? (
                  <ul className="flex flex-wrap mt-4">
                    {post.latestCategories.map((category, index) => (
                      <li
                        key={index}
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded mr-2 mb-2 text-xs"
                      >
                        {category}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-gray-500 mt-4">Uncategorized</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
