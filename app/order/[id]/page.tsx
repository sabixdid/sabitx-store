import { supabase } from "@/lib/supabase";

export default async function OrderStatus({ params }: any) {
  const { data } = await supabase
    .from("orders")
    .select("*")
    .eq("session_id", params.id)
    .single();

  return (
    <main className="bg-black text-white min-h-screen p-6">
      <h1 className="text-xl font-semibold mb-4">Order Status</h1>

      {data ? (
        <>
          <p>Order ID: {params.id}</p>
          <p>Status: {data.status}</p>
        </>
      ) : (
        <p className="text-red-400">Order not found.</p>
      )}
    </main>
  );
}
