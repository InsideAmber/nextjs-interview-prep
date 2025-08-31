"use client"; // CSR requires client component

import { useEffect, useState } from "react";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export default function CSRPage() {
  const [post, setPost] = useState<Post>({} as Post);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts/1")
      .then((res) => res.json())
      .then((data) => setPost(data));
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold">Client-side Rendering (CSR)</h1>
      {post ? <p>{post.title}</p> : <p>Loading...</p>}
    </div>
  );
}
