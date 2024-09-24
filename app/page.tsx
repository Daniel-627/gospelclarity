import Link from 'next/link';
import { posts } from '../data/posts';

export default function HomePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Blog</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id} className="mb-8">
            <img src={post.image} alt={post.title} className="w-full h-48 object-cover mb-4" />
            <Link href={`/posts/${post.slug}`} className="text-2xl font-semibold text-blue-500 hover:underline">
              {post.title}
            </Link>
            <p className="text-gray-500 text-sm mb-2">By {post.author.name} on {post.date}</p>
            <p className="text-gray-700 mb-4">{post.excerpt}</p>
            <div className="flex space-x-2 mb-4">
              {post.tags.map((tag, index) => (
                <span key={index} className="bg-gray-200 px-2 py-1 text-sm rounded">{tag}</span>
              ))}
            </div>
            <div className="flex space-x-2">
              {post.categories.map((category, index) => (
                <Link href={`/categories/${category}`} key={index} className="bg-blue-100 text-blue-500 px-2 py-1 text-sm rounded hover:underline">
                  {category}
                </Link>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
