"use client"; // required because useRouter is client-side

import { useRouter } from "next/navigation";

export default function AboutPage() {
  const router = useRouter();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">About Page</h1>
      <button
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
        onClick={() => router.push("/")}
      >
        Go to Home
      </button>
    </div>
  );
}
