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
  };
};

export default function ProductPurchase({ product }: ProductPurchaseProps) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const purchasable = product.purchasable !== false && Number(product.priceValue) > 0;

  return (
    <div className="purchase-panel">
      <div className="quantity-control" aria-label="Quantity selector">
        <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Decrease quantity">-</button>
        <output aria-live="polite">{quantity}</output>
        <button type="button" onClick={() => setQuantity(quantity + 1)} aria-label="Increase quantity">+</button>
      </div>
      <button className="product-add-button" type="button" disabled={!purchasable} onClick={() => { if (!purchasable) return; addProductToCart({ ...product, quantity }); setAdded(true); }}>
        {!purchasable ? "Price coming soon" : added ? `${quantity} added to bag` : "Add to bag"}
      </button>
      {!purchasable && <p className="purchase-note" role="status">This product is listed now. Add the final price before checkout is enabled.</p>}
      {purchasable && added && <p className="purchase-note" role="status">Added to your bag. Open the bag to complete checkout.</p>}
    </div>
  );
}
