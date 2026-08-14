import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CommerceExperience from "../../CommerceExperience";
import ProductPurchase from "../ProductPurchase";
import { getProduct, products } from "../product-data";

const baseUrl = "https://zuvee-duvee.istiakzishan.chatgpt.site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  const canonicalUrl = `${baseUrl}/products/${product.slug}`;

  return {
    title: `${product.name} for ${product.age} | Zuvee Duvee Bangladesh`,
    description: product.description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: `${product.name} for ${product.age} | Zuvee Duvee`,
      description: product.description,
      url: canonicalUrl,
      siteName: "Zuvee Duvee",
      locale: "en_BD",
      type: "website",
      images: [{ url: product.gallery[0].src, width: 1774, height: 887, alt: product.gallery[0].alt }],
    },
    twitter: { card: "summary_large_image", title: `${product.name} for ${product.age}`, description: product.description, images: [product.gallery[0].src] },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const canonicalUrl = `${baseUrl}/products/${product.slug}`;
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.gallery.map((image) => `${baseUrl}${image.src}`),
    brand: { "@type": "Brand", name: "Zuvee Duvee" },
    category: "Children's developmental play",
    audience: { "@type": "PeopleAudience", suggestedMinAge: parseInt(product.age, 10) || undefined },
    offers: { "@type": "Offer", url: canonicalUrl, priceCurrency: "BDT", price: product.priceValue },
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${baseUrl}/` },
      { "@type": "ListItem", position: 2, name: "Products", item: `${baseUrl}/#products` },
      { "@type": "ListItem", position: 3, name: product.name, item: canonicalUrl },
    ],
  };

  return (
    <main className="product-page">
      <CommerceExperience />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="announcement">Thoughtfully selected for growing little ones <span>·</span> Delivery across Bangladesh</div>
      <header className="product-header">
        <Link className="logo" href="/" aria-label="Zuvee Duvee home">ZUVEE <i>DUVEE</i></Link>
        <nav aria-label="Main navigation"><Link href="/#products">Shop</Link><Link href="/#age">Shop by Age</Link><Link href="/#development">Development</Link><Link href="/#learn">Learn</Link><Link href="/#philosophy">Our Story</Link></nav>
        <div className="header-actions"><Link className="header-search" href="/#products">Search</Link><button className="header-account" type="button" data-open-account data-account-label>Account</button><button className="header-bag" type="button" data-open-cart>Bag <span data-cart-count>(0)</span></button></div>
      </header>

      <div className="product-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>›</span><Link href="/#products">Products</Link><span>›</span><span aria-current="page">{product.name}</span></div>

      <section className="product-detail-hero">
        <div className="product-gallery">
          {product.gallery.map((image, index) => (
            <figure className={index === 0 ? "product-gallery-main" : undefined} key={image.alt}>
              <img src={image.src} alt={image.alt} style={image.position ? { objectPosition: image.position } : undefined} />
            </figure>
          ))}
        </div>

        <div className="product-summary">
          <p className="eyebrow">HANDS-ON DISCOVERY · {product.age}</p>
          <h1>{product.name}</h1>
          <p className="product-price">{product.price}</p>
          <p className="product-intro">{product.intro}</p>
          <div className="product-tags">{product.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          <ProductPurchase product={{ slug: product.slug, name: product.name, price: product.price, priceValue: product.priceValue }} />
          <a className="product-specs-jump" href="#product-details">Product details & specs →</a>
          <div className="product-service-notes"><p><b>Delivery</b><span>Available across Bangladesh</span></p><p><b>Need guidance?</b><span>Ask us if this feels right for your child&apos;s current stage.</span></p></div>
        </div>
      </section>

      <section className="product-editorial">
        <div><p className="eyebrow">WHY WE SELECTED IT</p><h2>{product.selectedReason[0]}</h2></div>
        <div><p>{product.selectedReason[1]}</p><p>It does not promise a developmental outcome. It simply offers age-considered opportunities to practise useful play actions at a child&apos;s own pace.</p></div>
      </section>

      <section className="product-benefits" aria-labelledby="development-value">
        <div className="benefit-image"><img src={product.gallery[1].src} alt={product.gallery[1].alt} /></div>
        <div><p className="eyebrow">DEVELOPMENTAL VALUE</p><h2 id="development-value">What they can explore</h2>
          <ol>{product.benefits.map((benefit, index) => <li key={benefit.title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{benefit.title}</h3><p>{benefit.copy}</p></div></li>)}</ol>
        </div>
      </section>

      <section className="product-information" id="product-details">
        <div><p className="eyebrow">GOOD TO KNOW</p><h2>Clear details for parents.</h2><p>We keep product information direct so you can decide whether it fits your child and your home.</p></div>
        <div className="product-accordions">
          <details className="product-specs-panel" open>
            <summary>Product specs & details</summary>
            <div className="product-specs-content">
              <dl className="product-specs-list">
                {product.specs.map((spec) => <div key={spec.label}><dt>{spec.label}</dt><dd>{spec.value}</dd></div>)}
              </dl>
              <div className="product-detail-notes">
                {product.details.map((detail) => <article key={detail.title}><h3>{detail.title}</h3><p>{detail.copy}</p></article>)}
              </div>
            </div>
          </details>
        </div>
      </section>

      <section className="product-seo-copy">
        <p className="eyebrow">ACTIVITY TOYS FOR {product.age}</p>
        <h2>{product.seoTitle}</h2>
        <p>{product.seoCopy}</p>
        <div><Link href="/#age">Explore toys by age →</Link><Link href="/#development">Explore by developmental interest →</Link></div>
      </section>

      <footer>
        <div className="footer-brand"><Link className="logo" href="/">ZUVEE <i>DUVEE</i></Link><p>You don&apos;t need everything;<br />you need the right things.</p><span>Dhaka, Bangladesh</span></div>
        {[["SHOP", ["Shop All", "New Arrivals", "Shop by Age", "Shop by Development"]], ["ZUVEE DUVEE", ["Our Story", "Our Philosophy", "How We Choose", "Learn"]], ["HELP", ["Contact", "Delivery", "Returns & Exchanges", "FAQ"]], ["FOLLOW", ["Facebook", "Instagram", "WhatsApp"]]].map(([title, links]) => <div className="footer-column" key={title as string}><h3>{title as string}</h3>{(links as string[]).map(link => <Link href="/#" key={link}>{link}</Link>)}</div>)}
        <div className="footer-bottom"><span>© 2026 Zuvee Duvee</span><div><a href="#">Privacy Policy</a><a href="#">Terms & Conditions</a></div><span>Thoughtfully selected in Bangladesh</span></div>
      </footer>
    </main>
  );
}
