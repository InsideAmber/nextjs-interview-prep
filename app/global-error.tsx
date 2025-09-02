"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <html>
      <body className="flex h-screen items-center justify-center flex-col">
        <h2 className="text-2xl font-bold text-red-700">
          🚨 Global Error: Something went wrong
        </h2>
        <p className="mt-2 text-gray-600">{error.message}</p>
        <button
          onClick={() => reset()}
          className="mt-4 px-4 py-2 rounded bg-blue-600 text-white"
        >
          Try again
        </button>
      </body>
    </html>
  );
}
