"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import Link from "next/link";
import CommerceExperience, { openAccount, openCart } from "./CommerceExperience";
import LanguageSwitcher from "./LanguageSwitcher";
import ProductCard from "./products/ProductCard";
import { useCatalogProducts } from "./products/useCatalogProducts";

const development = [
  ["Fine Motor Skills", "Small movements that invite turning, grasping and placing.", "fine-motor"],
  ["Problem Solving", "Open-ended challenges that encourage trying another way.", "problem-solving"],
  ["Sensory Discovery", "Textures, sounds and movement to notice and explore.", "sensory"],
  ["Hand-Eye Coordination", "Play that brings looking and moving together.", "hand-eye"],
  ["Creativity", "Room to imagine, arrange, build and begin again.", "creativity"],
  ["Focus & Attention", "Calm play experiences worth staying with a little longer.", "focus"],
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

function LangText({ en, bn }: { en: string; bn: string }) {
  return <><span className="lang-en">{en}</span><span className="lang-bn">{bn}</span></>;
}

function ProductRail({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="product-scroll">{children}</div>
      <div className="mobile-rail-dots" aria-hidden="true"><span /><span /><span /></div>
    </>
  );
}

export default function Home() {
  const products = useCatalogProducts();
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
          <a href="/shop">Shop</a><a href="/shop">Shop by Age</a><a href="#development">Development</a><Link href="/articles">Learn</Link><a href="#philosophy">Our Story</a>
        </nav>
        <div className="header-actions">
          <LanguageSwitcher />
          <button className="header-search" onClick={() => setSearchOpen(!searchOpen)} aria-expanded={searchOpen}>Search</button>
          <button className="header-account" type="button" onClick={openAccount} data-account-label>Account</button>
          <button className="header-bag" type="button" onClick={openCart}>Bag <span data-cart-count>(0)</span></button>
        </div>
        {searchOpen && <form className="search-panel" onSubmit={(e) => e.preventDefault()}><label htmlFor="search">What are you looking for?</label><input id="search" autoFocus placeholder="Search by product, age or skill" /><button type="button" onClick={() => setSearchOpen(false)}>Close</button></form>}
      </header>

      <section className="hero" id="top">
        <div className="hero-copy"><p className="eyebrow"><LangText en="PLAY WITH PURPOSE" bn="উদ্দেশ্যপূর্ণ খেলা" /></p><h1><LangText en="Thoughtfully chosen for growing minds." bn="বড় হতে থাকা মনের জন্য বিবেচিত নির্বাচন।" /></h1><p><LangText en="Development-focused play and essentials, carefully selected for every little stage." bn="প্রতিটি ছোট পর্যায়ের জন্য বিকাশভিত্তিক খেলা ও প্রয়োজনীয় পণ্য, যত্ন নিয়ে বাছাই করা।" /></p><div className="button-row"><a className="button primary" href="/shop"><LangText en="Shop by Age" bn="বয়স অনুযায়ী দেখুন" /></a><a className="text-link" href="/shop"><LangText en="Explore All Products" bn="সব পণ্য দেখুন" /> <ArrowIcon /></a></div></div>
        <div className="hero-image" role="img" aria-label="A parent and child sharing a calm moment of play" />
      </section>

      <section className="section age-section" id="age">
        <div className="section-heading centered"><p className="eyebrow"><LangText en="SHOP BY THEIR STAGE" bn="শিশুর পর্যায় অনুযায়ী" /></p><h2><LangText en="Every stage brings something new." bn="প্রতিটি পর্যায়ে আসে নতুন কিছু।" /></h2><p><LangText en="Explore thoughtfully selected products for where your little one is right now." bn="আপনার শিশুর বর্তমান পর্যায়ের জন্য যত্ন নিয়ে বাছাই করা পণ্য দেখুন।" /></p></div>
        <div className="age-grid">
          {[["4–10 Months", "Discovering the world", "baby", "4-10"], ["1–3 Years", "Exploring & becoming independent", "toddler", "1-3"], ["3–6 Years", "Thinking, creating & learning", "preschool", "3-6"]].map(([title, desc, cls, age], i) => (
            <a href={`/shop?age=${age}`} className={`age-card ${cls}`} key={title}><div className="age-photo" style={{ backgroundPosition: `${i * 50}% center` }} /><span>0{i + 1}</span><div><h3>{title}</h3><p>{desc}</p></div><b aria-hidden="true">→</b></a>
          ))}
        </div>
      </section>

      <section className="section product-section" id="products">
        <div className="section-heading split"><div><p className="eyebrow"><LangText en="CAREFULLY CURATED" bn="যত্ন নিয়ে বাছাই" /></p><h2><LangText en="Zuvee Duvee favourites" bn="Zuvee Duvee পছন্দের পণ্য" /></h2></div><a className="text-link" href="/shop"><LangText en="View all" bn="সব দেখুন" /> <ArrowIcon /></a></div>
        <ProductRail>{products.map((p) => <ProductCard product={p} key={p.name} />)}</ProductRail>
      </section>

      <section className="development-section" id="development">
        <div className="section-heading light"><p className="eyebrow"><LangText en="FOLLOW THEIR CURIOSITY" bn="কৌতূহলকে অনুসরণ করুন" /></p><h2><LangText en="What are they discovering today?" bn="আজ তারা কী আবিষ্কার করছে?" /></h2><p><LangText en="Find play experiences that support the skills they're beginning to explore." bn="যে দক্ষতাগুলো তারা অন্বেষণ শুরু করছে, সেগুলোকে সহায়তা করে এমন খেলা খুঁজুন।" /></p></div>
        <div className="development-grid">{development.map(([title, copy, skill], i) => <a href={`/shop?skill=${skill}`} key={title} className="development-card"><span>0{i + 1}</span><div><h3>{title}</h3><p>{copy}</p></div><b>↗</b></a>)}</div>
      </section>

      <section className="section skill-photo-section">
        <div className="section-heading split"><div><p className="eyebrow"><LangText en="PLAY THAT SUPPORTS GROWTH" bn="বিকাশে সহায়ক খেলা" /></p><h2><LangText en="Six ways little ones learn through play" bn="খেলার মাধ্যমে শেখার ছয়টি পথ" /></h2><p><LangText en="Happy, everyday play moments connected to the developmental skills families often look for." bn="পরিবার যে বিকাশগত দক্ষতাগুলো খোঁজে, সেগুলোর সঙ্গে যুক্ত আনন্দময় দৈনন্দিন খেলার মুহূর্ত।" /></p></div><a className="text-link" href="/shop"><LangText en="Shop supportive play" bn="সহায়ক পণ্য দেখুন" /> <ArrowIcon /></a></div>
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
        <p className="eyebrow"><LangText en="OUR BELIEF" bn="আমাদের বিশ্বাস" /></p><h2><LangText en="More isn't always better." bn="বেশি মানেই সবসময় ভালো নয়।" /></h2><h2 className="accent"><LangText en="The right things matter." bn="সঠিক জিনিসই গুরুত্বপূর্ণ।" /></h2><p><LangText en="Childhood is filled with small moments of discovery. We carefully select products that encourage meaningful play, exploration and growing independence." bn="শৈশব ছোট ছোট আবিষ্কারের মুহূর্তে ভরা। আমরা এমন পণ্য বাছাই করি যা অর্থবহ খেলা, অনুসন্ধান ও ধীরে ধীরে স্বাধীনতাকে উৎসাহ দেয়।" /></p><a className="text-link" href="#process"><LangText en="Our Philosophy" bn="আমাদের দর্শন" /> <ArrowIcon /></a>
      </section>

      <section className="story-section">
        <div className="story-image" role="img" aria-label="Small hands exploring an activity toy" />
        <div className="story-copy"><p className="eyebrow"><LangText en="FINE MOTOR DEVELOPMENT" bn="ফাইন মোটর বিকাশ" /></p><h2><LangText en="Small hands are learning a lot." bn="ছোট হাত অনেক কিছু শিখছে।" /></h2><p><LangText en="Turning, pulling, pressing and grasping give children opportunities to practise controlled hand movements—one curious action at a time." bn="ঘোরানো, টানা, চাপ দেওয়া ও ধরা শিশুকে নিয়ন্ত্রিত হাতের নড়াচড়া অনুশীলনের সুযোগ দেয়, একেকটি কৌতূহলী কাজের মাধ্যমে।" /></p><a className="button outline" href="/shop?skill=fine-motor"><LangText en="Explore Fine Motor Play" bn="ফাইন মোটর পণ্য দেখুন" /></a></div>
      </section>

      <section className="section newly-section">
        <div className="section-heading split"><div><p className="eyebrow"><LangText en="JUST ARRIVED" bn="নতুন যোগ হয়েছে" /></p><h2><LangText en="Newly selected" bn="নতুন বাছাই" /></h2><p><LangText en="Recent additions to our carefully curated collection." bn="আমাদের যত্ন নিয়ে বাছাই করা সংগ্রহে সাম্প্রতিক সংযোজন।" /></p></div><a className="text-link" href="/shop?sort=newest"><LangText en="View all" bn="সব দেখুন" /> <ArrowIcon /></a></div>
        <ProductRail>{products.slice().reverse().slice(0, 3).map((p) => <ProductCard product={p} key={`new-${p.name}`} />)}</ProductRail>
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
        <div className="section-heading split"><div><p className="eyebrow">NOTES FOR THOUGHTFUL PARENTS</p><h2>Growing together</h2></div><Link className="text-link" href="/articles">Explore all articles <ArrowIcon /></Link></div>
        <div className="article-grid">{[["01", "How fine motor skills develop through everyday play", "6 min read", "fine-motor-play"], ["02", "Choosing toys for your child's current stage", "5 min read", "choosing-toys-by-stage"], ["03", "Why children don't need dozens of toys", "4 min read", "fewer-better-toys"]].map(([num, title, time, slug]) => <Link href={`/articles/${slug}`} key={num}><div className={`article-image article-${num}`}><span>{num}</span></div><p>DEVELOPMENT NOTES · {time}</p><h3>{title}</h3><span className="read-link">Read article →</span></Link>)}</div>
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
        {[["SHOP", [["Shop All", "/shop"], ["New Arrivals", "/shop?sort=newest"], ["Shop by Age", "/shop"], ["Shop by Development", "/shop?skill=fine-motor"]]], ["ZUVEE DUVEE", [["Our Story", "#philosophy"], ["Our Philosophy", "#process"], ["How We Choose", "#process"], ["Learn", "#learn"]]], ["HELP", [["Contact", "#"], ["Delivery", "#"], ["Returns & Exchanges", "#"], ["FAQ", "#"]]], ["FOLLOW", [["Facebook", "#"], ["Instagram", "#"], ["WhatsApp", "#"]]]].map(([title, links]) => <div className="footer-column" key={title as string}><h3>{title as string}</h3>{(links as string[][]).map(([link, href]) => <a href={href} key={link}>{link}</a>)}</div>)}
        <div className="footer-bottom"><span>© 2026 Zuvee Duvee</span><div><a href="#">Privacy Policy</a><a href="#">Terms & Conditions</a></div><span>Thoughtfully selected in Bangladesh</span></div>
      </footer>
    </main>
  );
}
