// app/authors/page.tsx
import { fetchAllAuthors } from "@/lib/api";
import Link from "next/link";
import { Author } from "@/types/blog";

export default async function AuthorsPage() {
  // Fetch all authors from Sanity
  const authors: Author[] = await fetchAllAuthors();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Authors</h1>
      {authors.length === 0 ? (
        <p>No authors available.</p>
      ) : (
        <ul className="space-y-4">
          {authors.map((author) => (
            <li key={author._id} className="border-b pb-2">
              <Link href={`/authors/${author.slug}`} className="text-blue-500 hover:underline">
                {author.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
