export default async function SSGPage() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts/1", {
    cache: "force-cache", // default; fetches at build time
  });
  const post = await res.json();

  return (
    <div>
      <h1 className="text-xl font-bold">Static Site Generation (SSG)</h1>
      <p>{post.title}</p>
    </div>
  );
}
