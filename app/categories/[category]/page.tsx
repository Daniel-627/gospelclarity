// app/categories/[category]/page.tsx
import { fetchPostsByCategorySlug } from "@/lib/api";
import { Post } from "@/types/blog";
import Link from "next/link";

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = params;

  // Fetch posts based on the category slug
  const posts: Post[] = await fetchPostsByCategorySlug(category);

  // Handle case where no posts are found
  if (!posts || posts.length === 0) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">No Posts Found</h1>
        <p>There are no posts under this category at the moment.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">{category.charAt(0).toUpperCase() + category.slice(1)} Posts</h1>
      <ul className="space-y-6">
        {posts.map((post) => (
          <li key={post._id}>
            {/* Use post.slug.current to correctly access the string value of the slug */}
            <Link href={`/blog/${post.slug.current}`}>
              <div className="bg-gray-100 p-4 rounded-lg hover:bg-gray-200 transition cursor-pointer">
                <h2 className="text-xl font-semibold">{post.title}</h2>
                <p className="text-gray-700 mt-2">
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
