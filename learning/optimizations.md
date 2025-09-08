## 1. You have a blog. Some pages update daily, others monthly. How would you optimize data fetching?

This is a very common real-world scenario: some content updates frequently, others rarely.

Let’s explore how to optimize data fetching for such cases in Next.js, covering both static generation, incremental regeneration, and caching strategies.

✅ The Scenario

- You have a blog site.

- Some pages (e.g. “Today’s News”) update daily.

- Other pages (e.g. “Monthly Roundup”) update once a month.

You want to:
✔ Serve pages fast
✔ Avoid rebuilding everything for each update
✔ Only refresh pages when needed

Solution Overview Using Next.js

1️⃣ Use Static Site Generation (SSG) with revalidate (ISR)

- For pages that update daily → set revalidate: 86400 (24 hours).

- For pages that update monthly → set revalidate: 2592000 (30 days).

This way, Next.js caches the page and only regenerates it after the specified time.

`page.tsx` (for blog posts)

```ts
// app/blog/[slug]/page.tsx

import { notFound } from "next/navigation";

export const dynamic = "force-static"; // ensure it uses SSG with revalidate

export async function generateStaticParams() {
  // Generate paths for popular pages
  return [{ slug: "daily-news" }, { slug: "monthly-roundup" }];
}

export async function generateMetadata({ params }: { params: { slug: string }}) {
  return { title: params.slug };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const res = await fetch(`https://api.example.com/posts/${slug}`, {
    next: { revalidate: slug === "daily-news" ? 86400 : 2592000 },
  });

  if (!res.ok) {
    notFound();
  }

  const post = await res.json();

  return (
    <div>
      <h1 className="text-2xl font-bold">{post.title}</h1>
      <p>{post.content}</p>
      <p className="text-gray-500 text-sm">Last updated: {new Date().toLocaleString()}</p>
    </div>
  );
}
```

✅ What’s happening here?

- ✅ We're using SSG with ISR (revalidate inside fetch()).

- ✅ Daily pages regenerate every 24 hours, monthly pages every 30 days.

- ✅ Only the pages needed are rebuilt — the rest remain cached.

- ✅ Fast load times from static files served via CDN.

2️⃣ Additional Optimizations

📂 Cache-Control headers

You can also control caching using custom headers in API routes or middleware:

```ts
// app/api/posts/[slug]/route.ts
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { slug: string } }) {
  const { slug } = params;
  const data = await fetchPost(slug); // fetch from DB or API

  return NextResponse.json(data, {
    headers: {
      "Cache-Control": slug === "daily-news"
        ? "s-maxage=86400, stale-while-revalidate=59"
        : "s-maxage=2592000, stale-while-revalidate=59",
    },
  });
}
```
Benefits of Using This Approach

✔ Fast delivery through CDN caches
✔ Minimal server load — regeneration happens in the background
✔ Clear separation of frequently vs rarely updated pages
✔ Easy scalability as traffic grows
✔ Automatic cache invalidation after `revalidate` time
✔ Still fetches fresh data for users without full rebuilds

When would you NOT use SSG or ISR?

❌ If the page content depends on real-time user interaction (e.g. chat messages)
❌ If data changes multiple times per second → better handled by CSR or real-time subscriptions
❌ If personalization based on authentication or user session is required → render server-side per request

Summary

| Page Type       | Frequency | Solution                                              | Next.js Feature                |
| --------------- | --------- | ----------------------------------------------------- | ------------------------------ |
| Daily news      | Every 24h | SSG with ISR                                          | `revalidate: 86400`            |
| Monthly roundup | Every 30d | SSG with ISR                                          | `revalidate: 2592000`          |
| User dashboards | Real-time | Server-side Rendering (SSR) or Client Rendering (CSR) | `dynamic` or client-only fetch |

## 2. A page fetches a large dataset — how would you handle performance?

✅ Challenges with Large Datasets

- Slow response time → user waits for all data to load

- High memory usage → server struggles to handle requests

- Poor SEO if content isn’t pre-rendered properly

- Bandwidth waste if sending unnecessary data

- UX problems like long scroll or pagination lags

Performance Strategies in Next.js

1. Pagination / Infinite Scroll

Instead of fetching the entire dataset at once, break it into smaller chunks.

Example — Pagination with `fetch()`

```ts
export default async function BlogListPage({ searchParams }: { searchParams: { page?: string }}) {
  const page = Number(searchParams.page) || 1;
  const res = await fetch(`https://api.example.com/posts?page=${page}&limit=10`, {
    next: { revalidate: 60 },
  });
  const data = await res.json();

  return (
    <div>
      {data.posts.map(post => (
        <div key={post.id}>{post.title}</div>
      ))}
      <div>
        <a href={`?page=${page - 1}`} disabled={page <= 1}>Previous</a>
        <a href={`?page=${page + 1}`}>Next</a>
      </div>
    </div>
  );
}
```
Benefits:

✔ Sends only a small batch of data at a time
✔ Reduces server memory load
✔ Easier to cache

2. Incremental Static Regeneration (ISR)

For pages that need periodic updates but don’t require real-time rendering, you can cache data and regenerate it at intervals.

```ts
const res = await fetch("https://api.example.com/large-data", {
  next: { revalidate: 3600 },
});
```
Benefits:

✔ Users get cached content quickly
✔ Regeneration happens in the background
✔ Controls how often the dataset is fetched

3. Client-side Fetching for Heavy Data

For huge datasets or personalized content, fetch data on the client after the initial page load.

```tsx
"use client";

import { useEffect, useState } from "react";

export default function HeavyDataClient() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/large-data")
      .then(res => res.json())
      .then(setData);
  }, []);

  return (
    <div>
      {data.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}
```
Benefits:

✔ Keeps initial load fast
✔ Loads only when needed
✔ Good for user-specific content

4. Streaming (React Suspense & Server Components)

Next.js supports streaming responses where parts of the page load as data becomes available.

Example:

```ts
export default async function Page() {
  return (
    <div>
      <h1>Big Dataset</h1>
      <Suspense fallback={<div>Loading posts...</div>}>
        <PostList />
      </Suspense>
    </div>
  );
}

async function PostList() {
  const res = await fetch("https://api.example.com/large-data");
  const posts = await res.json();

  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
```
Benefits:

✔ Users see partial content immediately
✔ Improves perceived performance
✔ Handles slow APIs gracefully

5. Selective Fetching / GraphQL / Filtering

If your API supports filtering or querying specific fields, request only the necessary data.

Example query params:

```bash
https://api.example.com/posts?fields=id,title&limit=10
```
Benefits:

✔ Reduces payload size
✔ Improves load speed
✔ Saves bandwidth and processing time

6. Caching at Edge or CDN Layer

Use caching strategies via headers or platforms like Vercel:

```ts
return NextResponse.json(data, {
  headers: {
    "Cache-Control": "s-maxage=3600, stale-while-revalidate=59",
  },
});
```
Benefits:

✔ Offloads request handling to edge servers
✔ Speeds up responses globally
✔ Reduces load on origin servers

7. Compression

Ensure that your responses are compressed (gzip, Brotli) to reduce payload size. Next.js hosting providers like Vercel handle this by default.

8. Background Tasks or Preprocessing

For extremely large datasets, preprocess data offline or periodically store optimized versions in the database, rather than fetching and processing in real-time.

TL;DR — How to Handle Large Data

| Technique                    | When to use it                     | Benefits                         |
| ---------------------------- | ---------------------------------- | -------------------------------- |
| Pagination / Infinite Scroll | When data is too big               | Fast load, smaller payload       |
| ISR (revalidate)             | Periodic updates                   | Cached content with freshness    |
| Client-side fetching         | User-specific or non-critical data | Faster initial load              |
| Streaming (Suspense)         | Large datasets                     | Improved perceived performance   |
| Filtering / GraphQL          | API-supported data                 | Small, optimized requests        |
| CDN / Cache-Control          | Global access                      | Faster responses, offload server |
| Compression                  | Heavy payloads                     | Reduced bandwidth                |
| Preprocessing                | Very large or slow data            | Avoid runtime processing         |
