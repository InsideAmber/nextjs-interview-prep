interface Params {
  params: { slug?: string[] };
}

export default async function HelpPage({ params }: Params) {

  const { slug } = await params;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Help Page</h1>
      {slug ? (
        <p className="mt-2">
          Help Path: <span className="font-mono">{(slug ?? []).join(" / ")}</span>
        </p>
      ) : (
        <p className="mt-2">This is the base help page (no extra path provided).</p>
      )}
    </div>
  );
}
