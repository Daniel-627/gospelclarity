import { fetchPostBySlug } from "@/lib/api";
import { Post } from "@/types/blog";
import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    slug: string;
  };
}

// **Generate dynamic metadata**
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

  // Fetch the post using the slug
  const post: Post | null = await fetchPostBySlug(slug);

  // If no post is found, return 404
  if (!post) {
    return notFound();
  }

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
    </div>
  );
}

// ISR: Revalidate page every 60 seconds
export const revalidate = 60;
