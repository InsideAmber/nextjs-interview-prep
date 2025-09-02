export default async function OptionalCatchAllPage({
  params,
}: {
  params: { slug?: string[] };
}) {

const {slug} = await params
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Optional Catch-all Route</h1>
      {slug ? (
        <ul className="list-disc ml-6 mt-2">
          {slug.map((part, idx) => (
            <li key={idx}>{part}</li>
          ))}
        </ul>
      ) : (
        <p className="mt-2 text-gray-600">No slug provided.</p>
      )}
    </div>
  );
}
