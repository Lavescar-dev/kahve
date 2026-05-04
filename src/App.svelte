<script>
  import { onDestroy, onMount } from 'svelte';
  import Navbar from './components/Navbar.svelte';
  import Footer from './components/Footer.svelte';
  import AuthModal from './components/AuthModal.svelte';
  import CartModal from './components/CartModal.svelte';
  import ProductModal from './components/ProductModal.svelte';
  import ToastHost from './components/ToastHost.svelte';
  import HomePage from './sections/HomePage.svelte';
  import ShopPage from './sections/ShopPage.svelte';
  import AboutPage from './sections/AboutPage.svelte';
  import CheckoutPage from './sections/CheckoutPage.svelte';
  import WishlistPage from './sections/WishlistPage.svelte';
  import OrderConfirmationPage from './sections/OrderConfirmationPage.svelte';
  import { categories, products } from './data/menu.js';

  let currentPage = 'home';
  let cart = [];
  let wishlist = [];
  let currentUser = '';
  let currentProduct = null;
  let authModalOpen = false;
  let cartOpen = false;
  let mobileMenuOpen = false;
  let hydrated = false;
  let toasts = [];
  let nextToastId = 1;
  let lastOrder = null;
  let appliedCoupon = null;

  const couponCodes = {
    KAHVE10: { discount: 0.1, label: '10% indirim' },
    KARSILAMA: { discount: 0.15, label: '15% hoş geldin indirimi' },
  };

  $: featuredProducts = products.slice(0, 4);
  $: wishlistProducts = products.filter((p) => wishlist.includes(p.id));
  $: cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  $: subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  $: shippingCost = subtotal === 0 ? 0 : subtotal >= 500 ? 0 : 49;
  $: couponDiscount = appliedCoupon ? Math.round(subtotal * appliedCoupon.discount) : 0;
  $: finalTotal = Math.max(0, subtotal + shippingCost - couponDiscount);

  $: if (hydrated && typeof localStorage !== 'undefined') {
    localStorage.setItem('kahveCart', JSON.stringify(cart));
  }

  $: if (hydrated && typeof localStorage !== 'undefined') {
    localStorage.setItem('kahveWishlist', JSON.stringify(wishlist));
  }

  $: if (hydrated && typeof localStorage !== 'undefined') {
    if (currentUser) {
      localStorage.setItem('kahveUser', currentUser);
    } else {
      localStorage.removeItem('kahveUser');
    }
  }

  $: if (typeof document !== 'undefined') {
    document.body.style.overflow = authModalOpen || cartOpen || currentProduct ? 'hidden' : 'auto';
  }

  onMount(() => {
    try {
      cart = JSON.parse(localStorage.getItem('kahveCart') || '[]');
    } catch {
      cart = [];
    }

    try {
      wishlist = JSON.parse(localStorage.getItem('kahveWishlist') || '[]');
    } catch {
      wishlist = [];
    }

    currentUser = localStorage.getItem('kahveUser') || '';
    hydrated = true;
  });

  onDestroy(() => {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'auto';
    }
  });

  function showToast(message) {
    const id = nextToastId++;
    toasts = [...toasts, { id, message }];
    window.setTimeout(() => {
      toasts = toasts.filter((toast) => toast.id !== id);
    }, 2500);
  }

  function navigate(page) {
    if (page === 'checkout' && cart.length === 0) {
      currentPage = 'shop';
      showToast('Önce sepetinize ürün ekleyin.');
    } else {
      currentPage = page;
    }

    cartOpen = false;
    mobileMenuOpen = false;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function toggleAuthModal() {
    authModalOpen = !authModalOpen;
  }

  function toggleCart() {
    cartOpen = !cartOpen;
    mobileMenuOpen = false;
  }

  function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
  }

  function openProductModal(product) {
    currentProduct = product;
  }

  function closeProductModal() {
    currentProduct = null;
  }

  function addToCart(product) {
    if (product.stock === 0) {
      showToast('Bu ürün şu an stokta yok.');
      return;
    }

    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      cart = cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
      );
    } else {
      cart = [...cart, { ...product, quantity: 1 }];
    }

    showToast(`${product.name} sepete eklendi.`);
  }

  function toggleWishlist(productId) {
    if (wishlist.includes(productId)) {
      wishlist = wishlist.filter((id) => id !== productId);
      showToast('Favorilerden çıkarıldı.');
    } else {
      wishlist = [...wishlist, productId];
      showToast('Favorilere eklendi.');
    }
  }

  function moveWishlistToCart(productId) {
    const product = products.find((p) => p.id === productId);
    if (product) {
      addToCart(product);
      wishlist = wishlist.filter((id) => id !== productId);
    }
  }

  function applyCoupon(code) {
    const normalized = code.trim().toUpperCase();
    const match = couponCodes[normalized];
    if (match) {
      appliedCoupon = { code: normalized, ...match };
      showToast(`${normalized} kuponu uygulandı.`);
      return true;
    }
    showToast('Geçersiz kupon kodu.');
    return false;
  }

  function clearCoupon() {
    appliedCoupon = null;
  }

  function removeFromCart(index) {
    cart = cart.filter((_, itemIndex) => itemIndex !== index);
  }

  function incrementCartItem(index) {
    cart = cart.map((item, i) => (i === index ? { ...item, quantity: item.quantity + 1 } : item));
  }

  function decrementCartItem(index) {
    const item = cart[index];
    if (!item) return;
    if (item.quantity <= 1) {
      removeFromCart(index);
    } else {
      cart = cart.map((it, i) => (i === index ? { ...it, quantity: it.quantity - 1 } : it));
    }
  }

  function handleLogin(name) {
    currentUser = name;
    authModalOpen = false;
    showToast('Hoş geldiniz!');
  }

  function handleLogout() {
    currentUser = '';
    authModalOpen = false;
    showToast('Çıkış yapıldı.');
  }

  function goToCheckout() {
    if (cart.length === 0) {
      showToast('Sepetiniz boş.');
      return;
    }

    cartOpen = false;
    navigate('checkout');
  }

  function confirmOrder(orderInfo = {}) {
    if (cart.length === 0) return;

    const orderId = `LS-${Date.now().toString(36).toUpperCase().slice(-6)}`;
    const eta = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);

    lastOrder = {
      id: orderId,
      placedAt: new Date(),
      eta,
      items: cart.slice(),
      subtotal,
      shippingCost,
      couponDiscount,
      coupon: appliedCoupon,
      total: finalTotal,
      ...orderInfo,
    };

    cart = [];
    appliedCoupon = null;
    currentPage = 'order-confirmation';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleWindowKeydown(event) {
    if (event.key === 'Escape') {
      authModalOpen = false;
      cartOpen = false;
      currentProduct = null;
      mobileMenuOpen = false;
    }
  }
</script>

<svelte:window onkeydown={handleWindowKeydown} />

<div class="flex min-h-screen flex-col bg-[#fbf6ee] text-[#3c2a20]">
  <Navbar
    currentUser={currentUser}
    cartCount={cartCount}
    wishlistCount={wishlist.length}
    currentPage={currentPage}
    mobileMenuOpen={mobileMenuOpen}
    onNavigate={navigate}
    onToggleAuth={toggleAuthModal}
    onToggleCart={toggleCart}
    onToggleMobileMenu={toggleMobileMenu}
  />

  <main class="flex-1">
    {#if currentPage === 'home'}
      <HomePage
        featuredProducts={featuredProducts}
        wishlist={wishlist}
        onNavigate={navigate}
        onOpenProduct={openProductModal}
        onAddToCart={addToCart}
        onToggleWishlist={toggleWishlist}
      />
    {:else if currentPage === 'shop'}
      <ShopPage
        products={products}
        categories={categories}
        wishlist={wishlist}
        onOpenProduct={openProductModal}
        onAddToCart={addToCart}
        onToggleWishlist={toggleWishlist}
      />
    {:else if currentPage === 'wishlist'}
      <WishlistPage
        products={wishlistProducts}
        onOpenProduct={openProductModal}
        onAddToCart={addToCart}
        onToggleWishlist={toggleWishlist}
        onMoveToCart={moveWishlistToCart}
        onNavigate={navigate}
      />
    {:else if currentPage === 'about'}
      <AboutPage />
    {:else if currentPage === 'checkout'}
      <CheckoutPage
        cart={cart}
        subtotal={subtotal}
        shippingCost={shippingCost}
        couponDiscount={couponDiscount}
        appliedCoupon={appliedCoupon}
        total={finalTotal}
        onApplyCoupon={applyCoupon}
        onClearCoupon={clearCoupon}
        onConfirmOrder={confirmOrder}
      />
    {:else if currentPage === 'order-confirmation' && lastOrder}
      <OrderConfirmationPage order={lastOrder} onNavigate={navigate} />
    {/if}
  </main>

  <Footer onNavigate={navigate} onSubscribe={() => showToast('Aboneliğiniz başarıyla alındı.')} />

  <AuthModal
    open={authModalOpen}
    currentUser={currentUser}
    onClose={() => (authModalOpen = false)}
    onLogin={handleLogin}
    onLogout={handleLogout}
  />

  <CartModal
    open={cartOpen}
    cart={cart}
    subtotal={subtotal}
    onClose={() => (cartOpen = false)}
    onRemove={removeFromCart}
    onIncrement={incrementCartItem}
    onDecrement={decrementCartItem}
    onCheckout={goToCheckout}
    onContinueShopping={() => navigate('shop')}
  />

  <ProductModal
    product={currentProduct}
    wishlist={wishlist}
    onClose={closeProductModal}
    onToggleWishlist={toggleWishlist}
    onOpenProduct={openProductModal}
    onAddToCart={(product) => {
      addToCart(product);
      closeProductModal();
    }}
  />

  <ToastHost {toasts} />
</div>
