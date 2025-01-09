// app/blog/page.tsx
import { fetchAllPosts } from "@/lib/api";
import { urlFor } from "@/sanity/lib/image";
import { Post } from "@/types/blog";
import Link from "next/link";

export default async function BlogPage() {
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
              <div className="rounded-lg shadow-md overflow-hidden bg-white hover:shadow-lg transition-shadow">
                {/* Blog Image */}
                {post.mainImage && urlFor(post.mainImage).url() && (
                  <div
                    className="h-40 bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${urlFor(post.mainImage).url()})`,
                    }}
                  />
                )}

                {/* Blog Content */}
                <div className="p-4">
                  <h2 className="text-xl font-semibold group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-sm text-gray-500 mt-2">
                    {post.description || "No description available"}
                  </p>

                  {/* Metadata */}
                  <div className="mt-4 text-gray-600 text-sm">
                    {post.latestCategories && post.latestCategories.length > 0 ? (
                      <ul className="mb-2">
                        {post.latestCategories.map((category, index) => (
                          <li
                            key={index}
                            className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded mr-2"
                          >
                            {category}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>Uncategorized</p>
                    )}
                    <div className="flex flex-row justify-between">
                      <p>{post.author || "Unknown"}</p>
                      <p>{new Date(post.publishedAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
