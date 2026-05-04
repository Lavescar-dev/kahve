<script>
  import Icon from './Icon.svelte';
  import { fallbackSvg } from '../data/menu.js';

  export let product;
  export let isWishlisted = false;
  export let onOpen = () => {};
  export let onAddToCart = () => {};
  export let onToggleWishlist = () => {};

  let imageLoaded = false;

  function handleImageError(event) {
    event.currentTarget.onerror = null;
    event.currentTarget.src = fallbackSvg;
    imageLoaded = true;
  }

  function handleKeydown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onOpen(product);
    }
  }

  $: stockState =
    product.stock === 0 ? 'out' : product.stock <= 12 ? 'low' : 'ok';

  $: stockLabel =
    stockState === 'out' ? 'Tükendi' : stockState === 'low' ? `Son ${product.stock}` : null;
</script>

<div
  class="product-card relative flex h-full w-full cursor-pointer flex-col rounded-[2.5rem] border border-[#3c2a20]/10 bg-white text-left shadow-sm"
  role="button"
  tabindex="0"
  onclick={() => onOpen(product)}
  onkeydown={handleKeydown}
>
  <div class="relative aspect-[4/5] overflow-hidden rounded-t-[2.5rem] bg-[#f5e6d3]">
    {#if !imageLoaded}
      <div class="absolute inset-0 animate-pulse bg-gradient-to-br from-neutral-100 via-neutral-200 to-neutral-100"></div>
    {/if}
    <img
      src={product.image}
      alt={product.name}
      class="relative h-full w-full object-cover transition-opacity duration-300"
      class:opacity-0={!imageLoaded}
      class:opacity-100={imageLoaded}
      loading="lazy"
      onload={() => (imageLoaded = true)}
      onerror={handleImageError}
    />

    <div class="absolute top-4 left-4 flex flex-col gap-2">
      {#if product.discountPct > 0}
        <span class="rounded-full bg-rose-600 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white shadow-md">
          %{product.discountPct} İndirim
        </span>
      {/if}
      {#if product.isNew}
        <span class="rounded-full bg-[#c68642] px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white shadow-md">
          Yeni
        </span>
      {/if}
      {#if stockState === 'low'}
        <span class="rounded-full bg-amber-500 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white shadow-md">
          {stockLabel}
        </span>
      {:else if stockState === 'out'}
        <span class="rounded-full bg-neutral-700 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white shadow-md">
          Tükendi
        </span>
      {/if}
    </div>

    <span class="absolute top-4 right-4 rounded-full bg-white/95 px-4 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] text-[#3c2a20] shadow-sm backdrop-blur">
      {product.category}
    </span>

    <button
      type="button"
      class="wishlist-btn absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 shadow-md backdrop-blur transition hover:scale-110"
      class:is-on={isWishlisted}
      aria-label={isWishlisted ? 'Favorilerden çıkar' : 'Favorilere ekle'}
      aria-pressed={isWishlisted}
      onclick={(event) => {
        event.stopPropagation();
        onToggleWishlist(product.id);
      }}
    >
      <Icon name={isWishlisted ? 'heartFill' : 'heart'} size={18} />
    </button>
  </div>

  <div class="flex flex-1 flex-col p-6 md:p-8">
    <div class="mb-2 flex items-center gap-2 text-xs font-bold text-amber-500">
      <Icon name="starFill" size={14} />
      <span class="text-[#3c2a20]">{product.rating.toFixed(1)}</span>
      <span class="font-medium text-[#3c2a20]/40">({product.reviewCount})</span>
    </div>

    <h3 class="line-clamp-1 mb-2 text-lg font-bold text-[#3c2a20]" title={product.name}>
      {product.name}
    </h3>
    <p class="line-clamp-2 mb-6 min-h-[2rem] text-xs leading-relaxed font-medium text-[#3c2a20]/60">
      {product.desc}
    </p>

    <div class="mt-auto flex items-end justify-between border-t border-[#3c2a20]/10/60 pt-4">
      <div class="flex flex-col">
        {#if product.originalPrice}
          <span class="text-xs font-medium text-[#3c2a20]/40 line-through">
            {product.originalPrice} ₺
          </span>
          <span class="text-2xl font-black text-rose-600">{product.price} ₺</span>
        {:else}
          <span class="text-2xl font-black text-[#3c2a20]">{product.price} ₺</span>
        {/if}
      </div>
      <button
        type="button"
        class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#3c2a20] text-white shadow-md transition hover:bg-[#c68642] disabled:cursor-not-allowed disabled:bg-neutral-300"
        aria-label={`${product.name} ürününü sepete ekle`}
        disabled={stockState === 'out'}
        onclick={(event) => {
          event.stopPropagation();
          onAddToCart(product);
        }}
      >
        <Icon name="plus" size={16} />
      </button>
    </div>
  </div>
</div>

<style>
  .wishlist-btn {
    color: rgb(64 64 64);
  }
  .wishlist-btn.is-on {
    color: rgb(244 63 94);
  }
</style>
