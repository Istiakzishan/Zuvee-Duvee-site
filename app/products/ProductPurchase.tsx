"use client";

import { useState } from "react";

export default function ProductPurchase() {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  return (
    <div className="purchase-panel">
      <div className="quantity-control" aria-label="Quantity selector">
        <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Decrease quantity">-</button>
        <output aria-live="polite">{quantity}</output>
        <button type="button" onClick={() => setQuantity(quantity + 1)} aria-label="Increase quantity">+</button>
      </div>
      <button className="product-add-button" type="button" onClick={() => setAdded(true)}>
        {added ? `${quantity} added to bag` : "Add to bag"}
      </button>
      {added && <p className="purchase-note" role="status">Added for this demonstration. Checkout will be connected when the catalogue is ready.</p>}
    </div>
  );
}
