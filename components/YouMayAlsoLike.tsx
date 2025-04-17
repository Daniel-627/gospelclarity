// components/YouMayAlsoLike.tsx
"use client";

import { Post } from "@/types/blog";
import Link from "next/link";

export const YouMayAlsoLike = ({ posts }: { posts: Post[] }) => {
  if (!posts.length) return null;

  return (
    <div className="mt-16 border-t pt-10">
      <h2 className="text-2xl font-semibold mb-6">Related Suggestions</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link key={post._id} href={`/blog/${post.slug}`}>
            <div className="border rounded-xl overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-4">
                <h3 className="font-medium text-lg">{post.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{post.author}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
