import { posts } from '../../data/posts';
import Link from 'next/link';

// Function to extract unique categories and count how many posts are in each category
function getCategories() {
  const categoryMap: { [key: string]: number } = {};
  posts.forEach((post) => {
    post.categories.forEach((category) => {
      if (category in categoryMap) {
        categoryMap[category]++;
      } else {
        categoryMap[category] = 1;
      }
    });
  });
  return categoryMap;
}

export default function CategoriesPage() {
  const categories = getCategories();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Categories</h1>
      <ul>
        {Object.entries(categories).map(([category, count]) => (
          <li key={category} className="mb-4">
            <Link href={`/categories/${category}`} className="text-blue-500 hover:underline text-xl">
              {category} ({count} post{count > 1 ? 's' : ''})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
