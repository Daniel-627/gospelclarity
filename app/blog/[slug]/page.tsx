import { fetchPostBySlug, fetchRelatedPosts } from "@/lib/api";
import { Post } from "@/types/blog";
import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";
import  YouMayAlsoLike  from "@/components/YouMayAlsoLike";

interface PageProps {
  params: {
    slug: string;
  };
}

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

  const post: Post | null = await fetchPostBySlug(slug);
  if (!post) return notFound();

  const { posts: relatedPosts, selectedCategory } = await fetchRelatedPosts(
    post.latestCategories ?? [],
    post.slug.current
  );


  return (
    <div className="container mx-auto max-w-3xl pt-[72px] md:pt-20">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-600">Published on: {new Date(post.publishedAt).toDateString()}</p>

      <div className="mt-6 prose max-w-none">
        <PortableText value={post.body} />
      </div>

      {/* Related Posts */}
      <YouMayAlsoLike posts={relatedPosts} category={selectedCategory}/>
    </div>
  );
}

export const revalidate = 60;
