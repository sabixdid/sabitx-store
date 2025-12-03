export default function LocationsPage() {
  const locations = [
    {
      id: "deport",
      name: "Deport, Texas • 331 Main St",
      status: "OPEN",
      hours: "7AM – 11PM",
    },
    {
      id: "dallas",
      name: "Dallas • Walnut Hill",
      status: "OPEN",
      hours: "Open Late",
    },
  ];

  return (
    <main className="bg-black text-white min-h-screen p-6">
      <h1 className="text-3xl font-semibold mb-6">Choose a Location</h1>

      <div className="space-y-4">
        {locations.map((loc) => (
          <a
            key={loc.id}
            href={`/locations/${loc.id}`}
            className="block p-4 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-zinc-600 transition"
          >
            <div className="text-lg font-medium">{loc.name}</div>
            <div className="text-zinc-400 text-sm">{loc.hours}</div>
            <div
              className={`text-xs mt-1 ${
                loc.status === "OPEN" ? "text-green-400" : "text-red-400"
              }`}
            >
              {loc.status}
            </div>
          </a>
        ))}
      </div>
    </main>
  );
}
