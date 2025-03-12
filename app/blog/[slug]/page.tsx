import { fetchPostBySlug } from "@/lib/api";
import { Post } from "@/types/blog";
import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";
import Head from "next/head";

interface PageProps {
  params: {
    slug: string;
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
    <>
      <Head>
        <title>{post.title} | Gospel Clarity</title>
        <meta name="description" content={post.description || "Read this insightful blog post on Gospel Clarity."} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description || "Read this insightful blog post on Gospel Clarity."} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`/blog/${slug}`} />
      </Head>

      <div className="container mx-auto p-4">
        {/* Title */}
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

        {/* Published Date */}
        <p className="text-gray-600">Published on: {new Date(post.publishedAt).toDateString()}</p>

        {/* Body Content */}
        <div className="mt-6 prose max-w-none">
          <PortableText value={post.body} />
        </div>
      </div>
    </>
  );
}

// ISR: Revalidate page every 60 seconds
export const revalidate = 60;
