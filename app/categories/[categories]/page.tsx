import { notFound } from 'next/navigation';
import { posts } from '@/data/posts';

interface Params {
  params: { category: string };
}

export default function CategoryPage({ params }: Params) {
  console.log(params.category);
  const category = decodeURIComponent(params.category);  // Get the category from URL
  const filteredPosts = posts.filter((post) =>
    post.categories.includes(category)
  );

  if (!filteredPosts.length) {
    notFound();  // If no posts for this category, trigger a 404
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Posts in {category}</h1>
      <ul>
        {filteredPosts.map((post) => (
          <li key={post.id} className="mb-4">
            <a href={`/posts/${post.slug}`} className="text-2xl text-blue-500 hover:underline">
              {post.title}
            </a>
            <p className="text-gray-600">{post.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
