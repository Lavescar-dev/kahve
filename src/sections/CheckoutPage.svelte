<script>
  import Icon from '../components/Icon.svelte';
  import { fallbackSvg } from '../data/menu.js';

  export let cart = [];
  export let subtotal = 0;
  export let shippingCost = 0;
  export let couponDiscount = 0;
  export let appliedCoupon = null;
  export let total = 0;
  export let onApplyCoupon = () => false;
  export let onClearCoupon = () => {};
  export let onConfirmOrder = () => {};

  let firstName = '';
  let lastName = '';
  let email = '';
  let phone = '';
  let city = '';
  let district = '';
  let address = '';
  let cardName = '';
  let cardNumber = '';
  let cardExpiry = '';
  let cardCvv = '';
  let couponInput = '';

  let touched = {
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
    city: false,
    district: false,
    address: false,
    cardName: false,
    cardNumber: false,
    cardExpiry: false,
    cardCvv: false,
  };

  let attemptedSubmit = false;

  function markAll() {
    touched = Object.fromEntries(Object.keys(touched).map((k) => [k, true]));
  }

  function isEmpty(v) {
    return !v || !v.trim();
  }

  $: emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  $: phoneValid = /^[0-9 +()-]{10,}$/.test(phone.trim());
  $: cardNumberValid = cardNumber.replace(/\s+/g, '').length >= 13 && cardNumber.replace(/\s+/g, '').length <= 19 && /^[0-9]+$/.test(cardNumber.replace(/\s+/g, ''));
  $: cardExpiryValid = /^(0[1-9]|1[0-2])\s*\/\s*([0-9]{2})$/.test(cardExpiry.trim());
  $: cardCvvValid = /^[0-9]{3,4}$/.test(cardCvv.trim());

  $: errors = {
    firstName: isEmpty(firstName) ? 'Adınız zorunludur' : null,
    lastName: isEmpty(lastName) ? 'Soyadınız zorunludur' : null,
    email: isEmpty(email) ? 'E-posta zorunludur' : !emailValid ? 'Geçerli bir e-posta girin' : null,
    phone: isEmpty(phone) ? 'Telefon zorunludur' : !phoneValid ? 'Geçerli bir telefon girin' : null,
    city: isEmpty(city) ? 'Şehir zorunludur' : null,
    district: isEmpty(district) ? 'İlçe zorunludur' : null,
    address: isEmpty(address) ? 'Açık adres zorunludur' : null,
    cardName: isEmpty(cardName) ? 'Kart üzerindeki isim zorunludur' : null,
    cardNumber: isEmpty(cardNumber) ? 'Kart numarası zorunludur' : !cardNumberValid ? 'Kart numarası geçersiz' : null,
    cardExpiry: isEmpty(cardExpiry) ? 'Son kullanma tarihi zorunludur' : !cardExpiryValid ? 'AA / YY formatında girin' : null,
    cardCvv: isEmpty(cardCvv) ? 'CVV zorunludur' : !cardCvvValid ? 'CVV 3-4 hanedir' : null,
  };

  $: formValid = !Object.values(errors).some((e) => e !== null);

  function showError(key) {
    return (touched[key] || attemptedSubmit) && errors[key];
  }

  function inputClass(key) {
    return `w-full rounded-2xl border bg-[#fbf6ee] px-6 py-4 text-sm font-medium outline-none transition focus:ring-2 ${
      showError(key) ? 'border-rose-300 ring-rose-100 focus:border-rose-400 focus:ring-rose-100' : 'border-[#3c2a20]/15 focus:border-[#c68642] focus:ring-[#c68642]/30'
    }`;
  }

  function formatCard(value) {
    return value
      .replace(/\D/g, '')
      .slice(0, 19)
      .replace(/(.{4})/g, '$1 ')
      .trim();
  }

  function formatExpiry(value) {
    const digits = value.replace(/\D/g, '').slice(0, 4);
    if (digits.length <= 2) return digits;
    return digits.slice(0, 2) + ' / ' + digits.slice(2);
  }

  function handleCardInput(e) {
    cardNumber = formatCard(e.currentTarget.value);
  }

  function handleExpiryInput(e) {
    cardExpiry = formatExpiry(e.currentTarget.value);
  }

  function tryApplyCoupon() {
    if (!couponInput.trim()) return;
    const ok = onApplyCoupon(couponInput);
    if (ok) couponInput = '';
  }

  function handleSubmit() {
    attemptedSubmit = true;
    markAll();
    if (!formValid) {
      window.setTimeout(() => {
        const el = document.querySelector('[data-error="true"]');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 50);
      return;
    }

    onConfirmOrder({
      buyer: { firstName, lastName, email, phone },
      shipping: { city, district, address },
    });
  }

  function handleImageError(event) {
    event.currentTarget.onerror = null;
    event.currentTarget.src = fallbackSvg;
  }
</script>

<div class="bg-[#fbf6ee] pt-32 pb-20">
  <section class="mx-auto max-w-7xl px-6">
    <div class="mb-12">
      <span class="text-xs font-black uppercase tracking-[0.3em] text-[#c68642]">Güvenli Alışveriş</span>
      <h2 class="mt-3 text-4xl font-semibold tracking-tighter text-[#3c2a20] md:text-5xl">Ödemeyi Tamamla</h2>
    </div>

    <div class="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
      <div class="space-y-10 lg:col-span-7">
        <div class="rounded-[2.5rem] border border-[#3c2a20]/10 bg-white p-8 shadow-sm md:p-10">
          <h3 class="mb-6 text-2xl font-bold tracking-tighter text-[#3c2a20]">İletişim Bilgileri</h3>
          <div class="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div data-error={!!showError('firstName')}>
              <input bind:value={firstName} onblur={() => (touched.firstName = true)} type="text" placeholder="Adınız" class={inputClass('firstName')} />
              {#if showError('firstName')}<p class="mt-2 ml-2 text-xs font-bold text-rose-600">{errors.firstName}</p>{/if}
            </div>
            <div data-error={!!showError('lastName')}>
              <input bind:value={lastName} onblur={() => (touched.lastName = true)} type="text" placeholder="Soyadınız" class={inputClass('lastName')} />
              {#if showError('lastName')}<p class="mt-2 ml-2 text-xs font-bold text-rose-600">{errors.lastName}</p>{/if}
            </div>
            <div class="md:col-span-2" data-error={!!showError('email')}>
              <input bind:value={email} onblur={() => (touched.email = true)} type="email" placeholder="E-posta Adresi" class={inputClass('email')} />
              {#if showError('email')}<p class="mt-2 ml-2 text-xs font-bold text-rose-600">{errors.email}</p>{/if}
            </div>
            <div class="md:col-span-2" data-error={!!showError('phone')}>
              <input bind:value={phone} onblur={() => (touched.phone = true)} type="tel" placeholder="Telefon Numarası" class={inputClass('phone')} />
              {#if showError('phone')}<p class="mt-2 ml-2 text-xs font-bold text-rose-600">{errors.phone}</p>{/if}
            </div>
          </div>
        </div>

        <div class="rounded-[2.5rem] border border-[#3c2a20]/10 bg-white p-8 shadow-sm md:p-10">
          <h3 class="mb-6 text-2xl font-bold tracking-tighter text-[#3c2a20]">Teslimat Adresi</h3>
          <div class="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div data-error={!!showError('city')}>
              <input bind:value={city} onblur={() => (touched.city = true)} type="text" placeholder="Şehir" class={inputClass('city')} />
              {#if showError('city')}<p class="mt-2 ml-2 text-xs font-bold text-rose-600">{errors.city}</p>{/if}
            </div>
            <div data-error={!!showError('district')}>
              <input bind:value={district} onblur={() => (touched.district = true)} type="text" placeholder="İlçe" class={inputClass('district')} />
              {#if showError('district')}<p class="mt-2 ml-2 text-xs font-bold text-rose-600">{errors.district}</p>{/if}
            </div>
            <div class="md:col-span-2" data-error={!!showError('address')}>
              <textarea bind:value={address} onblur={() => (touched.address = true)} placeholder="Açık Adres (Mahalle, Sokak, No, Daire)" rows="3" class={`resize-none ${inputClass('address')}`}></textarea>
              {#if showError('address')}<p class="mt-2 ml-2 text-xs font-bold text-rose-600">{errors.address}</p>{/if}
            </div>
          </div>
        </div>

        <div class="rounded-[2.5rem] border border-[#3c2a20]/10 bg-white p-8 shadow-sm md:p-10">
          <div class="mb-6 flex items-center justify-between">
            <h3 class="text-2xl font-bold tracking-tighter text-[#3c2a20]">Ödeme Bilgileri</h3>
            <div class="flex gap-2 text-xs font-black uppercase tracking-[0.2em] text-[#3c2a20]/40">
              <span class="rounded-full bg-[#f5e6d3] px-3 py-2">Visa</span>
              <span class="rounded-full bg-[#f5e6d3] px-3 py-2">MC</span>
            </div>
          </div>

          <div class="mb-6 flex items-start gap-3 rounded-2xl border border-[#3c2a20]/10 bg-[#fbf6ee] p-4 text-[10px] font-black uppercase tracking-widest text-[#3c2a20] sm:items-center sm:text-xs">
            <Icon name="info" size={18} className="mt-0.5 shrink-0 sm:mt-0" />
            Bu alan tasarımsaldır, lütfen gerçek kart bilgilerinizi girmeyiniz.
          </div>

          <div class="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div class="md:col-span-2" data-error={!!showError('cardName')}>
              <input bind:value={cardName} onblur={() => (touched.cardName = true)} type="text" placeholder="Kart Üzerindeki İsim" class={inputClass('cardName')} />
              {#if showError('cardName')}<p class="mt-2 ml-2 text-xs font-bold text-rose-600">{errors.cardName}</p>{/if}
            </div>
            <div class="md:col-span-2" data-error={!!showError('cardNumber')}>
              <input value={cardNumber} oninput={handleCardInput} onblur={() => (touched.cardNumber = true)} type="text" inputmode="numeric" placeholder="Kart Numarası" class={`tracking-widest ${inputClass('cardNumber')}`} />
              {#if showError('cardNumber')}<p class="mt-2 ml-2 text-xs font-bold text-rose-600">{errors.cardNumber}</p>{/if}
            </div>
            <div data-error={!!showError('cardExpiry')}>
              <input value={cardExpiry} oninput={handleExpiryInput} onblur={() => (touched.cardExpiry = true)} type="text" inputmode="numeric" maxlength="7" placeholder="AA / YY" class={`text-center ${inputClass('cardExpiry')}`} />
              {#if showError('cardExpiry')}<p class="mt-2 ml-2 text-xs font-bold text-rose-600">{errors.cardExpiry}</p>{/if}
            </div>
            <div data-error={!!showError('cardCvv')}>
              <input bind:value={cardCvv} onblur={() => (touched.cardCvv = true)} type="text" inputmode="numeric" maxlength="4" placeholder="CVV" class={`text-center ${inputClass('cardCvv')}`} />
              {#if showError('cardCvv')}<p class="mt-2 ml-2 text-xs font-bold text-rose-600">{errors.cardCvv}</p>{/if}
            </div>
          </div>
        </div>
      </div>

      <div class="relative lg:col-span-5">
        <div class="sticky top-32 rounded-[2.5rem] border border-[#3c2a20]/10 bg-white p-8 shadow-sm md:p-10">
          <h3 class="border-b border-[#3c2a20]/10 pb-6 text-2xl font-bold tracking-tighter text-[#3c2a20]">
            Sipariş Özeti
          </h3>

          <div class="mb-6 max-h-[40vh] space-y-6 overflow-y-auto pr-2 pt-8">
            {#each cart as item (item.id)}
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-4">
                  <div class="relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      class="h-16 w-16 rounded-xl border border-[#3c2a20]/10 object-cover shadow-sm"
                      onerror={handleImageError}
                    />
                    <span class="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#3c2a20] text-[10px] font-bold text-white shadow-sm">
                      {item.quantity}
                    </span>
                  </div>
                  <span class="line-clamp-1 max-w-[120px] text-sm font-bold text-[#3c2a20] md:max-w-[160px]">
                    {item.name}
                  </span>
                </div>
                <span class="font-bold text-[#3c2a20]">{item.price * item.quantity} ₺</span>
              </div>
            {/each}
          </div>

          <div class="border-t border-[#3c2a20]/10 pt-6">
            <div class="text-[10px] font-black uppercase tracking-widest text-[#3c2a20]/60">İndirim Kuponu</div>
            {#if appliedCoupon}
              <div class="mt-3 flex items-center justify-between rounded-2xl border border-[#c68642]/30 bg-[#fbf6ee] px-4 py-3">
                <div>
                  <div class="text-sm font-black text-[#3c2a20]">{appliedCoupon.code}</div>
                  <div class="text-[10px] font-bold uppercase tracking-widest text-[#c68642]">{appliedCoupon.label}</div>
                </div>
                <button type="button" class="text-xs font-black uppercase tracking-widest text-rose-600 transition hover:text-rose-700" onclick={onClearCoupon}>
                  Kaldır
                </button>
              </div>
            {:else}
              <div class="mt-3 flex gap-2">
                <input
                  bind:value={couponInput}
                  type="text"
                  placeholder="Kupon kodu (KAHVE10)"
                  class="flex-1 rounded-2xl border border-[#3c2a20]/15 bg-[#fbf6ee] px-4 py-3 text-sm font-bold uppercase tracking-wider outline-none transition focus:border-[#c68642] focus:ring-2 focus:ring-[#c68642]/30"
                  onkeydown={(e) => e.key === 'Enter' && tryApplyCoupon()}
                />
                <button
                  type="button"
                  class="rounded-2xl bg-[#3c2a20] px-5 text-xs font-black uppercase tracking-widest text-white transition hover:bg-[#c68642]"
                  onclick={tryApplyCoupon}
                >
                  Uygula
                </button>
              </div>
            {/if}
          </div>

          <div class="mt-6 space-y-4 border-t border-[#3c2a20]/10 pt-6 text-sm font-medium text-[#3c2a20]/60">
            <div class="flex items-center justify-between">
              <span>Ara Toplam</span>
              <span class="font-bold text-[#3c2a20]">{subtotal} ₺</span>
            </div>
            <div class="flex items-center justify-between gap-3">
              <span class="flex items-center">
                Kargo Tutarı
                <span class="ml-3 rounded-full bg-[#fbf6ee] px-2 py-1 text-[9px] font-bold uppercase tracking-widest text-[#c68642]">
                  500₺ Üzeri Ücretsiz
                </span>
              </span>
              <span class="font-bold text-[#3c2a20]">
                {#if shippingCost === 0}
                  Ücretsiz
                {:else}
                  {shippingCost} ₺
                {/if}
              </span>
            </div>
            {#if couponDiscount > 0}
              <div class="flex items-center justify-between">
                <span>Kupon İndirimi</span>
                <span class="font-bold text-rose-600">-{couponDiscount} ₺</span>
              </div>
            {/if}
          </div>

          <div class="mt-6 flex items-center justify-between border-t border-[#3c2a20]/15 pt-6">
            <span class="text-xl font-black text-[#3c2a20]">Toplam</span>
            <span class="text-4xl font-black text-[#3c2a20]">{total} ₺</span>
          </div>

          <button
            type="button"
            class="mt-10 flex w-full items-center justify-center gap-x-3 rounded-[2rem] bg-[#3c2a20] py-6 text-lg font-bold text-white shadow-xl shadow-[#3c2a20]/10 transition hover:bg-[#2a1c14] disabled:cursor-not-allowed disabled:bg-neutral-300 disabled:shadow-none"
            onclick={handleSubmit}
            disabled={cart.length === 0}
          >
            <Icon name="lock" size={18} />
            Siparişi Onayla ve Öde
          </button>

          {#if attemptedSubmit && !formValid}
            <p class="mt-4 flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest text-rose-600">
              <Icon name="alert" size={14} />
              Lütfen tüm alanları doğru şekilde doldurun
            </p>
          {/if}
        </div>
      </div>
    </div>
  </section>
</div>
