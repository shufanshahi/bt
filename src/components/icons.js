export const icon = (name, cls = "") => {
  const paths = {
    play: '<path d="m9 5 11 7-11 7V5Z"/>',
    video:
      '<rect x="2" y="5" width="14" height="14" rx="1"/><path d="m16 9 6-3v12l-6-3"/>',
    share:
      '<circle cx="18" cy="4" r="3"/><circle cx="5" cy="12" r="3"/><circle cx="18" cy="20" r="3"/><path d="m8 10 7-4m-7 8 7 4"/>',
    users:
      '<circle cx="9" cy="7" r="3"/><path d="M2 20v-3a7 7 0 0 1 14 0v3H2Zm15-16a3 3 0 0 1 0 6m2 3a6 6 0 0 1 3 6"/>',
    folder: '<path d="M2 5h8l2 3h10v13H2V5Z"/><path d="M6 12h11m-11 4h7"/>',
    certificate:
      '<path d="M3 7h18v15H3zM9 7V3h6v4"/><circle cx="12" cy="12" r="2"/><path d="m10 14-1 5 3-2 3 2-1-5"/>',
    filter: '<path d="M3 3h18l-7 9v8l-4 2V12L3 3Z"/>',
    sort: '<path d="M3 5h18M3 11h12M3 17h6"/>',
    chevron: '<path d="m8 4 8 8-8 8"/>',
    check: '<path d="m4 12 5 5L20 6"/>',

    search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4 4"/>',
    bag: '<path d="M5 7h14l1 14H4L5 7Z"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/>',
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    design:
      '<path d="m4 4 16 16-3 3L1 7l3-3Zm1 11 10-10 4 4L9 19l-5 1 1-5ZM12 5l3-3 7 7-3 3"/>',
    code: '<path d="m8 8-4 4 4 4m8-8 4 4-4 4M14 5l-4 14M5 2h14M5 22h14"/>',
    laptop:
      '<rect x="4" y="4" width="16" height="13" rx="1"/><path d="M1 20h22M9 17v3m6-3v3"/>',
    business:
      '<path d="M3 22V3h11v19m0-15h7v15M1 22h22M6 7h1m3 0h1M6 11h1m3 0h1M6 15h1m3 0h1M6 19h1m3 0h1m6-8h1m-1 4h1m-1 4h1"/>',
    marketing:
      '<path d="m3 10 13-5v14L3 14v-4Zm3 5 2 6h4l-2-5m9-8 3-2m-3 7h4m-4 4 3 2M8 2v3M2 4l3 3"/>',
    photo:
      '<rect x="2" y="5" width="20" height="16" rx="2"/><path d="m8 5 2-3h4l2 3"/><circle cx="12" cy="13" r="4"/>',
    bars: '<path d="M5 18v-4m5 4v-7m5 7V8m5 10V4"/>',
    eye: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>',
  };
  return `<svg class="icon ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.code}</svg>`;
};
