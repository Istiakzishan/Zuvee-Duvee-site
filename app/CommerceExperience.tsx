"use client";
/* eslint-disable @next/next/no-img-element */

import { createClient, type Session, type SupabaseClient } from "@supabase/supabase-js";
import { createContext, FormEvent, ReactNode, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

type CartItem = {
  productId?: string;
  variantId: string;
  slug: string;
  name: string;
  price: string;
  priceValue: string;
  quantity: number;
  stock?: number;
};

export type WishlistProduct = {
  productId?: string;
  slug: string;
  name: string;
  price: string;
  image?: string;
};

type CheckoutStep = "cart" | "details" | "payment" | "review" | "success";
type AuthMode = "sign-in" | "sign-up" | "recover";

type CommerceContextValue = {
  wishlistIds: Set<string>;
  toggleWishlist: (product: WishlistProduct) => Promise<void>;
};

const CommerceContext = createContext<CommerceContextValue | null>(null);
const cartKey = "zuvee-duvee-cart";

function getBrowserSupabase(supabaseUrl: string, publishableKey: string): SupabaseClient | null {
  if (!supabaseUrl || !publishableKey) return null;
  const globalClient = globalThis as typeof globalThis & { __zuveeSupabase?: SupabaseClient };
  globalClient.__zuveeSupabase ??= createClient(supabaseUrl, publishableKey);
  return globalClient.__zuveeSupabase;
}

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

export function useCommerce() {
  const context = useContext(CommerceContext);
  if (!context) throw new Error("useCommerce must be used inside CommerceExperience");
  return context;
}

export default function CommerceExperience({
  children,
  supabaseUrl,
  publishableKey,
}: {
  children: ReactNode;
  supabaseUrl: string;
  publishableKey: string;
}) {
  const supabase = useMemo(() => getBrowserSupabase(supabaseUrl, publishableKey), [publishableKey, supabaseUrl]);
  const [cart, setCart] = useState<CartItem[]>(() => readStored<CartItem[]>(cartKey, []));
  const [panel, setPanel] = useState<"cart" | "account" | null>(null);
  const [checkoutStep, setCheckoutStep] = useState<CheckoutStep>("cart");
  const [orderNumber, setOrderNumber] = useState("");
  const [orderEmailStatus, setOrderEmailStatus] = useState("");
  const [toast, setToast] = useState("");
  const [orderError, setOrderError] = useState("");
  const [placingOrder, setPlacingOrder] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [authMode, setAuthMode] = useState<AuthMode>("sign-in");
  const [authBusy, setAuthBusy] = useState(false);
  const [authMessage, setAuthMessage] = useState("");
  const [authError, setAuthError] = useState("");
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [authForm, setAuthForm] = useState({ fullName: "", email: "", password: "" });
  const [wishlistIds, setWishlistIds] = useState<Set<string>>(new Set());
  const [wishlistProducts, setWishlistProducts] = useState<WishlistProduct[]>([]);
  const [wishlistLoading, setWishlistLoading] = useState(false);
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
  const checkoutRequestIdRef = useRef<string | null>(null);

  const loadWishlist = useCallback(async (userId: string) => {
    if (!supabase) return;
    setWishlistLoading(true);
    const { data, error } = await supabase.from("wishlist_items").select("product_id").eq("user_id", userId);
    if (error) {
      setAuthError("Your wishlist could not be loaded. Please try again.");
      setWishlistLoading(false);
      return;
    }

    const ids = new Set((data ?? []).map((item) => item.product_id as string));
    setWishlistIds(ids);
    if (!ids.size) {
      setWishlistProducts([]);
      setWishlistLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/catalog", { cache: "no-store" });
      const result = await response.json() as { products?: Array<{ productId?: string; slug: string; name: string; price: string; gallery?: Array<{ src: string }> }> };
      setWishlistProducts((result.products ?? []).filter((product) => product.productId && ids.has(product.productId)).map((product) => ({
        productId: product.productId,
        slug: product.slug,
        name: product.name,
        price: product.price,
        image: product.gallery?.[0]?.src,
      })));
    } catch {
      setWishlistProducts([]);
    } finally {
      setWishlistLoading(false);
    }
  }, [supabase]);

  useEffect(() => {
    if (!supabase) return;
    const accountWelcome = new URLSearchParams(window.location.search).get("account") === "welcome";
    void supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      if (data.session) void loadWishlist(data.session.user.id);
      if (accountWelcome) {
        setPanel("account");
        setShowPasswordForm(true);
      }
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, nextSession) => {
      setSession(nextSession);
      setAuthError("");
      if (nextSession) {
        void loadWishlist(nextSession.user.id);
        setCheckout((current) => ({
          ...current,
          name: current.name || String(nextSession.user.user_metadata.full_name ?? ""),
          email: current.email || nextSession.user.email || "",
        }));
      } else {
        setWishlistIds(new Set());
        setWishlistProducts([]);
      }
      if (event === "PASSWORD_RECOVERY") {
        setPanel("account");
        setShowPasswordForm(true);
      }
    });
    return () => subscription.unsubscribe();
  }, [loadWishlist, supabase]);

  useEffect(() => {
    const label = session?.user.user_metadata.full_name
      ? String(session.user.user_metadata.full_name).split(" ")[0]
      : session?.user.email?.split("@")[0] ?? "Account";
    document.querySelectorAll<HTMLElement>("[data-account-label]").forEach((node) => { node.textContent = label; });
  }, [session]);

  useEffect(() => {
    window.localStorage.setItem(cartKey, JSON.stringify(cart));
    const quantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll<HTMLElement>("[data-cart-count]").forEach((node) => {
      node.textContent = `(${quantity})`;
      node.closest(".header-bag")?.classList.toggle("has-items", quantity > 0);
    });
  }, [cart]);

  useEffect(() => {
    const add = (event: Event) => {
      const item = (event as CustomEvent<CartItem>).detail;
      previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      setCart((current) => {
        const existing = current.find((entry) => entry.slug === item.slug);
        if (existing) return current.map((entry) => entry.slug === item.slug ? { ...entry, ...item, quantity: Math.min(entry.quantity + item.quantity, item.stock || 10) } : entry);
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
      setPanel("account");
      setAuthError("");
      setAuthMessage("");
    };

    window.addEventListener("zuvee:add-to-cart", add);
    window.addEventListener("zuvee:open-cart", showCart);
    window.addEventListener("zuvee:open-account", showAccount);
    const click = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest("[data-open-cart]")) { event.preventDefault(); showCart(); }
      if (target?.closest("[data-open-account]")) { event.preventDefault(); showAccount(); }
    };
    document.addEventListener("click", click);
    return () => {
      window.removeEventListener("zuvee:add-to-cart", add);
      window.removeEventListener("zuvee:open-cart", showCart);
      window.removeEventListener("zuvee:open-account", showAccount);
      document.removeEventListener("click", click);
    };
  }, []);

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
      if (event.key === "Escape") { event.preventDefault(); closePanel(); return; }
      if (event.key !== "Tab" || !panelNode) return;
      const focusable = Array.from(panelNode.querySelectorAll<HTMLElement>("button:not([disabled]), [href], input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex='-1'])")).filter((node) => node.offsetParent !== null || node === document.activeElement);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", keydown);
    return () => { document.body.style.overflow = previousOverflow; document.removeEventListener("keydown", keydown); };
  }, [panel]);

  const total = useMemo(() => cart.reduce((sum, item) => sum + Number(item.priceValue) * item.quantity, 0), [cart]);
  const delivery = cart.length ? 120 : 0;
  const payable = total + delivery;

  async function toggleWishlist(product: WishlistProduct) {
    setAuthError("");
    if (!product.productId) {
      setToast("This product cannot be saved yet.");
      window.setTimeout(() => setToast(""), 2600);
      return;
    }
    if (!supabase || !session) {
      setPanel("account");
      setAuthMode("sign-in");
      setAuthMessage("Sign in to save products to your wishlist.");
      return;
    }

    const removing = wishlistIds.has(product.productId);
    setWishlistIds((current) => {
      const next = new Set(current);
      if (removing) next.delete(product.productId!); else next.add(product.productId!);
      return next;
    });
    setWishlistProducts((current) => removing
      ? current.filter((item) => item.productId !== product.productId)
      : [...current.filter((item) => item.productId !== product.productId), product]);

    const query = removing
      ? supabase.from("wishlist_items").delete().eq("user_id", session.user.id).eq("product_id", product.productId)
      : supabase.from("wishlist_items").insert({ user_id: session.user.id, product_id: product.productId });
    const { error } = await query;
    if (error) {
      setAuthError("Your wishlist could not be updated. Please try again.");
      await loadWishlist(session.user.id);
      return;
    }
    setToast(removing ? "Removed from your wishlist" : "Saved to your wishlist");
    window.setTimeout(() => setToast(""), 2200);
  }

  async function submitAccount(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase) return;
    setAuthBusy(true);
    setAuthError("");
    setAuthMessage("");
    try {
      if (authMode === "sign-up") {
        const { data, error } = await supabase.auth.signUp({
          email: authForm.email.trim(),
          password: authForm.password,
          options: { data: { full_name: authForm.fullName.trim() }, emailRedirectTo: window.location.origin },
        });
        if (error) throw error;
        if (!data.session) setAuthMessage("Check your email to confirm your account, then sign in.");
        else setAuthMessage("Your account is ready.");
      } else if (authMode === "recover") {
        const { error } = await supabase.auth.updateUser({ password: authForm.password });
        if (error) throw error;
        setAuthMessage("Your password has been updated.");
        setAuthMode("sign-in");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email: authForm.email.trim(), password: authForm.password });
        if (error) throw error;
        setAuthMessage("Signed in successfully.");
      }
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : "Account request failed. Please try again.");
    } finally {
      setAuthBusy(false);
    }
  }

  async function sendPasswordReset() {
    if (!supabase || !authForm.email.trim()) {
      setAuthError("Enter your email address first.");
      return;
    }
    setAuthBusy(true);
    setAuthError("");
    const { error } = await supabase.auth.resetPasswordForEmail(authForm.email.trim(), { redirectTo: window.location.origin });
    setAuthBusy(false);
    if (error) setAuthError(error.message);
    else setAuthMessage("Password reset instructions have been sent to your email.");
  }

  async function signOut() {
    if (!supabase) return;
    setAuthBusy(true);
    const { error } = await supabase.auth.signOut();
    setAuthBusy(false);
    if (error) setAuthError(error.message);
    else { setAuthMessage("Signed out."); setAuthMode("sign-in"); }
  }

  async function setAccountPassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase || !session) return;
    setAuthBusy(true);
    setAuthError("");
    setAuthMessage("");
    const { error } = await supabase.auth.updateUser({ password: authForm.password });
    setAuthBusy(false);
    if (error) {
      setAuthError(error.message);
      return;
    }
    setShowPasswordForm(false);
    setAuthForm((current) => ({ ...current, password: "" }));
    setAuthMessage("Your password has been set.");
    const url = new URL(window.location.href);
    url.searchParams.delete("account");
    window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
  }

  function updateQuantity(slug: string, quantity: number) {
    setCart((current) => current.flatMap((item) => item.slug !== slug ? [item] : quantity < 1 ? [] : [{ ...item, quantity: Math.min(quantity, item.stock || 10) }]));
  }

  function submitDetails(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setCheckoutStep("payment"); }

  async function placeOrder() {
    setOrderError("");
    if (cart.some((item) => !item.variantId)) { setOrderError("Your bag contains an older product entry. Remove it and add the product again."); return; }
    setPlacingOrder(true);
    try {
      checkoutRequestIdRef.current ||= crypto.randomUUID();
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          ...(session?.access_token ? { authorization: `Bearer ${session.access_token}` } : {}),
        },
        body: JSON.stringify({
          idempotency_key: checkoutRequestIdRef.current,
          payment_method: "cod",
          customer_note: checkout.note,
          customer: { full_name: checkout.name, email: checkout.email, phone: checkout.phone, address: checkout.address, city: checkout.city },
          items: cart.map((item) => ({ variant_id: item.variantId, quantity: item.quantity })),
        }),
      });
      const result = await response.json() as { order?: { order_number?: string }; email?: { status?: string }; error?: string };
      if (!response.ok || !result.order?.order_number) throw new Error(result.error || "Order could not be placed.");
      setOrderNumber(result.order.order_number);
      setOrderEmailStatus(result.email?.status || "failed");
      setCheckoutStep("success");
      setCart([]);
      checkoutRequestIdRef.current = null;
    } catch (error) {
      setOrderError(error instanceof Error ? error.message : "Order could not be placed. Please try again.");
    } finally {
      setPlacingOrder(false);
    }
  }

  function closePanel() {
    setPanel(null);
    window.setTimeout(() => previousFocusRef.current?.focus(), 0);
  }

  const headingId = panel === "cart" ? "commerce-cart-heading" : "commerce-account-heading";
  const contextValue: CommerceContextValue = { wishlistIds, toggleWishlist };

  return (
    <CommerceContext.Provider value={contextValue}>
      {children}
      {toast && <div className="bag-toast" role="status" aria-live="polite">{toast}</div>}
      {panel && <div className="commerce-overlay" role="dialog" aria-modal="true" aria-labelledby={headingId}>
        <button className="commerce-backdrop" type="button" aria-label="Close panel" onClick={closePanel} />
        <aside className="commerce-panel" ref={panelRef} tabIndex={-1}>
          <div className="commerce-panel-header"><div><p className="eyebrow">{panel === "cart" ? "YOUR BAG" : "ACCOUNT"}</p><h2 id={headingId}>{panel === "cart" ? "Complete your order" : session ? "Your account" : "Customer account"}</h2></div><button type="button" onClick={closePanel} aria-label="Close">Close</button></div>

          {panel === "account" && <div className="account-flow">
            {!supabase ? <p className="commerce-notice error" role="alert">Customer accounts are temporarily unavailable.</p> : session ? <>
              <div className="account-summary"><div><span>Signed in as</span><strong>{String(session.user.user_metadata.full_name ?? session.user.email ?? "Customer")}</strong><small>{session.user.email}</small></div><div className="account-actions"><button className="link-button" disabled={authBusy} onClick={() => setShowPasswordForm((current) => !current)} type="button">Set password</button><button className="link-button" disabled={authBusy} onClick={() => void signOut()} type="button">Sign out</button></div></div>
              {showPasswordForm && <form className="commerce-form account-form" onSubmit={setAccountPassword}><label>New password<input autoComplete="new-password" minLength={8} required type="password" value={authForm.password} onChange={(event) => setAuthForm({ ...authForm, password: event.target.value })} /><small>At least 8 characters.</small></label><button disabled={authBusy} type="submit">{authBusy ? "Please wait..." : "Set password"}</button></form>}
              <section className="wishlist-section" aria-labelledby="wishlist-heading"><div className="wishlist-heading"><div><p className="eyebrow">SAVED FOR LATER</p><h3 id="wishlist-heading">Your wishlist</h3></div><span>{wishlistIds.size}</span></div>
                {wishlistLoading ? <p className="empty-state">Loading your saved products...</p> : wishlistProducts.length ? <div className="wishlist-list">{wishlistProducts.map((product) => <article key={product.productId}><a href={`/products/${product.slug}`}>{product.image ? <img src={product.image} alt="" /> : <span className="wishlist-image-placeholder" />}<div><h4>{product.name}</h4><p>{product.price}</p></div></a><button aria-label={`Remove ${product.name} from wishlist`} onClick={() => void toggleWishlist(product)} type="button">Remove</button></article>)}</div> : <div className="wishlist-empty"><span aria-hidden="true">♡</span><h4>Your wishlist is empty</h4><p>Tap the heart on a product to save it here.</p><a href="/shop">Explore products</a></div>}
              </section>
            </> : <>
              <div className="account-tabs" role="tablist" aria-label="Account action"><button aria-selected={authMode === "sign-in"} className={authMode === "sign-in" ? "active" : ""} onClick={() => { setAuthMode("sign-in"); setAuthError(""); setAuthMessage(""); }} role="tab" type="button">Sign in</button><button aria-selected={authMode === "sign-up"} className={authMode === "sign-up" ? "active" : ""} onClick={() => { setAuthMode("sign-up"); setAuthError(""); setAuthMessage(""); }} role="tab" type="button">Create account</button></div>
              <form className="commerce-form account-form" onSubmit={submitAccount}>
                {authMode === "sign-up" && <label>Full name<input autoComplete="name" required value={authForm.fullName} onChange={(event) => setAuthForm({ ...authForm, fullName: event.target.value })} /></label>}
                {authMode !== "recover" && <label>Email<input autoComplete="email" required type="email" value={authForm.email} onChange={(event) => setAuthForm({ ...authForm, email: event.target.value })} /></label>}
                <label>{authMode === "recover" ? "New password" : "Password"}<input autoComplete={authMode === "sign-in" ? "current-password" : "new-password"} minLength={8} required type="password" value={authForm.password} onChange={(event) => setAuthForm({ ...authForm, password: event.target.value })} /><small>At least 8 characters.</small></label>
                {authError && <p className="commerce-notice error" role="alert">{authError}</p>}
                {authMessage && <p className="commerce-notice success" role="status">{authMessage}</p>}
                <button disabled={authBusy} type="submit">{authBusy ? "Please wait..." : authMode === "sign-up" ? "Create account" : authMode === "recover" ? "Update password" : "Sign in"}</button>
                {authMode === "sign-in" && <button className="link-button" disabled={authBusy} onClick={() => void sendPasswordReset()} type="button">Forgot password?</button>}
              </form>
              <p className="account-privacy">Your wishlist is private and available only when you are signed in.</p>
            </>}
            {session && authError && <p className="commerce-notice error" role="alert">{authError}</p>}
            {session && authMessage && <p className="commerce-notice success" role="status">{authMessage}</p>}
          </div>}

          {panel === "cart" && <div className="checkout-flow">
            <div className="checkout-steps" aria-label="Checkout progress">{["cart", "details", "payment", "review"].map((step, index) => <span className={checkoutStep === step ? "active" : ""} key={step}>{index + 1}</span>)}</div>
            {checkoutStep === "cart" && <div>{cart.length ? <><div className="cart-items">{cart.map((item) => <article key={item.slug}><div><h3>{item.name}</h3><p>{item.price}</p></div><div className="cart-quantity"><button type="button" onClick={() => updateQuantity(item.slug, item.quantity - 1)}>-</button><output>{item.quantity}</output><button type="button" onClick={() => updateQuantity(item.slug, item.quantity + 1)}>+</button></div></article>)}</div><div className="order-summary"><p><span>Subtotal</span><b>{formatPrice(total)}</b></p><p><span>Estimated delivery</span><b>{formatPrice(delivery)}</b></p><p><span>Total</span><b>{formatPrice(payable)}</b></p></div><div className="checkout-trust" aria-label="Checkout reassurance"><p><b>Delivery</b><span>Dhaka orders usually arrive in 2-4 business days. We confirm timing before dispatch.</span></p><p><b>Returns</b><span>Contact us within 7 days if an item arrives damaged or unsuitable.</span></p></div><button className="checkout-primary" type="button" onClick={() => setCheckoutStep("details")}>Continue to checkout</button></> : <p className="empty-state">Your bag is empty. Add a product to begin checkout.</p>}</div>}
            {checkoutStep === "details" && <form className="commerce-form" onSubmit={submitDetails}><label>Full name<input required value={checkout.name} onChange={(event) => setCheckout({ ...checkout, name: event.target.value })} /></label><label>Email<input type="email" required value={checkout.email} onChange={(event) => setCheckout({ ...checkout, email: event.target.value })} /></label><label>Phone<input required value={checkout.phone} onChange={(event) => setCheckout({ ...checkout, phone: event.target.value })} placeholder="+880..." /></label><label>Delivery address<textarea required value={checkout.address} onChange={(event) => setCheckout({ ...checkout, address: event.target.value })} /></label><label>City<input required value={checkout.city} onChange={(event) => setCheckout({ ...checkout, city: event.target.value })} /></label><p className="checkout-helper">Your details are used only to confirm this order and arrange delivery.</p><button type="submit">Continue to payment</button></form>}
            {checkoutStep === "payment" && <div className="commerce-form"><label className="radio-row"><input type="radio" checked readOnly />Cash on delivery</label><p className="checkout-helper">Pay when your order is delivered. Online payment will appear here after a payment gateway is connected.</p><label>Order note<textarea value={checkout.note} onChange={(event) => setCheckout({ ...checkout, note: event.target.value })} placeholder="Optional delivery note" /></label><button type="button" onClick={() => setCheckoutStep("review")}>Review order</button></div>}
            {checkoutStep === "review" && <div className="review-order"><div className="order-summary"><p><span>Customer</span><b>{checkout.name}</b></p><p><span>Phone</span><b>{checkout.phone}</b></p><p><span>Payment</span><b>{checkout.payment}</b></p><p><span>Total</span><b>{formatPrice(payable)}</b></p></div>{orderError && <p className="checkout-helper" role="alert">{orderError}</p>}<button className="checkout-primary" type="button" disabled={placingOrder} onClick={() => void placeOrder()}>{placingOrder ? "Placing order..." : "Place order"}</button><button type="button" className="link-button" onClick={() => setCheckoutStep("details")}>Edit details</button></div>}
            {checkoutStep === "success" && <div className="order-success"><h3>Order received</h3><p>Your order number is <b>{orderNumber}</b>. {orderEmailStatus === "sent" ? "A confirmation email has been sent. Guest customers can use the secure account link in that email." : "Your order is saved, but the confirmation email could not be sent. We will contact you to confirm delivery."}</p><button type="button" onClick={closePanel}>Done</button></div>}
          </div>}
        </aside>
      </div>}
    </CommerceContext.Provider>
  );
}
