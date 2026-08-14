import { getProduct, products, type ProductDetail } from "../products/product-data";

type CatalogRow = {
  id: string;
  name: string;
  slug: string;
  description: string;
  base_price: number | string;
  compare_at_price: number | string | null;
  age_range: string;
  metadata: Record<string, unknown> | null;
  product_variants: Array<{
    id: string;
    name: string;
    price: number | string;
    compare_at_price: number | string | null;
    stock_quantity: number;
    is_active: boolean;
  }>;
  product_images: Array<{ storage_path: string; alt_text: string; sort_order: number }>;
};

const supabaseUrl = process.env.SUPABASE_URL;
const publishableKey = process.env.SUPABASE_PUBLISHABLE_KEY;

function money(value: number) {
  return `৳ ${value.toLocaleString("en-US")}`;
}

function imageUrl(path: string) {
  if (path.startsWith("/") || path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${supabaseUrl}/storage/v1/object/public/product-images/${path}`;
}

function genericProduct(row: CatalogRow, image: string): ProductDetail {
  const description = row.description || "Thoughtfully selected play for growing children.";
  const age = row.age_range || "Age guidance available";
  return {
    slug: row.slug, name: row.name, shortName: row.name, nameBn: row.name, shortNameBn: row.name,
    age, ageBn: age, price: "", priceValue: "0", regularPrice: "", regularPriceValue: "0",
    isSale: false, purchasable: false, stock: 0, tags: ["Thoughtful play"], tagsBn: ["বিবেচিত খেলা"],
    ageFilters: [], skillFilters: [], newestRank: 100, position: "center", intro: description,
    introBn: description, description, descriptionBn: description,
    selectedReason: ["Selected for purposeful play.", description], selectedReasonBn: ["উদ্দেশ্যপূর্ণ খেলার জন্য বাছাই।", description],
    benefits: [{ title: "Hands-on play", titleBn: "হাতে-কলমে খেলা", copy: description, copyBn: description }],
    specs: [{ label: "Recommended age", labelBn: "প্রস্তাবিত বয়স", value: age, valueBn: age }],
    details: [{ title: "Product guidance", titleBn: "পণ্যের নির্দেশনা", copy: description, copyBn: description }],
    seoTitle: row.name, seoTitleBn: row.name, seoCopy: description, seoCopyBn: description,
    gallery: [{ src: image, alt: `${row.name} product photo`, altBn: `${row.name} পণ্যের ছবি`, position: "center" }],
  };
}

export function mapCatalogRow(row: CatalogRow): ProductDetail | null {
  const variant = row.product_variants?.find((item) => item.is_active);
  if (!variant) return null;
  const storedImage = row.product_images?.slice().sort((a, b) => a.sort_order - b.sort_order)[0]?.storage_path;
  const metadataImage = typeof row.metadata?.storefront_image === "string" ? row.metadata.storefront_image : "";
  const image = imageUrl(storedImage || metadataImage || "/product-busy-cube.webp");
  const base = getProduct(row.slug) || genericProduct(row, image);
  const price = Number(variant.price ?? row.base_price);
  const compare = Number(variant.compare_at_price ?? row.compare_at_price ?? price);
  const remoteGallery = row.product_images?.length
    ? row.product_images.slice().sort((a, b) => a.sort_order - b.sort_order).map((item) => ({ src: imageUrl(item.storage_path), alt: item.alt_text || `${row.name} product photo`, altBn: item.alt_text || `${row.name} পণ্যের ছবি`, position: "center" }))
    : base.gallery.map((item, index) => index === 0 ? { ...item, src: image } : item);

  return {
    ...base,
    productId: row.id,
    variantId: variant.id,
    name: row.name,
    shortName: row.name,
    slug: row.slug,
    age: row.age_range || base.age,
    description: row.description || base.description,
    intro: row.description || base.intro,
    price: money(price),
    priceValue: String(price),
    regularPrice: money(compare),
    regularPriceValue: String(compare),
    isSale: compare > price,
    purchasable: price > 0 && variant.stock_quantity > 0,
    stock: variant.stock_quantity,
    gallery: remoteGallery,
  };
}

export async function fetchCatalog(): Promise<ProductDetail[]> {
  if (!supabaseUrl || !publishableKey) return products;
  const select = "id,name,slug,description,base_price,compare_at_price,age_range,metadata,product_variants(id,name,price,compare_at_price,stock_quantity,is_active),product_images(storage_path,alt_text,sort_order)";
  const response = await fetch(`${supabaseUrl}/rest/v1/products?select=${encodeURIComponent(select)}&status=eq.active&order=created_at.desc`, {
    headers: { apikey: publishableKey },
    next: { revalidate: 60 },
  });
  if (!response.ok) throw new Error("Catalog is temporarily unavailable.");
  return ((await response.json()) as CatalogRow[]).map(mapCatalogRow).filter((item): item is ProductDetail => Boolean(item));
}

export async function fetchCatalogProduct(slug: string) {
  try {
    const catalog = await fetchCatalog();
    return catalog.find((product) => product.slug === slug) || getProduct(slug);
  } catch {
    return getProduct(slug);
  }
}
