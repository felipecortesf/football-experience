// Home + Match selection screens
const { useState: useStateHome } = React;

function HomeScreen({ navigate }) {
  const [filter, setFilter] = useState('all');
  const filters = [
    { id: 'all', label: 'Todos' },
    { id: 'libertadores', label: 'Libertadores' },
    { id: 'brasileirao', label: 'Brasileirão' },
    { id: 'sudamericana', label: 'Sudamericana' },
  ];

  const filtered = filter === 'all' ? MATCHES :
    MATCHES.filter(m => m.poster.toLowerCase().includes(filter) || m.league.toLowerCase().includes(filter));

  return (
    <div style={{ padding: '0 18px', paddingBottom: 110 }}>
      {/* Header */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', paddingTop: 14, paddingBottom: 18 }}>
        <FELogo size={14} />
        <div style={{ display:'flex', gap: 8 }}>
          <IconButton onClick={() => navigate('reservas')}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 11H15M9 15H13M7 3H17C18.1 3 19 3.9 19 5V21L12 18L5 21V5C5 3.9 5.9 3 7 3Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </IconButton>
          <IconButton onClick={() => navigate('profile')}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M20 21V19C20 16.79 18.21 15 16 15H8C5.79 15 4 16.79 4 19V21M16 7C16 9.21 14.21 11 12 11C9.79 11 8 9.21 8 7C8 4.79 9.79 3 12 3C14.21 3 16 4.79 16 7Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </IconButton>
        </div>
      </div>

      {/* Greeting */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 12, color:'var(--ink-mute)', fontFamily:'JetBrains Mono', letterSpacing:'0.1em', marginBottom: 4 }}>
          OLÁ, RAFAEL
        </div>
        <div style={{
          fontFamily:'Barlow Condensed', fontStyle:'italic', fontWeight:700,
          fontSize: 36, lineHeight: 0.95, textTransform:'uppercase'
        }}>
          ¿A qué partido<br/>vas hoy?
        </div>
      </div>

      {/* Search */}
      <div style={{
        display:'flex', alignItems:'center', gap:10, padding:'12px 14px',
        background:'rgba(255,255,255,0.05)', border:'1px solid var(--line)',
        borderRadius: 14, marginBottom: 14
      }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ color:'var(--ink-mute)' }}>
          <path d="M21 21L16.65 16.65M19 11C19 15.42 15.42 19 11 19C6.58 19 3 15.42 3 11C3 6.58 6.58 3 11 3C15.42 3 19 6.58 19 11Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <div style={{ fontSize:13, color:'var(--ink-mute)' }}>Equipo, torneo o estadio…</div>
      </div>

      {/* Filters */}
      <div style={{ display:'flex', gap: 8, overflowX:'auto', marginBottom: 18, marginLeft:-18, paddingLeft: 18, paddingRight: 18 }}>
        {filters.map(f => (
          <button key={f.id} onClick={() => setFilter(f.id)} style={{
            padding:'8px 14px', borderRadius: 999, whiteSpace:'nowrap',
            border: filter === f.id ? '1px solid #F4F4F0' : '1px solid var(--line-2)',
            background: filter === f.id ? '#F4F4F0' : 'transparent',
            color: filter === f.id ? '#0A0A0A' : 'var(--ink)',
            fontSize: 12, fontWeight: 600, cursor:'pointer',
            fontFamily:'Inter'
          }}>{f.label}</button>
        ))}
      </div>

      {/* Featured next match — large card */}
      <div style={{
        fontFamily:'JetBrains Mono', fontSize:10, letterSpacing:'0.15em',
        color:'var(--ink-mute)', marginBottom: 10, display:'flex', alignItems:'center', gap:6
      }}>
        <span style={{ width:6, height:6, borderRadius:'50%', background: 'var(--green-bright)', boxShadow:'0 0 8px var(--green-bright)' }} />
        DESTACADO · ESTA SEMANA
      </div>
      <div onClick={() => navigate('match', { match: MATCHES[0] })} style={{ cursor:'pointer', marginBottom: 24 }}>
        <MatchPoster match={MATCHES[0]} height={250} />
        <div style={{ marginTop: 10, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div>
            <div style={{ fontSize:11, color:'var(--ink-mute)', fontFamily:'JetBrains Mono', letterSpacing:'0.08em' }}>{MATCHES[0].stadium.toUpperCase()} · {MATCHES[0].city.toUpperCase()}</div>
            <div style={{ fontSize:14, color:'var(--ink)', fontWeight:600, marginTop:2 }}>Desde {formatPrice(MATCHES[0].fromMin)}</div>
          </div>
          <div style={{
            padding:'6px 10px', borderRadius:8, background:'rgba(41,196,107,0.15)',
            color:'var(--green-bright)', fontSize:10, fontWeight:600,
            fontFamily:'JetBrains Mono', letterSpacing:'0.1em'
          }}>DISPONIBLE</div>
        </div>
      </div>

      {/* Upcoming list */}
      <div style={{
        fontFamily:'JetBrains Mono', fontSize:10, letterSpacing:'0.15em',
        color:'var(--ink-mute)', marginBottom: 12
      }}>
        PRÓXIMOS PARTIDOS
      </div>
      <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
        {MATCHES.slice(1).map(m => (
          <div key={m.id} onClick={() => navigate('match', { match: m })} style={{
            display:'flex', gap: 12, padding: 10, borderRadius: 14,
            background:'rgba(255,255,255,0.03)', border:'1px solid var(--line)',
            cursor:'pointer', alignItems:'center'
          }}>
            <div style={{ width:80, flexShrink:0 }}>
              <MatchPoster match={m} height={104} compact />
            </div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{
                fontSize:9, letterSpacing:'0.12em', color:'var(--ink-mute)',
                fontFamily:'JetBrains Mono'
              }}>{m.league}</div>
              <div style={{
                fontFamily:'Barlow Condensed', fontStyle:'italic', fontWeight:700,
                fontSize:18, lineHeight: 1, marginTop:2, textTransform:'uppercase'
              }}>{m.home.short} <span style={{color:'var(--ink-mute)'}}>×</span> {m.away.short}</div>
              <div style={{ fontSize:11, color:'var(--ink-dim)', marginTop:6 }}>
                {m.dateFull} · {m.time}
              </div>
              <div style={{ fontSize:11, color:'var(--ink-mute)', marginTop:2 }}>
                {m.stadium}
              </div>
            </div>
            <div style={{ textAlign:'right', flexShrink:0 }}>
              <div style={{ fontSize:9, color:'var(--ink-mute)', fontFamily:'JetBrains Mono', letterSpacing:'0.1em' }}>DESDE</div>
              <div style={{
                fontFamily:'Barlow Condensed', fontStyle:'italic', fontWeight:700,
                fontSize:18, color:'#F4F4F0'
              }}>{formatPrice(m.fromMin)}</div>
              <AvailabilityChip level={m.availability} />
            </div>
          </div>
        ))}
      </div>
      {/* Quick links to other sections */}
      <div style={{
        display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap: 8, marginTop: 22, marginBottom: 22
      }}>
        <QuickLink label="Explorar" sub="Cartelera" onClick={() => navigate('explore')} icon="search" />
        <QuickLink label="Recuerdos" sub="Tu historia" onClick={() => navigate('memories')} icon="history" />
        <QuickLink label="¿Por qué FE?" sub="Garantías" onClick={() => navigate('trust')} icon="shield" />
      </div>
    </div>
  );
}

function QuickLink({ label, sub, onClick, icon }) {
  const icons = {
    search: <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M21 21L16.65 16.65M19 11C19 15.42 15.42 19 11 19C6.58 19 3 15.42 3 11C3 6.58 6.58 3 11 3C15.42 3 19 6.58 19 11Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>,
    history: <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M3 12C3 7 7 3 12 3C16 3 19 5.5 20.5 9M21 12C21 17 17 21 12 21C8 21 5 18.5 3.5 15M21 4V9H16M3 20V15H8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    shield: <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 22S20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg>,
  };
  return (
    <button onClick={onClick} style={{
      padding: 12, borderRadius: 12, cursor:'pointer', textAlign:'left',
      background:'rgba(255,255,255,0.03)', border:'1px solid var(--line)',
      color:'var(--ink)'
    }}>
      <div style={{ color:'var(--green-bright)', marginBottom: 6 }}>{icons[icon]}</div>
      <div style={{ fontSize: 12, fontWeight: 600, color:'#F4F4F0' }}>{label}</div>
      <div style={{ fontSize: 10, color:'var(--ink-mute)', marginTop: 1 }}>{sub}</div>
    </button>
  );
}

function IconButton({ children, onClick }) {
  return (
    <button onClick={onClick} style={{
      width:36, height:36, borderRadius:'50%',
      border:'1px solid var(--line-2)', background:'rgba(255,255,255,0.04)',
      color:'var(--ink)', display:'flex', alignItems:'center', justifyContent:'center',
      cursor:'pointer'
    }}>{children}</button>
  );
}

function AvailabilityChip({ level }) {
  const map = {
    high: { color: 'var(--green-bright)', label: 'ALTA' },
    medium: { color: '#d6b96a', label: 'MEDIA' },
    low: { color: '#e85d3a', label: 'BAJA' },
  };
  const c = map[level] || map.high;
  return (
    <div style={{
      marginTop: 4, fontSize:9, color: c.color, fontFamily:'JetBrains Mono',
      letterSpacing:'0.1em', display:'flex', alignItems:'center', gap:4, justifyContent:'flex-end'
    }}>
      <span style={{ width:5, height:5, borderRadius:'50%', background: c.color }} />
      {c.label}
    </div>
  );
}

// Match detail screen
function MatchDetailScreen({ match, navigate, back }) {
  return (
    <div style={{ padding:'0 18px', paddingBottom: 120 }}>
      <div style={{ paddingTop: 8 }}>
        <TopBar title="Detalle" onBack={back} right={
          <IconButton><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M20.84 4.61C19.32 3.09 16.94 3.09 15.42 4.61L12 8.03L8.58 4.61C7.06 3.09 4.68 3.09 3.16 4.61C1.64 6.13 1.64 8.51 3.16 10.03L12 18.87L20.84 10.03C22.36 8.51 22.36 6.13 20.84 4.61Z" stroke="currentColor" strokeWidth="1.6"/></svg></IconButton>
        } />
      </div>

      <div style={{ marginTop: 8, marginBottom: 18 }}>
        <MatchPoster match={match} height={300} />
      </div>

      {/* Match info */}
      <div style={{
        padding: 16, borderRadius: 14, background:'rgba(255,255,255,0.04)',
        border:'1px solid var(--line)', marginBottom: 16
      }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap: 14 }}>
          <InfoCell icon="cal" label="Fecha" value={match.dateFull} />
          <InfoCell icon="clock" label="Hora" value={match.time} />
          <InfoCell icon="pin" label="Estadio" value={match.stadium} />
          <InfoCell icon="city" label="Ciudad" value={match.city} />
        </div>
      </div>

      {/* Sectors availability preview */}
      <div style={{
        fontFamily:'JetBrains Mono', fontSize:10, letterSpacing:'0.15em',
        color:'var(--ink-mute)', marginBottom: 10
      }}>DISPONIBILIDAD</div>
      <div style={{ display:'flex', gap:8, marginBottom: 18 }}>
        {[
          { name:'Galería', level:'high' },
          { name:'Tribuna', level:'medium' },
          { name:'Palco VIP', level:'low' },
        ].map(s => (
          <div key={s.name} style={{
            flex:1, padding: 10, borderRadius: 10,
            background:'rgba(255,255,255,0.03)', border:'1px solid var(--line)'
          }}>
            <div style={{ fontSize:11, color:'var(--ink-dim)', marginBottom:4 }}>{s.name}</div>
            <AvailabilityChip level={s.level} />
          </div>
        ))}
      </div>

      <div style={{
        fontFamily:'JetBrains Mono', fontSize:10, letterSpacing:'0.15em',
        color:'var(--ink-mute)', marginBottom: 8
      }}>DESCRIPCIÓN</div>
      <p style={{ fontSize: 13, color:'var(--ink-dim)', lineHeight:1.5, marginTop: 0 }}>
        Vive la pasión del {match.tag.toLowerCase()} en el {match.stadium}. Asientos numerados, accesos rápidos y ticket digital al instante.
      </p>

      <StickyCTA
        total={match.fromMin}
        hint="desde · por persona"
        label="Reservar"
        onPress={() => navigate('flow', { match, step: 1 })}
      />
    </div>
  );
}

function InfoCell({ icon, label, value }) {
  const icons = {
    cal: <path d="M19 4H5C3.9 4 3 4.9 3 6V20C3 21.1 3.9 22 5 22H19C20.1 22 21 21.1 21 20V6C21 4.9 20.1 4 19 4ZM3 10H21M16 2V6M8 2V6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>,
    clock: <><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6"/><path d="M12 7V12L15 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></>,
    pin: <><path d="M21 10C21 17 12 22 12 22C12 22 3 17 3 10C3 7.61 3.95 5.32 5.64 3.64C7.32 1.95 9.61 1 12 1C14.39 1 16.68 1.95 18.36 3.64C20.05 5.32 21 7.61 21 10Z" stroke="currentColor" strokeWidth="1.6"/><circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.6"/></>,
    city: <><path d="M3 21H21M5 21V7L13 3V21M19 21V11L13 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></>,
  };
  return (
    <div style={{ display:'flex', gap:10, alignItems:'flex-start' }}>
      <div style={{ width:32, height:32, borderRadius: 8, background:'rgba(255,255,255,0.06)',
        display:'flex', alignItems:'center', justifyContent:'center', color:'#F4F4F0', flexShrink:0 }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">{icons[icon]}</svg>
      </div>
      <div>
        <div style={{ fontSize:9, color:'var(--ink-mute)', fontFamily:'JetBrains Mono', letterSpacing:'0.1em' }}>{label.toUpperCase()}</div>
        <div style={{ fontSize:13, color:'#F4F4F0', fontWeight:500, marginTop:2 }}>{value}</div>
      </div>
    </div>
  );
}

Object.assign(window, { HomeScreen, MatchDetailScreen, IconButton, AvailabilityChip });
