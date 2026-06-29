// Match data + helpers
const MATCHES = [
  {
    id: 'flu-flam',
    league: 'BRASILEIRÃO',
    leagueShort: 'O CLÁSSICO',
    home: { name: 'Fluminense', short: 'FLU', color: '#7a1d1d', accent: '#0e5c2f' },
    away: { name: 'Flamengo', short: 'FLA', color: '#c8102e', accent: '#000' },
    date: '12 ABR',
    dateFull: 'Dom, 12 de Abril',
    time: '18:00',
    stadium: 'Maracaná',
    city: 'Rio de Janeiro',
    availability: 'high',
    minPrice: 89,
    poster: 'classic',
    tag: 'O CLÁSSICO',
    fromMin: 89,
  },
  {
    id: 'flu-sip',
    league: 'CONMEBOL LIBERTADORES',
    leagueShort: 'LIBERTADORES',
    home: { name: 'Fluminense', short: 'FLU', color: '#7a1d1d', accent: '#0e5c2f' },
    away: { name: 'Indep. Rivadavia', short: 'IRI', color: '#1a3a8f', accent: '#fff' },
    date: '15 ABR',
    dateFull: 'Mié, 15 de Abril',
    time: '21:30',
    stadium: 'Maracaná',
    city: 'Rio de Janeiro',
    availability: 'medium',
    minPrice: 120,
    poster: 'libertadores',
    tag: 'LIBERTADORES',
    fromMin: 120,
  },
  {
    id: 'bot-car',
    league: 'CONMEBOL SUDAMERICANA',
    leagueShort: 'SUDAMERICANA',
    home: { name: 'Botafogo', short: 'BOT', color: '#000', accent: '#fff' },
    away: { name: 'Caracas', short: 'CAR', color: '#c8102e', accent: '#fff' },
    date: '09 ABR',
    dateFull: 'Jue, 9 de Abril',
    time: '19:00',
    stadium: 'Nilton Santos',
    city: 'Rio de Janeiro',
    availability: 'medium',
    minPrice: 75,
    poster: 'sudamericana',
    tag: 'SUDAMERICANA',
    fromMin: 75,
  },
  {
    id: 'flu-cor',
    league: 'BRASILEIRÃO',
    leagueShort: 'MARACANÁ',
    home: { name: 'Fluminense', short: 'FLU', color: '#7a1d1d', accent: '#0e5c2f' },
    away: { name: 'Corinthians', short: 'COR', color: '#000', accent: '#fff' },
    date: '01 ABR',
    dateFull: 'Mié, 1 de Abril',
    time: '21:30',
    stadium: 'Maracaná',
    city: 'Rio de Janeiro',
    availability: 'low',
    minPrice: 95,
    poster: 'maracana',
    tag: 'MARACANÁ',
    fromMin: 95,
  },
  {
    id: 'fla-pal',
    league: 'BRASILEIRÃO',
    leagueShort: 'MARACANÁ',
    home: { name: 'Flamengo', short: 'FLA', color: '#c8102e', accent: '#000' },
    away: { name: 'Palmeiras', short: 'PAL', color: '#0e5c2f', accent: '#fff' },
    date: '19 ABR',
    dateFull: 'Dom, 19 de Abril',
    time: '16:00',
    stadium: 'Maracaná',
    city: 'Rio de Janeiro',
    availability: 'high',
    minPrice: 110,
    poster: 'maracana',
    tag: 'MARACANÁ',
    fromMin: 110,
  },
  {
    id: 'vas-int',
    league: 'BRASILEIRÃO',
    leagueShort: 'SÃO JANUÁRIO',
    home: { name: 'Vasco', short: 'VAS', color: '#000', accent: '#fff' },
    away: { name: 'Internacional', short: 'INT', color: '#c8102e', accent: '#fff' },
    date: '22 ABR',
    dateFull: 'Mié, 22 de Abril',
    time: '20:00',
    stadium: 'São Januário',
    city: 'Rio de Janeiro',
    availability: 'medium',
    minPrice: 70,
    poster: 'maracana',
    tag: 'SÃO JANUÁRIO',
    fromMin: 70,
  },
  {
    id: 'bot-gre',
    league: 'BRASILEIRÃO',
    leagueShort: 'NILTON SANTOS',
    home: { name: 'Botafogo', short: 'BOT', color: '#000', accent: '#fff' },
    away: { name: 'Grêmio', short: 'GRE', color: '#1a4a8c', accent: '#fff' },
    date: '26 ABR',
    dateFull: 'Dom, 26 de Abril',
    time: '18:30',
    stadium: 'Nilton Santos',
    city: 'Rio de Janeiro',
    availability: 'high',
    minPrice: 80,
    poster: 'maracana',
    tag: 'NILTON SANTOS',
    fromMin: 80,
  },
];

const EXPERIENCES = [
  {
    id: 'galeria',
    name: 'Galería',
    short: 'Hincha puro',
    description: 'En la curva, junto a la barra. La pasión cruda.',
    price: 89,
    badge: null,
    perks: ['Acceso general', 'Sector cubierto', 'Cantos y banderas'],
    icon: 'fans',
  },
  {
    id: 'tribuna',
    name: 'Tribuna Central',
    short: 'Vista perfecta',
    description: 'En la mitad de cancha. La mejor visión del juego.',
    price: 145,
    badge: 'MÁS POPULAR',
    perks: ['Asiento numerado', 'Línea media', 'Acceso preferente'],
    icon: 'seat',
  },
  {
    id: 'palco',
    name: 'Palco VIP',
    short: 'Premium',
    description: 'Catering, lounge climatizado y servicio dedicado.',
    price: 480,
    badge: null,
    perks: ['Lounge VIP', 'Catering incluido', 'Estacionamiento'],
    icon: 'crown',
  },
];

const TIME_SLOTS = ['16:30', '17:00', '17:30', '18:00'];

// Helper to format pricing
const formatPrice = (n) => `R$ ${n.toLocaleString('pt-BR', { minimumFractionDigits: 0 })}`;

// Teams the user can subscribe to as fan
const TEAMS = [
  { id:'flamengo',   name:'Flamengo',   short:'FLA', primary:'#c8102e', dark:'#000',   stripe:'#c8102e', city:'Rio de Janeiro', stadium:'Maracaná',     fans:'42M', founded:1895, badge:'CRF',  bepass:'flamengo.bepass.com.br' },
  { id:'fluminense', name:'Fluminense', short:'FLU', primary:'#7a1d1d', dark:'#0e5c2f',stripe:'#7a1d1d', city:'Rio de Janeiro', stadium:'Maracaná',     fans:'5M',  founded:1902, badge:'FFC',  bepass:'fluminense.bepass.com.br' },
  { id:'vasco',      name:'Vasco',      short:'VAS', primary:'#000',    dark:'#000',   stripe:'#000',    city:'Rio de Janeiro', stadium:'São Januário', fans:'8M',  founded:1898, badge:'CRVG', bepass:'vasco.bepass.com.br' },
  { id:'botafogo',   name:'Botafogo',   short:'BOT', primary:'#000',    dark:'#000',   stripe:'#000',    city:'Rio de Janeiro', stadium:'Nilton Santos',fans:'4M',  founded:1904, badge:'BFR',  bepass:'botafogo.bepass.com.br' },
];

// Map a match to a "team perspective" — return matches involving this team (home or away)
function matchesForTeam(teamId) {
  const team = TEAMS.find(t => t.id === teamId);
  if (!team) return [];
  const tname = team.name.toLowerCase();
  return MATCHES.filter(m =>
    m.home.name.toLowerCase() === tname || m.away.name.toLowerCase() === tname
  );
}

Object.assign(window, { MATCHES, EXPERIENCES, TIME_SLOTS, TEAMS, matchesForTeam, formatPrice });
