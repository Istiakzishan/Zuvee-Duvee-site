"use client";

import { useState } from "react";
import { addProductToCart } from "../CommerceExperience";

type ProductPurchaseProps = {
  product: {
    slug: string;
    name: string;
    price: string;
    priceValue: string;
    purchasable?: boolean;
    stock: number;
  };
};

export default function ProductPurchase({ product }: ProductPurchaseProps) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const inStock = product.stock > 0;
  const purchasable = product.purchasable !== false && Number(product.priceValue) > 0 && inStock;

  return (
    <div className="purchase-panel">
      <div className="quantity-control" aria-label="Quantity selector">
        <button type="button" disabled={!inStock} onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Decrease quantity">-</button>
        <output aria-live="polite">{quantity}</output>
        <button type="button" disabled={!inStock || quantity >= product.stock} onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} aria-label="Increase quantity">+</button>
      </div>
      <button className="product-add-button" type="button" disabled={!purchasable} onClick={() => { if (!purchasable) return; addProductToCart({ ...product, quantity }); setAdded(true); }}>
        {!inStock ? "Out of stock" : !purchasable ? "Price coming soon" : added ? `${quantity} added to bag` : "Add to bag"}
      </button>
      {!inStock && <p className="purchase-note out-of-stock" role="status">Out of stock</p>}
      {inStock && product.stock < 10 && <p className="purchase-note low-stock" role="status">Only {product.stock} in stock.</p>}
      {!inStock && <p className="purchase-note" role="status">This product is currently unavailable.</p>}
      {inStock && !purchasable && <p className="purchase-note" role="status">This product is listed now. Add the final price before checkout is enabled.</p>}
      {purchasable && added && <p className="purchase-note" role="status">Added to your bag. Open the bag to complete checkout.</p>}
    </div>
  );
}
