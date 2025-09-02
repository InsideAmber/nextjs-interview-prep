import Link from "next/link";

const POSTS_PER_PAGE = 10;

type Post = {
  id: number;
  title: string;
  body: string; 
}

async function getPosts(page: number) {
  const startIndex = (page - 1) * POSTS_PER_PAGE;
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_start=${startIndex}&_limit=${POSTS_PER_PAGE}`,
    { cache: "no-store" } // SSR (always fresh data)
  );
  return res.json();
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams?: { page?: string };
}) {
  const {page} = await searchParams || {}
  const currentPage = Number(page) || 1;
  const posts = await getPosts(currentPage);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Blog List</h1>

      {/* Blog List */}
      <ul className="mt-4 space-y-2">
        {posts.map((post: Post) => (
          <li key={post.id}>
            <Link
              href={`/blog/${post.id}`}
              className="text-blue-600 underline"
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>

      {/* Pagination */}
      <div className="flex gap-4 mt-6">
        {currentPage > 1 && (
          <Link
            href={`/blog?page=${currentPage - 1}`}
            className="px-4 py-2 bg-gray-200 rounded"
          >
            Previous
          </Link>
        )}
        {posts.length === POSTS_PER_PAGE && (
          <Link
            href={`/blog?page=${currentPage + 1}`}
            className="px-4 py-2 bg-gray-200 rounded"
          >
            Next
          </Link>
        )}
      </div>
    </div>
  );
}
