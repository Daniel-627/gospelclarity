export interface Post {
  id: number;
  title: string;
  slug: string;
  date: string;
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  excerpt: string;
  tags: string[];
  image: string;
  categories: string[];  // Add categories
}

export const posts: Post[] = [
  {
    id: 1,
    title: "First Blog Post",
    slug: "first-blog-post",
    date: "2024-09-25",
    content: "This is the full content of the first blog post. It's very informative and includes all the details needed.",
    author: {
      name: "Jane Doe",
      avatar: "/images/authors/jane.jpg",
    },
    excerpt: "This is a short summary of the first blog post. It gives readers an idea of what the post is about.",
    tags: ["Next.js", "TypeScript", "TailwindCSS"],
    image: "/images/posts/first-blog-post.jpg",
    categories: ["Tech", "Web Development"],  // Add categories here
  },
  {
    id: 2,
    title: "Second Blog Post",
    slug: "second-blog-post",
    date: "2024-09-20",
    content: "This is the full content of the second blog post. It covers even more insights and tips.",
    author: {
      name: "John Smith",
      avatar: "/images/authors/john.jpg",
    },
    excerpt: "A brief overview of the second blog post, giving readers a taste of what to expect.",
    tags: ["JavaScript", "Web Development", "React"],
    image: "/images/posts/second-blog-post.jpg",
    categories: ["JavaScript", "Programming"],  // Add categories here
  },
];
