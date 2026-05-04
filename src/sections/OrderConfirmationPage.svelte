<script>
  import Icon from '../components/Icon.svelte';
  import { fallbackSvg } from '../data/menu.js';

  export let order;
  export let onNavigate = () => {};

  function handleImageError(event) {
    event.currentTarget.onerror = null;
    event.currentTarget.src = fallbackSvg;
  }

  function formatDate(d) {
    if (!d) return '';
    return new Date(d).toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }
</script>

<div class="bg-[#fbf6ee] pt-32 pb-20">
  <section class="mx-auto max-w-3xl px-6">
    <div class="rounded-[2.5rem] border border-[#3c2a20]/10 bg-white p-10 text-center shadow-sm md:p-14">
      <div class="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-[#f5e6d3] text-[#c68642]">
        <Icon name="check" size={50} />
      </div>
      <span class="text-xs font-black uppercase tracking-[0.3em] text-[#c68642]">Teşekkürler</span>
      <h2 class="mt-3 text-4xl font-bold tracking-tighter text-[#3c2a20] md:text-5xl">
        Siparişiniz Alındı
      </h2>
      <p class="mt-4 text-base font-medium text-[#3c2a20]/60">
        Siparişiniz onaylandı ve hazırlanmaya başladı. Onay e-postası birazdan e-posta adresinize iletilecek.
      </p>

      <div class="mt-10 grid gap-6 rounded-[2rem] border border-[#3c2a20]/10 bg-[#fbf6ee]/50 p-6 text-left md:grid-cols-3 md:p-8">
        <div>
          <div class="text-[10px] font-black uppercase tracking-widest text-[#c68642]">Sipariş No</div>
          <div class="mt-2 text-lg font-black text-[#3c2a20]">{order.id}</div>
        </div>
        <div>
          <div class="text-[10px] font-black uppercase tracking-widest text-[#c68642]">Sipariş Tarihi</div>
          <div class="mt-2 text-sm font-bold text-[#3c2a20]">{formatDate(order.placedAt)}</div>
        </div>
        <div>
          <div class="text-[10px] font-black uppercase tracking-widest text-[#c68642]">Tahmini Teslimat</div>
          <div class="mt-2 text-sm font-bold text-[#3c2a20]">{formatDate(order.eta)}</div>
        </div>
      </div>
    </div>

    <div class="mt-8 rounded-[2.5rem] border border-[#3c2a20]/10 bg-white p-10 shadow-sm md:p-12">
      <h3 class="border-b border-[#3c2a20]/10 pb-6 text-2xl font-bold tracking-tighter text-[#3c2a20]">
        Sipariş Özeti
      </h3>

      <div class="space-y-6 pt-8">
        {#each order.items as item (item.id)}
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.name}
                class="h-16 w-16 rounded-xl border border-[#3c2a20]/10 object-cover"
                onerror={handleImageError}
              />
              <div>
                <div class="text-sm font-bold text-[#3c2a20]">{item.name}</div>
                <div class="text-xs font-bold text-[#3c2a20]/60">
                  {item.quantity} adet × {item.price} ₺
                </div>
              </div>
            </div>
            <div class="text-sm font-black text-[#3c2a20]">{item.quantity * item.price} ₺</div>
          </div>
        {/each}
      </div>

      <div class="mt-8 space-y-3 border-t border-[#3c2a20]/10 pt-6 text-sm font-medium text-[#3c2a20]/60">
        <div class="flex items-center justify-between">
          <span>Ara Toplam</span>
          <span class="font-bold text-[#3c2a20]">{order.subtotal} ₺</span>
        </div>
        <div class="flex items-center justify-between">
          <span>Kargo</span>
          <span class="font-bold text-[#3c2a20]">{order.shippingCost === 0 ? 'Ücretsiz' : `${order.shippingCost} ₺`}</span>
        </div>
        {#if order.coupon && order.couponDiscount > 0}
          <div class="flex items-center justify-between">
            <span>Kupon ({order.coupon.code})</span>
            <span class="font-bold text-rose-600">-{order.couponDiscount} ₺</span>
          </div>
        {/if}
        <div class="flex items-center justify-between border-t border-[#3c2a20]/15 pt-4 text-lg font-black text-[#3c2a20]">
          <span>Toplam</span>
          <span class="text-[#3c2a20]">{order.total} ₺</span>
        </div>
      </div>
    </div>

    <div class="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
      <button
        type="button"
        class="rounded-[2rem] bg-[#3c2a20] px-8 py-4 text-sm font-bold uppercase tracking-widest text-white shadow-lg shadow-[#3c2a20]/10 transition hover:bg-[#2a1c14]"
        onclick={() => onNavigate('shop')}
      >
        Alışverişe Devam Et
      </button>
      <button
        type="button"
        class="rounded-[2rem] border border-neutral-300 px-8 py-4 text-sm font-bold uppercase tracking-widest text-[#3c2a20]/80 transition hover:border-neutral-900 hover:text-[#3c2a20]"
        onclick={() => onNavigate('home')}
      >
        Ana Sayfa
      </button>
    </div>
  </section>
</div>
