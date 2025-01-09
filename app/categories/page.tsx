// app/categories/page.tsx
import { fetchAllCategories } from "@/lib/api";
import { Category } from "@/types/blog";
import Link from "next/link";

export default async function CategoriesPage() {
  const categories: Category[] = await fetchAllCategories();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Categories</h1>
      {categories.length === 0 ? (
        <p>No categories available.</p>
      ) : (
        <ul className="grid grid-cols-3 gap-6">
          {categories.map((category) => (
            <li key={category._id}>
              <Link href={`/categories/${category.slug}`}>
                <div
                  className="relative h-16 bg-cover bg-center rounded-lg shadow-lg cursor-pointer transition-transform hover:scale-105"
                  style={{
                    backgroundImage: `url(${category.image?.asset?.url || "/default-image.jpg"})`,
                  }}
                >
                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg"></div>

                  {/* Content */}
                  <div className="absolute inset-0 flex items-center justify-center text-white z-10">
                    <h2 className="text-xl font-semibold">{category.title}</h2>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
