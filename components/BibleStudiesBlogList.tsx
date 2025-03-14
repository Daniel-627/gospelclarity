'use client';
// components/FeaturedBlogList.tsx
import { useEffect, useState } from "react";
import { fetchBibleStudiesPosts } from "@/lib/api";
import { Post } from "@/types/blog";
import Link from "next/link";

export default function BibleStudiesBlogList() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      const biblestudiesPosts = await fetchBibleStudiesPosts(0, 5);
      setPosts(biblestudiesPosts);
    }
    fetchPosts();
  }, []);

  // Handle the case where no posts are found
  if (!posts || posts.length === 0) {
    return (
      <div className="p-4  text-center">
        <p className="">
          No additional posts available.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
        <h1 className="p-4 text-xl">Bible Studies</h1>
      {posts.map((post) => (
        <Link href={`/blog/${encodeURIComponent(post.slug.current)}`} key={post._id} passHref>
          <div className="p-3 cursor-pointer border-t-2 border-gray-300  transition">
            <div className="mt-1">
              <p className="text-xs  mt-2">
                {post.latestCategory}
              </p>
              <h2 className="text-base font-medium ">
                {post.title}
              </h2>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}


// ISR: Revalidate page every 60 seconds
export const revalidate = 60;