<script>
  import Icon from './Icon.svelte';
  import { fallbackSvg, products } from '../data/menu.js';

  export let product = null;
  export let wishlist = [];
  export let onClose = () => {};
  export let onAddToCart = () => {};
  export let onToggleWishlist = () => {};
  export let onOpenProduct = () => {};

  let imageLoaded = false;
  $: if (product) imageLoaded = false;

  function handleImageError(event) {
    event.currentTarget.onerror = null;
    event.currentTarget.src = fallbackSvg;
    imageLoaded = true;
  }

  $: stockState = product ? (product.stock === 0 ? 'out' : product.stock <= 12 ? 'low' : 'ok') : 'ok';

  $: relatedProducts = product
    ? products
        .filter((p) => p.category === product.category && p.id !== product.id)
        .slice(0, 4)
    : [];

  $: isWishlisted = product ? wishlist.includes(product.id) : false;
</script>

{#if product}
  <div
    class="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
    role="button"
    tabindex="0"
    aria-label="Ürün penceresini kapat"
    onclick={(event) => event.currentTarget === event.target && onClose()}
    onkeydown={(event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    }}
  >
    <div class="modal-pop flex max-h-[95vh] w-full max-w-5xl flex-col overflow-hidden rounded-[3rem] bg-white shadow-2xl md:flex-row">
      <div class="relative flex items-center justify-center overflow-hidden bg-[#fbf6ee] md:w-1/2">
        {#if !imageLoaded}
          <div class="absolute inset-0 animate-pulse bg-gradient-to-br from-neutral-100 via-neutral-200 to-neutral-100"></div>
        {/if}
        <img
          src={product.image}
          alt={product.name}
          class="relative h-full w-full object-cover transition-opacity duration-300"
          class:opacity-0={!imageLoaded}
          class:opacity-100={imageLoaded}
          onload={() => (imageLoaded = true)}
          onerror={handleImageError}
        />

        <div class="absolute top-6 left-6 flex flex-col gap-2">
          {#if product.discountPct > 0}
            <span class="rounded-full bg-rose-600 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-white shadow-md">
              %{product.discountPct} İndirim
            </span>
          {/if}
          {#if product.isNew}
            <span class="rounded-full bg-[#c68642] px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-white shadow-md">
              Yeni
            </span>
          {/if}
        </div>
      </div>

      <div class="flex flex-col overflow-auto p-10 md:w-1/2 md:p-14">
        <div class="flex items-start justify-between">
          <span class="rounded-full bg-[#fbf6ee] px-3 py-1 text-[10px] font-black uppercase tracking-[0.3em] text-[#c68642]">
            {product.category}
          </span>
          <button type="button" class="text-[#3c2a20]/30 transition hover:text-[#3c2a20]" onclick={onClose} aria-label="Kapat">
            <Icon name="close" size={32} />
          </button>
        </div>

        <h2 class="mt-6 text-4xl font-bold leading-none tracking-tighter text-[#3c2a20] md:text-5xl">
          {product.name}
        </h2>

        <div class="mt-4 flex items-center gap-3">
          <div class="flex gap-0.5 text-amber-500">
            {#each [1, 2, 3, 4, 5] as i}
              <Icon name={i <= Math.round(product.rating) ? 'starFill' : 'star'} size={16} />
            {/each}
          </div>
          <span class="text-sm font-bold text-[#3c2a20]">{product.rating.toFixed(1)}</span>
          <span class="text-xs font-medium text-[#3c2a20]/40">({product.reviewCount} yorum)</span>
        </div>

        <div class="mt-8 flex items-end gap-3">
          {#if product.originalPrice}
            <div class="text-4xl font-black text-rose-600">{product.price} ₺</div>
            <div class="text-lg font-medium text-[#3c2a20]/40 line-through">{product.originalPrice} ₺</div>
          {:else}
            <div class="text-4xl font-black text-[#3c2a20]">{product.price} ₺</div>
          {/if}
        </div>

        <div class="mt-4 flex items-center gap-2 text-xs font-black uppercase tracking-widest">
          {#if stockState === 'out'}
            <span class="rounded-full bg-[#f5e6d3] px-3 py-1.5 text-neutral-600">Tükendi</span>
          {:else if stockState === 'low'}
            <span class="rounded-full bg-amber-50 px-3 py-1.5 text-amber-700">
              Son {product.stock} adet
            </span>
          {:else}
            <span class="rounded-full bg-[#fbf6ee] px-3 py-1.5 text-[#c68642]">Stokta Var</span>
          {/if}
        </div>

        <div class="my-10 h-px w-20 bg-neutral-200"></div>
        <p class="text-base leading-relaxed font-medium text-[#3c2a20]/60">
          {product.desc}
        </p>

        <div class="mt-8 grid grid-cols-3 gap-3 text-xs">
          <div class="flex flex-col items-center gap-2 rounded-2xl border border-[#3c2a20]/10 p-4 text-center">
            <span class="text-[#c68642]"><Icon name="truck" size={20} /></span>
            <span class="font-bold text-[#3c2a20]/80">Hızlı Kargo</span>
          </div>
          <div class="flex flex-col items-center gap-2 rounded-2xl border border-[#3c2a20]/10 p-4 text-center">
            <span class="text-[#c68642]"><Icon name="leaf" size={20} /></span>
            <span class="font-bold text-[#3c2a20]/80">Doğal İçerik</span>
          </div>
          <div class="flex flex-col items-center gap-2 rounded-2xl border border-[#3c2a20]/10 p-4 text-center">
            <span class="text-[#c68642]"><Icon name="refresh" size={20} /></span>
            <span class="font-bold text-[#3c2a20]/80">30 Gün İade</span>
          </div>
        </div>

        <div class="mt-auto flex gap-3 pt-10">
          <button
            type="button"
            class="flex flex-1 items-center justify-center gap-x-3 rounded-[2rem] bg-[#3c2a20] py-5 text-base font-bold text-white shadow-xl shadow-[#3c2a20]/20 transition hover:bg-[#2a1c14] disabled:cursor-not-allowed disabled:bg-neutral-300 disabled:shadow-none"
            disabled={stockState === 'out'}
            onclick={() => onAddToCart(product)}
          >
            <Icon name="bag" size={20} />
            {stockState === 'out' ? 'Stokta Yok' : 'Sepete Ekle'}
          </button>
          <button
            type="button"
            class="wishlist-btn flex h-[68px] w-[68px] items-center justify-center rounded-[2rem] border border-[#3c2a20]/15 transition hover:border-rose-200"
            class:is-on={isWishlisted}
            aria-label={isWishlisted ? 'Favorilerden çıkar' : 'Favorilere ekle'}
            aria-pressed={isWishlisted}
            onclick={() => onToggleWishlist(product.id)}
          >
            <Icon name={isWishlisted ? 'heartFill' : 'heart'} size={22} />
          </button>
        </div>

        {#if relatedProducts.length > 0}
          <div class="mt-12 border-t border-[#3c2a20]/10 pt-8">
            <div class="mb-5 text-[10px] font-black uppercase tracking-[0.3em] text-[#c68642]">
              Benzer Ürünler
            </div>
            <div class="grid grid-cols-2 gap-3 md:grid-cols-4">
              {#each relatedProducts as rp (rp.id)}
                <button
                  type="button"
                  class="group flex flex-col gap-2 rounded-2xl border border-[#3c2a20]/10 bg-white p-2 text-left transition hover:border-[#c68642]/30 hover:shadow-md"
                  onclick={() => onOpenProduct(rp)}
                >
                  <div class="aspect-square overflow-hidden rounded-xl bg-[#f5e6d3]">
                    <img src={rp.image} alt={rp.name} class="h-full w-full object-cover transition group-hover:scale-105" loading="lazy" onerror={handleImageError} />
                  </div>
                  <div class="px-1">
                    <div class="line-clamp-1 text-[11px] font-bold text-[#3c2a20]">{rp.name}</div>
                    <div class="text-[11px] font-black text-[#c68642]">{rp.price} ₺</div>
                  </div>
                </button>
              {/each}
            </div>
          </div>
        {/if}
      </div>
    </div>
  </div>
{/if}

<style>
  .wishlist-btn {
    color: rgb(64 64 64);
  }
  .wishlist-btn.is-on {
    color: rgb(244 63 94);
    border-color: rgb(254 205 211);
    background-color: rgb(255 241 242);
  }
</style>
