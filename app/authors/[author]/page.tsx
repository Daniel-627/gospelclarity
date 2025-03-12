import { fetchPostsByAuthorSlug } from "@/lib/api";
import { Post } from "@/types/blog";
import Link from "next/link";

interface AuthorPageProps {
  params: {
    author: string;
  };
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { author } = params;

  // Fetch posts by author slug
  const posts: Post[] = await fetchPostsByAuthorSlug(author);

  if (!posts || posts.length === 0) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">No Posts Found</h1>
        <p>There are no posts by this author at the moment.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 pt-[72px] md:pt-20">
      <h1 className="text-3xl font-bold mb-6">Posts by {author.charAt(0).toUpperCase() + author.slice(1)}</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <li key={post._id}>
            <Link href={`/blog/${post.slug.current}`}>
              <div className="bg-gray-900 p-4 rounded-lg hover:bg-gray-950 transition cursor-pointer">
                <h2 className="text-xl font-semibold">{post.title}</h2>
                <p className="text-gray-300 mt-2">
                  {post.description || "No description available"}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Published on: {new Date(post.publishedAt).toLocaleDateString()}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const revalidate = 60; // Revalidate the page every 60 seconds

