<script>
  import { fly, fade } from 'svelte/transition';
  import Icon from './Icon.svelte';

  export let toasts = [];
</script>

<div class="pointer-events-none fixed inset-x-0 bottom-10 z-[3000] flex flex-col items-center gap-3 px-4">
  {#each toasts as toast (toast.id)}
    <div
      class="flex max-w-xl items-center gap-3 rounded-[2rem] border border-white/10 bg-[#3c2a20] px-8 py-4 text-white shadow-2xl"
      in:fly={{ y: 18, duration: 200 }}
      out:fade={{ duration: 180 }}
    >
      <Icon name="check" size={18} className="text-[#e0a96d]" />
      <span class="text-xs font-bold uppercase tracking-widest">{toast.message}</span>
    </div>
  {/each}
</div>
