<script>
  import ProductCard from '../components/ProductCard.svelte';
  import Icon from '../components/Icon.svelte';

  export let products = [];
  export let categories = [];
  export let wishlist = [];
  export let onOpenProduct = () => {};
  export let onAddToCart = () => {};
  export let onToggleWishlist = () => {};

  let selectedCategory = '';
  let searchTerm = '';
  let sortBy = 'recommended';
  let onSaleOnly = false;

  const sortOptions = [
    { value: 'recommended', label: 'Önerilen' },
    { value: 'priceAsc', label: 'Fiyat (artan)' },
    { value: 'priceDesc', label: 'Fiyat (azalan)' },
    { value: 'rating', label: 'En Yüksek Puan' },
    { value: 'newest', label: 'En Yeni' },
  ];

  $: filteredProducts = products
    .filter((product) => {
      const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
      const query = searchTerm.trim().toLowerCase();
      const matchesQuery = query
        ? product.name.toLowerCase().includes(query) || product.desc.toLowerCase().includes(query)
        : true;
      const matchesSale = onSaleOnly ? product.discountPct > 0 : true;
      return matchesCategory && matchesQuery && matchesSale;
    })
    .slice()
    .sort((a, b) => {
      if (sortBy === 'priceAsc') return a.price - b.price;
      if (sortBy === 'priceDesc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return Number(b.isNew) - Number(a.isNew) || b.id - a.id;
      return 0;
    });

  function clearFilters() {
    selectedCategory = '';
    searchTerm = '';
    sortBy = 'recommended';
    onSaleOnly = false;
  }
</script>

<div class="bg-[#fbf6ee] pt-32 pb-20">
  <section class="mx-auto max-w-7xl px-6">
    <div class="mb-10 border-b border-[#3c2a20]/15 pb-10">
      <div class="mb-8 flex flex-col items-start justify-between gap-y-6 md:flex-row md:items-end">
        <div>
          <span class="text-xs font-black uppercase tracking-[0.3em] text-[#c68642]">Mağaza</span>
          <h2 class="mt-3 text-5xl font-semibold tracking-tighter">Tüm Ürünler</h2>
          <p class="mt-4 font-medium text-[#3c2a20]/60">
            <span class="font-bold text-[#3c2a20]">{filteredProducts.length}</span>
            çeşit ürün listeleniyor
          </p>
        </div>

        <div class="flex w-full flex-wrap items-center gap-3 md:w-auto md:flex-nowrap">
          <select
            bind:value={selectedCategory}
            class="cursor-pointer appearance-none rounded-2xl border border-[#3c2a20]/15 bg-white px-5 py-3 text-sm font-bold shadow-sm outline-none transition focus:border-[#c68642] focus:ring-2 focus:ring-[#c68642]/30"
          >
            <option value="">Tüm Kategoriler</option>
            {#each [...new Set(categories)].sort() as category}
              <option value={category}>{category}</option>
            {/each}
          </select>

          <select
            bind:value={sortBy}
            class="cursor-pointer appearance-none rounded-2xl border border-[#3c2a20]/15 bg-white px-5 py-3 text-sm font-bold shadow-sm outline-none transition focus:border-[#c68642] focus:ring-2 focus:ring-[#c68642]/30"
          >
            {#each sortOptions as opt}
              <option value={opt.value}>{opt.label}</option>
            {/each}
          </select>

          <div class="relative w-full md:w-72">
            <div class="pointer-events-none absolute top-1/2 left-5 -translate-y-1/2 text-[#3c2a20]/40">
              <Icon name="search" size={16} />
            </div>
            <input
              bind:value={searchTerm}
              type="text"
              placeholder="Ürün ara..."
              class="w-full rounded-2xl border border-[#3c2a20]/15 bg-white py-3 pr-6 pl-12 text-sm font-medium shadow-sm outline-none transition focus:border-[#c68642] focus:ring-2 focus:ring-[#c68642]/30"
            />
          </div>
        </div>
      </div>

      <div class="flex flex-wrap items-center gap-3">
        <button
          type="button"
          class={`rounded-full border px-4 py-2 text-xs font-black uppercase tracking-widest transition ${onSaleOnly ? 'border-rose-500 bg-rose-50 text-rose-700' : 'border-[#3c2a20]/15 bg-white text-neutral-600 hover:border-rose-200'}`}
          onclick={() => (onSaleOnly = !onSaleOnly)}
        >
          %İndirimli
        </button>
        {#if selectedCategory}
          <button
            type="button"
            class="flex items-center gap-1 rounded-full border border-[#c68642]/30 bg-[#fbf6ee] px-4 py-2 text-xs font-black uppercase tracking-widest text-[#c68642]"
            onclick={() => (selectedCategory = '')}
          >
            {selectedCategory} <Icon name="close" size={12} />
          </button>
        {/if}
        {#if searchTerm}
          <button
            type="button"
            class="flex items-center gap-1 rounded-full border border-[#3c2a20]/15 bg-white px-4 py-2 text-xs font-black uppercase tracking-widest text-neutral-600"
            onclick={() => (searchTerm = '')}
          >
            "{searchTerm}" <Icon name="close" size={12} />
          </button>
        {/if}
        {#if (selectedCategory || searchTerm || onSaleOnly || sortBy !== 'recommended')}
          <button
            type="button"
            class="text-xs font-black uppercase tracking-widest text-[#3c2a20]/60 underline-offset-4 transition hover:text-[#c68642] hover:underline"
            onclick={clearFilters}
          >
            Filtreleri temizle
          </button>
        {/if}
      </div>
    </div>

    {#if filteredProducts.length > 0}
      <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {#each filteredProducts as product (product.id)}
          <ProductCard
            product={product}
            isWishlisted={wishlist.includes(product.id)}
            onOpen={onOpenProduct}
            onAddToCart={onAddToCart}
            onToggleWishlist={onToggleWishlist}
          />
        {/each}
      </div>
    {:else}
      <div class="py-20 text-center">
        <div class="mb-6 inline-flex rounded-full bg-[#f5e6d3] p-6 text-[#3c2a20]/30">
          <Icon name="sparkles" size={42} />
        </div>
        <h3 class="text-2xl font-bold tracking-tighter text-[#3c2a20]">Aradığınızı bulamadık</h3>
        <p class="mt-2 text-[#3c2a20]/60">Filtreleri değiştirerek tekrar deneyebilirsiniz.</p>
        <button
          type="button"
          class="mt-6 rounded-full bg-[#3c2a20] px-6 py-3 text-xs font-black uppercase tracking-widest text-white transition hover:bg-[#c68642]"
          onclick={clearFilters}
        >
          Filtreleri Temizle
        </button>
      </div>
    {/if}
  </section>
</div>
