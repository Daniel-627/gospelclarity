import { notFound } from 'next/navigation';
import { posts } from '@/data/posts';

interface Params {
  params: { category: string };  // Expecting 'category' from dynamic route
}

export default function CategoryPage({ params }: Params) {
  console.log("Category:", params.category);  // This should print the category name
  const category = decodeURIComponent(params.category).toLowerCase();

  const filteredPosts = posts.filter((post) =>
    post.categories.map((cat) => cat.toLowerCase()).includes(category)
  );

  if (!filteredPosts.length) {
    return <h1>No posts found in this category.</h1>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Posts in {category}</h1>
      <ul>
        {filteredPosts.map((post) => (
          <li key={post.id}>
            <a href={`/posts/${post.slug}`} className="text-blue-500 hover:underline">
              {post.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
