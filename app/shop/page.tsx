import type { Metadata } from "next";
import ShopClient from "./ShopClient";
import { fetchCatalog } from "../lib/catalog";

export const metadata: Metadata = {
  title: "Shop developmental toys by age and skill | Zuvee Duvee",
  description: "Browse Zuvee Duvee products by age range, developmental skill, price, sale items and newest selections.",
};

type ShopPageProps = {
  searchParams: Promise<{ age?: string; skill?: string; sort?: string; price?: string; sale?: string }>;
};

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams;
  const initialProducts = await fetchCatalog().catch(() => []);
  return <ShopClient initialParams={params} initialProducts={initialProducts} />;
}
