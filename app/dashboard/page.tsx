"use client";

import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  const handleNavigate = () => {
    // Navigates programmatically to blog page
    router.push("/blog");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <button
        onClick={handleNavigate}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Go to Blog
      </button>
    </div>
  );
}


/**
✅ Here:
`router.push("/blog")` → Navigates forward.
`router.replace("/blog")` → Navigates without adding history (cannot go back).
`router.back()` → Goes back in history.
*/