import { fetchPostBySlug, fetchPostsByCategories } from "@/lib/api";
import { Post } from "@/types/blog";
import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";
import YouMayAlsoLike from "@/components/YouMayAlsoLike";

interface PageProps {
  params: {
    slug: string;
  };
}

// Generate dynamic metadata
export async function generateMetadata({ params }: PageProps) {
  const post: Post | null = await fetchPostBySlug(params.slug);

  if (!post) {
    return {
      title: "Post Not Found | Gospel Clarity",
      description: "This post could not be found.",
    };
  }

  return {
    title: `${post.title} | Gospel Clarity`,
    description: post.description || "Read this insightful blog post on Gospel Clarity.",
    openGraph: {
      title: post.title,
      description: post.description || "Read this insightful blog post on Gospel Clarity.",
      type: "article",
      url: `/blog/${params.slug}`,
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = params;

  // Fetch the main blog post
  const post: Post | null = await fetchPostBySlug(slug);

  console.log("Fetched post:", post);

  if (!post) {
    return notFound();
  }


  // Fetch related posts by categories
  const relatedPostsByCategory = await fetchPostsByCategories(post.latestCategories || [], slug);

  console.log("Related posts:", relatedPostsByCategory);


  return (
    <div className="container mx-auto max-w-3xl pt-[72px] md:pt-20">
      {/* Title */}
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

      {/* Published Date */}
      <p className="text-gray-600">Published on: {new Date(post.publishedAt).toDateString()}</p>

      {/* Blog Content */}
      <div className="mt-6 prose max-w-none">
        <PortableText value={post.body} />
      </div>

      {/* You May Also Like Section */}
      <YouMayAlsoLike postsByCategory={relatedPostsByCategory} />
    </div>
  );
}

// ISR: Revalidate page every 60 seconds
export const revalidate = 60;
