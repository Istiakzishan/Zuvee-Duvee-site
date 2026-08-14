import { fetchCatalog } from "../../lib/catalog";

export async function GET() {
  try {
    return Response.json({ products: await fetchCatalog() }, { headers: { "cache-control": "public, max-age=30, stale-while-revalidate=120" } });
  } catch {
    return Response.json({ error: "Catalog is temporarily unavailable." }, { status: 503 });
  }
}
