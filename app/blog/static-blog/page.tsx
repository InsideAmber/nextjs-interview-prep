// app/blog/page.tsx
import Link from "next/link";

const blogs = [
  { id: 1, title: "Understanding Next.js" },
  { id: 2, title: "React Server Components" },
  { id: 3, title: "Dynamic & Catch-all Routes" },
  { id: 4, title: "Next.js App Router vs Pages Router" },
  { id: 5, title: "Optimizing Performance in React" },
  { id: 6, title: "Deploying Next.js to Vercel" },
  { id: 7, title: "Middleware in Next.js" },
  { id: 8, title: "Using Server Actions" },
  { id: 9, title: "Streaming in Next.js" },
  { id: 10, title: "API Routes vs Route Handlers" },
];

const ITEMS_PER_PAGE = 3;

export default async function BlogPage({ searchParams }: { searchParams: { page?: string } }) {
  const {page} = await searchParams || {}
  const currentPage = parseInt(page || "1", 10);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedBlogs = blogs.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const totalPages = Math.ceil(blogs.length / ITEMS_PER_PAGE);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Blog List (Page {currentPage})</h1>
      <ul className="mt-4 space-y-2">
        {paginatedBlogs.map((blog) => (
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

      {/* Pagination */}
      <div className="flex space-x-4 mt-6">
        {currentPage > 1 && (
          <Link
            href={`/blog/static-blog?page=${currentPage - 1}`}
            className="px-4 py-2 bg-gray-200 rounded"
          >
            Previous
          </Link>
        )}
        {currentPage < totalPages && (
          <Link
            href={`/blog/static-blog?page=${currentPage + 1}`}
            className="px-4 py-2 bg-gray-200 rounded"
          >
            Next
          </Link>
        )}
      </div>
    </div>
  );
}
