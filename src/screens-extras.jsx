// Mis reservas + profile

function ReservasScreen({ navigate, back }) {
  const [tab, setTab] = useState('upcoming');

  const upcoming = [
    { id:'FE-7HQ29X', match: MATCHES[0], exp: EXPERIENCES[1], status:'CONFIRMADA' },
    { id:'FE-K3M1LP', match: MATCHES[1], exp: EXPERIENCES[0], status:'CONFIRMADA' },
  ];
  const history = [
    { id:'FE-2BX98D', match: MATCHES[3], exp: EXPERIENCES[1], status:'USADA' },
  ];

  const list = tab === 'upcoming' ? upcoming : history;

  return (
    <div style={{ padding:'0 18px', paddingBottom: 30 }}>
      <div style={{ paddingTop: 8 }}>
        <TopBar title="Mis Reservas" onBack={back} />
      </div>

      <div style={{
        fontFamily:'Barlow Condensed', fontStyle:'italic', fontWeight:700,
        fontSize: 32, lineHeight: 0.95, marginTop: 18, marginBottom: 18, textTransform:'uppercase'
      }}>Tu temporada,<br/>tu archivo.</div>

      {/* Tabs */}
      <div style={{
        display:'flex', gap: 4, padding: 4, borderRadius: 12,
        background:'rgba(255,255,255,0.04)', border:'1px solid var(--line)',
        marginBottom: 16
      }}>
        {[
          { id:'upcoming', label:'Próximas' },
          { id:'history', label:'Historial' },
        ].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            flex:1, padding: '10px 12px', borderRadius: 8,
            background: tab === t.id ? '#F4F4F0' : 'transparent',
            color: tab === t.id ? '#0A0A0A' : 'var(--ink-dim)',
            border:'none', cursor:'pointer', fontWeight: 600, fontSize: 12,
            fontFamily:'Inter'
          }}>{t.label}</button>
        ))}
      </div>

      <div style={{ display:'flex', flexDirection:'column', gap: 12 }}>
        {list.map(r => (
          <div key={r.id} style={{
            padding: 12, borderRadius: 14,
            background:'rgba(255,255,255,0.03)', border:'1px solid var(--line)',
            display:'flex', gap: 12
          }}>
            <div style={{ width: 64, flexShrink:0 }}>
              <MatchPoster match={r.match} height={84} compact />
            </div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{
                fontSize:9, color: r.status==='USADA' ? 'var(--ink-mute)':'var(--green-bright)',
                fontFamily:'JetBrains Mono', letterSpacing:'0.1em',
                display:'flex', alignItems:'center', gap:5
              }}>
                <span style={{ width:5, height:5, borderRadius:'50%',
                  background: r.status==='USADA' ? 'var(--ink-mute)':'var(--green-bright)'}} />
                {r.status}
              </div>
              <div style={{
                fontFamily:'Barlow Condensed', fontStyle:'italic', fontWeight:700,
                fontSize: 16, marginTop:3, textTransform:'uppercase'
              }}>{r.match.home.short} × {r.match.away.short}</div>
              <div style={{ fontSize: 11, color:'var(--ink-dim)', marginTop:2 }}>
                {r.match.dateFull} · {r.match.time}
              </div>
              <div style={{ fontSize: 11, color:'var(--ink-mute)', marginTop:1 }}>
                {r.exp.name} · {r.id}
              </div>
            </div>
            {tab === 'upcoming' && (
              <button style={{
                alignSelf:'center', padding:'8px 12px', borderRadius: 10,
                border:'1px solid var(--line-2)', background:'rgba(255,255,255,0.04)',
                color:'#F4F4F0', fontSize: 11, cursor:'pointer', fontFamily:'Inter', fontWeight:500
              }}>Ticket</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ProfileScreen({ back }) {
  return (
    <div style={{ padding:'0 18px', paddingBottom: 30 }}>
      <div style={{ paddingTop: 8 }}>
        <TopBar title="Perfil" onBack={back} />
      </div>

      <div style={{ textAlign:'center', marginTop: 22, marginBottom: 22 }}>
        <div style={{
          width: 72, height: 72, borderRadius:'50%',
          background:'linear-gradient(135deg, #1f7a3a, #c8102e)',
          display:'inline-flex', alignItems:'center', justifyContent:'center',
          fontFamily:'Barlow Condensed', fontStyle:'italic', fontWeight:700, fontSize: 28,
          color:'#fff', marginBottom: 12
        }}>RA</div>
        <div style={{
          fontFamily:'Barlow Condensed', fontStyle:'italic', fontWeight:700,
          fontSize: 22, textTransform:'uppercase'
        }}>Rafael Andrade</div>
        <div style={{ fontSize: 12, color:'var(--ink-dim)' }}>Hincha desde 2023</div>
      </div>

      {/* Stats */}
      <div style={{
        display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap: 8,
        marginBottom: 22
      }}>
        {[
          { v:'12', l:'Partidos' },
          { v:'4', l:'Estadios' },
          { v:'2', l:'Próximos' },
        ].map(s => (
          <div key={s.l} style={{
            padding: 14, borderRadius: 12,
            background:'rgba(255,255,255,0.03)', border:'1px solid var(--line)',
            textAlign:'center'
          }}>
            <div style={{
              fontFamily:'Barlow Condensed', fontStyle:'italic', fontWeight:700,
              fontSize: 26, color:'#F4F4F0'
            }}>{s.v}</div>
            <div style={{ fontSize: 10, color:'var(--ink-mute)', fontFamily:'JetBrains Mono', letterSpacing:'0.1em', marginTop:2 }}>
              {s.l.toUpperCase()}
            </div>
          </div>
        ))}
      </div>

      <div style={{
        fontFamily:'JetBrains Mono', fontSize:10, letterSpacing:'0.15em',
        color:'var(--ink-mute)', marginBottom: 10
      }}>AJUSTES</div>
      <div style={{
        borderRadius: 14, overflow:'hidden',
        background:'rgba(255,255,255,0.03)', border:'1px solid var(--line)'
      }}>
        {[
          'Métodos de pago',
          'Notificaciones',
          'Idioma · Español',
          'Privacidad',
          'Soporte',
        ].map((x, i, arr) => (
          <div key={x} style={{
            padding: '14px 14px', display:'flex', justifyContent:'space-between', alignItems:'center',
            borderBottom: i < arr.length-1 ? '1px solid var(--line)' : 'none',
            fontSize: 13, color:'#F4F4F0', cursor:'pointer'
          }}>
            <span>{x}</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ color:'var(--ink-mute)' }}>
              <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { ReservasScreen, ProfileScreen });
