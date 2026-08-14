"use client";

import { useState } from "react";
import { addProductToCart } from "../CommerceExperience";
import type { ProductDetail } from "./product-data";

function LangText({ en, bn }: { en: string; bn: string }) {
  return <><span className="lang-en">{en}</span><span className="lang-bn">{bn}</span></>;
}

export default function ProductCard({ product }: { product: ProductDetail }) {
  const [liked, setLiked] = useState(false);
  const [added, setAdded] = useState(false);
  const href = `/products/${product.slug}`;
  const shortTags = product.tags.slice(0, 2);
  const shortTagsBn = product.tagsBn.slice(0, 2);
  const purchasable = product.purchasable !== false && Number(product.priceValue) > 0;

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
        <span className="brain-hover" aria-hidden="true"><span className="brain-mark"><i /><i /><i /></span><span className="brain-hover-label">Curiosity in motion</span></span>
        <button className={`heart ${liked ? "active" : ""}`} type="button" onClick={() => setLiked(!liked)} aria-label={`${liked ? "Remove" : "Add"} ${product.name} ${liked ? "from" : "to"} wishlist`}>
          {liked ? "♥" : "♡"}
        </button>
        <button className="quick-add" type="button" disabled={!purchasable} onClick={() => { if (!purchasable) return; addProductToCart({ slug: product.slug, name: product.name, price: product.price, priceValue: product.priceValue, quantity: 1 }); setAdded(true); window.setTimeout(() => setAdded(false), 1400); }} aria-label={`Quick add ${product.name} to bag`}>
          {!purchasable ? "Soon" : added ? "Added" : "+ Add"}
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
        <a className="product-details-link" href={href}><LangText en="View product details →" bn="পণ্যের বিস্তারিত দেখুন →" /></a>
      </div>
    </article>
  );
}
