"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { openAccount, openCart } from "../CommerceExperience";
import LanguageSwitcher from "../LanguageSwitcher";
import ProductCard from "../products/ProductCard";
import type { ProductDetail } from "../products/product-data";
import { useCatalogProducts } from "../products/useCatalogProducts";

type InitialParams = {
  age?: string;
  skill?: string;
  sort?: string;
  price?: string;
  sale?: string;
};

const ageOptions = [
  { value: "4-10", label: "4-10 Months", labelBn: "৪-১০ মাস" },
  { value: "1-3", label: "1-3 Years", labelBn: "১-৩ বছর" },
  { value: "3-6", label: "3-6 Years", labelBn: "৩-৬ বছর" },
  { value: "pending", label: "Age pending", labelBn: "বয়স যাচাই বাকি" },
];

const skillOptions = [
  { value: "fine-motor", label: "Fine motor", labelBn: "ফাইন মোটর" },
  { value: "problem-solving", label: "Problem solving", labelBn: "সমস্যা সমাধান" },
  { value: "sensory", label: "Sensory", labelBn: "সেন্সরি" },
  { value: "hand-eye", label: "Hand-eye", labelBn: "হাত-চোখ" },
  { value: "creativity", label: "Creativity", labelBn: "সৃজনশীলতা" },
  { value: "logic", label: "Logic", labelBn: "যুক্তি" },
  { value: "geometry", label: "Geometry", labelBn: "জ্যামিতি" },
  { value: "shape-recognition", label: "Shape recognition", labelBn: "আকার চেনা" },
  { value: "focus", label: "Focus", labelBn: "মনোযোগ" },
];

const priceOptions = [
  { value: "under-600", label: "Under ৳600", labelBn: "৳৬০০-এর নিচে" },
  { value: "600-800", label: "৳600-৳800", labelBn: "৳৬০০-৳৮০০" },
  { value: "800-plus", label: "৳800+", labelBn: "৳৮০০+" },
];

function LangText({ en, bn }: { en: string; bn: string }) {
  return <><span className="lang-en">{en}</span><span className="lang-bn">{bn}</span></>;
}

function matchesPrice(price: number, selectedPrice: string) {
  if (!selectedPrice) return true;
  if (selectedPrice === "under-600") return price < 600;
  if (selectedPrice === "600-800") return price >= 600 && price <= 800;
  if (selectedPrice === "800-plus") return price > 800;
  return true;
}

export default function ShopClient({ initialParams, initialProducts }: { initialParams: InitialParams; initialProducts?: ProductDetail[] }) {
  const products = useCatalogProducts(initialProducts);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedAge, setSelectedAge] = useState(initialParams.age || "");
  const [selectedSkills, setSelectedSkills] = useState<string[]>(initialParams.skill ? [initialParams.skill] : []);
  const [selectedPrice, setSelectedPrice] = useState(initialParams.price || "");
  const [saleOnly, setSaleOnly] = useState(initialParams.sale === "true");
  const [sort, setSort] = useState(initialParams.sort || "newest");

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => !selectedAge || product.ageFilters.includes(selectedAge))
      .filter((product) => selectedSkills.length === 0 || selectedSkills.every((skill) => product.skillFilters.includes(skill)))
      .filter((product) => matchesPrice(Number(product.priceValue), selectedPrice))
      .filter((product) => !saleOnly || product.isSale)
      .slice()
      .sort((a, b) => {
        if (sort === "price-asc") return Number(a.priceValue) - Number(b.priceValue);
        if (sort === "price-desc") return Number(b.priceValue) - Number(a.priceValue);
        if (sort === "sale") return Number(b.isSale) - Number(a.isSale) || Number(a.priceValue) - Number(b.priceValue);
        return b.newestRank - a.newestRank;
      });
  }, [products, saleOnly, selectedAge, selectedPrice, selectedSkills, sort]);

  const toggleSkill = (value: string) => {
    setSelectedSkills((current) => current.includes(value) ? current.filter((skill) => skill !== value) : [...current, value]);
  };

  const clearFilters = () => {
    setSelectedAge("");
    setSelectedSkills([]);
    setSelectedPrice("");
    setSaleOnly(false);
    setSort("newest");
  };

  return (
    <main className="shop-page">
      <div className="announcement">Thoughtfully selected for growing little ones <span>·</span> Delivery across Bangladesh</div>
      <header className="site-header">
        <button className="mobile-icon" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Open menu">☰</button>
        <Link className="logo" href="/" aria-label="Zuvee Duvee home">ZUVEE <i>DUVEE</i></Link>
        <nav className={menuOpen ? "open" : ""} aria-label="Main navigation">
          <Link href="/shop">Shop</Link><Link href="/shop">Shop by Age</Link><Link href="/#development">Development</Link><Link href="/#learn">Learn</Link><Link href="/#philosophy">Our Story</Link>
        </nav>
        <div className="header-actions">
          <LanguageSwitcher />
          <button className="header-account" type="button" onClick={openAccount} data-account-label>Account</button>
          <button className="header-bag" type="button" onClick={openCart}>Bag <span data-cart-count>(0)</span></button>
        </div>
      </header>

      <section className="shop-hero">
        <p className="eyebrow"><LangText en="SHOP ALL PRODUCTS" bn="সব পণ্য" /></p>
        <h1><LangText en="Find the right play for their stage." bn="শিশুর পর্যায়ের জন্য সঠিক খেলা খুঁজুন।" /></h1>
        <p><LangText en="Filter by age, developmental focus, price and newest selections." bn="বয়স, বিকাশগত ফোকাস, দাম ও নতুন বাছাই অনুযায়ী ফিল্টার করুন।" /></p>
      </section>

      <section className="shop-layout" aria-label="Shop products">
        <aside className="shop-filters" aria-label="Product filters">
          <div className="filter-heading">
            <h2><LangText en="Filters" bn="ফিল্টার" /></h2>
            <button type="button" onClick={clearFilters}><LangText en="Clear" bn="মুছুন" /></button>
          </div>

          <fieldset className="filter-group">
            <legend><LangText en="Age range" bn="বয়স" /></legend>
            {ageOptions.map((option) => (
              <label className="filter-option" key={option.value}>
                <input type="radio" name="age" checked={selectedAge === option.value} onChange={() => setSelectedAge(option.value)} />
                <span><LangText en={option.label} bn={option.labelBn} /></span>
              </label>
            ))}
          </fieldset>

          <fieldset className="filter-group">
            <legend><LangText en="Development focus" bn="বিকাশগত ফোকাস" /></legend>
            {skillOptions.map((option) => (
              <label className="filter-option" key={option.value}>
                <input type="checkbox" checked={selectedSkills.includes(option.value)} onChange={() => toggleSkill(option.value)} />
                <span><LangText en={option.label} bn={option.labelBn} /></span>
              </label>
            ))}
          </fieldset>

          <fieldset className="filter-group">
            <legend><LangText en="Price" bn="দাম" /></legend>
            {priceOptions.map((option) => (
              <label className="filter-option" key={option.value}>
                <input type="radio" name="price" checked={selectedPrice === option.value} onChange={() => setSelectedPrice(option.value)} />
                <span><LangText en={option.label} bn={option.labelBn} /></span>
              </label>
            ))}
          </fieldset>

          <label className="filter-option sale-filter">
            <input type="checkbox" checked={saleOnly} onChange={(event) => setSaleOnly(event.target.checked)} />
            <span><LangText en="Sale items only" bn="শুধু সেল পণ্য" /></span>
          </label>
        </aside>

        <div className="shop-results">
          <div className="shop-results-head">
            <div>
              <p className="eyebrow"><LangText en={`${filteredProducts.length} PRODUCTS`} bn={`${filteredProducts.length}টি পণ্য`} /></p>
              <h2><LangText en="All Zuvee Duvee products" bn="সব Zuvee Duvee পণ্য" /></h2>
            </div>
            <label>
              <span><LangText en="Sort by" bn="সাজান" /></span>
              <select value={sort} onChange={(event) => setSort(event.target.value)}>
                <option value="newest">Newest</option>
                <option value="sale">Sales</option>
                <option value="price-asc">Price: low to high</option>
                <option value="price-desc">Price: high to low</option>
              </select>
            </label>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="shop-grid">{filteredProducts.map((product) => <ProductCard product={product} key={product.slug} />)}</div>
          ) : (
            <div className="shop-empty">
              <h3><LangText en="No products match these filters." bn="এই ফিল্টারে কোনো পণ্য পাওয়া যায়নি।" /></h3>
              <button type="button" onClick={clearFilters}><LangText en="Clear filters" bn="ফিল্টার মুছুন" /></button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
