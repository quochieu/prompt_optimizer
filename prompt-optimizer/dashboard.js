document.addEventListener('DOMContentLoaded', () => {
  // Sidebar navigation wiring: proxy to existing tab system when needed
  const sideBtns = Array.from(document.querySelectorAll('.side-nav .nav-btn'));
  const setActiveSide = (btn) => sideBtns.forEach(b => b.classList.toggle('active', b === btn));

  sideBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const view = btn.getAttribute('data-view');
      const scrollSel = btn.getAttribute('data-scroll');
      if (view) {
        const tabBtn = document.querySelector(`nav.tabs .tab[data-view="${view}"]`);
        if (tabBtn) tabBtn.click();
        const targetView = document.getElementById(`view-${view}`);
        if (targetView) targetView.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else if (scrollSel) {
        const target = document.querySelector(scrollSel);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      setActiveSide(btn);
    });
  });

  // Quick Actions
  document.querySelectorAll('[data-scroll]').forEach(el => {
    el.addEventListener('click', () => {
      const sel = el.getAttribute('data-scroll');
      if (sel === '#frontend-board') {
        const toggle = document.getElementById('enable-frontend-builder');
        if (toggle && !toggle.checked) {
          toggle.checked = true;
          toggle.dispatchEvent(new Event('change'));
        }
      }
      const target = document.querySelector(sel);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
  const qaEval = document.getElementById('qa-generate-eval');
  if (qaEval) qaEval.addEventListener('click', () => document.getElementById('generate-eval')?.click());

  // Theme toggle (placeholder)
  document.getElementById('theme-toggle')?.addEventListener('click', () => {
    const root = document.documentElement;
    root.dataset.theme = root.dataset.theme === 'light' ? 'dark' : 'light';
  });

  // Stats: Documents
  const docsEl = document.getElementById('stat-docs');
  const docsSub = document.getElementById('stat-docs-sub');
  fetch('../documents.json')
    .then(r => r.json())
    .then(list => {
      if (!Array.isArray(list)) return;
      docsEl && (docsEl.textContent = String(list.length));
      const byOrg = list.reduce((acc, d) => { acc[d.org] = (acc[d.org]||0)+1; return acc; }, {});
      const parts = Object.entries(byOrg).map(([k,v]) => `${k} ${v}`);
      docsSub && (docsSub.textContent = parts.join(' • '));
    })
    .catch(() => { if (docsSub) docsSub.textContent = '—'; });

  // Stats: Last Action
  const lastEl = document.getElementById('stat-last');
  const tagLast = (label) => { if (lastEl) lastEl.textContent = `${label}`; };
  const tagFromClick = (sel, label) => document.getElementById(sel)?.addEventListener('click', () => tagLast(label));
  tagFromClick('improve', 'Improved');
  tagFromClick('copy', 'Copied');
  tagFromClick('download', 'Downloaded');
  tagFromClick('fe-generate', 'Frontend Generated');
  tagFromClick('fe-copy', 'Frontend Copied');
  tagFromClick('fe-download', 'Frontend Downloaded');
});
