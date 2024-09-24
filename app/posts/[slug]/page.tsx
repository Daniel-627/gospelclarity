import { notFound } from 'next/navigation';
import { posts } from '@/data/posts';

interface Params {
  params: { slug: string };
}

export default function BlogPostPage({ params }: Params) {
  const post = posts.find((post) => post.slug === params.slug);

  if (!post) {
    notFound();  // If the post is not found, trigger a 404 page
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">{post?.title}</h1>
      <p className="text-gray-500 text-sm mb-2">By {post?.author.name} on {post?.date}</p>
      <img src={post?.image} alt={post?.title} className="w-full h-64 object-cover mb-6" />
      <div className="mt-4 text-lg">
        <p>{post?.content}</p>
      </div>
    </div>
  );
}
