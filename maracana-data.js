// ───────────────────────────────────────────────────────────
// FOOTBALL EXPERIENCE · MARACANÁ — datos de la landing
// ───────────────────────────────────────────────────────────

const TEAMS = {
  flamengo: {
    id: 'flamengo',
    name: 'Flamengo',
    full: 'Clube de Regatas do Flamengo',
    short: 'FLA',
    nickname: 'Mengão',
    founded: 1895,
    fans: '42M',
    titles: 8, // brasileiros (placeholder)
    primary: '#c8102e',
    ink: '#000000',
    glow: 'rgba(200,16,46,0.5)',
    pattern: 'hoops', // aros rojo-negro
    crestLetter: 'F',
    record: { w: 14, d: 4, l: 2 },
    form: ['W','W','D','W','L'],
    position: 1,
  },
  fluminense: {
    id: 'fluminense',
    name: 'Fluminense',
    full: 'Fluminense Football Club',
    short: 'FLU',
    nickname: 'Tricolor',
    founded: 1902,
    fans: '5M',
    titles: 4,
    primary: '#9a1b34',
    secondary: '#0e5c2f',
    ink: '#0e5c2f',
    glow: 'rgba(154,27,52,0.5)',
    pattern: 'tricolor',
    crestLetter: 'F',
    record: { w: 11, d: 6, l: 3 },
    form: ['D','W','W','D','W'],
    position: 4,
  },
  botafogo: {
    id: 'botafogo',
    name: 'Botafogo',
    full: 'Botafogo de Futebol e Regatas',
    short: 'BOT',
    nickname: 'Fogão',
    founded: 1904,
    fans: '4M',
    titles: 3,
    primary: '#000000',
    secondary: '#ffffff',
    ink: '#ffffff',
    glow: 'rgba(255,255,255,0.35)',
    pattern: 'star',
    crestLetter: 'B',
    record: { w: 12, d: 5, l: 3 },
    form: ['W','L','W','W','D'],
    position: 2,
  },
};

// Próximos partidos por equipo
const MATCHES = {
  flamengo: [
    { opp:'Palmeiras', oppShort:'PAL', comp:'Brasileirão', round:'Rodada 12', date:'2026-06-07T16:00', day:'DOM 07 JUN', time:'16:00', from:110, demand:'alta', tag:'CLÁSSICO NACIONAL' },
    { opp:'Racing', oppShort:'RAC', comp:'Libertadores', round:'Semifinal · Ida', date:'2026-06-11T21:30', day:'JUE 11 JUN', time:'21:30', from:180, demand:'muy alta', tag:'NOCHE DE GALA' },
    { opp:'Vasco', oppShort:'VAS', comp:'Brasileirão', round:'Rodada 13', date:'2026-06-21T18:30', day:'DOM 21 JUN', time:'18:30', from:130, demand:'alta', tag:'CLÁSSICO DOS MILHÕES' },
  ],
  fluminense: [
    { opp:'Internacional', oppShort:'INT', comp:'Brasileirão', round:'Rodada 12', date:'2026-06-08T18:30', day:'DOM 08 JUN', time:'18:30', from:90, demand:'media', tag:'MARACANÃ' },
    { opp:'LDU Quito', oppShort:'LDU', comp:'Sudamericana', round:'Octavos · Vuelta', date:'2026-06-12T19:00', day:'VIE 12 JUN', time:'19:00', from:120, demand:'alta', tag:'NOCHE CONTINENTAL' },
    { opp:'Corinthians', oppShort:'COR', comp:'Brasileirão', round:'Rodada 13', date:'2026-06-22T16:00', day:'DOM 22 JUN', time:'16:00', from:95, demand:'media', tag:'MARACANÃ' },
  ],
  botafogo: [
    { opp:'Grêmio', oppShort:'GRE', comp:'Brasileirão', round:'Rodada 12', date:'2026-06-07T18:30', day:'DOM 07 JUN', time:'18:30', from:80, demand:'media', tag:'NILTON SANTOS' },
    { opp:'São Paulo', oppShort:'SAO', comp:'Brasileirão', round:'Rodada 13', date:'2026-06-14T16:00', day:'DOM 14 JUN', time:'16:00', from:85, demand:'alta', tag:'CLÁSSICO' },
    { opp:'Universidad de Chile', oppShort:'UCH', comp:'Libertadores', round:'Octavos · Ida', date:'2026-06-18T21:30', day:'MIÉ 18 JUN', time:'21:30', from:140, demand:'alta', tag:'NOCHE CONTINENTAL' },
  ],
};

// Jugadores destacados por equipo (nombres ilustrativos para el prototipo)
const PLAYERS = {
  flamengo: [
    { name:'Pedro', pos:'Delantero', num:9, goals:18, assists:4, apps:22, rating:7.8 },
    { name:'Arrascaeta', pos:'Mediapunta', num:14, goals:9, assists:12, apps:21, rating:8.1 },
    { name:'G. de Arrascaeta', pos:'Volante', num:10, goals:6, assists:9, apps:20, rating:7.6 },
    { name:'Gerson', pos:'Mediocampo', num:8, goals:3, assists:5, apps:22, rating:7.4 },
    { name:'Léo Pereira', pos:'Defensa', num:4, goals:2, assists:1, apps:23, rating:7.2 },
  ],
  fluminense: [
    { name:'Germán Cano', pos:'Delantero', num:14, goals:15, assists:3, apps:20, rating:7.7 },
    { name:'Jhon Arias', pos:'Extremo', num:21, goals:7, assists:10, apps:22, rating:8.0 },
    { name:'Ganso', pos:'Mediapunta', num:10, goals:4, assists:8, apps:19, rating:7.5 },
    { name:'André', pos:'Volante', num:7, goals:2, assists:4, apps:21, rating:7.6 },
    { name:'Marcelo', pos:'Lateral', num:12, goals:1, assists:6, apps:18, rating:7.3 },
  ],
  botafogo: [
    { name:'Tiquinho Soares', pos:'Delantero', num:9, goals:14, assists:2, apps:21, rating:7.6 },
    { name:'Luiz Henrique', pos:'Extremo', num:7, goals:9, assists:8, apps:22, rating:7.9 },
    { name:'Eduardo', pos:'Volante', num:5, goals:3, assists:4, apps:20, rating:7.4 },
    { name:'Gregore', pos:'Mediocampo', num:18, goals:1, assists:2, apps:23, rating:7.2 },
    { name:'John', pos:'Portero', num:1, goals:0, assists:0, apps:23, rating:7.5 },
  ],
};

// Resultados recientes por equipo
const RECENT = {
  flamengo: [
    { opp:'Bahia', us:3, them:1, comp:'Brasileirão', result:'W' },
    { opp:'Peñarol', us:2, them:0, comp:'Libertadores', result:'W' },
    { opp:'São Paulo', us:1, them:1, comp:'Brasileirão', result:'D' },
  ],
  fluminense: [
    { opp:'Cruzeiro', us:2, them:1, comp:'Brasileirão', result:'W' },
    { opp:'Cerro Porteño', us:1, them:1, comp:'Sudamericana', result:'D' },
    { opp:'Atlético-MG', us:2, them:0, comp:'Brasileirão', result:'W' },
  ],
  botafogo: [
    { opp:'Juventude', us:2, them:0, comp:'Brasileirão', result:'W' },
    { opp:'Vitória', us:0, them:1, comp:'Brasileirão', result:'L' },
    { opp:'Bragantino', us:3, them:2, comp:'Brasileirão', result:'W' },
  ],
};

// Estadísticas de temporada por equipo
const SEASON_STATS = {
  flamengo: [
    { label:'Goles a favor', value:42 },
    { label:'Posesión media', value:'58%' },
    { label:'Victorias en casa', value:'9/10' },
    { label:'Asistencia media', value:'58.400' },
  ],
  fluminense: [
    { label:'Goles a favor', value:31 },
    { label:'Posesión media', value:'54%' },
    { label:'Victorias en casa', value:'7/10' },
    { label:'Asistencia media', value:'41.200' },
  ],
  botafogo: [
    { label:'Goles a favor', value:35 },
    { label:'Posesión media', value:'52%' },
    { label:'Victorias en casa', value:'8/10' },
    { label:'Asistencia media', value:'33.800' },
  ],
};

// Noticias por equipo
const NEWS = {
  flamengo: [
    { tag:'PLANTEL', title:'Pedro llega a 18 goles y lidera la tabla de artilleros', time:'hace 2 h', kind:'destacada' },
    { tag:'LIBERTADORES', title:'Semifinal confirmada en el Maracaná ante Racing', time:'hace 5 h' },
    { tag:'AFICIÓN', title:'Récord de socios: el Mengão supera los 175 mil abonados', time:'ayer' },
  ],
  fluminense: [
    { tag:'PLANTEL', title:'Cano renueva hasta 2027 y será el capitán de la temporada', time:'hace 3 h', kind:'destacada' },
    { tag:'SUDAMERICANA', title:'Fluminense define la serie ante LDU en casa', time:'hace 6 h' },
    { tag:'CANTERA', title:'Tres juveniles de Xerém suben al primer equipo', time:'ayer' },
  ],
  botafogo: [
    { tag:'PLANTEL', title:'Luiz Henrique, elegido jugador del mes del Brasileirão', time:'hace 1 h', kind:'destacada' },
    { tag:'LIBERTADORES', title:'El Fogão recibe a la U de Chile en los octavos', time:'hace 4 h' },
    { tag:'CLUB', title:'Nueva iluminación LED en el Nilton Santos para las noches continentales', time:'ayer' },
  ],
};

// Experiencias de clientes (transversales)
const TESTIMONIALS = [
  { name:'Mariana R.', team:'flamengo', text:'Tres toques en la app y ya estaba en la Norte. El acceso facial fue instantáneo, sin filas.', rating:5, exp:'Galería · Flamengo x Palmeiras' },
  { name:'Lucas A.', team:'fluminense', text:'El anfitrión me esperaba en el punto de embarque. Llegué al Maracaná como un VIP.', rating:5, exp:'Tribuna · Fluminense x Internacional' },
  { name:'Patrícia V.', team:'botafogo', text:'Viajé sola y me sentí 100% segura. El transporte y el host hicieron toda la diferencia.', rating:5, exp:'Palco · Botafogo x São Paulo' },
  { name:'Diego M.', team:'flamengo', text:'Sin ticket de papel, sin estrés. Mi cara fue mi entrada. Brutal la experiencia.', rating:5, exp:'Galería · Flamengo x Racing' },
];

// Tabla de posiciones (Brasileirão) — contexto para cada equipo
const STANDINGS = [
  { pos:1, team:'Flamengo', short:'FLA', id:'flamengo', pj:20, pts:46, dg:'+28' },
  { pos:2, team:'Botafogo', short:'BOT', id:'botafogo', pj:20, pts:41, dg:'+19' },
  { pos:3, team:'Palmeiras', short:'PAL', id:null, pj:20, pts:40, dg:'+17' },
  { pos:4, team:'Fluminense', short:'FLU', id:'fluminense', pj:20, pts:39, dg:'+14' },
  { pos:5, team:'Internacional', short:'INT', id:null, pj:20, pts:35, dg:'+9' },
  { pos:6, team:'São Paulo', short:'SAO', id:null, pj:20, pts:33, dg:'+7' },
];

// Campeonatos en disputa por equipo
const COMPETITIONS = {
  flamengo: [
    { name:'Brasileirão Série A', status:'1º · líder', phase:'Rodada 12 de 38', icon:'shield', live:true },
    { name:'Copa Libertadores', status:'Semifinal', phase:'Ida en el Maracaná', icon:'cup', live:true },
    { name:'Copa do Brasil', status:'Cuartos de final', phase:'Clasificado', icon:'cup', live:false },
  ],
  fluminense: [
    { name:'Brasileirão Série A', status:'4º · G4', phase:'Rodada 12 de 38', icon:'shield', live:true },
    { name:'Copa Sudamericana', status:'Octavos de final', phase:'Vuelta en casa', icon:'cup', live:true },
    { name:'Copa do Brasil', status:'Octavos de final', phase:'Clasificado', icon:'cup', live:false },
  ],
  botafogo: [
    { name:'Brasileirão Série A', status:'2º · G4', phase:'Rodada 12 de 38', icon:'shield', live:true },
    { name:'Copa Libertadores', status:'Octavos de final', phase:'Ida en casa', icon:'cup', live:true },
    { name:'Copa do Brasil', status:'Eliminado', phase:'Tercera fase', icon:'cup', live:false },
  ],
};

// Estadísticas históricas por equipo (en el Maracaná / club)
const HISTORY_STATS = {
  flamengo: [
    { n:'8', l:'Brasileirões' },
    { n:'3', l:'Libertadores' },
    { n:'1981', l:'Mundial · Tokio' },
    { n:'+1.9M', l:'Récord de socios' },
  ],
  fluminense: [
    { n:'4', l:'Brasileirões' },
    { n:'1', l:'Libertadores 2023' },
    { n:'1952', l:'Copa Rio' },
    { n:'1902', l:'Fundación pionera' },
  ],
  botafogo: [
    { n:'3', l:'Brasileirões' },
    { n:'1', l:'Libertadores 2024' },
    { n:'1968', l:'Era Garrincha' },
    { n:'49', l:'Invicto histórico' },
  ],
};

// Jugadas / momentos destacados por equipo
const HIGHLIGHTS = {
  flamengo: [
    { title:'Gabigol vs River · 89\'', sub:'Libertadores 2019 · Lima', tag:'ICÓNICO', dur:'0:42' },
    { title:'Pedro · chilena vs Vélez', sub:'Semifinal 2024', tag:'GOLAZO', dur:'0:28' },
    { title:'Arrascaeta · doblete clásico', sub:'Maracanã 2025', tag:'CLÁSSICO', dur:'1:05' },
  ],
  fluminense: [
    { title:'Cano · cabezazo final', sub:'Libertadores 2023 · Maracanã', tag:'HISTÓRICO', dur:'0:36' },
    { title:'John Kennedy · prórroga', sub:'Final 2023', tag:'ICÓNICO', dur:'0:51' },
    { title:'Ganso · asistencia de lujo', sub:'Brasileirão 2025', tag:'CLASE', dur:'0:24' },
  ],
  botafogo: [
    { title:'Luiz Henrique · contragolpe', sub:'Libertadores 2024', tag:'VELOCIDAD', dur:'0:33' },
    { title:'Almada · tiro libre', sub:'Final 2024 · Buenos Aires', tag:'GOLAZO', dur:'0:29' },
    { title:'Tiquinho · hat-trick', sub:'Brasileirão 2024', tag:'NOCHE PERFECTA', dur:'1:12' },
  ],
};

// Sectores del Maracaná (mapa)
const SECTORS = [
  { id:'norte', name:'Arquibancada Norte', desc:'La curva del aliento. Banderas, cantos y la barra.', price:90, vibe:'Pasión pura', x:50, y:14, w:34, h:13 },
  { id:'sul', name:'Arquibancada Sul', desc:'La otra curva. Ambiente familiar y vibrante.', price:90, vibe:'Familiar', x:50, y:86, w:34, h:13 },
  { id:'leste', name:'Tribuna Leste', desc:'Lateral con vista a media cancha. Asiento numerado.', price:145, vibe:'Mejor vista', x:84, y:50, w:13, h:40 },
  { id:'oeste', name:'Tribuna Oeste', desc:'Lateral principal, bajo cubierta.', price:160, vibe:'Preferente', x:16, y:50, w:13, h:40 },
  { id:'maracana-mais', name:'Maracanã Mais (VIP)', desc:'Lounge climatizado, catering y servicio dedicado.', price:480, vibe:'Premium', x:16, y:30, w:13, h:16 },
  { id:'cadeiras', name:'Cadeiras Especiais', desc:'Asientos centrales acolchados, primera línea.', price:220, vibe:'Confort', x:50, y:50, w:20, h:8 },
];

// Hitos históricos del Maracaná (timeline)
const STADIUM_HISTORY = [
  { year:'1950', title:'Nace para el Mundial', text:'Inaugurado para la Copa del Mundo de 1950. El "Maracanazo" reunió a casi 200.000 personas.' },
  { year:'1969', title:'El gol 1000 de Pelé', text:'Pelé marcó su histórico gol número 1000 desde el punto de penal, ante el Vasco.' },
  { year:'2013', title:'Renovación total', text:'Modernizado para el Mundial 2014 y los Juegos Olímpicos 2016, con capacidad de ~78.800.' },
  { year:'2023', title:'Templo continental', text:'Fluminense conquista su primera Libertadores en casa. El Maracaná, epicentro de Sudamérica.' },
];

// Cómo es la experiencia — pasos
const EXPERIENCE_STEPS = [
  { n:'01', title:'Eliges tu partido', text:'Equipo, fecha y sector. Reserva en segundos desde la app.', icon:'ticket' },
  { n:'02', title:'Registro facial', text:'Tu rostro es tu entrada. Sin papel, sin filas, vía Bepass.', icon:'face' },
  { n:'03', title:'Transporte + anfitrión', text:'Te recogemos en tu punto de encuentro y un host te acompaña.', icon:'bus' },
  { n:'04', title:'Vives el Maracaná', text:'Acceso prioritario y tu lugar listo para gritar el gol.', icon:'star' },
];

// Accesibilidad — pilares
const ACCESS = [
  { icon:'wheelchair', title:'Sectores accesibles', text:'Asientos PCD con acompañante y rampas en cada acceso del Maracaná.' },
  { icon:'ear', title:'Apoyo sensorial', text:'Kits antiruido y zonas de calma para hinchas con sensibilidad auditiva.' },
  { icon:'eye', title:'Alto contraste', text:'App y tickets con modo de alto contraste y compatibilidad con lectores de pantalla.' },
  { icon:'bus', title:'Transporte puerta a puerta', text:'Embarque adaptado desde tu punto de encuentro hasta el estadio.' },
];

window.FE = { TEAMS, MATCHES, PLAYERS, RECENT, SEASON_STATS, NEWS, TESTIMONIALS, ACCESS,
  STANDINGS, COMPETITIONS, HISTORY_STATS, HIGHLIGHTS, SECTORS, STADIUM_HISTORY, EXPERIENCE_STEPS };
