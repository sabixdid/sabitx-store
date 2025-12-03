import { notFound } from "next/navigation";

const MENUS: Record<string, any[]> = {
  deport: [
    { id: "pizza", name: "Slice of Pizza", price: 399 },
    { id: "drink", name: "Cold Drink", price: 199 },
  ],
  dallas: [
    { id: "wings", name: "Chicken Wings", price: 899 },
    { id: "fries", name: "Hot Fries", price: 299 },
  ],
};

export default function MenuPage({ params }: any) {
  const items = MENUS[params.id];
  if (!items) return notFound();

  return (
    <main className="bg-black text-white min-h-screen p-6">
      <h1 className="text-2xl font-semibold mb-6">
        Menu • {params.id.toUpperCase()}
      </h1>

      <div className="space-y-4">
        {items.map((item) => (
          <form
            key={item.id}
            action="/checkout"
            method="GET"
            className="block p-4 bg-zinc-900 border border-zinc-800 rounded-xl"
          >
            <input type="hidden" name="item" value={item.id} />
            <input type="hidden" name="location" value={params.id} />

            <div className="text-lg">{item.name}</div>
            <div className="text-zinc-400">${(item.price / 100).toFixed(2)}</div>

            <button
              type="submit"
              className="mt-3 bg-green-600 px-3 py-1 rounded-md text-sm"
            >
              Order
            </button>
          </form>
        ))}
      </div>
    </main>
  );
}
