import { posts } from '../../../data/posts';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function AuthorPage({ params }: { params: { name: string } }) {
  const filteredPosts = posts.filter((post) => post.author.name === params.name);

  if (!filteredPosts.length) {
    return <div>No posts found by this author.</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Posts by {params.name}</h1>
      <ul>
        {filteredPosts.map((post) => (
          <li key={post.id} className="mb-4">
            <Link href={`/posts/${post.slug}`} className="text-2xl text-blue-500 hover:underline">
              {post.title}
            </Link>
            <p className="text-gray-600">{post.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
