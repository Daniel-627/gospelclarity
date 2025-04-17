import Link from "next/link";
import { Post } from "@/types/blog";

interface Props {
  posts: Post[];
  category: string | null;
}

export default function YouMayAlsoLike({ posts, category }: Props) {
  if (!posts.length || !category) return null;

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-semibold mb-6">
        More from <span className="text-blue-600">{category}</span>
      </h2>

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
    </section>
  );
}
