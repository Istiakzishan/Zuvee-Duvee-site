(() => {
  const cartKey = "zuvee-duvee-cart";
  const accountKey = "zuvee-duvee-account";
  const read = (key, fallback) => { try { return JSON.parse(localStorage.getItem(key)) || fallback; } catch { return fallback; } };
  let cart = read(cartKey, []);
  let account = read(accountKey, null);
  let step = "cart";
  let panel = null;
  let checkout = { name: "", email: "", phone: "", address: "", city: "Dhaka", payment: "Cash on delivery", note: "" };
  const money = (value) => "৳ " + Number(value || 0).toLocaleString("en-US");
  const total = () => cart.reduce((sum, item) => sum + Number(item.priceValue) * item.quantity, 0);
  const delivery = () => cart.length ? 120 : 0;
  const save = () => { localStorage.setItem(cartKey, JSON.stringify(cart)); document.querySelectorAll("[data-cart-count]").forEach((node) => node.textContent = "(" + cart.reduce((sum, item) => sum + item.quantity, 0) + ")"); };
  const add = (item) => { const existing = cart.find((entry) => entry.slug === item.slug); if (existing) existing.quantity += item.quantity; else cart.push(item); save(); openPanel("cart"); };
  const updateQty = (slug, quantity) => { cart = cart.flatMap((item) => item.slug === slug ? (quantity < 1 ? [] : [{ ...item, quantity }]) : [item]); save(); render(); };
  const openPanel = (next) => { panel = next; step = next === "cart" ? "cart" : step; render(); };
  const close = () => { panel = null; render(); };
  function render() {
    document.querySelector(".commerce-overlay")?.remove();
    if (!panel) return;
    const overlay = document.createElement("div");
    overlay.className = "commerce-overlay";
    overlay.innerHTML = '<button class="commerce-backdrop" type="button" aria-label="Close panel"></button><aside class="commerce-panel"></aside>';
    overlay.querySelector(".commerce-backdrop").addEventListener("click", close);
    document.body.appendChild(overlay);
    const aside = overlay.querySelector(".commerce-panel");
    aside.innerHTML = '<div class="commerce-panel-header"><div><p class="eyebrow">' + (panel === "cart" ? "YOUR BAG" : "ACCOUNT") + '</p><h2>' + (panel === "cart" ? "Complete your order" : account ? "Your account" : "Sign in or create account") + '</h2></div><button type="button" data-close>Close</button></div>' + (panel === "cart" ? cartHtml() : accountHtml());
    aside.querySelector("[data-close]")?.addEventListener("click", close);
    bindPanel(aside);
  }
  function accountHtml() {
    if (account) return '<div class="account-card"><h3>Welcome, ' + account.name + '</h3><p>' + account.email + '</p><div class="commerce-actions"><button type="button" data-view-bag>View bag</button><button type="button" class="secondary" data-logout>Log out</button></div></div>';
    return '<div class="account-flow"><div class="commerce-tabs"><button class="active" type="button" data-mode="login">Log in</button><button type="button" data-mode="signup">Sign up</button></div><form class="commerce-form" data-account-form><label data-name-field hidden>Full name<input name="name" placeholder="Your name"></label><label>Email address<input name="email" type="email" required placeholder="you@example.com"></label><label>Password<input name="password" type="password" required minLength="6" placeholder="Minimum 6 characters"></label><button type="submit">Log in</button><p>This demo stores your session on this device only.</p></form></div>';
  }
  function cartHtml() {
    const steps = ["cart", "details", "payment", "review"].map((name, index) => '<span class="' + (step === name ? "active" : "") + '">' + (index + 1) + '</span>').join("");
    if (step === "cart") return '<div class="checkout-flow"><div class="checkout-steps">' + steps + '</div>' + (cart.length ? '<div class="cart-items">' + cart.map((item) => '<article><div><h3>' + item.name + '</h3><p>' + item.price + '</p></div><div class="cart-quantity"><button type="button" data-qty="' + item.slug + '" data-dir="-">-</button><output>' + item.quantity + '</output><button type="button" data-qty="' + item.slug + '" data-dir="+">+</button></div></article>').join("") + '</div>' + summaryHtml() + '<button class="checkout-primary" type="button" data-next="details">Continue to checkout</button>' : '<p class="empty-state">Your bag is empty. Add a product to begin checkout.</p>') + '</div>';
    if (step === "details") return '<div class="checkout-flow"><div class="checkout-steps">' + steps + '</div><form class="commerce-form" data-details-form><label>Full name<input name="name" required value="' + (checkout.name || account?.name || "") + '"></label><label>Email<input name="email" type="email" required value="' + (checkout.email || account?.email || "") + '"></label><label>Phone<input name="phone" required value="' + checkout.phone + '" placeholder="+880..."></label><label>Delivery address<textarea name="address" required>' + checkout.address + '</textarea></label><label>City<input name="city" required value="' + checkout.city + '"></label><button type="submit">Continue to payment</button></form></div>';
    if (step === "payment") return '<div class="checkout-flow"><div class="checkout-steps">' + steps + '</div><div class="commerce-form">' + ["Cash on delivery", "bKash payment", "Card payment"].map((method) => '<label class="radio-row"><input type="radio" name="payment" value="' + method + '"' + (checkout.payment === method ? " checked" : "") + '>' + method + '</label>').join("") + '<label>Order note<textarea name="note" placeholder="Optional delivery note">' + checkout.note + '</textarea></label><button type="button" data-next="review">Review order</button></div></div>';
    if (step === "review") return '<div class="checkout-flow"><div class="checkout-steps">' + steps + '</div><div class="review-order">' + summaryHtml() + '<button class="checkout-primary" type="button" data-place-order>Place order</button><button type="button" class="link-button" data-next="details">Edit details</button></div></div>';
    return '<div class="order-success"><h3>Order received</h3><p>Your order number is <b>ZD-' + Date.now().toString().slice(-6) + '</b>. We will contact you to confirm delivery and payment details.</p><button type="button" data-close>Done</button></div>';
  }
  function summaryHtml() { return '<div class="order-summary"><p><span>Subtotal</span><b>' + money(total()) + '</b></p><p><span>Estimated delivery</span><b>' + money(delivery()) + '</b></p><p><span>Total</span><b>' + money(total() + delivery()) + '</b></p></div>'; }
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
  save();
})();