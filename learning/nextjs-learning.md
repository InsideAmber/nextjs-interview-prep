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


## 10. How does data fetching differ in app directory using fetch()?

Old (Pages Router)

- Data fetching was tied to special functions:

  - getStaticProps → SSG (Static Site Generation, built at build time).

  - getServerSideProps → SSR (fetch on every request).

  - getStaticPaths → for dynamic routes.

  - getInitialProps → legacy.

👉 Problem: too many APIs, and limited flexibility (only at page level).

New (App Router –` /app`)

In the App Router, we just use `fetch()` (or any async call like DB queries) inside Server Components.
Next.js extends the native `fetch()` with built-in caching & revalidation.

✅ Key behaviors of `fetch()` in App Router:

1. Default Caching (Static by default)

```ts
const data = await fetch("https://api.example.com/posts").then(r => r.json());
```
- This is cached at build time (like SSG).

- Next.js treats it as static.

2. Dynamic Data (SSR)

```ts
const data = await fetch("https://api.example.com/posts", { cache: "no-store" });
```
- `cache: "no-store"` disables cache.

- Always fetch fresh data on every request (like `getServerSideProps`).

3. ISR (Incremental Static Regeneration / Revalidation)

```tsx
const data = await fetch("https://api.example.com/posts", {
  next: { revalidate: 60 }, // revalidate every 60s
});
```
- Cache the response, but revalidate after 60s.

- Like `getStaticProps` with `revalidate`.

4. Dynamic Routes

You can still use [id] and fetch inside the page or layout file.
No need for getStaticPaths, because fetch() with revalidate or generateStaticParams handles it.

5. Where you can fetch

- Server Components → Best place (runs only on server, never in client bundle).

- Client Components → Use `useEffect` or SWR/React Query (for client-only fetching).


## 11. What are loading and error UI components in App Router?

In the App Router, you don’t use `useState` + conditional UI everywhere for loading/error states like before.
Instead, Next.js gives you special file-based components:

`loading.tsx`

- A file you put inside a route segment.

- Automatically shown when a Server Component is fetching data (or during suspense).

- Acts like a skeleton / spinner until the data is ready.

- File name must be `loading.tsx` (or `.js`).

✅ Example:

```tsx
// app/blog/loading.tsx
export default function Loading() {
  return <p>⏳ Loading blog posts...</p>;
}
```
When you visit /blog, this UI is shown until your page.tsx fetch finishes.

`error.tsx`

- A file that handles errors thrown in that route segment (or child).

- Acts like an error boundary.

- File name must be `error.tsx`.

Must be a Client Component (`"use client"`) because error boundaries rely on React client-side features.

✅ Example:

```tsx
// app/blog/error.tsx

"use client";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div>
      <h2>🚨 Something went wrong!</h2>
      <p>{error.message}</p>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
```
reset() will re-attempt rendering the segment (re-run the server component).

Flow Diagram:

```bash
app/blog/page.tsx → fetch data
        │
        ├── success → render page
        ├── pending → show loading.tsx
        └── error   → show error.tsx
```
Extra Related Files

- `not-found.tsx` → handles 404s inside that segment.

- `global-error.tsx` → top-level error boundary for the whole app.

## 12. How do you create an API endpoint in Next.js?

How to Create an API Endpoint

- Create a folder inside `app/api/`

- Add a `route.ts` (or `route.j`s) file inside.

- Export HTTP methods (`GET`, `POST`, `PUT`, `DELETE`, etc.) as functions.

Example: Simple API Endpoint

📂 File: `app/api/hello/route.ts`

[Code Example](https://github.com/InsideAmber/nextjs-interview-prep/blob/master/app/api/hello/route.ts)

👉 Access at:

```bash

http://localhost:3000/api/hello

```
- GET `/api/hello` → returns `{ message: "Hello from Next.js API!" }`

- POST `/api/hello` with `{ "name": "Amber" }` → returns `{ message: "Data received", data: { "name": "Amber" } }`

Example: Dynamic API Route

📂 File: `app/api/blog/[id]/route.ts`

[Code Example](https://github.com/InsideAmber/nextjs-interview-prep/blob/master/app/api/blog/%5Bid%5D/route.ts)

👉 Access at:

```bash

/api/blog/123
```
Response:

```bash

{ "blogId": "123" }
```

Example: Catch-All API Route

📂 File: `app/api/docs/[...slug]/route.ts`

[Code Example](https://github.com/InsideAmber/nextjs-interview-prep/blob/master/app/api/docs/%5B...slug%5D/route.ts)

👉 /api/docs/nextjs/routing →

```json

{ "path": ["nextjs", "routing"] }

```

Key Points

- `NextResponse.json()` is used for responses.

- You can export one function per HTTP method in each `route.ts`.

- Folders under `/api/` map directly to API routes.

- Supports dynamic and catch-all routes like pages.

## 13. What are the use cases for built-in API routes vs calling external APIs?

1. Next.js Built-in API Routes (`app/api/...`)

These are serverless functions that live inside your Next.js app.

✅ Use cases:

1. Custom Backend Logic

- If you need to transform, validate, or sanitize data before sending to the frontend.

- Example: Your frontend form submits sensitive data → you check authentication & validate → then send to DB.

2. Hiding API Keys / Secrets

- You can keep API keys (e.g., Stripe, OpenAI, Firebase Admin SDK) safe in server environment.

- Example: POST `/api/payment` → securely call Stripe → return response.

3. Proxying External APIs

- Avoid exposing direct API URLs or CORS issues.

- Example: Instead of fetching `https://thirdparty.com/api?key=SECRET,`
your client calls `/api/news` → your Next.js API route fetches data with your secret key → returns clean JSON.

4. Small Backend Needs Without Separate Server

- Useful when your project doesn’t have a full backend but you need basic server functionality (auth, uploads, etc.).

✅ Analogy → Think of API routes as your mini backend built into Next.js.

🔹 2. Calling External APIs (directly in Server Components / fetch)

Instead of making your own API, you directly call an external API from Next.js (server-side or client-side).

✅ Use cases:

1. Public APIs with No Secrets

- Example: Fetching `jsonplaceholder.typicode.com/posts` (like we did in blogs).

- No need for proxying or hiding anything.

2. Faster Development (Skip Middle Layer)

- If API already provides exactly what you need, call it directly.

3. Server-Side Rendering with External APIs

- Example: `app/blog/page.tsx` directly fetching from external API to render posts.

4. Third-party data (News, Weather, etc.)

- If data doesn’t require modification, you don’t need an extra API route.

Comparison Table

| Feature                                | API Routes (`app/api`)                      | External API Direct Call                     |
| -------------------------------------- | ------------------------------------------- | -------------------------------------------- |
| **Hides secrets**                      | ✅ Yes                                       | ❌ No                                         |
| **Custom validation / transformation** | ✅ Yes                                       | ❌ No                                         |
| **CORS handling**                      | ✅ Yes (Next.js runs on server)              | ❌ Might face issues                          |
| **Performance**                        | ⚠️ Slight overhead (extra hop)              | ✅ Direct & faster                            |
| **Best for**                           | Auth, DB ops, payments, proxy, custom logic | Public APIs, read-only data, SEO-ready fetch |


Code Example -

👉 Calling External API directly (good for public data):

```tsx
export default async function BlogPage() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();

  return (
    <div>
      <h1>Blogs</h1>
      {posts.slice(0, 5).map((post: any) => (
        <p key={post.id}>{post.title}</p>
      ))}
    </div>
  );
}
```
👉 Using API Route for Sensitive Logic:

```tsx
import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();

  // Example: transform data before returning
  return NextResponse.json(posts.slice(0, 5));
}
```
Then call in Client Component:

```tsx
"use client";
import { useEffect, useState } from "react";

export default function BlogClient() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("/api/posts")
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);

  return <ul>{posts.map((p: any) => <li key={p.id}>{p.title}</li>)}</ul>;
}
```

Rule of Thumb:

- If secrets, auth, DB, payments, transformations → use Next.js API routes.

- If public/read-only APIs → fetch directly in Server Components.

## 14. How do you handle authentication (JWT/session) in API routes?

Two Main Ways of Handling Authentication in API Routes

1. JWT (Token-based auth)

- Store a JWT in cookies or localStorage.

- Each request to `/api/...` must include the token (e.g., in headers or cookies).

- Backend (API route) verifies the token before proceeding.

2. Session-based auth (with cookies)

- Instead of sending JWT manually, you store a session in DB (Redis/Postgres etc.) and set an HTTP-only cookie.

- Each API request automatically includes the cookie.

- API route validates session ID → fetches user.

Example 1: JWT Authentication in Next.js API Route

Issue JWT when user logs in

📂 `app/api/login/route.ts`

[Code Example](https://github.com/InsideAmber/nextjs-interview-prep/blob/master/app/api/login/route.ts)

👉 Client can store this token (in localStorage or an HTTP-only cookie).

Verify JWT in Protected API Route

📂 `app/api/profile/route.ts`

[Code Example](https://github.com/InsideAmber/nextjs-interview-prep/blob/master/app/api/profile/route.ts)

👉 Call with:

```bash
curl -H "Authorization: Bearer <token>" http://localhost:3000/api/profile
```

Example 2: Session-based Authentication (safer for web apps)

Instead of sending tokens, you use HTTP-only cookies (cannot be accessed by JS).
Usually handled by libraries like NextAuth.js, but you can roll your own.

📂 `app/api/login-with-session/route.ts`

[Code Example](https://github.com/InsideAmber/nextjs-interview-prep/blob/master/app/api/login-with-session/route.ts)

📂 `app/api/profile-with-session/route.ts`

[Code Example](https://github.com/InsideAmber/nextjs-interview-prep/blob/master/app/api/profile-with-session/route.ts)

👉 Client doesn’t have to attach anything — browser automatically sends the cookie.

JWT vs Session in Next.js API Routes

| Feature         | JWT                             | Session                        |
| --------------- | ------------------------------- | ------------------------------ |
| **Storage**     | LocalStorage / Cookie           | Cookie                         |
| **Scalability** | ✅ Stateless (easy to scale)     | ❌ Needs DB (Redis, Postgres)   |
| **Security**    | ❌ Vulnerable if token leaked    | ✅ Safer with HTTP-only cookies |
| **Best for**    | Mobile apps, microservices APIs | Web apps with login/logout     |


Rule of Thumb (Interview Answer):

- Use JWT if you want stateless, mobile-friendly APIs.

- Use Session (cookie-based) if your app is mostly web users → safer against XSS, automatic cookie handling.

- In modern Next.js, many teams use NextAuth.js (now `auth.js`) which supports both under the hood.

## 15. How does Next.js help with SEO out of the box?
  - Meta tags, Open Graph, SSR, SSG


How Next.js Helps with SEO

1. Meta Tags (Title, Description, Keywords, etc.)

- In the App Router (Next.js 13+), you define metadata directly in your page or layout.

- Next.js automatically injects these tags into the `<head>` of your HTML before it reaches the browser, which search engines can crawl.

👉 Example (`app/about/page.tsx`):

```tsx
export const metadata = {
  title: "About Amber | Frontend Dev",
  description: "Amber is a frontend developer with expertise in React & Next.js",
  keywords: ["Amber", "Frontend", "React", "Next.js"],
};

export default function AboutPage() {
  return <h1>About Amber</h1>;
}
```
✔ SEO Benefit → Search engines see the meta tags right away (no JS needed).

2. Open Graph & Social Media Tags

- Next.js metadata API also supports OG tags & Twitter cards for rich previews.

👉 Example (`app/blog/[id]/page.tsx`):

```tsx
export async function generateMetadata({ params }: { params: { id: string } }) {
  const post = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`)
    .then((res) => res.json());

  return {
    title: post.title,
    description: post.body,
    openGraph: {
      title: post.title,
      description: post.body,
      url: `https://yoursite.com/blog/${params.id}`,
      images: [
        {
          url: "https://yoursite.com/og-image.png",
          width: 800,
          height: 600,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.body,
      images: ["https://yoursite.com/og-image.png"],
    },
  };
}
```
✔ SEO Benefit → When sharing links on LinkedIn, Twitter, WhatsApp, the right preview appears.

3. SSR (Server-Side Rendering)

- Pages are rendered on the server for every request.

- Search engines get fully rendered HTML, not a blank `<div>` like in CSR.

👉 Use Case → Pages with frequent updates (e.g., news, stock prices).

4. SSG (Static Site Generation)

- Pages are pre-built at build time and served as static HTML.

- Search engines can crawl instantly without waiting for JS.

👉 Use Case → Marketing pages, blogs, portfolios.

5. ISR (Incremental Static Regeneration)

- Hybrid between SSR & SSG.

- Content stays static but is re-generated in background (e.g., every 10s).

- SEO stays strong since crawlers always see HTML, not JS.

👉 Use Case → Blogs, e-commerce product pages (not changing every second).

✅ In Short

- Meta tags → Title, description, keywords.

- Open Graph → Social sharing previews.

- SSR/SSG/ISR → Pre-rendered HTML for SEO-friendly crawling.

App Router Metadata API → Cleaner way to handle SEO than old `<Head>` from `next/head`.

## 16. What is Image Optimization in Next.js?
  - `next/image` component

Image Optimization in Next.js (next/image)

Next.js ships with a special `<Image />` component that automatically optimizes images on-demand.

Instead of serving a raw `<img>`, it handles:

- Lazy Loading (only loads when visible on screen).

- Responsive Sizes (different sizes for mobile, tablet, desktop).

- Automatic Compression & WebP (faster than JPEG/PNG).

- CDN Caching (images are cached & served efficiently).

- Avoids Cumulative Layout Shift (CLS) by requiring width & height.

🔹 Example: Using `next/image`

👉 File: `app/about/page.tsx`

```tsx
import Image from "next/image";

export const metadata = {
  title: "About with Image Optimization",
};

export default function AboutPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">About Amber</h1>
      <Image
        src="/profile.jpg"        // local image (in /public folder)
        alt="Amber Profile"
        width={400}
        height={400}
        priority   // preload for above-the-fold content
        className="rounded-lg shadow-lg"
      />
      <p className="mt-4 text-gray-700">
        This image is optimized by Next.js automatically.
      </p>
    </div>
  );
}
```
✔ Place `profile.jpg` inside the `public/` folder.

✔ When you build or run dev server, Next.js serves optimized versions.

Remote Images (e.g., from API/CDN)

If you load images from external sources, you must allow their domains in `next.config.js`:

```js
// next.config.js
module.exports = {
  images: {
    domains: ["images.unsplash.com", "cdn.example.com"],
  },
};
```
👉 Usage:

```tsx
<Image
  src="https://images.unsplash.com/photo-12345"
  alt="Remote Image"
  width={600}
  height={400}
/>
```

Benefits for SEO & Performance

✅ Faster load time → improves Core Web Vitals.

✅ Lazy loading → saves bandwidth.

✅ Responsive → mobile users don’t download huge desktop images.

✅ WebP support → smaller size, search engines like it.

In Short

- Use `<Image />` from next/image instead of `<img>`.

- Works with local (public folder) and remote images.

- Gives automatic lazy loading, resizing, caching, and format conversion.

## 17. What is Code Splitting and how does Next.js do it automatically?

What is Code Splitting?

👉 In plain React (CRA), if you build your app, it often produces one big JavaScript bundle.

- That means when a user visits any page, the browser downloads all the code for the entire site (even pages the user never visits).

- This increases load time ⏳ and hurts performance & SEO.

Code Splitting = breaking your app into smaller chunks (bundles) so that only the necessary code is sent to the browser.

How Next.js Does Code Splitting Automatically

Next.js does route-based code splitting out of the box 🚀:

- Each page (route) becomes its own JS chunk.

- When you navigate, Next.js loads only the JS for that page.

- Shared components (like Navbar, Layout) are cached & reused.

✅ Example:

```bash
app/
 ├─ page.tsx         → "/" → bundle only this page’s code
 ├─ about/page.tsx   → "/about" → separate chunk
 ├─ blog/[id]/page.tsx → "/blog/:id" → separate chunk
 ├─ components/Navbar.tsx → shared chunk
```
So:

- Visiting `/` loads → `page.tsx` + shared chunks.

- Navigating to `/about` lazy-loads → `about/page.tsx` only when needed.

👉 This is automatic, you don’t need to configure anything.

Example: Verifying Code Splitting

Run:

```bash
npm run build
```

Next.js will output something like:

```bash
Route (app)                            Size     First Load JS
┌ ○ /                                  1.2 kB   75.2 kB
├ ○ /about                             0.9 kB   74.9 kB
├ ● /blog/[id]                         1.5 kB   76.1 kB
```

✅ Each route has its own bundle size.
✅ Shared code (React, Next.js runtime, Navbar, etc.) is deduplicated.

Dynamic Imports (Manual Code Splitting)

Sometimes, you don’t even want an entire component to load until needed (e.g., a heavy chart library).
Next.js provides `next/dynamic` for manual code splitting.

👉 Example (`app/page.tsx`):

```tsx
"use client";
import dynamic from "next/dynamic";
import { useState } from "react";

// Load Chart component only when used
const Chart = dynamic(() => import("../components/Chart"), { ssr: false });

export default function HomePage() {
  const [showChart, setShowChart] = useState(false);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Home Page</h1>
      <button
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        onClick={() => setShowChart(true)}
      >
        Show Chart
      </button>
      {showChart && <Chart />}
    </div>
  );
}
```
✔ The chart code will not be included in the initial bundle.
✔ It’s lazy-loaded only when needed.

✅ In Short

- Code Splitting = loading only the code needed.

- Next.js automatically splits per route (no config needed).

- For big libraries → use `dynamic()` import to split further.

- This improves performance, SEO, and user experience.

## 18. What is middleware in Next.js and what are use cases?

What is Middleware in Next.js?

- Middleware is code that runs before a request is completed.

- It sits between the user’s request and the response.

- Runs on the Edge Runtime (super fast, deployed globally).

- Can modify requests, responses, redirects, rewrites, or block access.

👉 In simple words: Middleware = request gatekeeper.

Where to Create Middleware

At the root of your project:

```bash
/middleware.ts
```

This file runs for every request that matches the paths you define.

Example: Simple Middleware

👉 File: `middleware.ts`

```ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Example: Block access to /admin if no token
  const token = request.cookies.get("session")?.value;

  if (!token && request.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next(); // continue normally
}

// Apply only to these routes
export const config = {
  matcher: ["/admin/:path*"],
};
```
If a user tries to access `/admin` without session → redirected to `/login`.

Common Use Cases of Middleware

1. Authentication & Authorization

- Protect routes (`/admin`, `/dashboard`).

- Redirect if not logged in.

2. Localization / Internationalization

- Detect user’s country or language from headers.

- Redirect to `/en`, `/fr`, `/hi` automatically.

```ts
if (request.headers.get("accept-language")?.startsWith("fr")) {
  return NextResponse.redirect(new URL("/fr", request.url));
}
```

3. Bot Detection / Rate Limiting

- Block bots or too many requests.

- Example: Check `user-agent` or track request counts.

4. A/B Testing / Feature Flags

- Serve different versions of a page based on cookie.

- Example: Show new UI to 50% of users.

5. Rewrites

- Re-map routes without changing URL.

- Example: `/blog/123` → internally `/api/posts/123`.

```ts
return NextResponse.rewrite(new URL("/api/posts/123", request.url));
```

Middleware vs API Routes

- Middleware → Runs before hitting a page or API.

- API Routes → Handle data processing after request reaches server.

Think:

👉 Middleware = bouncer at the door.
👉 API Route = bartender serving drinks. 

✅ In Short

- Middleware runs before response → edge fast, no server spin-up.

- Used for auth, redirects, localization, logging, A/B testing, rewrites.

- Defined in `middleware.ts` at project root.

## 19. What is server action and how it works?

What is a Server Action?

A Server Action is a special function that runs only on the server, but can be called directly from a Client Component or a Server Component without creating a separate API route.

👉 Think of it like:

- API endpoint + function call combined.

- Lets you mutate data (DB, external API, files) directly on the server while keeping client code super clean.

- No need to write `/api/...` endpoints for every form or mutation.

How it Works

- You define a server action inside a file with `"use server"` directive.

- You can call that function from a form (`action={serverFunction}`) or imperatively (`await serverFunction(data)`).

- Next.js takes care of sending the request from client → server securely.

Example 1: Server Action with Form

Usage in a component:

```tsx
"use client";

import { createPost } from "@/app/actions";

export default function PostForm() {
  async function handleSubmit(formData: FormData) {
    await createPost(formData);
    alert("Post created!");
  }

  return (
    <form action={handleSubmit}>
      <input type="text" name="title" placeholder="Enter title" />
      <button type="submit">Create Post</button>
    </form>
  );
}

```
`app/actions.ts`

```tsx
"use server";

import { db } from "@/lib/db";

export async function createPost(formData: FormData) {
  const title = formData.get("title");
  const post = await db.post.create({ data: { title: String(title) } });
  return post;
}

```
When you submit this form:

- Next.js internally calls the server action.

- No API URL is visible in the browser — it happens under the hood.

Here:

- `action={createPost}` automatically sends form data → server.

- Function `createPost` executes on the server.

- No API route required.

Example 2: Imperative Server Action Call

You can also call a server action manually from client code.

```tsx
"use client";

import { addTodo } from "./actions";

export default function AddButton() {
  return (
    <button
      onClick={async () => {
        await addTodo("Learn Next.js Server Actions");
      }}
      className="bg-green-600 text-white px-4 py-2"
    >
      Add Task
    </button>
  );
}
```
`app/actions.ts`

```tsx
"use server";

let todos: string[] = [];

export async function addTodo(task: string) {
  todos.push(task);
  console.log("Server Todos:", todos);
}
```

Why Server Actions are Powerful

- No need to create `/api/...` routes for simple mutations.

- Automatic serialization & transport between client/server.

- Built-in support for revalidation (update cache after mutation).

- Secure: only runs on the server (not exposed in client bundle).

- Cleaner DX: feels like calling a function directly.

✅ In short:

Server Actions = API routes without boilerplate.
They let you call server-only functions directly from UI (forms, buttons, etc.), making mutations and cache updates simpler in the App Router.

Case 1: Using API inside `actions.ts`

Yes, you can absolutely call an external API inside a server action:

```tsx
"use server";

export async function createPost(formData: FormData) {
  const title = formData.get("title");

  // Call an external API (not /api inside Next, but like JSONPlaceholder)
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify({ title }),
    headers: { "Content-Type": "application/json" },
  });

  return res.json();
}
```
✅ Here, no `/api` route in your Next.js project is needed because you are directly calling an external API.
Server Actions run only on the server, so secrets (`API_KEY`, DB credentials) stay secure.

Case 2: Use Server Actions directly

You don’t need to create `/api/...` if the API is only for your own frontend.
Just write your logic inside the Server Action instead of wrapping it inside `/api`.

Example (`app/actions.ts`):

```ts
"use server";

import { db } from "@/lib/db"; // imagine Prisma or Mongo client

export async function createPost(formData: FormData) {
  const title = formData.get("title");

  // Directly interact with DB or internal logic
  const post = await db.post.create({ data: { title: String(title) } });

  return post;
}
```
Here, you skip `/api/...` because Server Action is already your backend function.
This is faster & cleaner.

Some more example:

`app/server/postActions.ts`

```tsx
"use server";

import { db } from "@/lib/db";

export async function createPost(formData: FormData) {
  const title = formData.get("title") as string;
  return await db.post.create({ data: { title } });
}
```
`app/components/PostForm.tsx`

```tsx
"use client";

import { createPost } from "@/app/server/postActions";

export default function PostForm() {
  async function handleSubmit(formData: FormData) {
    await createPost(formData);
    alert("Post created!");
  }

  return (
    <form action={handleSubmit}>
      <input type="text" name="title" placeholder="Enter title" />
      <button type="submit">Create Post</button>
    </form>
  );
}
```
## 20. How do you handle environment variables in nextjs?

1. File Structure

You define environment variables in files like:

- `.env.local` – For development, specific to your local environment.

- `.env.development`, `.env.production`, etc. – For environment-specific setups.

- `.env` – Common variables across all environments.

These files are automatically loaded by Next.js during build and runtime.

2. Naming Conventions

- Variables used only on the server:

```bash

DATABASE_URL=your_database_url
SECRET_KEY=your_secret_key

```
Variables exposed to the browser must start with `NEXT_PUBLIC_`:

```bash
NEXT_PUBLIC_ANALYTICS_ID=your_tracking_id
```
👉 Anything without `NEXT_PUBLIC_` is only available on the server, meaning it won’t be bundled into the client-side code.

3. Example `.env.local`

```bash
DATABASE_URL=postgres://user:pass@localhost:5432/mydb
SECRET_KEY=my_super_secret
NEXT_PUBLIC_API_BASE_URL=https://api.example.com
```
- `DATABASE_URL` → only accessible in server-side code.

- `SECRET_KEY` → server-only, never exposed to the client.

- `NEXT_PUBLIC_API_BASE_URL` → accessible in both client and server.

✅ How to Use Environment Variables in Code

➤ In Server Components, Server Actions, API Routes:

You access them using `process.env` like this:

```ts
// Example in a server action
"use server";

export async function createPost(formData: FormData) {
  const secret = process.env.SECRET_KEY; // only on the server
  console.log("Secret key:", secret);

  // use it to connect to DB or authenticate
}
```
In Client Components:

Only variables starting with `NEXT_PUBLIC_` are accessible:

```tsx
"use client";

export default function Analytics() {
  console.log("API URL:", process.env.NEXT_PUBLIC_API_BASE_URL);
  return <div>Tracking enabled</div>;
}
```
Security Best Practices

✔ Server-only secrets → do not expose them in client-side code.
✔ Use `NEXT_PUBLIC_` only for non-sensitive data.
✔ Never commit `.env.local` or files containing secrets to version control (add it to `.gitignore`).
✔ For production, set environment variables through your hosting provider (Vercel, Netlify, AWS, etc.) instead of storing them in files.

Real Use Case Example

`.env.local`

Using in API Route (`app/api/posts/route.ts`)

```ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  const dbUrl = process.env.DATABASE_URL;
  console.log("Connecting to database at:", dbUrl);

  const posts = await db.post.findMany();
  return NextResponse.json(posts);
}
```
Using in Client Component (`app/page.tsx`)

```tsx
"use client";

export default function Home() {
  console.log("Mapbox Token:", process.env.NEXT_PUBLIC_MAPBOX_TOKEN);
  return <div>Map is loaded!</div>;
}
```
Summary

| Feature               | How to use                            | Where available                               |
| --------------------- | ------------------------------------- | --------------------------------------------- |
| Server-only variables | `process.env.SECRET_KEY`              | Server components, server actions, API routes |
| Public variables      | `process.env.NEXT_PUBLIC_*`           | Server & client                               |
| Files                 | `.env.local`, `.env.production`, etc. | Automatically loaded by Next.js               |
| Security              | Keep sensitive data server-only       | Add `.env.local` to `.gitignore`              |


## 21. What is `next.config.js` and what are some things you’ve configured in it?

✅ What is `next.config.js`?

- It’s a JavaScript file at the root of your project:

```bash
next.config.js
```
- Exports a configuration object that Next.js reads at build time and runtime.

- Used to tweak default behaviors, set environment variables, enable optimizations, etc.

- Can also extend Webpack, adjust redirects, rewrites, headers, and more.

Example `next.config.js`

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // enables React's strict mode for development
  swcMinify: true,        // uses SWC for faster JavaScript minification
  images: {
    domains: ["images.unsplash.com"], // allow external image domains
  },
  env: {
    CUSTOM_API_URL: process.env.CUSTOM_API_URL, // add custom env vars
  },
  async redirects() {
    return [
      {
        source: "/old-path",
        destination: "/new-path",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/blog/:slug",
        destination: "/api/blog/:slug",
      },
    ];
  },
};

module.exports = nextConfig;
```

Common Configurations You Might Use

🔹 1. `reactStrictMode`

```js
reactStrictMode: true
```
- Helps find potential problems in your React components during development.

🔹 2. `images.domains`

```js
images: {
  domains: ["example.com"],
}
```
- Allows `next/image` to load images from external sources.

🔹 3. `env`

```js
env: {
  CUSTOM_API_URL: process.env.CUSTOM_API_URL,
}
```
- Statically exposes environment variables during build time.

🔹 4. `async redirects()`

```js
async redirects() {
  return [
    {
      source: "/old-url",
      destination: "/new-url",
      permanent: true,
    },
  ];
}
```
- Redirect users from old URLs to new ones.

🔹 5. `async rewrites()`

```js
async rewrites() {
  return [
    {
      source: "/custom-route/:slug",
      destination: "/api/content/:slug",
    },
  ];
}
```
- Mask or rewrite URLs to different endpoints without changing the visible path.

🔹 6. webpack Customization

You can extend or override Webpack’s default configuration.

```js
webpack(config) {
  config.module.rules.push({
    test: /\.md$/,
    use: "raw-loader",
  });
  return config;
}
```
🔹 7. `i18n` for Internationalization

```js
i18n: {
  locales: ["en", "fr", "es"],
  defaultLocale: "en",
}
```
- Enable built-in support for multiple languages.

Things I’ve Configured in Projects

Here are some real-world setups:

✔ Image optimization — added trusted domains for loading images from CMS or external APIs
✔ Environment variables — exposed non-sensitive data to client, kept secrets in server-only config
✔ Redirects — handled outdated URLs for SEO preservation
✔ Rewrites — masked API endpoints behind pretty URLs
✔ SWC Minification — improved build speed
✔ i18n — localized content for global audiences
✔ Custom Webpack loaders — imported markdown or other file types

TL;DR

`next.config.js` is the place where you:

- Control how Next.js builds and runs your app

- Add environment variables

- Enable optimizations like image handling and minification

- Redirect or rewrite URLs for better UX and SEO

- Extend Webpack and other settings for advanced use cases







