import Link from "next/link";

async function getPost(id: string) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  return res.json();
}

export default async function BlogDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const {id} = await params
  const post = await getPost(id);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{post.title}</h1>
      <p className="mt-4">{post.body}</p>

      {/* Back */}
      <Link href="/blog" className="mt-6 inline-block text-blue-600 underline">
        ← Back to Blog
      </Link>

      <div className="mt-8 space-y-3">
        <h2 className="text-xl font-semibold">Explore Categories</h2>

        {/* Catch-all route example */}
        <Link
          href="/docs/category/technology/frontend/react"
          className="block text-blue-500 underline"
        >
          Go to Catch-all: /blog/category/technology/frontend/react
        </Link>

        {/* Optional catch-all route examples */}
        <Link
          href="/help"
          className="block text-blue-500 underline"
        >
          Go to Optional Catch-all (empty): /help
        </Link>

        <Link
          href="/blog/category/javascript"
          className="block text-blue-500 underline"
        >
          Go to Optional Catch-all (with slug): /blog/category/javascript
        </Link>
      </div>
    </div>
  );
}
