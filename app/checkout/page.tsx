"use client";

import { useSearchParams } from "next/navigation";

export default function CheckoutPage() {
  const params = useSearchParams();
  const item = params.get("item");
  const location = params.get("location");

  async function handleCheckout() {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ item, location }),
    });

    const { url } = await res.json();
    window.location.href = url;
  }

  return (
    <main className="bg-black text-white min-h-screen p-6">
      <h1 className="text-xl font-semibold mb-4">Checkout</h1>

      <p className="text-zinc-400">
        Item: <strong>{item}</strong>
      </p>
      <p className="text-zinc-400">
        Location: <strong>{location}</strong>
      </p>

      <button
        onClick={handleCheckout}
        className="mt-4 px-4 py-2 rounded-lg bg-green-600"
      >
        Proceed to Payment
      </button>
    </main>
  );
}
