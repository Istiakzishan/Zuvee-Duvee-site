"use client";

import { useState } from "react";
import CommerceExperience, { addProductToCart, openAccount, openCart } from "./CommerceExperience";
import { products } from "./products/product-data";

type Product = typeof products[number];

const development = [
  ["Fine Motor Skills", "Small movements that invite turning, grasping and placing."],
  ["Problem Solving", "Open-ended challenges that encourage trying another way."],
  ["Sensory Discovery", "Textures, sounds and movement to notice and explore."],
  ["Hand-Eye Coordination", "Play that brings looking and moving together."],
  ["Creativity", "Room to imagine, arrange, build and begin again."],
  ["Focus & Attention", "Calm play experiences worth staying with a little longer."],
];

const skillPhotos = [
  ["Fine Motor Skills", "Little hands turning and grasping a wooden activity toy.", "0% 0%"],
  ["Problem Solving", "A toddler testing shapes and trying another way.", "50% 0%"],
  ["Sensory Discovery", "A baby exploring soft textures, shape and movement.", "100% 0%"],
  ["Hand-Eye Coordination", "A child placing rings while looking and moving together.", "0% 100%"],
  ["Creativity", "A toddler arranging blocks and building new ideas.", "50% 100%"],
  ["Focus & Attention", "Calm, focused play with a press-and-turn board.", "100% 100%"],
];

function ArrowIcon() {
  return <span aria-hidden="true">↗</span>;
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  const [liked, setLiked] = useState(false);
  const [added, setAdded] = useState(false);
  const href = `/products/${product.slug}`;
  const shortTags = product.tags.slice(0, 2);
  return (
    <article className="product-card">
      <div className="product-image" style={{ backgroundPosition: product.position }}>
        <a className="product-image-link" href={href} aria-label={`View details for ${product.name}`} />
        <span className="age-pill">{product.age}</span>
        <button className={`heart ${liked ? "active" : ""}`} onClick={() => setLiked(!liked)} aria-label={`${liked ? "Remove" : "Add"} ${product.name} ${liked ? "from" : "to"} wishlist`}>
          {liked ? "♥" : "♡"}
        </button>
        <button className="quick-add" onClick={() => { addProductToCart({ slug: product.slug, name: product.name, price: product.price, priceValue: product.priceValue, quantity: 1 }); setAdded(true); window.setTimeout(() => setAdded(false), 1400); }} aria-label={`Quick add ${product.name} to bag`}>
          {added ? "Added" : "+ Add"}
        </button>
      </div>
      <div className="product-info">
        <div className="tags">{shortTags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        <h3><a href={href}>{product.name}</a></h3>
        <p>{product.price}</p>
        <a className="product-details-link" href={href}>View product details →</a>
      </div>
    </article>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <main>
      <CommerceExperience />
      <div className="announcement">Thoughtfully selected for growing little ones <span>·</span> Delivery across Bangladesh</div>
      <header className="site-header">
        <button className="mobile-icon" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Open menu">☰</button>
        <a className="logo" href="#top" aria-label="Zuvee Duvee home">ZUVEE <i>DUVEE</i></a>
        <nav className={menuOpen ? "open" : ""} aria-label="Main navigation">
          <a href="#products">Shop</a><a href="#age">Shop by Age</a><a href="#development">Development</a><a href="#learn">Learn</a><a href="#philosophy">Our Story</a>
        </nav>
        <div className="header-actions">
          <button onClick={() => setSearchOpen(!searchOpen)} aria-expanded={searchOpen}>Search</button>
          <button className="desktop-only" type="button" onClick={openAccount} data-account-label>Account</button>
          <button type="button" onClick={openCart}>Bag <span data-cart-count>(0)</span></button>
        </div>
        {searchOpen && <form className="search-panel" onSubmit={(e) => e.preventDefault()}><label htmlFor="search">What are you looking for?</label><input id="search" autoFocus placeholder="Search by product, age or skill" /><button type="button" onClick={() => setSearchOpen(false)}>Close</button></form>}
      </header>

      <section className="hero" id="top">
        <div className="hero-copy"><p className="eyebrow">PLAY WITH PURPOSE</p><h1>Thoughtfully chosen for growing minds.</h1><p>Development-focused play and essentials, carefully selected for every little stage.</p><div className="button-row"><a className="button primary" href="#age">Shop by Age</a><a className="text-link" href="#products">Explore All Products <ArrowIcon /></a></div></div>
        <div className="hero-image" role="img" aria-label="A parent and child sharing a calm moment of play" />
      </section>

      <section className="section age-section" id="age">
        <div className="section-heading centered"><p className="eyebrow">SHOP BY THEIR STAGE</p><h2>Every stage brings something new.</h2><p>Explore thoughtfully selected products for where your little one is right now.</p></div>
        <div className="age-grid">
          {[["4–10 Months", "Discovering the world", "baby"], ["1–3 Years", "Exploring & becoming independent", "toddler"], ["3–6 Years", "Thinking, creating & learning", "preschool"]].map(([title, desc, cls], i) => (
            <a href="#products" className={`age-card ${cls}`} key={title}><div className="age-photo" style={{ backgroundPosition: `${i * 50}% center` }} /><span>0{i + 1}</span><div><h3>{title}</h3><p>{desc}</p></div><b aria-hidden="true">→</b></a>
          ))}
        </div>
      </section>

      <section className="section product-section" id="products">
        <div className="section-heading split"><div><p className="eyebrow">CAREFULLY CURATED</p><h2>Zuvee Duvee favourites</h2></div><a className="text-link" href="#all-products">View all <ArrowIcon /></a></div>
        <div className="product-scroll">{products.map((p, i) => <ProductCard product={p} index={i} key={p.name} />)}</div>
      </section>

      <section className="development-section" id="development">
        <div className="section-heading light"><p className="eyebrow">FOLLOW THEIR CURIOSITY</p><h2>What are they discovering today?</h2><p>Find play experiences that support the skills they&apos;re beginning to explore.</p></div>
        <div className="development-grid">{development.map(([title, copy], i) => <a href="#products" key={title} className="development-card"><span>0{i + 1}</span><div><h3>{title}</h3><p>{copy}</p></div><b>↗</b></a>)}</div>
      </section>

      <section className="section skill-photo-section">
        <div className="section-heading split"><div><p className="eyebrow">PLAY THAT SUPPORTS GROWTH</p><h2>Six ways little ones learn through play</h2><p>Happy, everyday play moments connected to the developmental skills families often look for.</p></div><a className="text-link" href="#products">Shop supportive play <ArrowIcon /></a></div>
        <div className="skill-photo-grid">
          {skillPhotos.map(([title, copy, position], i) => (
            <article className="skill-photo-card" key={title}>
              <div className="skill-photo" style={{ backgroundPosition: position }} role="img" aria-label={copy} />
              <span>{String(i + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="philosophy" id="philosophy">
        <p className="eyebrow">OUR BELIEF</p><h2>More isn&apos;t always better.</h2><h2 className="accent">The right things matter.</h2><p>Childhood is filled with small moments of discovery. We carefully select products that encourage meaningful play, exploration and growing independence.</p><a className="text-link" href="#process">Our Philosophy <ArrowIcon /></a>
      </section>

      <section className="story-section">
        <div className="story-image" role="img" aria-label="Small hands exploring an activity toy" />
        <div className="story-copy"><p className="eyebrow">FINE MOTOR DEVELOPMENT</p><h2>Small hands are learning a lot.</h2><p>Turning, pulling, pressing and grasping give children opportunities to practise controlled hand movements—one curious action at a time.</p><a className="button outline" href="#products">Explore Fine Motor Play</a></div>
      </section>

      <section className="section newly-section">
        <div className="section-heading split"><div><p className="eyebrow">JUST ARRIVED</p><h2>Newly selected</h2><p>Recent additions to our carefully curated collection.</p></div><a className="text-link" href="#all-products">View all <ArrowIcon /></a></div>
        <div className="product-scroll">{products.slice().reverse().slice(0, 3).map((p, i) => <ProductCard product={p} index={i} key={`new-${p.name}`} />)}</div>
      </section>

      <section className="why-section">
        <div className="section-heading centered"><p className="eyebrow">THE ZUVEE DUVEE STANDARD</p><h2>Chosen with a reason.</h2></div>
        <div className="principles">{[["Thoughtfully Curated", "Useful, engaging and worth bringing home."], ["Age Considered", "Selected with real stages and abilities in mind."], ["Quality Considered", "Materials, finish and everyday use all matter."], ["Parent Friendly", "Clear guidance without the pressure or noise."]].map(([title, copy], i) => <article key={title}><span>{String(i + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
      </section>

      <section className="process-section" id="process">
        <div><p className="eyebrow">HOW WE CHOOSE</p><h2>Not everything makes the shelf.</h2><p>We look beyond what is popular. Each selection needs a clear reason to belong in your child&apos;s world.</p></div>
        <ol>{["Discover", "Evaluate", "Understand", "Select", "Explain"].map((step, i) => <li key={step}><span>{String(i + 1).padStart(2, "0")}</span><b>{step}</b></li>)}</ol>
      </section>

      <section className="reviews-section">
        <div className="section-heading centered"><p className="eyebrow">REAL EXPERIENCES, COMING SOON</p><h2>From parents like you</h2><p>We&apos;re making room for verified parent experiences. Real reviews will appear here once shared.</p></div>
        <div className="review-placeholders" aria-label="Customer review placeholders"><article><span>REVIEW PLACEHOLDER</span><div className="skeleton wide" /><div className="skeleton" /><div className="skeleton short" /></article><article><span>REVIEW PLACEHOLDER</span><div className="skeleton wide" /><div className="skeleton" /><div className="skeleton short" /></article></div>
      </section>

      <section className="section learn-section" id="learn">
        <div className="section-heading split"><div><p className="eyebrow">NOTES FOR THOUGHTFUL PARENTS</p><h2>Growing together</h2></div><a className="text-link" href="#guides">Explore Guides <ArrowIcon /></a></div>
        <div className="article-grid">{[["01", "How fine motor skills develop through everyday play", "6 min read"], ["02", "Choosing toys for your child's current stage", "5 min read"], ["03", "Why children don't need dozens of toys", "4 min read"]].map(([num, title, time]) => <a href="#guides" key={num}><div className={`article-image article-${num}`}><span>{num}</span></div><p>DEVELOPMENT NOTES · {time}</p><h3>{title}</h3><span className="read-link">Read article →</span></a>)}</div>
      </section>

      <section className="community-section">
        <div className="community-copy"><p className="eyebrow">OUR COMMUNITY</p><h2>Little moments with Zuvee Duvee</h2><p>Everyday discoveries, shared gently by families in our community.</p><a className="text-link" href="#instagram">Follow on Instagram <ArrowIcon /></a></div>
        <div className="community-collage"><div /><div /><div /></div>
      </section>

      <section className="retention-section">
        <div><p className="eyebrow">A NOTE WORTH KEEPING</p><h2>Guidance that grows with them.</h2><p>Thoughtful play ideas, developmental guides and new Zuvee Duvee discoveries.</p></div>
        {subscribed ? <p className="success" role="status">Thank you. Thoughtful notes are on their way.</p> : <form onSubmit={(e) => { e.preventDefault(); if (email) setSubscribed(true); }}><label htmlFor="email">Email address</label><input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" /><button type="submit">Join the list →</button><small>Occasional, useful notes. No noisy promotions.</small></form>}
      </section>

      <footer>
        <div className="footer-brand"><a className="logo" href="#top">ZUVEE <i>DUVEE</i></a><p>You don&apos;t need everything;<br />you need the right things.</p><span>Dhaka, Bangladesh</span></div>
        {[["SHOP", "Shop All,New Arrivals,Shop by Age,Shop by Development"], ["ZUVEE DUVEE", "Our Story,Our Philosophy,How We Choose,Learn"], ["HELP", "Contact,Delivery,Returns & Exchanges,FAQ"], ["FOLLOW", "Facebook,Instagram,WhatsApp"]].map(([title, links]) => <div className="footer-column" key={title}><h3>{title}</h3>{links.split(",").map(link => <a href="#" key={link}>{link}</a>)}</div>)}
        <div className="footer-bottom"><span>© 2026 Zuvee Duvee</span><div><a href="#">Privacy Policy</a><a href="#">Terms & Conditions</a></div><span>Thoughtfully selected in Bangladesh</span></div>
      </footer>
    </main>
  );
}
