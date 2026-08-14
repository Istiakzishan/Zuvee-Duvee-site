import { copyFile, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const outDir = "netlify-dist";
const baseUrl = "https://zuvee-duvee.netlify.app";

const products = [
  {
    slug: "little-hands-activity-cube",
    name: "Little Hands Activity Cube",
    age: "12m+",
    price: "৳ 2,450",
    tags: ["Fine motor", "Problem solving"],
    position: "13% center",
    intro: "A thoughtfully selected activity cube that brings several small hand movements into one calm play experience.",
    description: "A hands-on activity cube for children 12 months and older, thoughtfully selected for turning, grasping, placing and early problem-solving play.",
    specs: [["Recommended age", "12 months and older"], ["Play focus", "Fine motor skills, cause and effect, early problem solving"], ["Best for", "Short independent play with nearby adult guidance"], ["Availability", "Delivery across Bangladesh"]],
    benefits: [["Controlled hand movements", "Turning, pressing and grasping can give small hands opportunities to practise movement with intention."], ["Cause and effect", "Children can notice how an action creates a visible or physical response."], ["Trying another way", "Different activities encourage curiosity, repetition and early problem-solving habits."]],
  },
  {
    slug: "soft-discovery-set",
    name: "Soft Discovery Set",
    age: "4m+",
    price: "৳ 1,280",
    tags: ["Sensory", "Grasping"],
    position: "50% center",
    intro: "A soft first-play set for babies beginning to look, reach, grasp and notice gentle textures.",
    description: "A soft discovery set for babies from 4 months, selected for early sensory play, grasping practice and quiet parent-guided exploration.",
    specs: [["Recommended age", "4 months and older"], ["Play focus", "Sensory discovery, reaching, grasping"], ["Best for", "Calm awake time and parent-guided floor play"], ["Availability", "Delivery across Bangladesh"]],
    benefits: [["Early grasping", "Soft pieces invite babies to close their fingers, hold briefly and release."], ["Sensory discovery", "Gentle textures and shapes create small moments of noticing without overstimulation."], ["Shared floor play", "The set fits short parent-guided play moments during tummy time or calm awake periods."]],
  },
  {
    slug: "woodland-shape-puzzle",
    name: "Woodland Shape Puzzle",
    age: "3y+",
    price: "৳ 1,850",
    tags: ["Logic", "Hand-eye"],
    position: "86% center",
    intro: "A shape-matching puzzle for preschoolers beginning to compare, rotate, test and fit pieces with growing confidence.",
    description: "A woodland-themed shape puzzle for children 3 years and older, selected for matching, hand-eye coordination and early logical thinking.",
    specs: [["Recommended age", "3 years and older"], ["Play focus", "Matching, logic, hand-eye coordination"], ["Best for", "Quiet tabletop play and guided puzzle time"], ["Availability", "Delivery across Bangladesh"]],
    benefits: [["Shape recognition", "Children can notice edges, corners and visual differences as they match each piece."], ["Hand-eye coordination", "Lifting and placing pieces connects what children see with how their hands move."], ["Persistence", "A familiar puzzle supports trying again without needing a noisy reward."]],
  },
  {
    slug: "press-and-turn-board",
    name: "Press & Turn Board",
    age: "18m+",
    price: "৳ 2,150",
    tags: ["Focus", "Fine motor"],
    position: "38% center",
    intro: "A focused activity board for toddlers who enjoy pressing, turning and repeating actions with intent.",
    description: "A press and turn activity board for children 18 months and older, selected for fine motor practice, attention and cause-and-effect exploration.",
    specs: [["Recommended age", "18 months and older"], ["Play focus", "Fine motor control, focus, cause and effect"], ["Best for", "Toddlers who enjoy pressing, turning and repeating actions"], ["Availability", "Delivery across Bangladesh"]],
    benefits: [["Finger strength", "Pressing and turning can support small muscle control through everyday play."], ["Focus and attention", "Contained activities encourage a child to stay with one task a little longer."], ["Cause and effect", "Simple responses help toddlers connect an action with what changes next."]],
  },
];

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

function escapeHtml(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}

function shell({ title, description, content }) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/styles.css">
  <script src="/commerce.js" defer></script>
</head>
<body>
${content}
</body>
</html>`;
}

function header() {
  return `<div class="announcement">Thoughtfully selected for growing little ones <span>·</span> Delivery across Bangladesh</div>
<header class="site-header">
  <button class="mobile-icon" type="button" data-menu-toggle aria-expanded="false" aria-label="Open menu">Menu</button>
  <a class="logo" href="/" aria-label="Zuvee Duvee home">ZUVEE <i>DUVEE</i></a>
  <nav aria-label="Main navigation"><a href="/#products">Shop</a><a href="/#age">Shop by Age</a><a href="/#development">Development</a><a href="/#learn">Learn</a><a href="/#philosophy">Our Story</a></nav>
  <div class="header-actions"><a class="header-search" href="/#products">Search</a><button class="header-account" type="button" data-open-account data-account-label>Account</button><button class="header-bag" type="button" data-open-cart>Bag <span data-cart-count>(0)</span></button></div>
</header>`;
}

function footer() {
  return `<footer>
  <div class="footer-brand"><a class="logo" href="/">ZUVEE <i>DUVEE</i></a><p>You don't need everything;<br>you need the right things.</p><span>Dhaka, Bangladesh</span></div>
  ${[["SHOP", "Shop All,New Arrivals,Shop by Age,Shop by Development"], ["ZUVEE DUVEE", "Our Story,Our Philosophy,How We Choose,Learn"], ["HELP", "Contact,Delivery,Returns & Exchanges,FAQ"], ["FOLLOW", "Facebook,Instagram,WhatsApp"]].map(([title, links]) => `<div class="footer-column"><h3>${title}</h3>${links.split(",").map((link) => `<a href="/#">${link}</a>`).join("")}</div>`).join("")}
  <div class="footer-bottom"><span>© 2026 Zuvee Duvee</span><div><a href="#">Privacy Policy</a><a href="#">Terms & Conditions</a></div><span>Thoughtfully selected in Bangladesh</span></div>
</footer>`;
}

function productCard(product) {
  return `<article class="product-card">
  <div class="product-image" style="background-position:${product.position}"><a class="product-image-link" href="/products/${product.slug}/" aria-label="View details for ${escapeHtml(product.name)}"></a><span class="age-pill">${product.age}</span><button class="heart" type="button">♡</button><button class="quick-add" type="button" data-add-cart data-slug="${product.slug}" data-name="${escapeHtml(product.name)}" data-price="${product.price}" data-price-value="${product.price.replace(/[^\d]/g, "")}">+ Add</button></div>
  <div class="product-info"><div class="tags">${product.tags.map((tag) => `<span>${tag}</span>`).join("")}</div><h3><a href="/products/${product.slug}/">${escapeHtml(product.name)}</a></h3><p>${product.price}</p><a class="product-details-link" href="/products/${product.slug}/">View product details →</a></div>
</article>`;
}

function homePage() {
  const content = `<main>${header()}
  <section class="hero" id="top"><div class="hero-copy"><p class="eyebrow">PLAY WITH PURPOSE</p><h1>Thoughtfully chosen for growing minds.</h1><p>Development-focused play and essentials, carefully selected for every little stage.</p><div class="button-row"><a class="button primary" href="#age">Shop by Age</a><a class="text-link" href="#products">Explore All Products <span>↗</span></a></div></div><div class="hero-image" role="img" aria-label="A parent and child sharing a calm moment of play"></div></section>
  <section class="section age-section" id="age"><div class="section-heading centered"><p class="eyebrow">SHOP BY THEIR STAGE</p><h2>Every stage brings something new.</h2><p>Explore thoughtfully selected products for where your little one is right now.</p></div><div class="age-grid">${[["4-10 Months", "Discovering the world", "0% center"], ["1-3 Years", "Exploring & becoming independent", "50% center"], ["3-6 Years", "Thinking, creating & learning", "100% center"]].map(([title, copy, pos], index) => `<a href="#products" class="age-card"><div class="age-photo" style="background-position:${pos}"></div><span>0${index + 1}</span><div><h3>${title}</h3><p>${copy}</p></div><b>→</b></a>`).join("")}</div></section>
  <section class="section product-section" id="products"><div class="section-heading split"><div><p class="eyebrow">CAREFULLY CURATED</p><h2>Zuvee Duvee favourites</h2></div><a class="text-link" href="#all-products">View all <span>↗</span></a></div><div class="product-scroll">${products.map(productCard).join("")}</div><div class="mobile-rail-dots" aria-hidden="true"><span></span><span></span><span></span></div></section>
  <section class="development-section" id="development"><div class="section-heading light"><p class="eyebrow">FOLLOW THEIR CURIOSITY</p><h2>What are they discovering today?</h2><p>Find play experiences that support the skills they're beginning to explore.</p></div><div class="development-grid">${development.map(([title, copy], i) => `<a href="#products" class="development-card"><span>0${i + 1}</span><div><h3>${title}</h3><p>${copy}</p></div><b>↗</b></a>`).join("")}</div></section>
  <section class="section skill-photo-section"><div class="section-heading split"><div><p class="eyebrow">PLAY THAT SUPPORTS GROWTH</p><h2>Six ways little ones learn through play</h2><p>Happy, everyday play moments connected to the developmental skills families often look for.</p></div><a class="text-link" href="#products">Shop supportive play <span>↗</span></a></div><div class="skill-photo-grid">${skillPhotos.map(([title, copy, position], i) => `<article class="skill-photo-card"><div class="skill-photo" style="background-position:${position}" role="img" aria-label="${escapeHtml(copy)}"></div><span>${String(i + 1).padStart(2, "0")}</span><h3>${title}</h3><p>${copy}</p></article>`).join("")}</div></section>
  <section class="philosophy" id="philosophy"><p class="eyebrow">OUR BELIEF</p><h2>More isn't always better.</h2><h2 class="accent">The right things matter.</h2><p>Childhood is filled with small moments of discovery. We carefully select products that encourage meaningful play, exploration and growing independence.</p><a class="text-link" href="#process">Our Philosophy <span>↗</span></a></section>
  <section class="story-section"><div class="story-image" role="img" aria-label="Small hands exploring an activity toy"></div><div class="story-copy"><p class="eyebrow">FINE MOTOR DEVELOPMENT</p><h2>Small hands are learning a lot.</h2><p>Turning, pulling, pressing and grasping give children opportunities to practise controlled hand movements, one curious action at a time.</p><a class="button outline" href="#products">Explore Fine Motor Play</a></div></section>
  <section class="section newly-section"><div class="section-heading split"><div><p class="eyebrow">JUST ARRIVED</p><h2>Newly selected</h2><p>Recent additions to our carefully curated collection.</p></div><a class="text-link" href="#all-products">View all <span>↗</span></a></div><div class="product-scroll">${products.slice().reverse().slice(0, 3).map(productCard).join("")}</div><div class="mobile-rail-dots" aria-hidden="true"><span></span><span></span><span></span></div></section>
  <section class="why-section"><div class="section-heading centered"><p class="eyebrow">THE ZUVEE DUVEE STANDARD</p><h2>Chosen with a reason.</h2></div><div class="principles">${[["Thoughtfully Curated", "Useful, engaging and worth bringing home."], ["Age Considered", "Selected with real stages and abilities in mind."], ["Quality Considered", "Materials, finish and everyday use all matter."], ["Parent Friendly", "Clear guidance without the pressure or noise."]].map(([title, copy], i) => `<article><span>${String(i + 1).padStart(2, "0")}</span><h3>${title}</h3><p>${copy}</p></article>`).join("")}</div></section>
  <section class="retention-section"><div><p class="eyebrow">A NOTE WORTH KEEPING</p><h2>Guidance that grows with them.</h2><p>Thoughtful play ideas, developmental guides and new Zuvee Duvee discoveries.</p></div><form><label for="email">Email address</label><input id="email" type="email" placeholder="you@example.com"><button type="submit">Join the list →</button><small>Occasional, useful notes. No noisy promotions.</small></form></section>
  ${footer()}</main>`;
  return shell({ title: "Zuvee Duvee", description: "Thoughtfully selected play and essentials for growing little ones in Bangladesh.", content });
}

function productPage(product) {
  const content = `<main class="product-page">${header()}
  <div class="product-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span>›</span><a href="/#products">Products</a><span>›</span><span aria-current="page">${escapeHtml(product.name)}</span></div>
  <section class="product-detail-hero"><div class="product-gallery"><figure class="product-gallery-main"><img src="/hero-zuvee-duvee.webp" alt="${escapeHtml(product.name)} in a calm play setting"></figure><figure><img src="/story-zuvee-duvee.webp" alt="Small hands exploring a toy"></figure><figure><img src="/age-zuvee-duvee.webp" alt="Thoughtfully selected play objects" style="object-position:${product.position}"></figure></div><div class="product-summary"><p class="eyebrow">HANDS-ON DISCOVERY · ${product.age}</p><h1>${escapeHtml(product.name)}</h1><p class="product-price">${product.price}</p><p class="product-intro">${escapeHtml(product.intro)}</p><div class="product-tags">${product.tags.map((tag) => `<span>${tag}</span>`).join("")}</div><div class="purchase-panel"><div class="quantity-control" data-product-quantity><button type="button" data-decrease>-</button><output>1</output><button type="button" data-increase>+</button></div><button class="product-add-button" type="button" data-add-cart data-detail-add data-slug="${product.slug}" data-name="${escapeHtml(product.name)}" data-price="${product.price}" data-price-value="${product.price.replace(/[^\d]/g, "")}">Add to bag</button></div><p class="purchase-note" data-purchase-note hidden>Added to your bag. Open the bag to complete checkout.</p><a class="product-specs-jump" href="#product-details">Product details & specs →</a><div class="product-service-notes"><p><b>Delivery</b><span>Available across Bangladesh</span></p><p><b>Need guidance?</b><span>Ask us if this feels right for your child's current stage.</span></p></div></div></section>
  <section class="product-editorial"><div><p class="eyebrow">WHY WE SELECTED IT</p><h2>A considered choice for growing little ones.</h2></div><div><p>${escapeHtml(product.description)}</p><p>It does not promise a developmental outcome. It simply offers age-considered opportunities to practise useful play actions at a child's own pace.</p></div></section>
  <section class="product-benefits"><div class="benefit-image"><img src="/story-zuvee-duvee.webp" alt="Child exploring activity components"></div><div><p class="eyebrow">DEVELOPMENTAL VALUE</p><h2>What they can explore</h2><ol>${product.benefits.map(([title, copy], i) => `<li><span>${String(i + 1).padStart(2, "0")}</span><div><h3>${title}</h3><p>${copy}</p></div></li>`).join("")}</ol></div></section>
  <section class="product-information" id="product-details"><div><p class="eyebrow">GOOD TO KNOW</p><h2>Clear details for parents.</h2><p>We keep product information direct so you can decide whether it fits your child and your home.</p></div><div class="product-accordions"><details class="product-specs-panel" open><summary>Product specs & details</summary><div class="product-specs-content"><dl class="product-specs-list">${product.specs.map(([label, value]) => `<div><dt>${label}</dt><dd>${value}</dd></div>`).join("")}</dl><div class="product-detail-notes"><article><h3>Age guidance</h3><p>Every child develops at a different pace, so observe their current interests and abilities.</p></article><article><h3>Delivery in Bangladesh</h3><p>Delivery is available across Bangladesh. Exact charges and estimated timing are confirmed during order processing.</p></article></div></div></details></div></section>
  <section class="product-seo-copy"><p class="eyebrow">ACTIVITY TOYS FOR ${product.age}</p><h2>A calmer way to choose developmental play.</h2><p>${escapeHtml(product.description)} Zuvee Duvee considers age, usability, meaningful play value and how clearly a product can fit into everyday family life.</p><div><a href="/#age">Explore toys by age →</a><a href="/#development">Explore by developmental interest →</a></div></section>
  ${footer()}</main>`;
  return shell({ title: `${product.name} | Zuvee Duvee`, description: product.description, content });
}

async function copyPublicAsset(file) {
  if (existsSync(path.join("public", file))) {
    await copyFile(path.join("public", file), path.join(outDir, file));
  }
}

async function main() {
  await rm(outDir, { recursive: true, force: true });
  await mkdir(outDir, { recursive: true });
  await mkdir(path.join(outDir, "products"), { recursive: true });

  const css = (await readFile("app/globals.css", "utf8"))
    .replace('@import "tailwindcss";', "")
    .replace("var(--font-display), Georgia, serif", "'Cormorant Garamond', Georgia, serif")
    .replace("var(--font-sans), Arial, sans-serif", "'DM Sans', Arial, sans-serif");
  await writeFile(path.join(outDir, "styles.css"), css);

  for (const asset of [
    "age-zuvee-duvee.webp",
    "hero-zuvee-duvee.webp",
    "story-zuvee-duvee.webp",
    "skill-play-grid.webp",
    "favicon.svg",
  ]) {
    await copyPublicAsset(asset);
  }

  await writeFile(path.join(outDir, "index.html"), homePage());
  for (const product of products) {
    const productDir = path.join(outDir, "products", product.slug);
    await mkdir(productDir, { recursive: true });
    await writeFile(path.join(productDir, "index.html"), productPage(product));
  }

  await writeFile(path.join(outDir, "_redirects"), products.map((product) => `/products/${product.slug} /products/${product.slug}/ 301`).join("\n"));
  await writeFile(path.join(outDir, "commerce.js"), commerceScript());
  await writeFile(path.join(outDir, "robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${baseUrl}/sitemap.xml\n`);
  await writeFile(path.join(outDir, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${baseUrl}/</loc></url>${products.map((product) => `<url><loc>${baseUrl}/products/${product.slug}/</loc></url>`).join("")}</urlset>`);
}

function commerceScript() {
  return `(() => {
  const cartKey = "zuvee-duvee-cart";
  const accountKey = "zuvee-duvee-account";
  const read = (key, fallback) => { try { return JSON.parse(localStorage.getItem(key)) || fallback; } catch { return fallback; } };
  let cart = read(cartKey, []);
  let account = read(accountKey, null);
  let step = "cart";
  let panel = null;
  let previousFocus = null;
  let checkout = { name: "", email: "", phone: "", address: "", city: "Dhaka", payment: "Cash on delivery", note: "" };
  const money = (value) => "৳ " + Number(value || 0).toLocaleString("en-US");
  const total = () => cart.reduce((sum, item) => sum + Number(item.priceValue) * item.quantity, 0);
  const delivery = () => cart.length ? 120 : 0;
  const save = () => { localStorage.setItem(cartKey, JSON.stringify(cart)); document.querySelectorAll("[data-cart-count]").forEach((node) => node.textContent = "(" + cart.reduce((sum, item) => sum + item.quantity, 0) + ")"); };
  const add = (item) => { const existing = cart.find((entry) => entry.slug === item.slug); if (existing) existing.quantity += item.quantity; else cart.push(item); save(); openPanel("cart"); };
  const updateQty = (slug, quantity) => { cart = cart.flatMap((item) => item.slug === slug ? (quantity < 1 ? [] : [{ ...item, quantity }]) : [item]); save(); render(); };
  const openPanel = (next) => { previousFocus = document.activeElement; panel = next; step = next === "cart" ? "cart" : step; render(); };
  const close = () => { panel = null; document.body.style.overflow = ""; render(); setTimeout(() => previousFocus?.focus?.(), 0); };
  function render() {
    document.querySelector(".commerce-overlay")?.remove();
    if (!panel) { document.body.style.overflow = ""; return; }
    document.body.style.overflow = "hidden";
    const overlay = document.createElement("div");
    overlay.className = "commerce-overlay";
    const headingId = panel === "cart" ? "commerce-cart-heading" : "commerce-account-heading";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-labelledby", headingId);
    overlay.innerHTML = '<button class="commerce-backdrop" type="button" aria-label="Close panel"></button><aside class="commerce-panel" tabindex="-1"></aside>';
    overlay.querySelector(".commerce-backdrop").addEventListener("click", close);
    document.body.appendChild(overlay);
    const aside = overlay.querySelector(".commerce-panel");
    aside.innerHTML = '<div class="commerce-panel-header"><div><p class="eyebrow">' + (panel === "cart" ? "YOUR BAG" : "ACCOUNT") + '</p><h2 id="' + headingId + '">' + (panel === "cart" ? "Complete your order" : account ? "Your account" : "Sign in or create account") + '</h2></div><button type="button" data-close>Close</button></div>' + (panel === "cart" ? cartHtml() : accountHtml());
    aside.querySelector("[data-close]")?.addEventListener("click", close);
    bindPanel(aside);
    setTimeout(() => (aside.querySelector("button, [href], input, textarea, select") || aside).focus(), 0);
  }
  function accountHtml() {
    if (account) return '<div class="account-card"><h3>Welcome, ' + account.name + '</h3><p>' + account.email + '</p><div class="commerce-actions"><button type="button" data-view-bag>View bag</button><button type="button" class="secondary" data-logout>Log out</button></div></div>';
    return '<div class="account-flow"><div class="commerce-tabs"><button class="active" type="button" data-mode="login">Log in</button><button type="button" data-mode="signup">Sign up</button></div><form class="commerce-form" data-account-form><label data-name-field hidden>Full name<input name="name" placeholder="Your name"></label><label>Email address<input name="email" type="email" required placeholder="you@example.com"></label><label>Password<input name="password" type="password" required minLength="6" placeholder="Minimum 6 characters"></label><button type="submit">Log in</button><p>This demo stores your session on this device only. Connect a real auth provider before accepting real customer accounts.</p></form></div>';
  }
  function cartHtml() {
    const steps = ["cart", "details", "payment", "review"].map((name, index) => '<span class="' + (step === name ? "active" : "") + '">' + (index + 1) + '</span>').join("");
    if (step === "cart") return '<div class="checkout-flow"><div class="checkout-steps">' + steps + '</div>' + (cart.length ? '<div class="cart-items">' + cart.map((item) => '<article><div><h3>' + item.name + '</h3><p>' + item.price + '</p></div><div class="cart-quantity"><button type="button" data-qty="' + item.slug + '" data-dir="-">-</button><output>' + item.quantity + '</output><button type="button" data-qty="' + item.slug + '" data-dir="+">+</button></div></article>').join("") + '</div>' + summaryHtml() + trustHtml() + '<button class="checkout-primary" type="button" data-next="details">Continue to checkout</button>' : '<p class="empty-state">Your bag is empty. Add a product to begin checkout.</p>') + '</div>';
    if (step === "details") return '<div class="checkout-flow"><div class="checkout-steps">' + steps + '</div><form class="commerce-form" data-details-form><label>Full name<input name="name" required value="' + (checkout.name || account?.name || "") + '"></label><label>Email<input name="email" type="email" required value="' + (checkout.email || account?.email || "") + '"></label><label>Phone<input name="phone" required value="' + checkout.phone + '" placeholder="+880..."></label><label>Delivery address<textarea name="address" required>' + checkout.address + '</textarea></label><label>City<input name="city" required value="' + checkout.city + '"></label><p class="checkout-helper">Your details are used only to confirm this order and arrange delivery.</p><button type="submit">Continue to payment</button></form></div>';
    if (step === "payment") return '<div class="checkout-flow"><div class="checkout-steps">' + steps + '</div><div class="commerce-form">' + ["Cash on delivery", "bKash payment", "Card payment"].map((method) => '<label class="radio-row"><input type="radio" name="payment" value="' + method + '"' + (checkout.payment === method ? " checked" : "") + '>' + method + '</label>').join("") + '<p class="checkout-helper">' + paymentHelper() + '</p><label>Order note<textarea name="note" placeholder="Optional delivery note">' + checkout.note + '</textarea></label><button type="button" data-next="review">Review order</button></div></div>';
    if (step === "review") return '<div class="checkout-flow"><div class="checkout-steps">' + steps + '</div><div class="review-order">' + summaryHtml() + '<button class="checkout-primary" type="button" data-place-order>Place order</button><button type="button" class="link-button" data-next="details">Edit details</button></div></div>';
    return '<div class="order-success"><h3>Order received</h3><p>Your order number is <b>ZD-' + Date.now().toString().slice(-6) + '</b>. We will contact you to confirm delivery and payment details.</p><button type="button" data-close>Done</button></div>';
  }
  function summaryHtml() { return '<div class="order-summary"><p><span>Subtotal</span><b>' + money(total()) + '</b></p><p><span>Estimated delivery</span><b>' + money(delivery()) + '</b></p><p><span>Total</span><b>' + money(total() + delivery()) + '</b></p></div>'; }
  function trustHtml() { return '<div class="checkout-trust" aria-label="Checkout reassurance"><p><b>Delivery</b><span>Dhaka orders usually arrive in 2-4 business days. We confirm timing before dispatch.</span></p><p><b>Returns</b><span>Contact us within 7 days if an item arrives damaged or unsuitable.</span></p></div>'; }
  function paymentHelper() { return checkout.payment === "Cash on delivery" ? "Pay when your order is delivered. We will call to confirm before dispatch." : checkout.payment === "bKash payment" ? "We will share bKash payment instructions after reviewing your order." : "Card payment is prepared as a demo option. Connect a payment provider before accepting real card payments."; }
  function bindPanel(root) {
    root.querySelectorAll("[data-qty]").forEach((button) => button.addEventListener("click", () => { const item = cart.find((entry) => entry.slug === button.dataset.qty); if (item) updateQty(item.slug, item.quantity + (button.dataset.dir === "+" ? 1 : -1)); }));
    root.querySelector("[data-view-bag]")?.addEventListener("click", () => openPanel("cart"));
    root.querySelector("[data-logout]")?.addEventListener("click", () => { account = null; localStorage.removeItem(accountKey); render(); });
    root.querySelector("[data-account-form]")?.addEventListener("submit", (event) => { event.preventDefault(); const data = new FormData(event.currentTarget); account = { name: data.get("name") || "Zuvee Duvee Customer", email: data.get("email") }; localStorage.setItem(accountKey, JSON.stringify(account)); checkout.name ||= account.name; checkout.email ||= account.email; render(); });
    root.querySelectorAll("[data-mode]").forEach((button) => button.addEventListener("click", () => { root.querySelectorAll("[data-mode]").forEach((node) => node.classList.remove("active")); button.classList.add("active"); const signup = button.dataset.mode === "signup"; root.querySelector("[data-name-field]").hidden = !signup; root.querySelector("[data-account-form] button").textContent = signup ? "Create account" : "Log in"; }));
    root.querySelector("[data-details-form]")?.addEventListener("submit", (event) => { event.preventDefault(); const data = new FormData(event.currentTarget); checkout = { ...checkout, name: data.get("name"), email: data.get("email"), phone: data.get("phone"), address: data.get("address"), city: data.get("city") }; step = "payment"; render(); });
    root.querySelectorAll("[name=payment]").forEach((input) => input.addEventListener("change", () => checkout.payment = input.value));
    root.querySelector("[name=note]")?.addEventListener("input", (event) => checkout.note = event.target.value);
    root.querySelectorAll("[data-next]").forEach((button) => button.addEventListener("click", () => { step = button.dataset.next; render(); }));
    root.querySelector("[data-place-order]")?.addEventListener("click", () => { cart = []; save(); step = "success"; render(); });
    root.querySelectorAll("[data-close]").forEach((button) => button.addEventListener("click", close));
  }
  document.addEventListener("click", (event) => {
    const menuToggle = event.target.closest("[data-menu-toggle]");
    if (menuToggle) {
      const nav = menuToggle.closest(".site-header")?.querySelector("nav");
      const open = !nav?.classList.contains("open");
      nav?.classList.toggle("open", open);
      menuToggle.setAttribute("aria-expanded", String(open));
    }
    const addButton = event.target.closest("[data-add-cart]");
    if (addButton) {
      event.preventDefault();
      const output = addButton.closest(".purchase-panel")?.querySelector("output");
      const quantity = output ? Number(output.textContent || 1) : 1;
      add({ slug: addButton.dataset.slug, name: addButton.dataset.name, price: addButton.dataset.price, priceValue: addButton.dataset.priceValue, quantity });
      const note = document.querySelector("[data-purchase-note]");
      if (note) note.hidden = false;
    }
    if (event.target.closest("[data-open-cart]")) { event.preventDefault(); openPanel("cart"); }
    if (event.target.closest("[data-open-account]")) { event.preventDefault(); openPanel("account"); }
    if (event.target.closest("[data-increase]")) { const output = event.target.closest("[data-product-quantity]").querySelector("output"); output.textContent = Number(output.textContent) + 1; }
    if (event.target.closest("[data-decrease]")) { const output = event.target.closest("[data-product-quantity]").querySelector("output"); output.textContent = Math.max(1, Number(output.textContent) - 1); }
  });
  document.addEventListener("keydown", (event) => {
    const overlay = document.querySelector(".commerce-overlay");
    const aside = overlay?.querySelector(".commerce-panel");
    if (!overlay || !aside) return;
    if (event.key === "Escape") { event.preventDefault(); close(); return; }
    if (event.key !== "Tab") return;
    const focusable = [...aside.querySelectorAll("button:not([disabled]), [href], input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex='-1'])")].filter((node) => node.offsetParent !== null || node === document.activeElement);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });
  save();
})();`;
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
