"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { fetchPostsByCategorySlug } from "@/lib/api"; // You will create this
import { Post } from "@/types/blog";

interface YouMayAlsoLikeProps {
  categorySlug: string;
}

export default function YouMayAlsoLike({ categorySlug }: YouMayAlsoLikeProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const fetchedPosts = await fetchPostsByCategorySlug(categorySlug);
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Failed to fetch related posts:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [categorySlug]);

  if (loading) {
    return <p className="text-gray-500 dark:text-gray-400">Loading related posts...</p>;
  }

  if (posts.length === 0) {
    return <p className="text-gray-500 dark:text-gray-400">No related posts found.</p>;
  }

  return (
    <div className="flex flex-wrap gap-4">
      {posts.map((post) => (
        <Link key={post._id} href={`/blog/${post.slug.current}`} passHref>
          <div className="p-4 bg-gray-100 dark:bg-[#192428] rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors w-full sm:w-[48%] md:w-[30%]">
            <h3 className="text-md font-medium text-black dark:text-white">{post.title}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-300 mt-1">
              {new Date(post.publishedAt).toLocaleDateString()}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
