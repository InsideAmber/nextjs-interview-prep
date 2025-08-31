export const revalidate = 10; // re-generate page every 10 seconds

export default async function ISRPage() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts/1");
  const post = await res.json();

  return (
    <div>
      <h1 className="text-xl font-bold">Incremental Static Regeneration (ISR)</h1>
      <p>{post.title}</p>
      <p className="text-sm text-gray-500">
        (This page regenerates every 10s in the background)
      </p>
    </div>
  );
}
