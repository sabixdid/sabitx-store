export default function HomePage() {
  return (
    <main className="bg-black text-white min-h-screen p-6">
      <h1 className="text-3xl font-semibold mb-6">SABITX Store</h1>

      <p className="text-zinc-400 mb-4">
        Reserve before you arrive. Pay online. Pick up in store.
      </p>

      <a
        href="/locations"
        className="px-4 py-2 bg-green-600 rounded-lg text-sm"
      >
        Choose Location
      </a>
    </main>
  );
}
