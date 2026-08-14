import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CommerceExperience from "../../CommerceExperience";
import LanguageSwitcher from "../../LanguageSwitcher";
import { articles, getArticle } from "../article-data";

type PageProps = { params: Promise<{ slug: string }> };
const baseUrl = "https://zuvee-duvee.istiakzishan.chatgpt.site";

export function generateStaticParams() { return articles.map((article) => ({ slug: article.slug })); }
export async function generateMetadata({ params }: PageProps): Promise<Metadata> { const article = getArticle((await params).slug); return article ? { title: `${article.title} | Zuvee Duvee`, description: article.excerpt, alternates: { canonical: `${baseUrl}/articles/${article.slug}` } } : {}; }

export default async function ArticlePage({ params }: PageProps) {
  const article = getArticle((await params).slug);
  if (!article) notFound();
  return <main className="article-detail-page">
    <CommerceExperience />
    <div className="announcement">Thoughtfully selected for growing little ones <span>·</span> Delivery across Bangladesh</div>
    <header className="product-header"><Link className="logo" href="/" aria-label="Zuvee Duvee home">ZUVEE <i>DUVEE</i></Link><nav aria-label="Main navigation"><Link href="/shop">Shop</Link><Link href="/shop">Shop by Age</Link><Link href="/#development">Development</Link><Link href="/articles">Learn</Link><Link href="/#philosophy">Our Story</Link></nav><div className="header-actions"><LanguageSwitcher /><Link className="header-search" href="/shop">Search</Link><button className="header-account" type="button" data-open-account data-account-label>Account</button><button className="header-bag" type="button" data-open-cart>Bag <span data-cart-count>(0)</span></button></div></header>
    <nav className="site-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>›</span><Link href="/articles">Articles</Link><span>›</span><span aria-current="page">{article.title}</span></nav>
    <article className="article-detail"><header><p className="eyebrow">DEVELOPMENT NOTES · {article.readTime}</p><h1>{article.title}</h1><p className="article-dek">{article.excerpt}</p></header><div className="article-detail-image" style={{ backgroundImage: `url(${article.image})` }} role="img" aria-label={article.title} /><div className="article-copy">{article.sections.map((section) => <section key={section.heading}><h2>{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>)}</div><footer className="article-next"><Link href="/articles">← All articles</Link><Link href="/shop?skill=fine-motor">Explore thoughtful play →</Link></footer></article>
  </main>;
}
