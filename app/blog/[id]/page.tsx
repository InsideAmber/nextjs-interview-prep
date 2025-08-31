import Link from "next/link";

interface Params {
  params: { id: string };
}

export default async function BlogDetails({ params }: Params) {

const {id} = await params;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Blog Post #{id}</h1>
      <p className="mt-2">
        This is the details page for blog post with ID: {id}
      </p>

      <div className="mt-6 flex gap-6">
        {/* Navigate to Catch-All Route */}
        <Link
          href="/docs/getting-started/installation"
          className="text-blue-600 underline"
        >
          Go to Docs (Catch-All Route)
        </Link>

        {/* Navigate to Optional Catch-All */}
        <Link
          href="/help"
          className="text-green-600 underline"
        >
          Go to Help (Optional Catch-All Route)
        </Link>
      </div>
    </div>
  );
}
