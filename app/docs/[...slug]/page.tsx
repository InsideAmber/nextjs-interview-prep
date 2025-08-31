interface Params {
  params: { slug: string[] };
}

export default async function DocsPage({ params }: Params) {

  const { slug } = await params;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Docs Page</h1>
      <p className="mt-2">
        Current Path: <span className="font-mono">{slug.join(" / ")}</span>
      </p>
    </div>
  );
}
