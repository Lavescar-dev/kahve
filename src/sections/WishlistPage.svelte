<script>
  import ProductCard from '../components/ProductCard.svelte';
  import Icon from '../components/Icon.svelte';

  export let products = [];
  export let onOpenProduct = () => {};
  export let onAddToCart = () => {};
  export let onToggleWishlist = () => {};
  export let onMoveToCart = () => {};
  export let onNavigate = () => {};
</script>

<div class="bg-[#fbf6ee] pt-32 pb-20">
  <section class="mx-auto max-w-7xl px-6">
    <div class="mb-12 flex items-end justify-between border-b border-[#3c2a20]/15 pb-8">
      <div>
        <span class="text-xs font-black uppercase tracking-[0.3em] text-rose-600">Favorilerim</span>
        <h2 class="mt-3 flex items-center gap-3 text-4xl font-semibold tracking-tighter text-[#3c2a20] md:text-5xl">
          <span class="text-rose-500">
            <Icon name="heartFill" size={32} />
          </span>
          Favori Ürünler
        </h2>
        <p class="mt-4 font-medium text-[#3c2a20]/60">
          {#if products.length === 0}
            Henüz favori ürününüz yok
          {:else}
            <span class="font-bold text-[#3c2a20]">{products.length}</span> ürün listeleniyor
          {/if}
        </p>
      </div>
      {#if products.length > 0}
        <button
          type="button"
          class="hidden rounded-[2rem] bg-[#3c2a20] px-6 py-3 text-xs font-black uppercase tracking-widest text-white shadow-lg transition hover:bg-[#2a1c14] md:inline-block"
          onclick={() => products.forEach((p) => onMoveToCart(p.id))}
        >
          Tümünü Sepete Taşı
        </button>
      {/if}
    </div>

    {#if products.length === 0}
      <div class="py-24 text-center">
        <div class="mb-6 inline-flex rounded-full bg-rose-50 p-8 text-rose-300">
          <Icon name="heart" size={56} />
        </div>
        <h3 class="text-2xl font-bold tracking-tighter text-[#3c2a20]">Favori listeniz boş</h3>
        <p class="mt-3 max-w-md mx-auto text-[#3c2a20]/60">
          Beğendiğiniz ürünlerin sağ alt köşesindeki kalp simgesine dokunarak favorilerinize ekleyebilirsiniz.
        </p>
        <button
          type="button"
          class="mt-8 rounded-[2rem] bg-[#3c2a20] px-8 py-4 text-sm font-bold uppercase tracking-widest text-white shadow-lg shadow-[#3c2a20]/10 transition hover:bg-[#2a1c14]"
          onclick={() => onNavigate('shop')}
        >
          Mağazaya Git
        </button>
      </div>
    {:else}
      <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {#each products as product (product.id)}
          <ProductCard
            product={product}
            isWishlisted={true}
            onOpen={onOpenProduct}
            onAddToCart={onAddToCart}
            onToggleWishlist={onToggleWishlist}
          />
        {/each}
      </div>
    {/if}
  </section>
</div>
