<script>
  import ProductCard from '../components/ProductCard.svelte';
  import Icon from '../components/Icon.svelte';

  export let featuredProducts = [];
  export let wishlist = [];
  export let onNavigate = () => {};
  export let onOpenProduct = () => {};
  export let onAddToCart = () => {};
  export let onToggleWishlist = () => {};

  const trustBadges = [
    { icon: 'truck', title: 'Aynı Gün Kargo', desc: 'Mahalle teslimatı 2 saat içinde' },
    { icon: 'leaf', title: 'Tek Origin', desc: 'Doğrudan çiftçi ilişkisi' },
    { icon: 'refresh', title: 'Taze Kavurma', desc: 'Hafta içi her sabah' },
    { icon: 'headset', title: 'Demleme Desteği', desc: 'Barista WhatsApp hattı' },
  ];

  const testimonials = [
    {
      name: 'Selin K.',
      role: 'Düzenli Müşteri',
      content: "Sabah espresso ritüelim Kahve'ye geçti. V60 demlemesi süt-müt aramayı bitirdi.",
      rating: 5,
    },
    {
      name: 'Mert A.',
      role: 'Home Barista',
      content: 'Yirgacheffe çekirdeği harika; çiçeksi notalar net. Üstüne demleme rehberi de cabası.',
      rating: 5,
    },
    {
      name: 'Aylin Y.',
      role: 'Kafe Sahibi',
      content: 'Roast master gerçekten ulaşılabilir. Ekibim için özelleştirilmiş profil hazırladılar.',
      rating: 5,
    },
  ];
</script>

<div>
  <section class="hero-bg relative flex h-[95vh] items-center justify-center pt-16">
    <div class="mx-auto max-w-4xl px-6 pb-10 text-center text-white">
      <div class="text-xs font-black uppercase tracking-[0.4em] text-[#e0a96d]">Kahve Roastery</div>
      <h1 class="logo-font mt-6 mb-8 text-6xl leading-[0.95] font-bold tracking-tight drop-shadow-lg md:text-8xl">
        Sabah ilk yudum,<br />
        <span class="text-[#e0a96d]">tüm gün dingin.</span>
      </h1>
      <p class="mx-auto mb-12 max-w-xl text-lg font-medium text-white/90 drop-shadow-md md:text-xl">
        Tek origin çekirdek, taze kavurma, mahalle barista'sıyla demleme rehberi.<br />
        Bir filtre kahveden fazlası — bir ritüel.
      </p>
      <div class="flex flex-col items-center justify-center gap-4 sm:flex-row">
        <button
          type="button"
          class="flex w-full items-center justify-center gap-x-3 rounded-full bg-[#fbf6ee] px-12 py-6 text-lg font-bold text-[#3c2a20] shadow-2xl transition hover:bg-[#f5e6d3] sm:w-auto"
          onclick={() => onNavigate('shop')}
        >
          Menüye Bak
          <Icon name="arrowRight" size={20} />
        </button>
        <button
          type="button"
          class="flex w-full items-center justify-center gap-x-3 rounded-full border-2 border-white/40 bg-white/5 px-12 py-6 text-lg font-bold text-white backdrop-blur-sm transition hover:border-white hover:bg-white/15 sm:w-auto"
          onclick={() => onNavigate('about')}
        >
          Hikayemiz
        </button>
      </div>
    </div>
  </section>

  <div class="relative z-10 -mt-16 rounded-t-[3rem] bg-[#fbf6ee] pt-12 pb-24 shadow-[0_-10px_40px_rgba(60,42,32,0.18)] md:pt-20">
    <section class="mx-auto max-w-7xl px-6">
      <div class="mb-12 grid gap-6 md:grid-cols-4">
        {#each trustBadges as badge}
          <div class="flex items-start gap-4 rounded-3xl border border-[#3c2a20]/10 bg-white p-6 shadow-sm">
            <div class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-[#3c2a20] text-[#e0a96d]">
              <Icon name={badge.icon} size={22} />
            </div>
            <div>
              <h4 class="text-sm font-bold text-[#3c2a20]">{badge.title}</h4>
              <p class="mt-1 text-xs font-medium text-[#3c2a20]/60">{badge.desc}</p>
            </div>
          </div>
        {/each}
      </div>

      <div class="mb-12 flex flex-col items-center justify-between gap-y-4 text-center md:flex-row md:items-end md:text-left">
        <div>
          <span class="text-xs font-black uppercase tracking-[0.3em] text-[#c68642]">
            Sezonun Demlemeleri
          </span>
          <h2 class="logo-font mt-3 text-4xl font-bold tracking-tight text-[#3c2a20] md:text-5xl">
            Öne Çıkan Lezzetler
          </h2>
        </div>
        <button
          type="button"
          class="border-b-2 border-[#3c2a20] pb-1 font-bold text-[#3c2a20] transition hover:border-[#c68642] hover:text-[#c68642]"
          onclick={() => onNavigate('shop')}
        >
          Tüm menü
        </button>
      </div>

      <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {#each featuredProducts as product (product.id)}
          <ProductCard
            product={product}
            isWishlisted={wishlist.includes(product.id)}
            onOpen={onOpenProduct}
            onAddToCart={onAddToCart}
            onToggleWishlist={onToggleWishlist}
          />
        {/each}
      </div>
    </section>

    <section class="mx-auto mt-24 max-w-7xl px-6">
      <div class="mb-12 text-center">
        <span class="text-xs font-black uppercase tracking-[0.3em] text-[#c68642]">
          Müşteri Yorumları
        </span>
        <h2 class="logo-font mt-3 text-4xl font-bold tracking-tight text-[#3c2a20] md:text-5xl">
          Mahallenin Tercihi
        </h2>
      </div>

      <div class="grid gap-6 md:grid-cols-3">
        {#each testimonials as t}
          <div class="rounded-[2rem] border border-[#3c2a20]/10 bg-white p-8 shadow-sm">
            <div class="mb-4 flex gap-1 text-amber-500">
              {#each Array(t.rating) as _}
                <Icon name="starFill" size={16} />
              {/each}
            </div>
            <p class="mb-6 text-sm leading-relaxed text-[#3c2a20]/80">"{t.content}"</p>
            <div class="border-t border-[#3c2a20]/10 pt-4">
              <div class="text-sm font-bold text-[#3c2a20]">{t.name}</div>
              <div class="text-[10px] font-black uppercase tracking-widest text-[#c68642]">{t.role}</div>
            </div>
          </div>
        {/each}
      </div>
    </section>
  </div>
</div>
