"use client";

import { useState } from "react";
import { addProductToCart, useCommerce } from "../CommerceExperience";
import type { ProductDetail } from "./product-data";

function LangText({ en, bn }: { en: string; bn: string }) {
  return <><span className="lang-en">{en}</span><span className="lang-bn">{bn}</span></>;
}

export default function ProductCard({ product }: { product: ProductDetail }) {
  const { toggleWishlist, wishlistIds } = useCommerce();
  const [added, setAdded] = useState(false);
  const href = `/products/${product.slug}`;
  const shortTags = product.tags.slice(0, 2);
  const shortTagsBn = product.tagsBn.slice(0, 2);
  const inStock = product.stock > 0;
  const purchasable = product.purchasable !== false && Number(product.priceValue) > 0 && inStock;
  const liked = Boolean(product.productId && wishlistIds.has(product.productId));

  return (
    <article className="product-card">
      <div className="product-image">
        <img
          className="product-card-photo"
          src={product.gallery[0].src}
          alt={product.gallery[0].alt}
          style={{ objectPosition: product.gallery[0].position || product.position }}
        />
        <a className="product-image-link" href={href} aria-label={`View details for ${product.name}`} />
        <span className="age-pill"><LangText en={product.age} bn={product.ageBn} /></span>
        <button className={`heart ${liked ? "active" : ""}`} type="button" onClick={() => void toggleWishlist({ productId: product.productId, slug: product.slug, name: product.name, price: product.price, image: product.gallery[0]?.src })} aria-label={`${liked ? "Remove" : "Add"} ${product.name} ${liked ? "from" : "to"} wishlist`}>
          {liked ? "♥" : "♡"}
        </button>
        <button className="quick-add" type="button" disabled={!purchasable || !product.variantId} onClick={() => { if (!purchasable || !product.variantId) return; addProductToCart({ productId: product.productId, variantId: product.variantId, slug: product.slug, name: product.name, price: product.price, priceValue: product.priceValue, stock: product.stock, quantity: 1 }); setAdded(true); window.setTimeout(() => setAdded(false), 1400); }} aria-label={`Quick add ${product.name} to bag`}>
          {!inStock ? "Out of stock" : added ? "Added" : "+ Add"}
        </button>
      </div>
      <div className="product-info">
        <div className="tags lang-en">{shortTags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        <div className="tags lang-bn">{shortTagsBn.map((tag) => <span key={tag}>{tag}</span>)}</div>
        <h3><a href={href}><LangText en={product.shortName} bn={product.shortNameBn} /></a></h3>
        <p className="card-price">
          <span>{product.price}</span>
          {product.isSale && <s>{product.regularPrice}</s>}
        </p>
        <p className={`stock-note ${!inStock ? "out-of-stock" : product.stock < 10 ? "low-stock" : ""}`}><LangText en={!inStock ? "Out of stock" : product.stock < 10 ? `Only ${product.stock} in stock` : `${product.stock} in stock`} bn={!inStock ? "স্টকে নেই" : product.stock < 10 ? `মাত্র ${product.stock} টি স্টকে আছে` : `${product.stock} টি স্টকে আছে`} /></p>
        <a className="product-details-link" href={href}><LangText en="View product details →" bn="পণ্যের বিস্তারিত দেখুন →" /></a>
      </div>
    </article>
  );
}
