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
