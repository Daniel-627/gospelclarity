import Link from "next/link";
import { Post } from "@/types/blog";

interface Props {
  posts: Post[];
}

export default function YouMayAlsoLike({ posts }: Props) {
  return (
    <div className="grid gap-4">
      {posts.map((post) => (
        <Link
          key={post._id}
          href={`/blog/${post.slug.current}`}
          className="block border rounded-xl p-4 hover:bg-gray-100 dark:hover:bg-zinc-800 transition"
        >
          <h3 className="text-lg font-semibold">{post.title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {post.description || "Read more..."}
          </p>
        </Link>
      ))}
    </div>
  );
}
