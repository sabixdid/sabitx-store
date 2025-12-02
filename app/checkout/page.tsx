import { NextResponse } from "next/server";
import Stripe from "stripe";
import { supabase } from "@/lib/supabase";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-08-16",
});

export async function POST(req: Request) {
  const { item, location } = await req.json();

  // TEMP menu mapping
  const priceMap: Record<string, number> = {
    pizza: 399,
    drink: 199,
    wings: 899,
    fries: 299,
  };

  const price = priceMap[item];

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: { name: `${item} @ ${location}` },
          unit_amount: price,
        },
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/order/{CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout?item=${item}&location=${location}`,
    metadata: {
      item,
      location,
    },
  });

  // Create placeholder order
  await supabase.from("orders").insert({
    session_id: session.id,
    location,
    items: [{ item, price }],
    amount: price,
    status: "PENDING",
  });

  return NextResponse.json({ url: session.url });
}
