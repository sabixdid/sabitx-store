"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase-client"; // client version

export default function Admin() {
  const [orders, setOrders] = useState<any[]>([]);

  async function load() {
    const { data } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    setOrders(data || []);
  }

  useEffect(() => {
    load();

    const channel = supabase
      .channel("orders")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "orders" },
        load
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <main className="bg-black text-white min-h-screen p-6">
      <h1 className="text-2xl font-semibold mb-6">Operator Dashboard</h1>

      <div className="space-y-4">
        {orders.map((o) => (
          <div
            key={o.id}
            className="p-4 bg-zinc-900 rounded-xl border border-zinc-800"
          >
            <div className="text-lg">{o.items[0].item}</div>
            <div className="text-zinc-400">{o.location}</div>
            <div className="text-green-400 mt-2">{o.status}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
