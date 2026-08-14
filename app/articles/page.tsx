import type { Metadata } from "next";
import Link from "next/link";
import CommerceExperience from "../CommerceExperience";
import LanguageSwitcher from "../LanguageSwitcher";
import { articles } from "./article-data";

export const metadata: Metadata = { title: "Articles for thoughtful parents | Zuvee Duvee", description: "Practical notes on play, development and choosing fewer, better things for childhood." };

export default function ArticlesPage() {
  return <main className="articles-page">
    <CommerceExperience />
    <div className="announcement">Thoughtfully selected for growing little ones <span>·</span> Delivery across Bangladesh</div>
    <header className="product-header"><Link className="logo" href="/" aria-label="Zuvee Duvee home">ZUVEE <i>DUVEE</i></Link><nav aria-label="Main navigation"><Link href="/shop">Shop</Link><Link href="/shop">Shop by Age</Link><Link href="/#development">Development</Link><Link href="/articles">Learn</Link><Link href="/#philosophy">Our Story</Link></nav><div className="header-actions"><LanguageSwitcher /><Link className="header-search" href="/shop">Search</Link><button className="header-account" type="button" data-open-account data-account-label>Account</button><button className="header-bag" type="button" data-open-cart>Bag <span data-cart-count>(0)</span></button></div></header>
    <nav className="site-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>›</span><span aria-current="page">Articles</span></nav>
    <section className="articles-hero"><p className="eyebrow">NOTES FOR THOUGHTFUL PARENTS</p><h1>Growing together</h1><p>Practical, gentle guidance for the small moments that make up childhood.</p></section>
    <section className="articles-index"><div className="articles-index-heading"><p className="eyebrow">DEVELOPMENT NOTES</p><h2>Ideas to return to.</h2></div><div className="articles-grid">{articles.map((article) => <Link className="article-index-card" href={`/articles/${article.slug}`} key={article.slug}><div className="article-image" style={{ backgroundImage: `url(${article.image})` }}><span>{article.number}</span></div><p className="article-meta">DEVELOPMENT NOTES · {article.readTime}</p><h3>{article.title}</h3><p>{article.excerpt}</p><span className="read-link">Read article →</span></Link>)}</div></section>
    <footer><div className="footer-brand"><Link className="logo" href="/">ZUVEE <i>DUVEE</i></Link><p>You don&apos;t need everything;<br />you need the right things.</p><span>Dhaka, Bangladesh</span></div><div className="footer-column"><h3>SHOP</h3><Link href="/shop">Shop All</Link><Link href="/shop?sort=newest">New Arrivals</Link><Link href="/shop?skill=fine-motor">Shop by Development</Link></div><div className="footer-column"><h3>ZUVEE DUVEE</h3><Link href="/#philosophy">Our Story</Link><Link href="/articles">Learn</Link></div><div className="footer-column"><h3>HELP</h3><a href="#">Contact</a><a href="#">Delivery</a><a href="#">FAQ</a></div><div className="footer-bottom"><span>© 2026 Zuvee Duvee</span><span>Thoughtfully selected in Bangladesh</span></div></footer>
  </main>;
}
