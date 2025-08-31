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
his will fetch data on the server and render HTML before sending to client.
In CRA, this is impossible without extra server setup.