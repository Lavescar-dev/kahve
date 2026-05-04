<script>
  import Icon from './Icon.svelte';

  export let onNavigate = () => {};
  export let onSubscribe = () => {};

  let email = '';
  let submitted = false;
  let error = '';

  function handleSubscribe() {
    const value = email.trim();
    if (!value) {
      error = 'E-posta adresinizi yazın';
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      error = 'Geçerli bir e-posta girin';
      return;
    }
    onSubscribe(value);
    submitted = true;
    error = '';
    email = '';
    window.setTimeout(() => (submitted = false), 4500);
  }
</script>

<footer class="mt-auto bg-[#3c2a20] py-20 text-white">
  <div class="mx-auto max-w-7xl px-6">
    <div class="mb-16 flex flex-col items-stretch justify-between gap-10 rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-[#3c2a20]/40 to-neutral-900 p-10 md:flex-row md:items-center md:p-14">
      <div class="md:max-w-md">
        <div class="text-xs font-black uppercase tracking-[0.3em] text-[#e0a96d]">Bültenimize Katıl</div>
        <h3 class="mt-3 text-3xl font-bold tracking-tighter md:text-4xl">
          %10 ilk sipariş indirimi
        </h3>
        <p class="mt-3 text-sm font-medium text-[#3c2a20]/40">
          Yeni ürünler, sezon kampanyaları ve kahve rehberlerini doğrudan kutuna gönderelim.
        </p>
      </div>

      <div class="flex w-full flex-col gap-3 md:max-w-md">
        {#if submitted}
          <div class="flex items-center gap-3 rounded-2xl bg-[#c68642]/15 px-5 py-4 text-[#e0a96d]">
            <Icon name="check" size={22} />
            <span class="text-xs font-black uppercase tracking-widest">Aboneliğin başarıyla alındı!</span>
          </div>
        {:else}
          <div class="flex flex-col gap-2 sm:flex-row">
            <div class="relative flex-1">
              <div class="pointer-events-none absolute top-1/2 left-5 -translate-y-1/2 text-[#3c2a20]/40">
                <Icon name="mail" size={16} />
              </div>
              <input
                bind:value={email}
                type="email"
                placeholder="E-posta adresin"
                class="w-full rounded-2xl border border-white/15 bg-white/5 py-4 pr-5 pl-12 text-sm font-medium text-white placeholder-neutral-500 outline-none transition focus:border-[#c68642] focus:ring-2 focus:ring-[#c68642]/30"
                onkeydown={(e) => e.key === 'Enter' && handleSubscribe()}
              />
            </div>
            <button
              type="button"
              class="rounded-2xl bg-[#c68642] px-6 py-4 text-xs font-black uppercase tracking-widest text-[#2a1c14] transition hover:bg-[#e0a96d]"
              onclick={handleSubscribe}
            >
              Abone Ol
            </button>
          </div>
          {#if error}
            <p class="ml-2 text-xs font-bold text-rose-300">{error}</p>
          {/if}
        {/if}
      </div>
    </div>

    <div class="grid gap-12 border-b border-white/5 pb-16 md:grid-cols-12">
      <div class="md:col-span-5">
        <div class="flex items-center gap-x-3">
          <div class="logo-font flex h-9 w-9 items-center justify-center rounded-xl bg-[#c68642] text-2xl font-bold text-white">
            L
          </div>
          <span class="logo-font text-3xl">kahve</span>
        </div>
        <p class="mt-5 max-w-md text-sm leading-relaxed text-[#3c2a20]/40">
          Doğanın gücünü modern bilimle harmanlayan, dermatolog onaylı temiz kahve koleksiyonu.
        </p>
      </div>

      <div class="md:col-span-3">
        <div class="text-xs font-black uppercase tracking-widest text-[#3c2a20]/60">Mağaza</div>
        <div class="mt-5 flex flex-col gap-3 text-sm font-medium text-[#3c2a20]/30">
          <button type="button" class="text-left transition hover:text-[#e0a96d]" onclick={() => onNavigate('shop')}>
            Tüm Ürünler
          </button>
          <button type="button" class="text-left transition hover:text-[#e0a96d]" onclick={() => onNavigate('shop')}>
            Yeni Sezon
          </button>
          <button type="button" class="text-left transition hover:text-[#e0a96d]" onclick={() => onNavigate('wishlist')}>
            Favorilerim
          </button>
        </div>
      </div>

      <div class="md:col-span-4">
        <div class="text-xs font-black uppercase tracking-widest text-[#3c2a20]/60">Destek</div>
        <div class="mt-5 flex flex-col gap-3 text-sm font-medium text-[#3c2a20]/30">
          <button type="button" class="text-left transition hover:text-[#e0a96d]" onclick={() => onNavigate('about')}>
            Hikayemiz
          </button>
          <span class="text-[#3c2a20]/30">İade & Değişim</span>
          <span class="text-[#3c2a20]/30">SSS</span>
          <a href="mailto:hello@kahve.lavescar.com.tr" class="text-[#e0a96d] transition hover:text-[#e0a96d]">
            hello@kahve.lavescar.com.tr
          </a>
        </div>
      </div>
    </div>

    <div class="mt-10 flex flex-col items-center gap-3 text-xs font-bold uppercase tracking-widest text-[#3c2a20]/50 md:flex-row md:justify-between">
      <p class="italic">© 2026 Kahve Roastery • Tek Origin, Taze Demleme.</p>
      <a href="https://lavescar.com.tr" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 text-[#3c2a20]/60 transition hover:text-[#c68642]">
        Lavescar Network
        <span aria-hidden="true">→</span>
      </a>
    </div>
  </div>
</footer>
