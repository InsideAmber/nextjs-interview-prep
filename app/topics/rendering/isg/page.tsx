export const revalidate = 10; // re-generate page every 10 seconds

export default async function ISRPage() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts/1", {
    next: { revalidate: 10 }, // important for fetch caching
  });
  const post = await res.json();

  console.log("Page is regenerating at:", new Date().toISOString());

  return (
    <div>
      <h1 className="text-xl font-bold">Incremental Static Regeneration (ISR)</h1>
      <p>{post.title}</p>
      <p className="text-sm text-gray-500">
        (This page regenerates every 10s in the background)
      </p>
      <p className="mt-2 text-xs text-blue-600">
        Server time: {new Date().toISOString()}
      </p>
    </div>
  );
}


/**
👉 If you refresh before 10s, you’ll still get the cached (old) page.
👉 If you refresh after 10s, the first request will still give you the old page (stale), but it will trigger regeneration in the background.
👉 If you refresh again after regeneration finishes, you’ll finally see the updated page.
 */

/**
Quick Example (with revalidate = 10)
t = 0s   → User visits → Page generated, cached (old data)
t = 5s   → Refresh → Same cached page (no update)
t = 10s  → Cache expires (marked stale)
t = 11s  → Refresh → Old page served BUT regeneration triggered in background
t = 12s  → Refresh again → Now you get updated page
 */