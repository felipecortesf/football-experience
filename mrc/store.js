// ════════════════════════════════════════════════════════════
// FOOTBALL EXPERIENCE · MARACANÃ — Data Store (localStorage)
// Gestiona equipos, partidos (con sectores/precios editables),
// reservas y FAQ. Persiste en localStorage para administración.
// ════════════════════════════════════════════════════════════
window.MRC = (function () {
  const KEY_MATCHES = 'mrc.matches.v2';
  const KEY_BOOKINGS = 'mrc.bookings.v2';

  // ── EQUIPOS ──────────────────────────────────────────────
  const TEAMS = {
    flamengo: {
      id:'flamengo', name:'Flamengo', full:'Clube de Regatas do Flamengo',
      short:'FLA', nickname:'Mengão', founded:1895, fans:'42M',
      primary:'#C52613', secondary:'#000000', ink:'#000',
      pattern:'hoops', stadium:'Maracanã', position:2,
      record:{ pts:34, pj:17, g:10, e:4, p:3 },
      coach:'Leonardo Jardim',
      colors:['#C52613','#000000','#FFFFFF'],
      crest:'assets/equipos/flamengo.png',
      banner:'assets/banners/flamengo.png',
      bio:'El club más popular de Brasil. Campeón del mundo en 1981 y tetracampeón de la Libertadores. La Nación Rubro-Negra llena el Maracanã como nadie.',
      titles:[
        { n:'1', l:'Mundial de Clubes 1981' }, { n:'4', l:'Libertadores' },
        { n:'8', l:'Brasileirão' }, { n:'5', l:'Copa do Brasil' },
        { n:'38', l:'Campeonato Carioca' },
      ],
      history:[
        { year:'1895', t:'Fundación', x:'Nace como club de remo en la zona sur de Rio.' },
        { year:'1981', t:'Campeón del mundo', x:'Conquista el Mundial de Clubes con Zico de figura.' },
        { year:'2019', t:'Gloria en Lima', x:'Gabigol da vuelta la final de Libertadores ante River.' },
        { year:'2022', t:'Doblete', x:'Libertadores y Copa do Brasil en una misma temporada.' },
        { year:'2025', t:'Tetracampeón continental', x:'Cuarta Libertadores de la historia del club.' },
      ],
    },
    fluminense: {
      id:'fluminense', name:'Fluminense', full:'Fluminense Football Club',
      short:'FLU', nickname:'Tricolor', founded:1902, fans:'5M',
      primary:'#870A28', secondary:'#00613C', ink:'#00613C',
      pattern:'tricolor', stadium:'Maracanã', position:3,
      record:{ pts:31, pj:18, g:9, e:4, p:5 },
      coach:'Luis Zubeldía',
      colors:['#870A28','#00613C','#FFFFFF'],
      crest:'assets/equipos/fluminense.png',
      banner:'assets/banners/fluminense.jpg',
      bio:'Pionero del fútbol carioca y dueño de un juego elegante. Campeón de la Libertadores 2023 en casa, en el corazón del Maracanã.',
      titles:[
        { n:'1', l:'Libertadores 2023' }, { n:'1', l:'Recopa Sudamericana 2024' },
        { n:'1', l:'Copa Rio Internacional 1952' }, { n:'4', l:'Brasileirão' },
        { n:'1', l:'Copa do Brasil' }, { n:'33', l:'Campeonato Carioca' },
      ],
      history:[
        { year:'1902', t:'Fundación', x:'Primer gran club de fútbol de Rio de Janeiro.' },
        { year:'1970', t:'Era dorada', x:'La "Máquina Tricolor" domina el fútbol carioca.' },
        { year:'2012', t:'Brasileirão', x:'Conquista el título nacional con autoridad.' },
        { year:'2023', t:'Gloria continental', x:'Primera Libertadores, en el Maracanã, con Cano y Ganso.' },
        { year:'2024', t:'Recopa Sudamericana', x:'Suma un título continental más a su palmarés.' },
      ],
    },
    botafogo: {
      id:'botafogo', name:'Botafogo', full:'Botafogo de Futebol e Regatas',
      short:'BOT', nickname:'Fogão', founded:1904, fans:'4M',
      primary:'#000000', secondary:'#FFFFFF', ink:'#fff',
      pattern:'star', stadium:'Nilton Santos / Maracanã', position:12,
      record:{ pts:22, pj:17, g:6, e:4, p:7 },
      coach:'Franclim Carvalho',
      colors:['#000000','#FFFFFF'],
      crest:'assets/equipos/botafogo.png',
      banner:'assets/banners/botafogo.png',
      bio:'La estrella solitaria. Cuna de Garrincha y campeón de la Libertadores 2024. Vive una era de renacimiento absoluto.',
      titles:[
        { n:'1', l:'Libertadores 2024' }, { n:'1', l:'Copa CONMEBOL 1993' },
        { n:'3', l:'Brasileirão (incl. 2024)' }, { n:'4', l:'Torneo Rio-São Paulo' },
        { n:'21', l:'Campeonato Carioca' },
      ],
      history:[
        { year:'1904', t:'Fundación', x:'Nace el club de la estrella solitaria.' },
        { year:'1962', t:'Garrincha mundial', x:'El Mané brilla en el bicampeonato de Brasil.' },
        { year:'1995', t:'Brasileirão', x:'Túlio Maravilha lidera el título nacional.' },
        { year:'2024', t:'Gloria sudamericana', x:'Conquista la Libertadores y el Brasileirão.' },
      ],
    },
    vasco: {
      id:'vasco', name:'Vasco da Gama', full:'Club de Regatas Vasco da Gama',
      short:'VAS', nickname:'Gigante da Colina', founded:1898, fans:'8M',
      primary:'#E2231A', secondary:'#000000', ink:'#000',
      pattern:'hoops', stadium:'São Januário / Maracanã', position:17,
      record:{ pts:20, pj:18, g:5, e:5, p:8 },
      coach:'Renato Gaúcho',
      colors:['#E2231A','#000000','#FFFFFF','#FFA400'],
      crest:'assets/equipos/vasco-da-gama.png',
      banner:'assets/banners/vasco-da-gama.png',
      bio:'El gigante que abrió el fútbol brasileño a todas las razas y clases sociales. Campeón de la Libertadores 1998 y pionero sudamericano desde 1948.',
      titles:[
        { n:'1', l:'Libertadores 1998' }, { n:'1', l:'Campeonato Sudamericano de Campeones 1948' },
        { n:'1', l:'Copa Mercosur 2000' }, { n:'4', l:'Brasileirão' },
        { n:'1', l:'Copa do Brasil 2011' }, { n:'24', l:'Campeonato Carioca' },
      ],
      history:[
        { year:'1898', t:'Fundación', x:'Nace el Club de Regatas Vasco da Gama.' },
        { year:'1948', t:'Pionero sudamericano', x:'Campeón Sudamericano de Campeones, precursor reconocido de la Libertadores.' },
        { year:'1998', t:'Gloria continental', x:'Conquista la Copa Libertadores de América.' },
        { year:'2000', t:'Copa Mercosur', x:'Suma otro título internacional a su palmarés.' },
        { year:'2011', t:'Copa do Brasil', x:'Levanta el título nacional una vez más.' },
      ],
    },
  };

  // ── SECTORES DEL MARACANÃ (según mapa oficial) ───────────
  // color = referencia visual del mapa entregado
  const SECTOR_DEFS = [
    { id:'leste-inferior', name:'Leste Inferior',  side:'oeste', color:'#b81d2c', defaultPrice:320, desc:'Lateral bajo, cerca del campo. La mejor relación vista-precio.' },
    { id:'leste-superior', name:'Leste Superior',  side:'oeste', color:'#7c1420', defaultPrice:300, desc:'Lateral alto con vista panorámica del juego.' },
    { id:'norte',          name:'Norte',           side:'norte', color:'#1f8a44', defaultPrice:280, desc:'La curva del aliento. Banderas, cantos y la barra.' },
    { id:'sul',            name:'Sul',             side:'sul',   color:'#d6a72e', defaultPrice:280, desc:'Curva sur, ambiente familiar y vibrante.' },
    { id:'oeste',          name:'Maracanã Mais (Oeste)', side:'este', color:'#3a3a42', defaultPrice:520, desc:'Sector premium: asientos centrales, lounge y servicio.' },
    { id:'visitante',      name:'Visitante',       side:'norte-este', color:'#6a6a72', defaultPrice:260, desc:'Sector reservado a la hinchada visitante.' },
  ];

  function sectorDef(id) { return SECTOR_DEFS.find(s => s.id === id); }

  // ── PARTIDOS SEMILLA ─────────────────────────────────────
  function seedMatches() {
    const mk = (over) => Object.assign({
      id: 'm_' + Math.random().toString(36).slice(2, 9),
      status: 'on-sale', // on-sale | sold-out | past
      includes: ['Entrada', 'Guiamiento en 3 idiomas', 'Transporte ida y vuelta'],
      sectors: SECTOR_DEFS.map(s => ({ id: s.id, price: s.defaultPrice, available: true })),
    }, over);

    return [
      mk({ teamId:'flamengo', opp:'Coritiba', oppShort:'CFC', comp:'Brasileirão',
        date:'2026-05-30T16:00', venue:'Maracanã',
        sectors:[
          { id:'leste-inferior', price:320, available:true },
          { id:'leste-superior', price:300, available:true },
          { id:'norte', price:280, available:true },
          { id:'sul', price:280, available:true },
          { id:'oeste', price:520, available:true },
          { id:'visitante', price:260, available:true },
        ] }),
      mk({ teamId:'flamengo', opp:'Racing', oppShort:'RAC', comp:'Libertadores',
        date:'2026-06-11T21:30', venue:'Maracanã',
        sectors:[
          { id:'leste-inferior', price:420, available:true },
          { id:'leste-superior', price:380, available:true },
          { id:'norte', price:340, available:true },
          { id:'sul', price:340, available:true },
          { id:'oeste', price:680, available:true },
          { id:'visitante', price:300, available:false },
        ] }),
      mk({ teamId:'fluminense', opp:'Internacional', oppShort:'INT', comp:'Brasileirão',
        date:'2026-06-08T18:30', venue:'Maracanã' }),
      mk({ teamId:'fluminense', opp:'LDU Quito', oppShort:'LDU', comp:'Sudamericana',
        date:'2026-06-12T19:00', venue:'Maracanã',
        sectors: SECTOR_DEFS.map(s => ({ id:s.id, price: s.defaultPrice + 40, available:true })) }),
      mk({ teamId:'botafogo', opp:'São Paulo', oppShort:'SAO', comp:'Brasileirão',
        date:'2026-06-14T16:00', venue:'Nilton Santos' }),
      mk({ teamId:'botafogo', opp:'U. de Chile', oppShort:'UCH', comp:'Libertadores',
        date:'2026-06-18T21:30', venue:'Maracanã',
        sectors: SECTOR_DEFS.map(s => ({ id:s.id, price: s.defaultPrice + 60, available:true })) }),
      mk({ teamId:'vasco', opp:'Bahia', oppShort:'BAH', comp:'Brasileirão',
        date:'2026-06-21T16:00', venue:'São Januário' }),
      mk({ teamId:'vasco', opp:'Flamengo', oppShort:'FLA', comp:'Brasileirão',
        date:'2026-06-28T18:30', venue:'Maracanã',
        sectors: SECTOR_DEFS.map(s => ({ id:s.id, price: s.defaultPrice + 80, available:true })) }),
    ];
  }

  // ── PERSISTENCIA ─────────────────────────────────────────
  function load(key, fallback) {
    try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
    catch (e) { return fallback; }
  }
  function save(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) {} }

  let matches = load(KEY_MATCHES, null);
  if (!matches) { matches = seedMatches(); save(KEY_MATCHES, matches); }

  let bookings = load(KEY_BOOKINGS, []);

  // ── API ──────────────────────────────────────────────────
  function allMatches() { return matches.slice().sort((a,b)=> new Date(a.date)-new Date(b.date)); }
  function matchesByTeam(teamId) { return allMatches().filter(m => m.teamId === teamId); }
  function upcomingByTeam(teamId) { return matchesByTeam(teamId).filter(m => !isPast(m)); }
  function getMatch(id) { return matches.find(m => m.id === id); }
  function isPast(m) { return new Date(m.date).getTime() < Date.now(); }

  function saveMatch(m) {
    const i = matches.findIndex(x => x.id === m.id);
    if (i >= 0) matches[i] = m; else matches.push(m);
    save(KEY_MATCHES, matches);
  }
  function deleteMatch(id) { matches = matches.filter(m => m.id !== id); save(KEY_MATCHES, matches); }
  function newMatchTemplate(teamId) {
    return {
      id: 'm_' + Math.random().toString(36).slice(2, 9),
      teamId: teamId || 'flamengo', opp:'', oppShort:'', comp:'Brasileirão',
      date: new Date(Date.now()+7*864e5).toISOString().slice(0,16), venue:'Maracanã',
      status:'on-sale', includes:['Entrada','Guiamiento en 3 idiomas','Transporte ida y vuelta'],
      sectors: SECTOR_DEFS.map(s => ({ id:s.id, price:s.defaultPrice, available:true })),
    };
  }

  // ── RESERVAS / COMPRA ────────────────────────────────────
  // Política: pago 100% del valor. Cancelación hasta 7 días antes.
  function createBooking({ matchId, sectorId, qty, name, email }) {
    const m = getMatch(matchId);
    const sec = m.sectors.find(s => s.id === sectorId);
    const unit = sec.price;
    const total = unit * qty;
    const b = {
      id: 'FE-' + Math.random().toString(36).slice(2, 8).toUpperCase(),
      matchId, sectorId, qty, name, email,
      unit, total, paid: total, // 100%
      createdAt: Date.now(),
      matchDate: m.date,
      status: 'confirmed',
    };
    bookings.unshift(b);
    save(KEY_BOOKINGS, bookings);
    return b;
  }
  function getBookings() { return bookings.slice(); }
  function canCancel(b) {
    const matchTime = new Date(b.matchDate).getTime();
    return b.status === 'confirmed' && (matchTime - Date.now()) >= 7 * 864e5;
  }
  function cancelBooking(id) {
    const b = bookings.find(x => x.id === id);
    if (b && canCancel(b)) { b.status = 'cancelled'; save(KEY_BOOKINGS, bookings); return true; }
    return false;
  }
  function resetData() { matches = seedMatches(); save(KEY_MATCHES, matches); bookings = []; save(KEY_BOOKINGS, bookings); }

  // ── FAQ (chatbot) ────────────────────────────────────────
  const FAQ = [
    { q:'¿Qué incluye la entrada?', a:'Todas nuestras entradas son servicio completo: incluyen el acceso al estadio, guiamiento en 3 idiomas (español, inglés y portugués) y transporte ida y vuelta.' },
    { q:'¿Cómo es el acceso al estadio?', a:'El acceso es biométrico: tu rostro es tu entrada. Te registras una vez vía Bepass y entras sin filas ni ticket de papel.' },
    { q:'¿Puedo cancelar mi compra?', a:'Sí. Puedes cancelar hasta 7 días (1 semana) antes del partido y se te reembolsa el 100%. Pasado ese plazo la compra no es reembolsable.' },
    { q:'¿Cuánto cuesta y cómo pago?', a:'El precio varía por sector y por partido. Tu anfitrión te confirma el precio final por WhatsApp y ahí coordinan el pago (los precios de referencia pueden cambiar de un partido a otro).' },
    { q:'¿Qué sectores hay en el Maracanã?', a:'Leste Inferior, Leste Superior, Norte, Sul, Maracanã Mais (Oeste, premium) y Visitante. Los precios cambian según el partido.' },
    { q:'¿El transporte de dónde sale?', a:'Coordinamos un punto de embarque y un anfitrión te acompaña ida y vuelta. La hora exacta se confirma por WhatsApp.' },
    { q:'¿Atienden por WhatsApp?', a:'Sí, tienes un anfitrión por WhatsApp para coordinar tu embarque y resolver cualquier duda antes, durante y después del partido.' },
  ];

  const WHATSAPP = '5521999990000'; // número de contacto (placeholder)

  return {
    TEAMS, SECTOR_DEFS, sectorDef, FAQ, WHATSAPP,
    allMatches, matchesByTeam, upcomingByTeam, getMatch, isPast,
    saveMatch, deleteMatch, newMatchTemplate,
    createBooking, getBookings, canCancel, cancelBooking, resetData,
    fmt: (n) => 'R$ ' + Number(n).toLocaleString('pt-BR'),
  };
})();
