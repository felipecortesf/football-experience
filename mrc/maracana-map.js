// ════════════════════════════════════════════════════════════
// MRC Maracanã — Mapa SVG de sectores reutilizable (vista aérea)
// Uso:
//   MRCMap.render(container, {
//     match,                 // opcional: objeto partido con sectors[]
//     selected: 'norte',     // sector id seleccionado
//     onSelect: (id)=>{},    // callback al click
//     showPrices: true       // muestra precio en el tooltip/leyenda
//   });
// Anillo elíptico de 4 tribunas (Leste, Oeste, Norte, Sul) + premium.
// ════════════════════════════════════════════════════════════
window.MRCMap = (function () {
  const { SECTOR_DEFS, sectorDef, fmt } = window.MRC;

  // geometría de cada sector como path SVG sobre un viewBox 0 0 400 480
  // estadio: elipse exterior rx190 ry230, interior (campo) rx70 ry110
  const PATHS = {
    'leste-inferior': 'M 200 40 A 175 215 0 0 1 372 235 L 285 235 A 90 130 0 0 0 200 120 Z',
    'leste-superior': 'M 200 14 A 200 240 0 0 1 398 235 L 372 235 A 175 215 0 0 0 200 40 Z',
    'oeste':          'M 200 440 A 175 215 0 0 1 28 245 L 115 245 A 90 130 0 0 0 200 360 Z',
    'norte':          'M 372 235 A 175 215 0 0 1 200 440 L 200 360 A 90 130 0 0 0 285 245 Z M 285 235 L 372 235 A 175 215 0 0 0 200 40 Z',
    // simplified: build per-quadrant below instead
  };

  // Quadrant-based ring (cleaner): 4 arcs of the elliptical ring
  function ringSector(startDeg, endDeg, rOut, rIn, cx = 200, cy = 240, rxO = 184, ryO = 222, rxI = 92, ryI = 130) {
    const pt = (deg, rx, ry) => {
      const a = (deg - 90) * Math.PI / 180;
      return [cx + rx * Math.cos(a), cy + ry * Math.sin(a)];
    };
    const [x1, y1] = pt(startDeg, rxO, ryO);
    const [x2, y2] = pt(endDeg, rxO, ryO);
    const [x3, y3] = pt(endDeg, rxI, ryI);
    const [x4, y4] = pt(startDeg, rxI, ryI);
    const large = (endDeg - startDeg) > 180 ? 1 : 0;
    return `M ${x1.toFixed(1)} ${y1.toFixed(1)} A ${rxO} ${ryO} 0 ${large} 1 ${x2.toFixed(1)} ${y2.toFixed(1)} L ${x3.toFixed(1)} ${y3.toFixed(1)} A ${rxI} ${ryI} 0 ${large} 0 ${x4.toFixed(1)} ${y4.toFixed(1)} Z`;
  }

  // sector angular ranges (deg, clockwise from top)
  const RANGES = {
    'leste-superior': [38, 142],   // right side outer (split inf/sup by radius — we approximate as one band each side)
    'leste-inferior': [38, 142],
    'norte':          [142, 218],  // bottom
    'oeste':          [218, 322],  // left side
    'sul':            [-38, 38],   // top  (322..38)
  };

  function labelPos(startDeg, endDeg, cx = 200, cy = 240, rx = 150, ry = 182) {
    const mid = (startDeg + endDeg) / 2;
    const a = (mid - 90) * Math.PI / 180;
    return [cx + rx * Math.cos(a), cy + ry * Math.sin(a)];
  }

  function render(container, opts = {}) {
    const { match, selected, onSelect, showPrices = true } = opts;
    const priceFor = (id) => {
      if (!match) { const d = sectorDef(id); return d ? d.defaultPrice : null; }
      const s = match.sectors.find(x => x.id === id);
      return s ? s.price : null;
    };
    const availFor = (id) => {
      if (!match) return true;
      const s = match.sectors.find(x => x.id === id);
      return s ? s.available : false;
    };

    // Build two side bands (leste superior/inferior) by radius split on the right.
    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('viewBox', '0 0 400 480');
    svg.setAttribute('class', 'mrc-map-svg');
    svg.style.width = '100%';
    svg.style.height = 'auto';
    svg.style.display = 'block';

    // pitch
    const pitch = document.createElementNS(svgNS, 'ellipse');
    pitch.setAttribute('cx', 200); pitch.setAttribute('cy', 240);
    pitch.setAttribute('rx', 84); pitch.setAttribute('ry', 122);
    pitch.setAttribute('fill', '#0c3a1e');
    pitch.setAttribute('stroke', 'rgba(255,255,255,0.35)');
    pitch.setAttribute('stroke-width', '1.5');
    svg.appendChild(pitch);
    // halfway line
    const half = document.createElementNS(svgNS, 'line');
    half.setAttribute('x1', 116); half.setAttribute('y1', 240); half.setAttribute('x2', 284); half.setAttribute('y2', 240);
    half.setAttribute('stroke', 'rgba(255,255,255,0.3)'); half.setAttribute('stroke-width', '1');
    svg.appendChild(half);
    const circle = document.createElementNS(svgNS, 'circle');
    circle.setAttribute('cx', 200); circle.setAttribute('cy', 240); circle.setAttribute('r', 20);
    circle.setAttribute('fill', 'none'); circle.setAttribute('stroke', 'rgba(255,255,255,0.3)'); circle.setAttribute('stroke-width', '1');
    svg.appendChild(circle);

    // sectors definition (ranges + radius bands)
    const SECTORS = [
      { id:'sul',            d: ringSector(-38, 38, 0,0) },
      { id:'leste-superior', d: ringSector(38, 142, 0,0, 200,240,184,222, 138,178) }, // outer band
      { id:'leste-inferior', d: ringSector(38, 142, 0,0, 200,240,138,178, 92,130) },  // inner band
      { id:'norte',          d: ringSector(142, 218, 0,0) },
      { id:'oeste',          d: ringSector(218, 322, 0,0) },
    ];

    const tip = document.createElement('div');
    tip.className = 'mrc-map-tip';
    tip.style.cssText = 'position:absolute;pointer-events:none;opacity:0;transition:opacity .15s;background:#111;border:1px solid rgba(255,255,255,.18);color:#f4f4f0;font-family:Inter,sans-serif;font-size:12px;padding:8px 11px;border-radius:9px;white-space:nowrap;z-index:5;box-shadow:0 8px 24px rgba(0,0,0,.5);';
    if (getComputedStyle(container).position === 'static') container.style.position = 'relative';

    SECTORS.forEach(sc => {
      const def = sectorDef(sc.id);
      const avail = availFor(sc.id);
      const isSel = selected === sc.id;
      const path = document.createElementNS(svgNS, 'path');
      path.setAttribute('d', sc.d);
      path.setAttribute('fill', avail ? def.color : '#222');
      path.setAttribute('fill-opacity', isSel ? '1' : (avail ? '0.82' : '0.5'));
      path.setAttribute('stroke', isSel ? '#fff' : 'rgba(0,0,0,0.5)');
      path.setAttribute('stroke-width', isSel ? '3' : '1.5');
      path.style.cursor = avail ? 'pointer' : 'not-allowed';
      path.style.transition = 'fill-opacity .2s, stroke-width .2s';
      path.dataset.id = sc.id;

      path.addEventListener('mouseenter', (e) => {
        if (!isSel) path.setAttribute('fill-opacity', '1');
        const p = priceFor(sc.id);
        tip.innerHTML = `<b>${def.name}</b>${showPrices && p ? ` · ${fmt(p)}` : ''}${!avail ? ' · agotado' : ''}`;
        tip.style.opacity = '1';
      });
      path.addEventListener('mousemove', (e) => {
        const r = container.getBoundingClientRect();
        tip.style.left = (e.clientX - r.left + 12) + 'px';
        tip.style.top = (e.clientY - r.top + 12) + 'px';
      });
      path.addEventListener('mouseleave', () => {
        if (!isSel) path.setAttribute('fill-opacity', avail ? '0.82' : '0.5');
        tip.style.opacity = '0';
      });
      if (avail && onSelect) path.addEventListener('click', () => onSelect(sc.id));
      svg.appendChild(path);
    });

    // sector labels
    const LABELS = [
      { id:'sul', deg:0, rx:0, ry:-200, t:'SUL' },
      { id:'leste', x:330, y:240, t:'LESTE' },
      { id:'norte', x:200, y:452, t:'NORTE' },
      { id:'oeste', x:70, y:240, t:'OESTE' },
    ];
    const addLabel = (x, y, txt) => {
      const t = document.createElementNS(svgNS, 'text');
      t.setAttribute('x', x); t.setAttribute('y', y);
      t.setAttribute('fill', 'rgba(255,255,255,0.9)');
      t.setAttribute('font-family', "'Barlow Condensed', sans-serif");
      t.setAttribute('font-style', 'italic'); t.setAttribute('font-weight', '800');
      t.setAttribute('font-size', '15'); t.setAttribute('text-anchor', 'middle');
      t.setAttribute('letter-spacing', '1.5');
      t.style.pointerEvents = 'none';
      t.textContent = txt;
      svg.appendChild(t);
    };
    addLabel(200, 34, 'SUL');
    addLabel(348, 244, 'LESTE');
    addLabel(200, 460, 'NORTE');
    addLabel(52, 244, 'OESTE');
    // center label
    addLabel(200, 246, 'MARACANÃ');

    container.innerHTML = '';
    container.appendChild(svg);
    container.appendChild(tip);
    return svg;
  }

  // Legend list (sector swatches + price + availability)
  function legend(container, opts = {}) {
    const { match, selected, onSelect, showPrices = true } = opts;
    container.innerHTML = '';
    SECTOR_DEFS.forEach(def => {
      const s = match ? match.sectors.find(x => x.id === def.id) : { price: def.defaultPrice, available: true };
      if (!s) return;
      const row = document.createElement('button');
      row.className = 'mrc-leg-row' + (selected === def.id ? ' sel' : '') + (!s.available ? ' off' : '');
      row.innerHTML = `
        <span class="sw" style="background:${def.color}"></span>
        <span class="info"><b>${def.name}</b><small>${def.desc}</small></span>
        <span class="pr">${s.available ? (showPrices ? fmt(s.price) : '') : 'Agotado'}</span>`;
      if (s.available && onSelect) row.addEventListener('click', () => onSelect(def.id));
      container.appendChild(row);
    });
  }

  return { render, legend };
})();
