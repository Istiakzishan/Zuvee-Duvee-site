"use client";

import { useState } from "react";
import { addProductToCart } from "../CommerceExperience";

type ProductPurchaseProps = {
  product: {
    slug: string;
    name: string;
    price: string;
    priceValue: string;
  };
};

export default function ProductPurchase({ product }: ProductPurchaseProps) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  return (
    <div className="purchase-panel">
      <div className="quantity-control" aria-label="Quantity selector">
        <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Decrease quantity">-</button>
        <output aria-live="polite">{quantity}</output>
        <button type="button" onClick={() => setQuantity(quantity + 1)} aria-label="Increase quantity">+</button>
      </div>
      <button className="product-add-button" type="button" onClick={() => { addProductToCart({ ...product, quantity }); setAdded(true); }}>
        {added ? `${quantity} added to bag` : "Add to bag"}
      </button>
      {added && <p className="purchase-note" role="status">Added to your bag. Open the bag to complete checkout.</p>}
    </div>
  );
}
