import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CommerceExperience from "../../CommerceExperience";
import LanguageSwitcher from "../../LanguageSwitcher";
import ProductPurchase from "../ProductPurchase";
import { getProduct, products } from "../product-data";

const baseUrl = "https://zuvee-duvee.istiakzishan.chatgpt.site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function LangText({ en, bn }: { en: string; bn: string }) {
  return <><span className="lang-en">{en}</span><span className="lang-bn">{bn}</span></>;
}

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
      { "@type": "ListItem", position: 2, name: "Products", item: `${baseUrl}/shop` },
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
        <nav aria-label="Main navigation"><Link href="/shop">Shop</Link><Link href="/shop">Shop by Age</Link><Link href="/#development">Development</Link><Link href="/#learn">Learn</Link><Link href="/#philosophy">Our Story</Link></nav>
        <div className="header-actions"><LanguageSwitcher /><Link className="header-search" href="/shop">Search</Link><button className="header-account" type="button" data-open-account data-account-label>Account</button><button className="header-bag" type="button" data-open-cart>Bag <span data-cart-count>(0)</span></button></div>
      </header>

      <div className="product-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>›</span><Link href="/shop">Products</Link><span>›</span><span aria-current="page"><LangText en={product.shortName} bn={product.shortNameBn} /></span></div>

      <section className="product-detail-hero">
        <div className="product-gallery">
          {product.gallery.map((image, index) => (
            <figure className={index === 0 ? "product-gallery-main" : undefined} key={image.alt}>
              <img src={image.src} alt={image.alt} style={image.position ? { objectPosition: image.position } : undefined} />
            </figure>
          ))}
        </div>

        <div className="product-summary">
          <p className="eyebrow"><LangText en={`HANDS-ON DISCOVERY · ${product.age}`} bn={`হাতে-কলমে আবিষ্কার · ${product.ageBn}`} /></p>
          <h1><LangText en={product.name} bn={product.nameBn} /></h1>
          <p className="product-price"><span>{product.price}</span>{product.isSale && <s>{product.regularPrice}</s>}</p>
          <p className={`product-stock ${product.stock === 0 ? "out-of-stock" : product.stock < 10 ? "low-stock" : ""}`}><LangText en={product.stock === 0 ? "Out of stock" : product.stock < 10 ? `Only ${product.stock} in stock` : `${product.stock} in stock`} bn={product.stock === 0 ? "স্টকে নেই" : product.stock < 10 ? `মাত্র ${product.stock} টি স্টকে আছে` : `${product.stock} টি স্টকে আছে`} /></p>
          <p className="product-intro"><LangText en={product.intro} bn={product.introBn} /></p>
          <div className="product-tags lang-en">{product.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          <div className="product-tags lang-bn">{product.tagsBn.map((tag) => <span key={tag}>{tag}</span>)}</div>
          <ProductPurchase product={{ slug: product.slug, name: product.name, price: product.price, priceValue: product.priceValue, purchasable: product.purchasable, stock: product.stock }} />
          <a className="product-specs-jump" href="#product-details"><LangText en="Product details & specs →" bn="পণ্যের বিস্তারিত ও স্পেকস →" /></a>
          <div className="product-service-notes"><p><b><LangText en="Delivery" bn="ডেলিভারি" /></b><span><LangText en="Available across Bangladesh" bn="সারা বাংলাদেশে ডেলিভারি উপলভ্য" /></span></p><p><b><LangText en="Need guidance?" bn="সহায়তা দরকার?" /></b><span><LangText en="Ask us if this feels right for your child's current stage." bn="এটি আপনার শিশুর বর্তমান পর্যায়ের জন্য ঠিক কিনা জানতে আমাদের জিজ্ঞেস করুন।" /></span></p></div>
        </div>
      </section>

      <section className="product-editorial">
        <div><p className="eyebrow"><LangText en="WHY WE SELECTED IT" bn="কেন এটি বাছাই করা" /></p><h2><LangText en={product.selectedReason[0]} bn={product.selectedReasonBn[0]} /></h2></div>
        <div><p><LangText en={product.selectedReason[1]} bn={product.selectedReasonBn[1]} /></p><p><LangText en="It does not promise a developmental outcome. It simply offers age-considered opportunities to practise useful play actions at a child's own pace." bn="এটি কোনো বিকাশগত ফলাফলের প্রতিশ্রুতি দেয় না। এটি শুধু শিশুর নিজের গতিতে প্রয়োজনীয় খেলার কাজ অনুশীলনের বয়স-বিবেচিত সুযোগ দেয়।" /></p></div>
      </section>

      <section className="product-benefits" aria-labelledby="development-value">
        <div className="benefit-image"><img src={product.gallery[1].src} alt={product.gallery[1].alt} /></div>
        <div><p className="eyebrow"><LangText en="DEVELOPMENTAL VALUE" bn="বিকাশগত মূল্য" /></p><h2 id="development-value"><LangText en="What they can explore" bn="তারা কী অন্বেষণ করতে পারে" /></h2>
          <ol>{product.benefits.map((benefit, index) => <li key={benefit.title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3><LangText en={benefit.title} bn={benefit.titleBn} /></h3><p><LangText en={benefit.copy} bn={benefit.copyBn} /></p></div></li>)}</ol>
        </div>
      </section>

      <section className="product-information" id="product-details">
        <div><p className="eyebrow"><LangText en="GOOD TO KNOW" bn="জেনে রাখা ভালো" /></p><h2><LangText en="Clear details for parents." bn="অভিভাবকের জন্য পরিষ্কার তথ্য।" /></h2><p><LangText en="We keep product information direct so you can decide whether it fits your child and your home." bn="আপনার শিশু ও ঘরের জন্য পণ্যটি মানানসই কিনা বুঝতে আমরা তথ্য সরাসরি রাখি।" /></p></div>
        <div className="product-accordions">
          <details className="product-specs-panel" open>
            <summary><LangText en="Product specs & details" bn="পণ্যের স্পেকস ও বিস্তারিত" /></summary>
            <div className="product-specs-content">
              <dl className="product-specs-list">
                {product.specs.map((spec) => <div key={spec.label}><dt><LangText en={spec.label} bn={spec.labelBn} /></dt><dd><LangText en={spec.value} bn={spec.valueBn} /></dd></div>)}
              </dl>
              <div className="product-detail-notes">
                {product.details.map((detail) => <article key={detail.title}><h3><LangText en={detail.title} bn={detail.titleBn} /></h3><p><LangText en={detail.copy} bn={detail.copyBn} /></p></article>)}
              </div>
            </div>
          </details>
        </div>
      </section>

      <section className="product-seo-copy">
        <p className="eyebrow"><LangText en={`ACTIVITY TOYS FOR ${product.age}`} bn={`${product.ageBn} বয়সের অ্যাক্টিভিটি টয়`} /></p>
        <h2><LangText en={product.seoTitle} bn={product.seoTitleBn} /></h2>
        <p><LangText en={product.seoCopy} bn={product.seoCopyBn} /></p>
        <div><Link href="/shop"><LangText en="Explore toys by age →" bn="বয়স অনুযায়ী পণ্য দেখুন →" /></Link><Link href="/shop?skill=fine-motor"><LangText en="Explore by developmental interest →" bn="বিকাশগত আগ্রহ অনুযায়ী দেখুন →" /></Link></div>
      </section>

      <footer>
        <div className="footer-brand"><Link className="logo" href="/">ZUVEE <i>DUVEE</i></Link><p>You don&apos;t need everything;<br />you need the right things.</p><span>Dhaka, Bangladesh</span></div>
        {[["SHOP", ["Shop All", "New Arrivals", "Shop by Age", "Shop by Development"]], ["ZUVEE DUVEE", ["Our Story", "Our Philosophy", "How We Choose", "Learn"]], ["HELP", ["Contact", "Delivery", "Returns & Exchanges", "FAQ"]], ["FOLLOW", ["Facebook", "Instagram", "WhatsApp"]]].map(([title, links]) => <div className="footer-column" key={title as string}><h3>{title as string}</h3>{(links as string[]).map(link => <Link href={(title as string) === "SHOP" ? "/shop" : "/#"} key={link}>{link}</Link>)}</div>)}
        <div className="footer-bottom"><span>© 2026 Zuvee Duvee</span><div><a href="#">Privacy Policy</a><a href="#">Terms & Conditions</a></div><span>Thoughtfully selected in Bangladesh</span></div>
      </footer>
    </main>
  );
}
