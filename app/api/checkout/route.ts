const supabaseUrl = process.env.SUPABASE_URL;
const publishableKey = process.env.SUPABASE_PUBLISHABLE_KEY;

export async function POST(request: Request) {
  if (!supabaseUrl || !publishableKey) return Response.json({ error: "Checkout is not configured." }, { status: 503 });
  const body = await request.text();
  if (body.length > 20_000) return Response.json({ error: "Request is too large." }, { status: 413 });

  const upstream = await fetch(`${supabaseUrl}/functions/v1/storefront-checkout`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      apikey: publishableKey,
      authorization: `Bearer ${publishableKey}`,
      origin: new URL(request.url).origin,
    },
    body,
  });
  return new Response(await upstream.text(), {
    status: upstream.status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });
}
