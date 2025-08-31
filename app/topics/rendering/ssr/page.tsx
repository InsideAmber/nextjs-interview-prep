export default async function SSRPage() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts/1", {
    cache: "no-store", // ensures fresh fetch on every request
  });
  const post = await res.json();

  return (
    <div>
      <h1 className="text-xl font-bold">Server-side Rendering (SSR)</h1>
      <p>{post.title}</p>
    </div>
  );
}
