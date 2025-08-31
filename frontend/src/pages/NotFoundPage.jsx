export default function NotFoundPage() {
  return (
    <main className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-lg mb-6">Page does not exist</p>
      <a
        href="/"
        className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
      >
        Go Home
      </a>
    </main>
  );
}
