// ───────────────────────────────────────────────────────────
// FOOTBALL EXPERIENCE · MARACANÁ — render + interactividad
// ───────────────────────────────────────────────────────────
(function () {
  const { TEAMS, MATCHES, PLAYERS, RECENT, SEASON_STATS, NEWS, TESTIMONIALS, ACCESS } = window.FE;
  const ORDER = ['flamengo', 'fluminense', 'botafogo'];
  let active = 'flamengo';
  let cdTimer = null;

  const $ = (s, r = document) => r.querySelector(s);
  const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };

  // ── Team visual pattern (stylized crest bg) ──
  function patternCSS(team) {
    if (team.pattern === 'hoops')
      return `repeating-linear-gradient(180deg, ${team.primary} 0 14px, #000 14px 28px)`;
    if (team.pattern === 'tricolor')
      return `repeating-linear-gradient(90deg, ${team.primary} 0 16px, ${team.secondary} 16px 32px, #fff 32px 40px)`;
    if (team.pattern === 'star')
      return `radial-gradient(circle at 50% 45%, #fff 0 14%, transparent 15%), #000`;
    return team.primary;
  }
  function crestStyle(team) {
    return `background:linear-gradient(135deg, ${team.primary}, ${team.secondary || team.ink || '#111'});`;
  }

  // ── Apply accent vars per team ──
  function applyAccent(team) {
    const root = document.documentElement;
    root.style.setProperty('--accent', team.primary === '#000000' ? '#ffffff' : team.primary);
    root.style.setProperty('--accent-glow', team.glow);
    root.style.setProperty('--accent-ink', team.primary === '#000000' ? '#0a0a0a' : '#fff');
  }

  // ── Stars ──
  function stars(n) {
    let s = '';
    for (let i = 0; i < 5; i++) s += `<svg width="14" height="14" viewBox="0 0 24 24" fill="${i < n ? 'var(--accent)' : 'rgba(255,255,255,0.15)'}"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z"/></svg>`;
    return s;
  }

  // ── TEAM TABS ──
  function renderTabs() {
    const c = $('#teamTabs'); c.innerHTML = '';
    ORDER.forEach(id => {
      const t = TEAMS[id];
      const tab = el('button', 'team-tab' + (id === active ? ' active' : ''));
      tab.style.setProperty('--tab-c', t.primary === '#000000' ? '#fff' : t.primary);
      tab.style.setProperty('--tab-glow', t.glow);
      tab.innerHTML = `
        <div class="tab-bg" style="background:${patternCSS(t)}"></div>
        <div class="crest" style="${crestStyle(t)}">${t.short}</div>
        <div>
          <div class="tname">${t.name}</div>
          <div class="tmeta">${t.nickname.toUpperCase()} · DESDE ${t.founded} · ${t.fans} HINCHAS</div>
        </div>
        <div class="check" style="background:${t.primary === '#000000' ? '#fff' : t.primary}">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L20 7" stroke="${t.primary === '#000000' ? '#000' : '#fff'}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </div>`;
      tab.addEventListener('click', () => { setTeam(id); document.getElementById('partidos').scrollIntoView({ behavior:'smooth' }); });
      c.appendChild(tab);
    });
  }

  // ── HERO bits ──
  function renderHero() {
    const t = TEAMS[active];
    $('#heroTeam').textContent = t.name;
    $('#heroTagText').textContent = `MARACANÃ · ${t.nickname.toUpperCase()} · TEMPORADA 2026`;
    const hs = $('#heroStats'); hs.innerHTML = '';
    const data = [
      { n: '#' + t.position, l: 'BRASILEIRÃO' },
      { n: t.record.w + 'V', l: `${t.record.w}V ${t.record.d}E ${t.record.l}D` },
      { n: t.fans, l: 'HINCHAS' },
      { n: '< 5s', l: 'ACCESO FACIAL' },
    ];
    data.forEach(d => {
      hs.appendChild(el('div', 'stat', `<div class="n">${d.n}</div><div class="l">${d.l}</div>`));
    });
  }

  // ── MATCHES ──
  function renderMatches() {
    const t = TEAMS[active];
    const list = MATCHES[active];

    // Feature = first match w/ countdown
    const f = list[0];
    const ff = $('#matchFeature'); ff.innerHTML = '';
    const feat = el('div', 'match-feature');
    feat.innerHTML = `
      <div class="mf-left">
        <div class="mf-bg" style="background:${patternCSS(t)}"></div>
        <div class="eyebrow">${f.tag} · ${f.comp}</div>
        <div class="mf-vs">
          <div class="mf-crest" style="${crestStyle(t)}">${t.short}</div>
          <div class="mf-x">×</div>
          <div class="mf-crest" style="background:linear-gradient(135deg,#2a2a2e,#151517)">${f.oppShort}</div>
          <div style="margin-left:6px">
            <div class="mf-teamname">${t.name}</div>
            <div class="mf-teamname" style="color:var(--ink-dim)">${f.opp}</div>
          </div>
        </div>
        <div class="mono" style="font-size:12px;color:var(--ink-dim);letter-spacing:0.08em">${f.day} · ${f.time} · ${f.round}</div>
      </div>
      <div class="mf-right">
        <div class="eyebrow">Faltan para el saque</div>
        <div class="countdown" id="cd"></div>
        <a href="#" class="btn-primary" style="justify-content:center" data-buy="${f.opp}">Comprar · desde R$ ${f.from}</a>
      </div>`;
    ff.appendChild(feat);
    startCountdown(f.date);

    // Rest
    const ml = $('#matchList'); ml.innerHTML = '';
    list.slice(1).forEach(m => {
      const dm = (m.demand === 'muy alta') ? 'muyalta' : m.demand;
      const row = el('div', 'match-row');
      row.innerHTML = `
        <div class="mr-date"><div class="d">${m.day.split(' ').slice(0,2).join(' ')}</div><div class="t">${m.time}</div></div>
        <div class="mr-teams"><div class="vs">${t.short} × ${m.oppShort}</div><div class="cmp">${m.comp} · ${m.round}</div></div>
        <div class="demand ${dm}">${m.demand.toUpperCase()}</div>
        <a href="#" class="mr-buy" data-buy="${m.opp}">Desde R$ ${m.from}</a>`;
      ml.appendChild(row);
    });

    ff.querySelectorAll('[data-buy]').forEach(b => b.addEventListener('click', buyHandler));
    ml.querySelectorAll('[data-buy]').forEach(b => b.addEventListener('click', buyHandler));
  }

  function buyHandler(e) {
    e.preventDefault();
    const opp = e.currentTarget.getAttribute('data-buy');
    const t = TEAMS[active];
    const btn = e.currentTarget;
    const orig = btn.textContent;
    btn.textContent = '✓ ' + t.short + ' × ' + (opp.length > 10 ? opp.slice(0,9)+'…' : opp);
    btn.style.background = 'var(--accent)';
    btn.style.color = 'var(--accent-ink)';
    setTimeout(() => { btn.textContent = orig; btn.style.background = ''; btn.style.color = ''; }, 1600);
  }

  function startCountdown(dateStr) {
    if (cdTimer) clearInterval(cdTimer);
    const target = new Date(dateStr).getTime();
    const cd = $('#cd');
    const tick = () => {
      const now = Date.now();
      let diff = Math.max(0, target - now);
      const d = Math.floor(diff / 86400000); diff -= d * 86400000;
      const h = Math.floor(diff / 3600000); diff -= h * 3600000;
      const m = Math.floor(diff / 60000); diff -= m * 60000;
      const s = Math.floor(diff / 1000);
      const boxes = [['DÍAS', d], ['HORAS', h], ['MIN', m], ['SEG', s]];
      if (!cd) return;
      cd.innerHTML = boxes.map(([l, v]) => `<div class="cd-box"><div class="cd-n">${String(v).padStart(2,'0')}</div><div class="cd-l">${l}</div></div>`).join('');
    };
    tick();
    cdTimer = setInterval(tick, 1000);
  }

  // ── PLAYERS + STATS ──
  function renderSquad() {
    const t = TEAMS[active];
    const p = $('#players'); p.innerHTML = '';
    PLAYERS[active].forEach(pl => {
      const card = el('div', 'player');
      card.innerHTML = `
        <div class="pimg" style="background:linear-gradient(160deg, ${t.primary}33, #0a0a0a 75%)">
          <div class="pnum">${pl.num}</div>
          <div class="pfig"></div>
        </div>
        <div class="pbody">
          <div class="pn">${pl.name}</div>
          <div class="pp">${pl.pos}</div>
          <div class="pstats">
            <div class="pstat"><div class="v">${pl.goals}</div><div class="k">GOLES</div></div>
            <div class="pstat"><div class="v">${pl.assists}</div><div class="k">ASIST</div></div>
            <div class="pstat"><div class="v">${pl.rating}</div><div class="k">RATING</div></div>
          </div>
        </div>`;
      p.appendChild(card);
    });

    // Recent results
    const rc = $('#recent'); rc.innerHTML = '';
    RECENT[active].forEach(r => {
      const c = el('div', 'rc');
      const col = r.result === 'W' ? '#46e08a' : r.result === 'L' ? '#ff8080' : 'var(--ink-dim)';
      c.innerHTML = `<div class="score" style="color:${col}">${r.us}–${r.them}</div><div class="vs">vs ${r.opp}</div><div class="cmp">${r.comp}</div>`;
      rc.appendChild(c);
    });

    // Stats panel
    const sp = $('#statsPanel'); sp.innerHTML = '';
    sp.appendChild(el('div', 'eyebrow', 'Temporada 2026'));
    SEASON_STATS[active].forEach(s => {
      sp.appendChild(el('div', 'stat-line', `<div class="sl-l">${s.label}</div><div class="sl-v">${s.value}</div>`));
    });
    const formWrap = el('div');
    formWrap.style.marginTop = '16px';
    formWrap.innerHTML = `<div class="sl-l" style="font-size:13px;color:var(--ink-dim)">Forma reciente</div>`;
    const fr = el('div', 'form-row');
    t.form.forEach(f => fr.appendChild(el('div', 'form-pill ' + f, f)));
    formWrap.appendChild(fr);
    sp.appendChild(formWrap);
  }

  // ── HUB TABS ──
  const HUB_TABS = [
    { id:'plantel', label:'Plantel', ic:'<circle cx="9" cy="8" r="3" stroke="currentColor" stroke-width="1.7"/><path d="M4 19a5 5 0 0 1 10 0M15 6a3 3 0 0 1 0 6M17 19a4 4 0 0 0-3-3.9" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>' },
    { id:'partidos', label:'Próximos de local', ic:'<rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" stroke-width="1.7"/><path d="M3 9h18M8 3v4M16 3v4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>' },
    { id:'tabla', label:'Tabla & campeonatos', ic:'<path d="M4 20V10M10 20V4M16 20v-7M22 20H2" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>' },
    { id:'historia', label:'Históricas', ic:'<path d="M8 21h8M12 17v4M6 4h12v6a6 6 0 0 1-12 0V4zM4 5H2v2a3 3 0 0 0 3 3M20 5h2v2a3 3 0 0 1-3 3" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>' },
    { id:'jugadas', label:'Jugadas destacadas', ic:'<circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.7"/><path d="M10 9l5 3-5 3V9z" fill="currentColor"/>' },
  ];
  let activePanel = 'plantel';
  function renderHubBar() {
    const bar = $('#hubBar'); bar.innerHTML = '';
    HUB_TABS.forEach(tb => {
      const b = el('button', 'hub-tab' + (tb.id === activePanel ? ' active' : ''));
      b.innerHTML = `<span class="ht-ic"><svg width="16" height="16" viewBox="0 0 24 24" fill="none">${tb.ic}</svg></span>${tb.label}`;
      b.addEventListener('click', () => setPanel(tb.id));
      bar.appendChild(b);
    });
  }
  function setPanel(id) {
    activePanel = id;
    renderHubBar();
    document.querySelectorAll('.hub-panel').forEach(p => p.classList.toggle('active', p.getAttribute('data-panel') === id));
  }

  // ── TABLA & CAMPEONATOS ──
  function renderStandings() {
    const tbl = $('#standings'); tbl.innerHTML = '';
    STANDINGS.forEach(r => {
      const isTeam = r.id === active;
      const tr = el('tr', isTeam ? 'is-team' : '');
      let crestBg = 'linear-gradient(135deg,#2a2a2e,#151517)';
      if (r.id) { const tm = TEAMS[r.id]; crestBg = `linear-gradient(135deg, ${tm.primary}, ${tm.secondary || tm.ink || '#111'})`; }
      tr.innerHTML = `
        <td class="st-pos">${r.pos}</td>
        <td class="st-team"><span class="st-crest" style="background:${crestBg}">${r.short}</span>${r.team}</td>
        <td class="st-dg">${r.pj} PJ</td>
        <td class="st-dg">${r.dg}</td>
        <td class="st-pts">${r.pts}</td>`;
      tbl.appendChild(tr);
    });
  }
  const COMP_ICONS = {
    shield: '<path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>',
    cup: '<path d="M8 4h8v4a4 4 0 0 1-8 0V4zM6 5H4v1a3 3 0 0 0 3 3M18 5h2v1a3 3 0 0 1-3 3M9 20h6M12 13v7" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>',
  };
  function renderCompetitions() {
    const c = $('#competitions'); c.innerHTML = '';
    COMPETITIONS[active].forEach(comp => {
      const card = el('div', 'comp-card');
      card.innerHTML = `
        <div class="comp-ic"><svg width="20" height="20" viewBox="0 0 24 24" fill="none">${COMP_ICONS[comp.icon]}</svg></div>
        <div><div class="cc-n">${comp.name}</div><div class="cc-p">${comp.phase}</div></div>
        <div class="cc-status${comp.live ? ' live' : ''}">${comp.status}</div>`;
      c.appendChild(card);
    });
  }

  // ── HISTÓRICAS ──
  function renderHistStats() {
    const t = TEAMS[active];
    const c = $('#histStats'); c.innerHTML = '';
    HISTORY_STATS[active].forEach(s => {
      const card = el('div', 'hist-stat');
      card.innerHTML = `<div class="hs-bg" style="background:${patternCSS(t)}"></div><div class="n">${s.n}</div><div class="l">${s.l}</div>`;
      c.appendChild(card);
    });
  }

  // ── JUGADAS DESTACADAS ──
  function renderHighlights() {
    const t = TEAMS[active];
    const c = $('#highlights'); c.innerHTML = '';
    HIGHLIGHTS[active].forEach(h => {
      const card = el('div', 'hl-card');
      card.innerHTML = `
        <div class="hl-thumb" style="background:linear-gradient(150deg, ${t.primary}55, #0a0a0a 80%)">
          <div style="position:absolute;inset:0;opacity:0.12;background:${patternCSS(t)}"></div>
          <div class="hl-tag">${h.tag}</div>
          <div class="hl-play"><svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><path d="M8 5v14l11-7z"/></svg></div>
          <div class="hl-dur">${h.dur}</div>
        </div>
        <div class="hl-body"><div class="t">${h.title}</div><div class="s">${h.sub}</div></div>`;
      c.appendChild(card);
    });
  }

  // ── EXPERIENCIA (global, una vez) ──
  const EXP_ICONS = {
    ticket: '<path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4z" stroke="currentColor" stroke-width="1.7"/><path d="M14 6v12" stroke="currentColor" stroke-width="1.7" stroke-dasharray="2 2"/>',
    face: '<circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.7"/><circle cx="9" cy="10" r="1" fill="currentColor"/><circle cx="15" cy="10" r="1" fill="currentColor"/><path d="M9 15c1 1 5 1 6 0" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>',
    bus: '<rect x="4" y="4" width="16" height="13" rx="2" stroke="currentColor" stroke-width="1.7"/><path d="M4 11h16M7 21v-2M17 21v-2" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>',
    star: '<path d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.8 6.8 19.2l1-5.8L3.5 9.2l5.9-.9L12 3z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>',
  };
  function renderExpSteps() {
    const c = $('#expSteps'); if (!c) return; c.innerHTML = '';
    EXPERIENCE_STEPS.forEach((s, i) => {
      const card = el('div', 'exp-step reveal');
      card.innerHTML = `
        <div class="es-n">PASO ${s.n}</div>
        <div class="es-ic"><svg width="24" height="24" viewBox="0 0 24 24" fill="none">${EXP_ICONS[s.icon]}</svg></div>
        <h4>${s.title}</h4>
        <p>${s.text}</p>
        ${i < EXPERIENCE_STEPS.length - 1 ? '<div class="es-arrow"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></div>' : ''}`;
      c.appendChild(card);
    });
  }

  // ── MAPA DEL ESTADIO (global) ──
  let activeSector = SECTORS[0].id;
  function renderSectorZones() {
    const c = $('#sectorZones'); if (!c) return; c.innerHTML = '';
    SECTORS.forEach(s => {
      const z = el('button', 'zone' + (s.id === activeSector ? ' active' : ''));
      z.style.left = s.x + '%'; z.style.top = s.y + '%';
      z.style.width = s.w + '%'; z.style.height = s.h + '%';
      z.textContent = s.name.split(' ')[0].toUpperCase();
      z.addEventListener('click', () => { activeSector = s.id; renderSectorZones(); renderSectorInfo(); });
      c.appendChild(z);
    });
  }
  function renderSectorInfo() {
    const c = $('#sectorInfo'); if (!c) return;
    const s = SECTORS.find(x => x.id === activeSector);
    c.innerHTML = `
      <span class="si-vibe">${s.vibe.toUpperCase()}</span>
      <h3>${s.name}</h3>
      <p>${s.desc}</p>
      <div class="si-price"><div><div class="pl">DESDE</div><div class="pv">R$ ${s.price}</div></div></div>
      <a href="#reservar" class="si-buy" style="display:block;text-align:center;text-decoration:none">Reservar este sector</a>`;
  }

  // ── TIMELINE HISTORIA (global) ──
  function renderTimeline() {
    const c = $('#timeline'); if (!c) return; c.innerHTML = '';
    STADIUM_HISTORY.forEach(h => {
      const item = el('div', 'tl-item reveal');
      item.innerHTML = `<div class="tl-year">${h.year}</div><div class="tl-t">${h.title}</div><div class="tl-x">${h.text}</div>`;
      c.appendChild(item);
    });
  }

  // ── NEWS ──
  function renderNews() {
    const t = TEAMS[active];
    $('#newsTitle').textContent = `Noticias · ${t.name}`;
    const n = $('#news'); n.innerHTML = '';
    NEWS[active].forEach((item, i) => {
      const lead = item.kind === 'destacada';
      const card = el('article', 'news-card' + (lead ? ' lead' : ''));
      if (lead) card.style.gridRow = 'span 1';
      card.innerHTML = `
        <div class="nc-img" style="background:linear-gradient(135deg, ${t.primary}40, #0a0a0a 80%)">
          <div style="position:absolute;inset:0;opacity:0.14;background:${patternCSS(t)}"></div>
        </div>
        <div class="nc-body">
          <div class="nc-tag">${item.tag}</div>
          <div class="nc-title">${item.title}</div>
          <div class="nc-time">${item.time}</div>
        </div>`;
      n.appendChild(card);
    });
  }

  // ── TESTIMONIALS (all teams, but reorder active first) ──
  function renderTestimonials() {
    const c = $('#testimonials'); c.innerHTML = '';
    const sorted = [...TESTIMONIALS].sort((a, b) => (a.team === active ? -1 : 0) - (b.team === active ? -1 : 0));
    sorted.forEach(t => {
      const team = TEAMS[t.team];
      const card = el('div', 'test');
      card.innerHTML = `
        <div class="stars">${stars(t.rating)}</div>
        <div class="quote">“${t.text}”</div>
        <div class="who">
          <div class="avatar" style="${crestStyle(team)}">${t.name[0]}</div>
          <div><div class="n">${t.name}</div><div class="e">${t.exp}</div></div>
        </div>`;
      c.appendChild(card);
    });
  }

  // ── ACCESS ──
  const ACC_ICONS = {
    wheelchair: '<circle cx="9" cy="4" r="2" stroke="currentColor" stroke-width="1.8"/><path d="M9 6v6h6l3 6M9 12a5 5 0 1 0 4 8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>',
    ear: '<path d="M7 8a5 5 0 0 1 10 0c0 3-3 4-3 7a3 3 0 0 1-6 0M9 8a3 3 0 0 1 6 0" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
    eye: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.8"/>',
    bus: '<rect x="4" y="4" width="16" height="13" rx="2" stroke="currentColor" stroke-width="1.8"/><path d="M4 11h16M7 21v-2M17 21v-2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><circle cx="8" cy="17" r="1" fill="currentColor"/><circle cx="16" cy="17" r="1" fill="currentColor"/>',
  };
  function renderAccess() {
    const c = $('#access'); c.innerHTML = '';
    ACCESS.forEach(a => {
      const card = el('div', 'acc reveal');
      card.innerHTML = `
        <div class="ic"><svg width="22" height="22" viewBox="0 0 24 24" fill="none">${ACC_ICONS[a.icon]}</svg></div>
        <h4>${a.title}</h4>
        <p>${a.text}</p>`;
      c.appendChild(card);
    });
    observeReveals();
  }

  // ── CTA / hero accent surfaces ──
  function renderAccentSurfaces() {
    const t = TEAMS[active];
    $('#ctaTeam').textContent = 'Maracanã';
    $('#heroDot').style.background = t.primary === '#000000' ? '#fff' : t.primary;
  }

  // ── set team (master) ──
  function setTeam(id) {
    active = id;
    applyAccent(TEAMS[id]);
    renderTabs();
    renderHero();
    renderMatches();
    renderSquad();
    renderStandings();
    renderCompetitions();
    renderHistStats();
    renderHighlights();
    renderNews();
    renderTestimonials();
    renderAccentSurfaces();
    observeReveals();
  }

  // ── reveal on scroll ──
  let io;
  function observeReveals() {
    if (!io) {
      io = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
      }, { threshold: 0.12 });
    }
    document.querySelectorAll('.reveal:not(.in)').forEach(r => io.observe(r));
  }

  // ── nav scroll state ──
  function initNav() {
    const nav = $('#nav');
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ── a11y reduce motion ──
  function initA11y() {
    const btn = $('#a11yToggle');
    let reduced = false;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      reduced = true; document.body.classList.add('no-motion');
    }
    const sync = () => { btn.style.borderColor = reduced ? 'var(--ink)' : ''; btn.style.color = reduced ? 'var(--ink)' : ''; };
    sync();
    btn.addEventListener('click', () => {
      reduced = !reduced;
      document.body.classList.toggle('no-motion', reduced);
      sync();
    });
  }

  // ── INIT ──
  function init() {
    renderHubBar();
    setPanel('plantel');
    renderExpSteps();
    renderSectorZones();
    renderSectorInfo();
    renderTimeline();
    renderAccess();
    setTeam('flamengo');
    initNav();
    initA11y();
    observeReveals();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
