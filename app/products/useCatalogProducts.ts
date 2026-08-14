"use client";

import { useEffect, useState } from "react";
import { products as fallbackProducts, type ProductDetail } from "./product-data";

export function useCatalogProducts() {
  const [products, setProducts] = useState<ProductDetail[]>(fallbackProducts);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/catalog", { signal: controller.signal })
      .then((response) => response.ok ? response.json() : Promise.reject())
      .then((data: { products?: ProductDetail[] }) => { if (data.products?.length) setProducts(data.products); })
      .catch(() => undefined);
    return () => controller.abort();
  }, []);

  return products;
}
