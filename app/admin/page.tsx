"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase-client"; // correct

export default function AdminPage() {
  const [orders, setOrders] = useState<any[]>([]);

  async function loadOrders() {
    const { data } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    setOrders(data || []);
  }

  useEffect(() => {
    loadOrders();

    const channel = supabase
      .channel("orders")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "orders" },
        loadOrders
      )
      .subscribe();

    return () => channel.unsubscribe();
  }, []);

  return (
    <main className="bg-black text-white min-h-screen p-8">
      <h1 className="text-2xl mb-6">Operator Dashboard</h1>

      <div className="space-y-3">
        {orders.map((o) => (
          <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl" key={o.id}>
            <div>{o.items[0].item}</div>
            <div className="text-zinc-400">{o.location}</div>
            <div className="text-green-400">{o.status}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
