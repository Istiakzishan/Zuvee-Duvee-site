"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";

type CartItem = {
  slug: string;
  name: string;
  price: string;
  priceValue: string;
  quantity: number;
};

type Account = {
  name: string;
  email: string;
};

type CheckoutStep = "cart" | "details" | "payment" | "review" | "success";

const cartKey = "zuvee-duvee-cart";
const accountKey = "zuvee-duvee-account";

function readStored<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const stored = window.localStorage.getItem(key);
    return stored ? JSON.parse(stored) as T : fallback;
  } catch {
    return fallback;
  }
}

function formatPrice(value: number) {
  return `৳ ${value.toLocaleString("en-US")}`;
}

export function addProductToCart(item: CartItem) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<CartItem>("zuvee:add-to-cart", { detail: item }));
}

export function openCart() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event("zuvee:open-cart"));
}

export function openAccount() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event("zuvee:open-account"));
}

export default function CommerceExperience() {
  const [cart, setCart] = useState<CartItem[]>(() => readStored<CartItem[]>(cartKey, []));
  const [account, setAccount] = useState<Account | null>(() => readStored<Account | null>(accountKey, null));
  const [panel, setPanel] = useState<"cart" | "account" | null>(null);
  const [checkoutStep, setCheckoutStep] = useState<CheckoutStep>("cart");
  const [accountMode, setAccountMode] = useState<"login" | "signup">("login");
  const [orderNumber, setOrderNumber] = useState("");
  const [toast, setToast] = useState("");
  const [checkout, setCheckout] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "Dhaka",
    payment: "Cash on delivery",
    note: "",
  });
  const panelRef = useRef<HTMLElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    window.localStorage.setItem(cartKey, JSON.stringify(cart));
    const quantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll<HTMLElement>("[data-cart-count]").forEach((node) => {
      node.textContent = `(${quantity})`;
      node.closest(".header-bag")?.classList.toggle("has-items", quantity > 0);
    });
  }, [cart]);

  useEffect(() => {
    if (account) window.localStorage.setItem(accountKey, JSON.stringify(account));
    else window.localStorage.removeItem(accountKey);
    document.querySelectorAll<HTMLElement>("[data-account-label]").forEach((node) => {
      node.textContent = account ? "Account" : "Account";
    });
  }, [account]);

  useEffect(() => {
    const add = (event: Event) => {
      const item = (event as CustomEvent<CartItem>).detail;
      previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      setCart((current) => {
        const existing = current.find((entry) => entry.slug === item.slug);
        if (existing) {
          return current.map((entry) => entry.slug === item.slug ? { ...entry, quantity: entry.quantity + item.quantity } : entry);
        }
        return [...current, item];
      });
      setCheckoutStep("cart");
      setPanel("cart");
      setToast("Product successfully added to bag");
      window.setTimeout(() => setToast(""), 2600);
    };
    const showCart = () => {
      previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      setCheckoutStep("cart");
      setPanel("cart");
    };
    const showAccount = () => {
      previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      setAccountMode(account ? "login" : "signup");
      setPanel("account");
    };

    window.addEventListener("zuvee:add-to-cart", add);
    window.addEventListener("zuvee:open-cart", showCart);
    window.addEventListener("zuvee:open-account", showAccount);
    const click = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const cartTrigger = target?.closest("[data-open-cart]");
      const accountTrigger = target?.closest("[data-open-account]");
      if (cartTrigger) {
        event.preventDefault();
        showCart();
      }
      if (accountTrigger) {
        event.preventDefault();
        showAccount();
      }
    };
    document.addEventListener("click", click);
    return () => {
      window.removeEventListener("zuvee:add-to-cart", add);
      window.removeEventListener("zuvee:open-cart", showCart);
      window.removeEventListener("zuvee:open-account", showAccount);
      document.removeEventListener("click", click);
    };
  }, [account]);

  useEffect(() => {
    if (!panel) return;
    const panelNode = panelRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.setTimeout(() => {
      const firstFocusable = panelNode?.querySelector<HTMLElement>("button, [href], input, textarea, select, [tabindex]:not([tabindex='-1'])");
      (firstFocusable || panelNode)?.focus();
    }, 0);

    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closePanel();
        return;
      }
      if (event.key !== "Tab" || !panelNode) return;
      const focusable = Array.from(panelNode.querySelectorAll<HTMLElement>("button:not([disabled]), [href], input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex='-1'])")).filter((node) => node.offsetParent !== null || node === document.activeElement);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", keydown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", keydown);
    };
  }, [panel]);

  const total = useMemo(() => cart.reduce((sum, item) => sum + Number(item.priceValue) * item.quantity, 0), [cart]);
  const delivery = cart.length ? 120 : 0;
  const payable = total + delivery;

  function updateQuantity(slug: string, quantity: number) {
    setCart((current) => current.flatMap((item) => {
      if (item.slug !== slug) return [item];
      return quantity < 1 ? [] : [{ ...item, quantity }];
    }));
  }

  function handleAccountSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "Zuvee Duvee Customer");
    const email = String(data.get("email") || "");
    if (!email) return;
    const nextAccount = { name, email };
    setAccount(nextAccount);
    setCheckout((current) => ({ ...current, name: current.name || name, email: current.email || email }));
    setPanel("account");
  }

  function startCheckout() {
    if (!cart.length) return;
    setCheckout((current) => ({ ...current, name: current.name || account?.name || "", email: current.email || account?.email || "" }));
    setCheckoutStep("details");
  }

  function submitDetails(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setCheckoutStep("payment");
  }

  function placeOrder() {
    setOrderNumber(`ZD-${Date.now().toString().slice(-6)}`);
    setCheckoutStep("success");
    setCart([]);
  }

  function closePanel() {
    setPanel(null);
    window.setTimeout(() => previousFocusRef.current?.focus(), 0);
  }

  if (!panel) return toast ? <div className="bag-toast" role="status" aria-live="polite">{toast}</div> : null;
  const headingId = panel === "cart" ? "commerce-cart-heading" : "commerce-account-heading";

  return (
    <>
      {toast && <div className="bag-toast" role="status" aria-live="polite">{toast}</div>}
      <div className="commerce-overlay" role="dialog" aria-modal="true" aria-labelledby={headingId}>
      <button className="commerce-backdrop" type="button" aria-label="Close panel" onClick={closePanel} />
      <aside className="commerce-panel" ref={panelRef} tabIndex={-1}>
        <div className="commerce-panel-header">
          <div>
            <p className="eyebrow">{panel === "cart" ? "YOUR BAG" : "ACCOUNT"}</p>
            <h2 id={headingId}>{panel === "cart" ? "Complete your order" : account ? "Your account" : "Sign in or create account"}</h2>
          </div>
          <button type="button" onClick={closePanel} aria-label="Close">Close</button>
        </div>

        {panel === "account" && (
          <div className="account-flow">
            {account ? (
              <div className="account-card">
                <h3>Welcome, {account.name}</h3>
                <p>{account.email}</p>
                <div className="commerce-actions">
                  <button type="button" onClick={() => { setPanel("cart"); setCheckoutStep("cart"); }}>View bag</button>
                  <button type="button" className="secondary" onClick={() => setAccount(null)}>Log out</button>
                </div>
              </div>
            ) : (
              <>
                <div className="commerce-tabs">
                  <button className={accountMode === "login" ? "active" : ""} type="button" onClick={() => setAccountMode("login")}>Log in</button>
                  <button className={accountMode === "signup" ? "active" : ""} type="button" onClick={() => setAccountMode("signup")}>Sign up</button>
                </div>
                <form className="commerce-form" onSubmit={handleAccountSubmit}>
                  {accountMode === "signup" && <label>Full name<input name="name" required placeholder="Your name" /></label>}
                  <label>Email address<input name="email" type="email" required placeholder="you@example.com" /></label>
                  <label>Password<input name="password" type="password" required placeholder="Minimum 6 characters" minLength={6} /></label>
                  <button type="submit">{accountMode === "signup" ? "Create account" : "Log in"}</button>
                  <p>This demo stores your session on this device only. Connect a real auth provider before accepting real customer accounts.</p>
                </form>
              </>
            )}
          </div>
        )}

        {panel === "cart" && (
          <div className="checkout-flow">
            <div className="checkout-steps" aria-label="Checkout progress">
              {["cart", "details", "payment", "review"].map((step, index) => <span className={checkoutStep === step ? "active" : ""} key={step}>{index + 1}</span>)}
            </div>

            {checkoutStep === "cart" && (
              <div>
                {cart.length ? (
                  <>
                    <div className="cart-items">
                      {cart.map((item) => (
                        <article key={item.slug}>
                          <div><h3>{item.name}</h3><p>{item.price}</p></div>
                          <div className="cart-quantity">
                            <button type="button" onClick={() => updateQuantity(item.slug, item.quantity - 1)}>-</button>
                            <output>{item.quantity}</output>
                            <button type="button" onClick={() => updateQuantity(item.slug, item.quantity + 1)}>+</button>
                          </div>
                        </article>
                      ))}
                    </div>
                    <div className="order-summary"><p><span>Subtotal</span><b>{formatPrice(total)}</b></p><p><span>Estimated delivery</span><b>{formatPrice(delivery)}</b></p><p><span>Total</span><b>{formatPrice(payable)}</b></p></div>
                    <div className="checkout-trust" aria-label="Checkout reassurance">
                      <p><b>Delivery</b><span>Dhaka orders usually arrive in 2-4 business days. We confirm timing before dispatch.</span></p>
                      <p><b>Returns</b><span>Contact us within 7 days if an item arrives damaged or unsuitable.</span></p>
                    </div>
                    <button className="checkout-primary" type="button" onClick={startCheckout}>Continue to checkout</button>
                  </>
                ) : <p className="empty-state">Your bag is empty. Add a product to begin checkout.</p>}
              </div>
            )}

            {checkoutStep === "details" && (
              <form className="commerce-form" onSubmit={submitDetails}>
                <label>Full name<input required value={checkout.name} onChange={(event) => setCheckout({ ...checkout, name: event.target.value })} /></label>
                <label>Email<input type="email" required value={checkout.email} onChange={(event) => setCheckout({ ...checkout, email: event.target.value })} /></label>
                <label>Phone<input required value={checkout.phone} onChange={(event) => setCheckout({ ...checkout, phone: event.target.value })} placeholder="+880..." /></label>
                <label>Delivery address<textarea required value={checkout.address} onChange={(event) => setCheckout({ ...checkout, address: event.target.value })} /></label>
                <label>City<input required value={checkout.city} onChange={(event) => setCheckout({ ...checkout, city: event.target.value })} /></label>
                <p className="checkout-helper">Your details are used only to confirm this order and arrange delivery.</p>
                <button type="submit">Continue to payment</button>
              </form>
            )}

            {checkoutStep === "payment" && (
              <div className="commerce-form">
                {["Cash on delivery", "bKash payment", "Card payment"].map((method) => <label className="radio-row" key={method}><input type="radio" checked={checkout.payment === method} onChange={() => setCheckout({ ...checkout, payment: method })} />{method}</label>)}
                <p className="checkout-helper">{checkout.payment === "Cash on delivery" ? "Pay when your order is delivered. We will call to confirm before dispatch." : checkout.payment === "bKash payment" ? "We will share bKash payment instructions after reviewing your order." : "Card payment is prepared as a demo option. Connect a payment provider before accepting real card payments."}</p>
                <label>Order note<textarea value={checkout.note} onChange={(event) => setCheckout({ ...checkout, note: event.target.value })} placeholder="Optional delivery note" /></label>
                <button type="button" onClick={() => setCheckoutStep("review")}>Review order</button>
              </div>
            )}

            {checkoutStep === "review" && (
              <div className="review-order">
                <div className="order-summary"><p><span>Customer</span><b>{checkout.name}</b></p><p><span>Phone</span><b>{checkout.phone}</b></p><p><span>Payment</span><b>{checkout.payment}</b></p><p><span>Total</span><b>{formatPrice(payable)}</b></p></div>
                <button className="checkout-primary" type="button" onClick={placeOrder}>Place order</button>
                <button type="button" className="link-button" onClick={() => setCheckoutStep("details")}>Edit details</button>
              </div>
            )}

            {checkoutStep === "success" && (
              <div className="order-success">
                <h3>Order received</h3>
                <p>Your order number is <b>{orderNumber}</b>. We will contact you to confirm delivery and payment details.</p>
                <button type="button" onClick={closePanel}>Done</button>
              </div>
            )}
          </div>
        )}
      </aside>
      </div>
    </>
  );
}
