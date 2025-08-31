import Link from "next/link";

export default function BlogPage() {
  const blogs = [
    { id: 1, title: "Understanding Next.js" },
    { id: 2, title: "React Server Components" },
    { id: 3, title: "Dynamic & Catch-all Routes" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Blog List</h1>
      <ul className="mt-4 space-y-2">
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link
              href={`/blog/${blog.id}`}
              className="text-blue-600 underline"
            >
              {blog.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
