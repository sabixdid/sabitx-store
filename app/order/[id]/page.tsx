import { supabase } from "@/lib/supabase";

export default async function OrderStatusPage({ params }: any) {
  const { id } = params;

  const { data } = await supabase
    .from("orders")
    .select("*")
    .eq("session_id", id)
    .single();

  return (
    <main className="bg-black text-white min-h-screen p-6">
      <h1 className="text-xl font-semibold mb-4">Order #{id}</h1>

      {data ? (
        <>
          <p>Status: <span className="text-green-400">{data.status}</span></p>
          <p className="text-zinc-400 mt-2">Location: {data.location}</p>
        </>
      ) : (
        <p className="text-red-400">Order not found.</p>
      )}
    </main>
  );
}
