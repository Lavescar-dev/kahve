<script>
  import Icon from './Icon.svelte';
  import { fallbackSvg } from '../data/menu.js';

  export let open = false;
  export let cart = [];
  export let subtotal = 0;
  export let onClose = () => {};
  export let onRemove = () => {};
  export let onIncrement = () => {};
  export let onDecrement = () => {};
  export let onCheckout = () => {};
  export let onContinueShopping = () => {};

  function handleImageError(event) {
    event.currentTarget.onerror = null;
    event.currentTarget.src = fallbackSvg;
  }
</script>

{#if open}
  <div
    class="fixed inset-0 z-[1000] flex items-end justify-center bg-black/80 p-4 backdrop-blur-sm md:items-center md:p-0"
    role="button"
    tabindex="0"
    aria-label="Sepeti kapat"
    onclick={(event) => event.currentTarget === event.target && onClose()}
    onkeydown={(event) => {
      if (event.key === "Escape" || event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        onClose();
      }
    }}
  >
    <div class="flex max-h-[90vh] w-full max-w-md flex-col overflow-hidden rounded-3xl bg-white shadow-2xl md:rounded-[2.5rem]">
      <div class="flex items-center justify-between border-b border-[#3c2a20]/10 p-8">
        <h3 class="text-2xl font-bold tracking-tighter text-[#3c2a20]">Sepetim</h3>
        <button type="button" class="leading-none text-[#3c2a20]/40 transition hover:text-[#3c2a20]" onclick={onClose}>
          <Icon name="close" size={30} />
        </button>
      </div>

      <div class="min-h-[300px] flex-1 overflow-y-auto p-8">
        {#if cart.length === 0}
          <div class="flex h-full flex-col items-center justify-center py-12 text-center">
            <div class="mb-6 inline-flex rounded-full bg-[#f5e6d3] p-6 text-[#3c2a20]/30">
              <Icon name="cart" size={42} />
            </div>
            <p class="mb-2 text-lg font-bold tracking-tight text-[#3c2a20]">
              Sepetiniz şu an boş
            </p>
            <p class="mb-8 max-w-xs text-sm font-medium text-[#3c2a20]/60">
              Doğal kahve koleksiyonumuzu inceleyin, sevdiğiniz ürünleri sepete ekleyin.
            </p>
            <button
              type="button"
              class="rounded-[2rem] bg-[#3c2a20] px-8 py-4 text-sm font-bold uppercase tracking-widest text-white shadow-lg shadow-[#3c2a20]/10 transition hover:bg-[#2a1c14]"
              onclick={onContinueShopping}
            >
              Mağazaya Git
            </button>
          </div>
        {:else}
          {#each cart as item, index (item.id)}
            <div class="mb-6 flex items-center gap-4 border-b border-[#3c2a20]/10 pb-6">
              <img
                src={item.image}
                alt={item.name}
                class="h-20 w-20 rounded-2xl border border-[#3c2a20]/10 object-cover shadow-sm"
                onerror={handleImageError}
              />
              <div class="flex flex-1 flex-col gap-2">
                <h4 class="line-clamp-1 text-sm font-bold text-[#3c2a20]">{item.name}</h4>
                <div class="flex items-center justify-between gap-2">
                  <div class="flex items-center gap-1 rounded-full border border-[#3c2a20]/15 bg-[#fbf6ee] p-1">
                    <button
                      type="button"
                      class="flex h-7 w-7 items-center justify-center rounded-full text-[#3c2a20]/80 transition hover:bg-white hover:text-[#c68642]"
                      aria-label="Adet azalt"
                      onclick={() => onDecrement(index)}
                    >
                      <Icon name="minus" size={12} />
                    </button>
                    <span class="min-w-[24px] text-center text-xs font-black text-[#3c2a20]">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      class="flex h-7 w-7 items-center justify-center rounded-full text-[#3c2a20]/80 transition hover:bg-white hover:text-[#c68642]"
                      aria-label="Adet artır"
                      onclick={() => onIncrement(index)}
                    >
                      <Icon name="plus" size={12} />
                    </button>
                  </div>
                  <span class="text-sm font-black text-[#3c2a20]">
                    {item.price * item.quantity} ₺
                  </span>
                </div>
              </div>
              <button
                type="button"
                class="flex h-8 w-8 items-center justify-center rounded-full bg-red-50 text-red-500 transition hover:bg-red-500 hover:text-white"
                aria-label={`${item.name} ürününü sepetten çıkar`}
                onclick={() => onRemove(index)}
              >
                <Icon name="trash" size={14} />
              </button>
            </div>
          {/each}
        {/if}
      </div>

      {#if cart.length > 0}
        <div class="border-t border-[#3c2a20]/10 bg-[#fbf6ee]/50 p-8">
          <div class="mb-8 flex justify-between text-2xl font-black text-[#3c2a20]">
            <span>Toplam</span>
            <span>{subtotal} ₺</span>
          </div>
          <button
            type="button"
            class="w-full rounded-[2rem] bg-[#3c2a20] py-6 font-bold text-white shadow-lg shadow-[#3c2a20]/10 transition hover:bg-[#2a1c14]"
            onclick={onCheckout}
          >
            Ödemeye Geç
          </button>
        </div>
      {/if}
    </div>
  </div>
{/if}
