<script>
  import Icon from './Icon.svelte';

  export let open = false;
  export let currentUser = '';
  export let onClose = () => {};
  export let onLogin = () => {};
  export let onLogout = () => {};

  let name = '';

  $: if (!open) {
    name = '';
  }

  function submitLogin() {
    const trimmed = name.trim();
    if (!trimmed) return;
    onLogin(trimmed);
  }
</script>

{#if open}
  <div
    class="fixed inset-0 z-[1001] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
    role="button"
    tabindex="0"
    aria-label="Modalı kapat"
    onclick={(event) => event.currentTarget === event.target && onClose()}
    onkeydown={(event) => {
      if (event.key === "Escape" || event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        onClose();
      }
    }}
  >
    <div class="modal-pop w-full max-w-md overflow-hidden rounded-[2.5rem] bg-white p-12 text-center shadow-2xl">
      {#if !currentUser}
        <div>
          <h2 class="mb-2 text-3xl font-bold tracking-tighter text-[#3c2a20]">Hoş Geldiniz</h2>
          <p class="mb-10 text-sm font-medium text-[#3c2a20]/60">
            Hesabınıza giriş yaparak size özel fırsatları keşfedin.
          </p>
          <input
            bind:value={name}
            type="text"
            placeholder="İsminiz"
            class="mb-6 w-full rounded-2xl border border-[#3c2a20]/15 bg-[#fbf6ee] px-6 py-4 font-bold text-[#3c2a20] outline-none ring-0 transition focus:border-[#c68642] focus:ring-2 focus:ring-[#c68642]/30"
            onkeydown={(event) => event.key === 'Enter' && submitLogin()}
          />
          <button
            type="button"
            class="w-full rounded-[2rem] bg-[#3c2a20] py-5 font-bold text-white shadow-lg shadow-[#3c2a20]/10 transition hover:bg-[#2a1c14]"
            onclick={submitLogin}
          >
            Devam Et
          </button>
        </div>
      {:else}
        <div>
          <div class="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full border border-[#3c2a20]/10 bg-[#fbf6ee] text-4xl font-bold text-[#3c2a20]">
            {currentUser[0]?.toUpperCase()}
          </div>
          <h2 class="mb-2 text-3xl font-bold tracking-tighter text-[#3c2a20]">{currentUser}</h2>
          <p class="mb-10 text-xs font-black uppercase tracking-widest text-[#c68642]">
            Premium Üye
          </p>

          <div class="space-y-4 text-left">
            <div class="flex cursor-pointer items-center gap-x-4 rounded-2xl border border-[#3c2a20]/10 p-5 shadow-sm transition hover:bg-[#fbf6ee]">
              <Icon name="box" size={20} className="text-[#c68642]" />
              <span class="text-sm font-bold text-[#3c2a20]">Siparişlerim</span>
            </div>
          </div>

          <button
            type="button"
            class="mt-12 w-full rounded-[2rem] border border-red-50 py-4 text-xs font-bold uppercase tracking-widest text-red-500 transition hover:bg-red-50"
            onclick={onLogout}
          >
            Çıkış Yap
          </button>
        </div>
      {/if}
    </div>
  </div>
{/if}
