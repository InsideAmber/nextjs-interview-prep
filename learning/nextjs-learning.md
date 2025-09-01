## 1. What is Next.js and how is it different from CRA (Create React App)?

Next.js is a React framework built by Vercel that provides everything you need to build production-ready full-stack web applications with React.

👉 Think of it as:
React (UI library) + Batteries included (routing, SSR, API routes, optimizations).

How is Next.js different from CRA (Create React App)?

| Feature           | **CRA (Create React App)**                                                  | **Next.js**                                                                                                                        |
| ----------------- | --------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| **Type**          | Frontend build setup for React                                              | Full-stack React framework                                                                                                         |
| **Routing**       | No routing built-in, need `react-router-dom`                                | File-based routing (just create files in `app/` or `pages/`)                                                                       |
| **Rendering**     | Only **CSR (Client-Side Rendering)**                                        | Supports **SSR (Server-Side Rendering)**, **SSG (Static Site Generation)**, **ISR (Incremental Static Regeneration)**, and **CSR** |
| **API / Backend** | No backend support (need separate Node/Express API)                         | Has **API routes** built-in → backend + frontend in one project                                                                    |
| **Performance**   | Optimized for dev, but not production (no image optimization, no SEO focus) | Production-ready (Image optimization, Script optimization, SEO-friendly)                                                           |
| **Deployment**    | Need to configure (Netlify, Firebase, etc.)                                 | First-class deployment on **Vercel** (plug & play)                                                                                 |
| **Use Cases**     | Simple SPAs, prototypes                                                     | Full-stack apps, SEO-focused sites, dashboards, e-commerce, blogs                                                                  |

Example to Show the Difference
In CRA

- You’d write a React app with only CSR:

```tsx
// CRA App.jsx
function App() {
  return <h1>Hello from CRA</h1>;
}
```
- If you want server rendering → you must set up Next.js, Gatsby, or custom Node server separately.

In Next.js

You can decide how to render a page (SSR, SSG, CSR) just by exporting different functions.

Example: SSR Page in Next.js
app/page.tsx

```tsx
export default async function HomePage() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts/1", {
    cache: "no-store", // ensures SSR
  });
  const post = await res.json();

  return (
    <div>
      <h1>SSR Example</h1>
      <p>{post.title}</p>
    </div>
  );
}
```
this will fetch data on the server and render HTML before sending to client.
In CRA, this is impossible without extra server setup.

## 2. Explain the difference between: CSR (Client-side Rendering) and SSR (Server-side Rendering) and SSG (Static Site Generation) and ISR (Incremental Static Regeneration)

Rendering Strategies in Next.js

1. CSR (Client-side Rendering)

- Page loads with minimal HTML + JavaScript bundle.

- Data is fetched in the browser (client) after initial page load.

- Good for: dashboards, authenticated pages (SEO not important).

[Code Example](https://github.com/InsideAmber/nextjs-interview-prep/blob/master/app/topics/rendering/csr/page.tsx)

2. SSR (Server-side Rendering)

- HTML is generated on each request (server fetch → render → send).

- Good for: dynamic pages that need fresh data on every request.

[Code Example](https://github.com/InsideAmber/nextjs-interview-prep/blob/master/app/topics/rendering/ssr/page.tsx)

3. SSG (Static Site Generation)

- HTML is pre-rendered at build time and reused for every request.

- Good for: blogs, docs, marketing pages (rarely changing).

[Code Example](https://github.com/InsideAmber/nextjs-interview-prep/blob/master/app/topics/rendering/ssg/page.tsx)

4. ISR (Incremental Static Regeneration)

- Like SSG, but regenerates a new static page in the background after a set time (`revalidate`).

- Good for: e-commerce product pages, news feeds (data updates but not every second).

[Code Example](https://github.com/InsideAmber/nextjs-interview-prep/blob/master/app/topics/rendering/isr/page.tsx)

Real World Examples

- **SSG** → Blog, Portfolio, Docs

- **ISR** → E-commerce sites, News sites (refresh every few minutes)

- **SSR** → Social Media, Real-time dashboards, Chat apps

- **CSR** → Client-only features like notifications, user profile updates

Summary:

- CSR renders data in the browser after load (bad for SEO).
- SSR renders HTML on every request (fresh but slower).
- SSG pre-renders at build time (fastest but static).
- ISR combines SSG + dynamic updates by re-generating pages in the background at intervals.

## 3. What is hydration in Next.js?

When you use Next.js (or React in general), the rendering happens in two phases:

Server-Side Rendering (SSR or SSG) → Next.js renders your page into static HTML on the server and sends it to the browser.
✅ This makes your app fast and SEO-friendly.

Hydration (on the client) → Once the HTML is loaded in the browser, React’s JavaScript takes over. It attaches event listeners, makes the page interactive, and “hydrates” the static HTML into a live React app.

👉 Without hydration, your HTML is just static and not interactive. For example, buttons won’t work, inputs won’t update.

Real Life Analogy

- Server-rendered HTML = A statue (looks real, but frozen).

- Hydration = Pouring life into the statue so it can move and interact.

## 4. When do we use client component in nextjs?

knowing when to use "use client" is one of the most important skills in Next.js 13+.

By default, everything should stay a Server Component (faster, lighter, SEO-friendly).
You only make a component a Client Component if you really need interactivity or browser-only features.

When to use `"use client"`

You should make a component a Client Component if it needs:

React hooks that run in the browser

- `useState`, `useEffect`, `useRef`, `useContext`

Example:

```tsx
"use client";
import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
}
```
2. Event handlers (onClick, onChange, etc.)

- Example: `Buttons`, `forms`, `modals`

```tsx
"use client";
export default function Button() {
  return <button onClick={() => alert("Clicked!")}>Click Me</button>;
}
```
3. Browser APIs (that don’t exist on the server)

- `localStorage`, `window`, `document`, `navigator`

```tsx
"use client";
import { useEffect, useState } from "react";

export default function ThemeDetector() {
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    const dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(dark ? "dark" : "light");
  }, []);
  return <p>Theme: {theme}</p>;
}
```
4. Dynamic UI that depends on user interaction

- Dropdowns, tabs, sliders, drag & drop, animations

- Anything that needs live updates without refreshing

5. Third-party libraries that require the DOM

- e.g. Chart.js, Leaflet maps, React DnD, Framer Motion

**When NOT to use "use client"**

- Data fetching (should be done in Server Components with async/await).

- Static UI (text, static layout, SEO content).

- Anything that doesn’t need interactivity.

## 5. What are dynamic routes and catch-all routes?

1. Dynamic Routes in Next.js

Dynamic routes let you create pages where part of the URL is variable.
For example, `/blog/1`, `/blog/2`, `/blog/3` can all map to the same dynamic file.

Example: Blog Post Page

```tsx
import { useParams } from "next/navigation";

export default function BlogPostPage() {
  const params = useParams(); // { id: "1" } if URL is /blog/1
  return (
    <div>
      <h1>Blog Post ID: {params.id}</h1>
    </div>
  );
}
```
✅ Now:

- `/blog/1` → `Blog Post ID: 1`

- `/blog/2` → `Blog Post ID: 2`

This is called a Dynamic Segment.

2. Catch-All Routes

Catch-all routes let you capture multiple path segments in a single parameter.

```tsx
import { useParams } from "next/navigation";

export default function DocsPage() {
  const params = useParams(); 
  // If URL = /docs/getting-started/installation
  // params.slug = ["getting-started", "installation"]

  return (
    <div>
      <h1>Docs Page</h1>
      <p>Slug parts: {params.slug?.join(" / ")}</p>
    </div>
  );
}
```

✅ Now:

- `/docs/intro` → `Slug parts: intro`

- `/docs/getting-started/installation` → Slug parts: `getting-started / installation`

- `/docs/anything/else/deep` → captures all segments

3. Optional Catch-All Routes

Sometimes, you want to allow the parameter to be optional.

```tsx
import { useParams } from "next/navigation";

export default function DocsPage() {
  const params = useParams();
  // If /docs → params.slug is undefined
  // If /docs/setup → params.slug = ["setup"]

  return (
    <div>
      <h1>Docs Page</h1>
      <p>Slug: {params.slug ? params.slug.join(" / ") : "Home"}</p>
    </div>
  );
}
```

✅ Now:

- `/docs` → `Slug: Home`

- `/docs/setup` → `Slug: setup`

- `/docs/setup/install` → `Slug: setup / install`

Key Differences:

| Route Type             | Example URL            | Params value                         |
| ---------------------- | ---------------------- | ------------------------------------ |
| Dynamic `[id]`         | `/blog/1`              | `{ id: "1" }`                        |
| Catch-All `[...slug]`  | `/docs/a/b/c`          | `{ slug: ["a","b","c"] }`            |
| Optional `[[...slug]]` | `/docs` or `/docs/a/b` | `{ slug: undefined }` or `["a","b"]` |

In short:

- Use Dynamic when you expect a single variable.

- Use Catch-All when you expect nested or multiple segments.

- Use Optional Catch-All when it can be missing or multiple.

## 6. What is the difference between pages and app directories?

| Feature        | **Pages Directory**                    | **App Directory**                     |
| -------------- | -------------------------------------- | ------------------------------------- |
| Location       | `/pages`                               | `/app`                                |
| Routing        | File-based, old system                 | File-based, new system                |
| Rendering      | CSR, SSR, SSG, ISR                     | Server Components + CSR (when needed) |
| Data Fetching  | `getServerSideProps`, `getStaticProps` | Direct `async` fetch in components    |
| Layouts        | Manually via `_app.tsx`                | Built-in `layout.tsx`                 |
| Error Handling | Custom `_error.tsx`                    | Built-in `error.tsx`, `not-found.tsx` |
| Loading UI     | Manual                                 | Built-in `loading.tsx`                |
| Recommended    | Old projects                           | New projects                          |


## 7. How does `useRouter()` work?

- `useRouter()` is a React Hook provided by Next.js to access and manipulate the router object inside your components.

- The router object allows you to:

  - Read current route info (`pathname`, `query params`, etc.)

  - Navigate programmatically

  - Subscribe to route change events

[Code Example](https://github.com/InsideAmber/nextjs-interview-prep/blob/master/app/about/page.tsx)

Key Difference

| Feature            | `pages/` router (`next/router`) | `app/` router (`next/navigation`) |
| ------------------ | ------------------------------- | --------------------------------- |
| Full router object | ✅ Yes                           | ❌ No (use separate hooks)         |
| Programmatic nav   | ✅ `router.push`, `replace`      | ✅ `router.push`, `replace`        |
| Query params       | ✅ `router.query`                | ❌ Use `useSearchParams()`         |
| Pathname           | ✅ `router.pathname`             | ❌ Use `usePathname()`             |
| Client-only?       | ❌ Can be SSR                    | ✅ Must be inside `"use client"`   |


## 8. How do you handle programmatic navigation in Next.js?

In Next.js, navigation is usually handled via the Link component for declarative navigation. But sometimes you need to navigate programmatically — e.g., after a form submit, button click, or API response.

Handling Programmatic Navigation

<!-- check dashboard page for link -->
[Code Example](https://github.com/InsideAmber/nextjs-interview-prep/blob/master/app/dashboard/page.tsx)

## 9. What are getStaticProps, getServerSideProps, and getInitialProps and what are equivalent method in latest app router?

1. `getStaticProps` (Pages Router)

- Runs at build time.

- Generates static HTML + JSON.

- Used for static blogs, docs, marketing sites.

- Supports ISR (Incremental Static Regeneration) with revalidate.

✅ App Router Equivalent

You don’t use `getStaticProps` anymore. Instead:

```tsx
// app/blog/page.tsx (Server Component)
export default async function BlogPage() {
  const posts = await fetch("https://api.example.com/posts", {
    cache: "force-cache",   // default: static
    next: { revalidate: 60 } // ISR: revalidate every 60s
  }).then(res => res.json());

  return <BlogList posts={posts} />;
}
```
👉 `cache: 'force-cache'` ≈ getStaticProps
👉 `next: { revalidate: 60 }` ≈ ISR

2. `getServerSideProps` (Pages Router)

- Runs on every request.

- Always returns fresh data from server.

- Used for dashboards, auth pages, live data.

✅ App Router Equivalent

```tsx
// app/dashboard/page.tsx (Server Component)
export default async function DashboardPage() {
  const stats = await fetch("https://api.example.com/stats", {
    cache: "no-store" // disables caching → always fresh
  }).then(res => res.json());

  return <Dashboard stats={stats} />;
}
```
👉 `cache: 'no-store'` ≈ `getServerSideProps`

3. `getInitialProps` (Pages Router, old)

- Runs on both server and client.

- Can be used in `_app.js` and `_document.js`.

- ❌ But it disables automatic static optimization, causes large bundles, and is considered legacy.

✅ App Router Equivalent

There is no direct replacement.

- Shared logic now goes into Layouts (`app/layout.tsx`).

- Data fetching is handled by Server Components (not a special lifecycle method).

- Client hydration logic is handled in Providers.


| Rendering Style | Pages Router (Old)              | App Router (New)                          |
| --------------- | ------------------------------- | ----------------------------------------- |
| **SSG**         | `getStaticProps`                | `fetch(..., { cache: 'force-cache' })`    |
| **ISR**         | `getStaticProps` + `revalidate` | `fetch(..., { next: { revalidate: X } })` |
| **SSR**         | `getServerSideProps`            | `fetch(..., { cache: 'no-store' })`       |
| **CSR**         | `useEffect` in client comp      | `"use client"` + `useEffect` fetch        |



