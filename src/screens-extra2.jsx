// Memories + Trust + Explore screens

// EXPLORE — extended catalogue
function ExploreScreen({ navigate, back }) {
  const [tournament, setTournament] = useState('all');
  const torneos = [
    { id:'all', label:'Todos' },
    { id:'lib', label:'Libertadores' },
    { id:'bra', label:'Brasileirão' },
    { id:'sud', label:'Sudamericana' },
  ];
  return (
    <div style={{ padding:'0 18px', paddingBottom: 30 }}>
      <div style={{ paddingTop: 8 }}>
        <TopBar title="Explorar" onBack={back} />
      </div>
      <div style={{
        fontFamily:"'Barlow Condensed'", fontStyle:'italic', fontWeight:700,
        fontSize: 32, lineHeight: 0.95, marginTop: 18, marginBottom: 16, textTransform:'uppercase'
      }}>Todos los partidos<br/>en cartelera</div>

      {/* Filter chips */}
      <div style={{ display:'flex', gap: 8, overflowX:'auto', marginBottom: 18, marginLeft:-18, paddingLeft: 18, paddingRight: 18 }}>
        {torneos.map(f => (
          <button key={f.id} onClick={() => setTournament(f.id)} style={{
            padding:'8px 14px', borderRadius: 999, whiteSpace:'nowrap',
            border: tournament === f.id ? '1px solid #F4F4F0' : '1px solid var(--line-2)',
            background: tournament === f.id ? '#F4F4F0' : 'transparent',
            color: tournament === f.id ? '#0A0A0A' : 'var(--ink)',
            fontSize: 12, fontWeight: 600, cursor:'pointer', fontFamily:'Inter'
          }}>{f.label}</button>
        ))}
      </div>

      {/* Date sections */}
      <div style={{ display:'flex', flexDirection:'column', gap: 22 }}>
        {[
          { date:'ESTA SEMANA', items: MATCHES.slice(0, 2) },
          { date:'PRÓXIMA SEMANA', items: MATCHES.slice(2, 4) },
        ].map(grp => (
          <div key={grp.date}>
            <div style={{
              fontFamily:'JetBrains Mono', fontSize:10, letterSpacing:'0.15em',
              color:'var(--ink-mute)', marginBottom: 10
            }}>{grp.date}</div>
            <div style={{ display:'flex', flexDirection:'column', gap: 10 }}>
              {grp.items.map(m => (
                <div key={m.id} style={{
                  display:'flex', gap:12, padding: 10, borderRadius: 14,
                  background:'rgba(255,255,255,0.03)', border:'1px solid var(--line)',
                  alignItems:'center'
                }}>
                  <div style={{ width: 76, flexShrink: 0 }}>
                    <MatchPoster match={m} height={100} compact />
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:9, color:'var(--ink-mute)', fontFamily:'JetBrains Mono', letterSpacing:'0.1em' }}>{m.league}</div>
                    <div style={{
                      fontFamily:"'Barlow Condensed'", fontStyle:'italic', fontWeight:700,
                      fontSize:18, marginTop:2, textTransform:'uppercase'
                    }}>{m.home.short} × {m.away.short}</div>
                    <div style={{ fontSize:11, color:'var(--ink-dim)', marginTop:4 }}>{m.dateFull} · {m.time}</div>
                    <div style={{ fontSize:10, color:'var(--ink-mute)' }}>{m.stadium}</div>
                  </div>
                  <div style={{ textAlign:'right' }}>
                    <div style={{
                      fontFamily:"'Barlow Condensed'", fontStyle:'italic', fontWeight:700,
                      fontSize:16, color:'#F4F4F0'
                    }}>{formatPrice(m.fromMin)}</div>
                    <AvailabilityChip level={m.availability} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// MEMORIES — past attended matches as a beautiful timeline
function MemoriesScreen({ back }) {
  const memories = [
    {
      match: MATCHES[3], score: '2 — 1', winner: 'home',
      attended: 'Asististe', sector: 'Tribuna Central',
      moment: 'Cano marcó al 87\'',
      photo: 'maracana1'
    },
    {
      match: { ...MATCHES[1], dateFull:'Mié, 04 de Marzo', date:'04 MAR' },
      score: '3 — 0', winner: 'home',
      attended: 'Asististe', sector: 'Galería Sur',
      moment: 'Hat-trick histórico',
      photo: 'maracana2'
    },
    {
      match: { ...MATCHES[0], dateFull:'Dom, 16 de Febrero', date:'16 FEB',
        away:{ name:'Vasco', short:'VAS', color:'#000', accent:'#fff' }, tag:'CLÁSSICO' },
      score: '1 — 1', winner: 'tie',
      attended: 'Asististe', sector: 'Palco VIP',
      moment: 'Empate épico en el 90+4',
      photo: 'maracana3'
    },
  ];

  return (
    <div style={{ padding:'0 18px', paddingBottom: 30 }}>
      <div style={{ paddingTop: 8 }}>
        <TopBar title="Recuerdos" onBack={back} />
      </div>

      {/* Hero stats */}
      <div style={{
        marginTop: 18, padding: 20, borderRadius: 18,
        background: 'linear-gradient(135deg, rgba(31,122,58,0.18), rgba(200,16,46,0.12))',
        border: '1px solid rgba(255,255,255,0.1)', position:'relative', overflow:'hidden'
      }}>
        <div style={{
          position:'absolute', inset:0, opacity: 0.08,
          backgroundImage: 'repeating-linear-gradient(90deg, #fff 0 1px, transparent 1px 6px)'
        }} />
        <div style={{
          fontFamily:'JetBrains Mono', fontSize:10, letterSpacing:'0.15em',
          color:'rgba(255,255,255,0.6)', marginBottom: 8, position:'relative'
        }}>TU TEMPORADA 2026</div>
        <div style={{
          fontFamily:"'Barlow Condensed'", fontStyle:'italic', fontWeight:700,
          fontSize: 38, lineHeight: 0.9, textTransform:'uppercase', position:'relative'
        }}>12 partidos<br/>vividos.</div>
        <div style={{ display:'flex', gap: 14, marginTop: 14, position:'relative' }}>
          {[
            { v:'4', l:'GANADOS' },
            { v:'8.4', l:'★ AVG' },
            { v:'3', l:'ESTADIOS' },
          ].map(s => (
            <div key={s.l} style={{ flex:1 }}>
              <div style={{
                fontFamily:"'Barlow Condensed'", fontStyle:'italic', fontWeight:700,
                fontSize: 22, color:'#F4F4F0'
              }}>{s.v}</div>
              <div style={{ fontSize:9, color:'rgba(255,255,255,0.6)', fontFamily:'JetBrains Mono', letterSpacing:'0.1em' }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{
        fontFamily:'JetBrains Mono', fontSize:10, letterSpacing:'0.15em',
        color:'var(--ink-mute)', marginTop: 22, marginBottom: 12
      }}>TUS ÚLTIMOS PARTIDOS</div>

      <div style={{ display:'flex', flexDirection:'column', gap: 14 }}>
        {memories.map((mem, i) => (
          <MemoryCard key={i} memory={mem} />
        ))}
      </div>

      <div style={{ textAlign:'center', marginTop: 22 }}>
        <button style={{
          padding:'10px 20px', borderRadius: 999,
          border:'1px solid var(--line-2)', background:'rgba(255,255,255,0.03)',
          color:'var(--ink)', fontSize: 12, cursor:'pointer'
        }}>Ver historial completo →</button>
      </div>
    </div>
  );
}

function MemoryCard({ memory }) {
  const m = memory.match;
  const photoStyles = {
    maracana1: 'linear-gradient(135deg, #1a3a1f 0%, #0a1a0d 70%)',
    maracana2: 'linear-gradient(135deg, #2a1a0a 0%, #1a0a05 70%)',
    maracana3: 'linear-gradient(135deg, #1a1a3a 0%, #0a0a1a 70%)',
  };
  return (
    <div style={{
      borderRadius: 16, overflow: 'hidden',
      background:'rgba(255,255,255,0.03)', border:'1px solid var(--line)'
    }}>
      {/* "Photo" placeholder — moody stadium gradient */}
      <div style={{
        height: 140, position:'relative', overflow:'hidden',
        background: photoStyles[memory.photo]
      }}>
        {/* stadium dots/lights */}
        <div style={{
          position:'absolute', inset:0, opacity: 0.35,
          backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(255,255,255,0.5) 1px, transparent 2px), radial-gradient(circle at 70% 70%, rgba(255,255,255,0.4) 1px, transparent 2px), radial-gradient(circle at 50% 60%, rgba(255,255,255,0.3) 1px, transparent 2px)',
          backgroundSize: '40px 40px, 60px 60px, 30px 30px'
        }} />
        <div style={{
          position:'absolute', left:0, right:0, top: '60%', bottom: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.85), transparent)'
        }} />
        {/* Score chip */}
        <div style={{
          position:'absolute', top: 12, right: 12,
          padding:'6px 12px', borderRadius: 8,
          background:'rgba(0,0,0,0.6)', backdropFilter:'blur(8px)',
          fontFamily:"'Barlow Condensed'", fontStyle:'italic', fontWeight:700,
          fontSize: 18, color:'#F4F4F0', letterSpacing:'0.05em'
        }}>{memory.score}</div>
        <div style={{
          position:'absolute', top: 12, left: 12,
          padding:'4px 8px', borderRadius: 6,
          background:'rgba(41,196,107,0.85)', color:'#0A0A0A',
          fontSize: 9, fontWeight:700, fontFamily:'JetBrains Mono', letterSpacing:'0.1em'
        }}>{memory.attended.toUpperCase()}</div>
        {/* Bottom info */}
        <div style={{ position:'absolute', bottom: 12, left: 14, right: 14 }}>
          <div style={{ fontSize:9, color:'rgba(255,255,255,0.7)', fontFamily:'JetBrains Mono', letterSpacing:'0.1em' }}>
            {m.dateFull.toUpperCase()} · {m.stadium.toUpperCase()}
          </div>
          <div style={{
            fontFamily:"'Barlow Condensed'", fontStyle:'italic', fontWeight:700,
            fontSize: 22, color:'#fff', textTransform:'uppercase', marginTop: 2, lineHeight:1
          }}>{m.home.short} × {m.away.short}</div>
        </div>
      </div>
      <div style={{ padding: 12, display:'flex', alignItems:'center', justifyContent:'space-between', gap: 10 }}>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ fontSize:11, color:'var(--ink-dim)' }}>{memory.moment}</div>
          <div style={{ fontSize:10, color:'var(--ink-mute)', marginTop:2 }}>{memory.sector}</div>
        </div>
        <button style={{
          padding:'6px 10px', borderRadius: 8,
          background:'rgba(255,255,255,0.06)', border:'1px solid var(--line-2)',
          color:'#F4F4F0', fontSize: 10, cursor:'pointer', fontFamily:'JetBrains Mono', letterSpacing:'0.05em'
        }}>VER TICKET</button>
      </div>
    </div>
  );
}

// TRUST — about / how it works / guarantees
function TrustScreen({ back }) {
  return (
    <div style={{ padding:'0 18px', paddingBottom: 30 }}>
      <div style={{ paddingTop: 8 }}>
        <TopBar title="¿Por qué FE?" onBack={back} />
      </div>

      <div style={{
        fontFamily:"'Barlow Condensed'", fontStyle:'italic', fontWeight:700,
        fontSize: 38, lineHeight: 0.9, marginTop: 18, marginBottom: 6, textTransform:'uppercase'
      }}>Reserva con<br/>cero ansiedad.</div>
      <div style={{ fontSize:12, color:'var(--ink-dim)', marginBottom: 20 }}>
        Anfitrión real por WhatsApp, ticket inmediato y soporte cuando lo necesites.
      </div>

      {/* Trust pillars */}
      <div style={{ display:'flex', flexDirection:'column', gap: 10, marginBottom: 22 }}>
        {[
          { icon:'shield', title:'Pago directo con tu anfitrión', sub:'Confirmas precio final y forma de pago por WhatsApp. Nunca cargamos tu tarjeta en la app.' },
          { icon:'bolt', title:'Ticket en 5 segundos', sub:'Tu QR llega a Apple Wallet o Google Wallet al instante, listo para el acceso.' },
          { icon:'refund', title:'Reembolso si se suspende', sub:'Si el partido se cancela, te devolvemos el 100% en menos de 7 días hábiles.' },
          { icon:'chat', title:'Soporte 24/7 los partidos', sub:'Chat in-app con respuesta en menos de 5 minutos en horario de partido.' },
        ].map(p => (
          <TrustRow key={p.title} {...p} />
        ))}
      </div>

      {/* Social proof */}
      <div style={{
        padding: 18, borderRadius: 16,
        background:'rgba(255,255,255,0.04)', border:'1px solid var(--line)',
        marginBottom: 18
      }}>
        <div style={{ display:'flex', alignItems:'center', gap: 10, marginBottom: 14 }}>
          <div style={{ display:'flex' }}>
            {['LR','MS','PV','JC'].map((x,i) => (
              <div key={i} style={{
                width: 28, height: 28, borderRadius:'50%',
                background: ['#7a1d1d','#1f7a3a','#1a3a8f','#a8893f'][i],
                marginLeft: i ? -8 : 0, color:'#fff',
                display:'flex', alignItems:'center', justifyContent:'center',
                fontSize: 10, fontWeight:600, border:'2px solid #0A0A0A',
                fontFamily:"'Barlow Condensed'", fontStyle:'italic'
              }}>{x}</div>
            ))}
          </div>
          <div>
            <div style={{
              fontFamily:"'Barlow Condensed'", fontStyle:'italic', fontWeight:700,
              fontSize: 20, color:'#F4F4F0'
            }}>+24.000 hinchas</div>
            <div style={{ fontSize: 11, color:'var(--ink-dim)' }}>han reservado este mes</div>
          </div>
        </div>
        <div style={{
          padding: 12, borderRadius: 10,
          background:'rgba(255,255,255,0.04)', border:'1px solid var(--line)'
        }}>
          <div style={{ display:'flex', gap: 2, marginBottom: 6 }}>
            {[1,2,3,4,5].map(i => (
              <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="var(--green-bright)">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
              </svg>
            ))}
            <span style={{ marginLeft: 6, fontSize:11, color:'var(--ink-dim)' }}>Mariana, hincha del Flu</span>
          </div>
          <div style={{ fontSize: 12, color:'#F4F4F0', lineHeight: 1.5, fontStyle:'italic' }}>
            "Tres toques y estoy en el Maracaná. Antes me tomaba 20 minutos."
          </div>
        </div>
      </div>

      {/* Confianza */}
      <div style={{
        fontFamily:'JetBrains Mono', fontSize:10, letterSpacing:'0.15em',
        color:'var(--ink-mute)', marginBottom: 10
      }}>CÓMO RESERVAS</div>
      <div style={{
        display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap: 8
      }}>
        {['Anfitrión real', 'Precio referencial', 'Pago por WhatsApp'].map(c => (
          <div key={c} style={{
            padding: 12, borderRadius: 10, textAlign:'center',
            background:'rgba(255,255,255,0.03)', border:'1px solid var(--line)'
          }}>
            <div style={{
              fontFamily:"'Barlow Condensed'", fontStyle:'italic', fontWeight:700,
              fontSize: 13, color:'#F4F4F0', lineHeight:1.1
            }}>{c}</div>
            <div style={{ fontSize: 9, color:'var(--ink-mute)', fontFamily:'JetBrains Mono', letterSpacing:'0.05em', marginTop:2 }}>CONFIRMADO</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TrustRow({ icon, title, sub }) {
  const icons = {
    shield: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 22S20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/><path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>,
    bolt: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg>,
    refund: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M3 12C3 7 7 3 12 3C16 3 19 5.5 20.5 9M21 12C21 17 17 21 12 21C8 21 5 18.5 3.5 15M21 4V9H16M3 20V15H8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    chat: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M21 15C21 16.1 20.1 17 19 17H7L3 21V5C3 3.9 3.9 3 5 3H19C20.1 3 21 3.9 21 5V15Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg>,
  };
  return (
    <div style={{
      padding: 14, borderRadius: 14,
      background:'rgba(255,255,255,0.03)', border:'1px solid var(--line)',
      display:'flex', gap: 12, alignItems:'flex-start'
    }}>
      <div style={{
        width: 38, height: 38, borderRadius: 10, flexShrink: 0,
        background: 'rgba(41,196,107,0.12)', color:'var(--green-bright)',
        display:'flex', alignItems:'center', justifyContent:'center'
      }}>{icons[icon]}</div>
      <div style={{ flex:1 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color:'#F4F4F0' }}>{title}</div>
        <div style={{ fontSize: 11, color:'var(--ink-dim)', marginTop: 3, lineHeight: 1.5 }}>{sub}</div>
      </div>
    </div>
  );
}

Object.assign(window, { ExploreScreen, MemoriesScreen, TrustScreen });
