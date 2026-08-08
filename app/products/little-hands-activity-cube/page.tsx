import type { Metadata } from "next";
import ProductPurchase from "./ProductPurchase";

const canonicalUrl = "https://zuvee-duvee.istiakzishan.chatgpt.site/products/little-hands-activity-cube";
const description = "A hands-on activity cube for children 12 months and older, thoughtfully selected for turning, grasping, placing and early problem-solving play.";

export const metadata: Metadata = {
  title: "Little Hands Activity Cube for 12m+ | Zuvee Duvee Bangladesh",
  description,
  alternates: { canonical: canonicalUrl },
  openGraph: {
    title: "Little Hands Activity Cube for 12m+ | Zuvee Duvee",
    description,
    url: canonicalUrl,
    siteName: "Zuvee Duvee",
    locale: "en_BD",
    type: "website",
    images: [{ url: "/hero-zuvee-duvee.webp", width: 1774, height: 887, alt: "Little Hands Activity Cube in a calm play setting" }],
  },
  twitter: { card: "summary_large_image", title: "Little Hands Activity Cube for 12m+", description, images: ["/hero-zuvee-duvee.webp"] },
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Little Hands Activity Cube",
  description,
  image: [
    "https://zuvee-duvee.istiakzishan.chatgpt.site/hero-zuvee-duvee.webp",
    "https://zuvee-duvee.istiakzishan.chatgpt.site/story-zuvee-duvee.webp",
  ],
  brand: { "@type": "Brand", name: "Zuvee Duvee" },
  category: "Children's developmental play",
  audience: { "@type": "PeopleAudience", suggestedMinAge: 1 },
  offers: {
    "@type": "Offer",
    url: canonicalUrl,
    priceCurrency: "BDT",
    price: "2450",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://zuvee-duvee.istiakzishan.chatgpt.site/" },
    { "@type": "ListItem", position: 2, name: "Products", item: "https://zuvee-duvee.istiakzishan.chatgpt.site/#products" },
    { "@type": "ListItem", position: 3, name: "Little Hands Activity Cube", item: canonicalUrl },
  ],
};

export default function ProductPage() {
  return (
    <main className="product-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="announcement">Thoughtfully selected for growing little ones <span>·</span> Delivery across Bangladesh</div>
      <header className="product-header">
        <a className="logo" href="/" aria-label="Zuvee Duvee home">ZUVEE <i>DUVEE</i></a>
        <nav aria-label="Main navigation"><a href="/#products">Shop</a><a href="/#age">Shop by Age</a><a href="/#development">Development</a><a href="/#learn">Learn</a><a href="/#philosophy">Our Story</a></nav>
        <div className="header-actions"><a href="/#products">Search</a><a className="desktop-only" href="#account">Account</a><a href="#bag">Bag <span>(0)</span></a></div>
      </header>

      <div className="product-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span>›</span><a href="/#products">Products</a><span>›</span><span aria-current="page">Little Hands Activity Cube</span></div>

      <section className="product-detail-hero">
        <div className="product-gallery">
          <figure className="product-gallery-main"><img src="/hero-zuvee-duvee.webp" alt="Little Hands Activity Cube used during calm parent-and-child play" /></figure>
          <figure><img src="/story-zuvee-duvee.webp" alt="Close view of small hands turning and grasping activity components" /></figure>
          <figure><img src="/age-zuvee-duvee.webp" alt="Thoughtfully selected play objects arranged on warm cream surfaces" /></figure>
        </div>

        <div className="product-summary">
          <p className="eyebrow">HANDS-ON DISCOVERY · 12 MONTHS+</p>
          <h1>Little Hands Activity Cube</h1>
          <p className="product-price">৳ 2,450</p>
          <p className="product-intro">A thoughtfully selected activity cube that brings several small hand movements into one calm play experience.</p>
          <div className="product-tags"><span>Fine motor play</span><span>Problem solving</span><span>Hand-eye coordination</span></div>
          <ProductPurchase />
          <div className="product-service-notes"><p><b>Delivery</b><span>Available across Bangladesh</span></p><p><b>Need guidance?</b><span>Ask us if this feels right for your child&apos;s current stage.</span></p></div>
        </div>
      </section>

      <section className="product-editorial">
        <div><p className="eyebrow">WHY WE SELECTED IT</p><h2>Many little actions,<br />one considered toy.</h2></div>
        <div><p>Young children often return to simple actions: turning, grasping, moving and placing. This activity cube brings those actions together in a contained format that can invite repeated exploration.</p><p>It does not promise a developmental outcome. It simply offers age-considered opportunities to practise controlled hand movements, notice cause and effect, and try another approach.</p></div>
      </section>

      <section className="product-benefits" aria-labelledby="development-value">
        <div className="benefit-image"><img src="/story-zuvee-duvee.webp" alt="Toddler hands exploring rounded activity components" /></div>
        <div><p className="eyebrow">DEVELOPMENTAL VALUE</p><h2 id="development-value">What they can explore</h2>
          <ol><li><span>01</span><div><h3>Controlled hand movements</h3><p>Turning, pressing and grasping can give small hands opportunities to practise movement with intention.</p></div></li><li><span>02</span><div><h3>Cause and effect</h3><p>Children can notice how an action creates a visible or physical response.</p></div></li><li><span>03</span><div><h3>Trying another way</h3><p>Different activities encourage curiosity, repetition and early problem-solving habits.</p></div></li></ol>
        </div>
      </section>

      <section className="product-information">
        <div><p className="eyebrow">GOOD TO KNOW</p><h2>Clear details for parents.</h2><p>We keep product information direct so you can decide whether it fits your child and your home.</p></div>
        <div className="product-accordions">
          <details open><summary>Age guidance</summary><p>Considered for children from approximately 12 months. Every child develops at a different pace, so observe their current interests and abilities.</p></details>
          <details><summary>Play ideas</summary><p>Begin with one action at a time. Let your child watch, try and repeat without rushing to show every feature.</p></details>
          <details><summary>Supervision</summary><p>Use with attentive adult supervision and check the product before each play session.</p></details>
          <details><summary>Delivery in Bangladesh</summary><p>Delivery is available across Bangladesh. Exact charges and estimated timing are confirmed during order processing.</p></details>
        </div>
      </section>

      <section className="product-seo-copy">
        <p className="eyebrow">ACTIVITY TOYS FOR 12 MONTHS+</p>
        <h2>A calmer way to choose developmental play.</h2>
        <p>For parents looking for an activity cube in Bangladesh, the most useful question is not how many features it has. The better question is whether those features suit what a child is beginning to explore. Zuvee Duvee considers age, usability, meaningful play value and how clearly a product can fit into everyday family life.</p>
        <div><a href="/#age">Explore toys by age →</a><a href="/#development">Explore by developmental interest →</a></div>
      </section>

      <footer>
        <div className="footer-brand"><a className="logo" href="/">ZUVEE <i>DUVEE</i></a><p>You don&apos;t need everything;<br />you need the right things.</p><span>Dhaka, Bangladesh</span></div>
        {[["SHOP", ["Shop All", "New Arrivals", "Shop by Age", "Shop by Development"]], ["ZUVEE DUVEE", ["Our Story", "Our Philosophy", "How We Choose", "Learn"]], ["HELP", ["Contact", "Delivery", "Returns & Exchanges", "FAQ"]], ["FOLLOW", ["Facebook", "Instagram", "WhatsApp"]]].map(([title, links]) => <div className="footer-column" key={title as string}><h3>{title as string}</h3>{(links as string[]).map(link => <a href="/#" key={link}>{link}</a>)}</div>)}
        <div className="footer-bottom"><span>© 2026 Zuvee Duvee</span><div><a href="#">Privacy Policy</a><a href="#">Terms & Conditions</a></div><span>Thoughtfully selected in Bangladesh</span></div>
      </footer>
    </main>
  );
}
