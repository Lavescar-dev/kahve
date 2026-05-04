<script>
  export let name = 'sparkles';
  export let size = 24;
  export let className = '';

  const icons = {
    user: `
      <circle cx="12" cy="8" r="4"></circle>
      <path d="M4 20c1.8-3.2 4.6-4.8 8-4.8s6.2 1.6 8 4.8"></path>
    `,
    bag: `
      <path d="M6 8h12l1.2 10.6A2 2 0 0 1 17.2 21H6.8a2 2 0 0 1-2-2.4L6 8Z"></path>
      <path d="M9 8a3 3 0 0 1 6 0"></path>
    `,
    cart: `
      <circle cx="9" cy="20" r="1.25"></circle>
      <circle cx="18" cy="20" r="1.25"></circle>
      <path d="M3 4h2l2.4 10.2a1 1 0 0 0 1 .8h8.9a1 1 0 0 0 1-.8L20 7H7"></path>
    `,
    menu: `
      <path d="M4 7h16"></path>
      <path d="M7 12h13"></path>
      <path d="M4 17h16"></path>
    `,
    search: `
      <circle cx="11" cy="11" r="6"></circle>
      <path d="m20 20-3.6-3.6"></path>
    `,
    arrowRight: `
      <path d="M5 12h14"></path>
      <path d="m13 6 6 6-6 6"></path>
    `,
    plus: `
      <path d="M12 5v14"></path>
      <path d="M5 12h14"></path>
    `,
    trash: `
      <path d="M4 7h16"></path>
      <path d="M9 7V5h6v2"></path>
      <path d="M7 7l1 12h8l1-12"></path>
      <path d="M10 11v5"></path>
      <path d="M14 11v5"></path>
    `,
    box: `
      <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z"></path>
      <path d="m4 7.5 8 4.5 8-4.5"></path>
      <path d="M12 12v9"></path>
    `,
    leaf: `
      <path d="M5 13c6-9 14-8 14-8s1 10-8 14"></path>
      <path d="M7 17c1.2-3 3.8-5.6 8-8"></path>
    `,
    beaker: `
      <path d="M9 3h6"></path>
      <path d="M10 3v5l-5.6 9.1A2 2 0 0 0 6.1 20h11.8a2 2 0 0 0 1.7-2.9L14 8V3"></path>
      <path d="M8 14h8"></path>
    `,
    globe: `
      <circle cx="12" cy="12" r="9"></circle>
      <path d="M3 12h18"></path>
      <path d="M12 3a15 15 0 0 1 0 18"></path>
      <path d="M12 3a15 15 0 0 0 0 18"></path>
    `,
    close: `
      <path d="M6 6l12 12"></path>
      <path d="M18 6 6 18"></path>
    `,
    info: `
      <circle cx="12" cy="12" r="9"></circle>
      <path d="M12 10v5"></path>
      <path d="M12 7.5h.01"></path>
    `,
    check: `
      <circle cx="12" cy="12" r="9"></circle>
      <path d="m8 12 2.5 2.5L16 9"></path>
    `,
    lock: `
      <rect x="5" y="11" width="14" height="10" rx="2"></rect>
      <path d="M8 11V8a4 4 0 0 1 8 0v3"></path>
    `,
    sparkles: `
      <path d="m12 4 1.6 4.4L18 10l-4.4 1.6L12 16l-1.6-4.4L6 10l4.4-1.6L12 4Z"></path>
      <path d="m19 4 .6 1.4L21 6l-1.4.6L19 8l-.6-1.4L17 6l1.4-.6L19 4Z"></path>
      <path d="m5 15 .8 2.2L8 18l-2.2.8L5 21l-.8-2.2L2 18l2.2-.8L5 15Z"></path>
    `,
    chevronRight: `
      <path d="m9 6 6 6-6 6"></path>
    `,
    chevronLeft: `
      <path d="m15 6-6 6 6 6"></path>
    `,
    minus: `
      <path d="M5 12h14"></path>
    `,
    heart: `
      <path d="M12 20s-7-4.6-7-10.2A4.3 4.3 0 0 1 9.3 5.5C10.7 5.5 12 6.4 12 8c0-1.6 1.3-2.5 2.7-2.5A4.3 4.3 0 0 1 19 9.8C19 15.4 12 20 12 20Z"></path>
    `,
    heartFill: `
      <path d="M12 20s-7-4.6-7-10.2A4.3 4.3 0 0 1 9.3 5.5C10.7 5.5 12 6.4 12 8c0-1.6 1.3-2.5 2.7-2.5A4.3 4.3 0 0 1 19 9.8C19 15.4 12 20 12 20Z" fill="currentColor"></path>
    `,
    star: `
      <path d="m12 4 2.6 5.4 5.9.8-4.3 4 1.1 5.8L12 17.3 6.7 20l1.1-5.8-4.3-4 5.9-.8L12 4Z"></path>
    `,
    starFill: `
      <path d="m12 4 2.6 5.4 5.9.8-4.3 4 1.1 5.8L12 17.3 6.7 20l1.1-5.8-4.3-4 5.9-.8L12 4Z" fill="currentColor"></path>
    `,
    truck: `
      <rect x="3" y="7" width="11" height="9" rx="1"></rect>
      <path d="M14 10h4l3 3v3h-7"></path>
      <circle cx="7" cy="18" r="1.6"></circle>
      <circle cx="17" cy="18" r="1.6"></circle>
    `,
    shield: `
      <path d="M12 3 4 6v6c0 4.5 3.4 8.4 8 9 4.6-.6 8-4.5 8-9V6l-8-3Z"></path>
      <path d="m9 12 2 2 4-4"></path>
    `,
    refresh: `
      <path d="M3 12a9 9 0 0 1 15.5-6.3L21 8"></path>
      <path d="M21 3v5h-5"></path>
      <path d="M21 12a9 9 0 0 1-15.5 6.3L3 16"></path>
      <path d="M3 21v-5h5"></path>
    `,
    headset: `
      <path d="M4 13a8 8 0 0 1 16 0v5"></path>
      <rect x="3" y="13" width="4" height="6" rx="1.5"></rect>
      <rect x="17" y="13" width="4" height="6" rx="1.5"></rect>
      <path d="M16 19a4 4 0 0 1-4 3"></path>
    `,
    mail: `
      <rect x="3" y="5" width="18" height="14" rx="2"></rect>
      <path d="m3 7 9 6 9-6"></path>
    `,
    confetti: `
      <path d="M4 4l16 16"></path>
      <path d="M5 14 14 5"></path>
      <circle cx="7" cy="9" r="1"></circle>
      <circle cx="17" cy="14" r="1"></circle>
      <circle cx="13" cy="20" r="1"></circle>
      <circle cx="20" cy="7" r="1"></circle>
    `,
    alert: `
      <path d="M12 4 2 20h20L12 4Z"></path>
      <path d="M12 10v4"></path>
      <path d="M12 17h.01"></path>
    `,
  };

  $: markup = icons[name] ?? icons.sparkles;
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  width={size}
  height={size}
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="1.8"
  stroke-linecap="round"
  stroke-linejoin="round"
  class={className}
  aria-hidden="true"
>
  {@html markup}
</svg>
