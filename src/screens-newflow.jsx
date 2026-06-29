// New flow screens: TeamSelect, TeamMatches, FacialOnboarding, WhatsAppHandoff,
// BoardingStatus, FacialCheckin

// ─────────────────────────────────────────────────────────
// 01. SELECT TEAM (entry point)
// ─────────────────────────────────────────────────────────
function TeamSelectScreen({ onSelect, onSkip }) {
  const [picked, setPicked] = useState(null);

  return (
    <div style={{ padding:'0 18px', paddingBottom: 130, height:'100%', overflowY:'auto' }}>
      <div style={{ paddingTop: 14, display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom: 18 }}>
        <FELogo size={14} />
        {onSkip && (
          <button onClick={onSkip} style={{
            background:'transparent', border:'none', color:'var(--ink-mute)',
            fontSize:12, fontFamily:'JetBrains Mono', letterSpacing:'0.08em', cursor:'pointer'
          }}>OMITIR →</button>
        )}
      </div>

      <div style={{ marginBottom: 6, fontSize:11, color:'var(--ink-mute)', fontFamily:'JetBrains Mono', letterSpacing:'0.15em' }}>
        PASO 01 · TU EQUIPO
      </div>
      <div style={{
        fontFamily:'Barlow Condensed', fontStyle:'italic', fontWeight:700,
        fontSize: 38, lineHeight: 0.9, marginBottom: 8, textTransform:'uppercase'
      }}>¿De qué equipo<br/>eres hincha?</div>
      <div style={{ fontSize: 13, color:'var(--ink-dim)', marginBottom: 22, lineHeight: 1.5 }}>
        Te avisaremos de cada partido y tendrás acceso al registro biométrico de tu club.
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap: 10, marginBottom: 18 }}>
        {TEAMS.map(team => (
          <TeamCard key={team.id} team={team} selected={picked === team.id} onClick={() => setPicked(team.id)} />
        ))}
      </div>

      <div style={{
        padding:12, borderRadius: 10, background:'rgba(255,255,255,0.03)',
        border:'1px dashed var(--line-2)', fontSize:11, color:'var(--ink-mute)',
        display:'flex', gap:8, alignItems:'flex-start', lineHeight:1.5
      }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ flexShrink:0, marginTop:1 }}>
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M12 8V13M12 16V16.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        <div>Cada equipo tiene su propio registro biométrico. Podrás cambiarlo en Perfil.</div>
      </div>

      <StickyCTA
        label="Continuar"
        hint={picked ? `${TEAMS.find(t=>t.id===picked).name} · 1 selección` : 'Selecciona un equipo'}
        disabled={!picked}
        onPress={() => picked && onSelect(picked)}
      />
    </div>
  );
}

function TeamCard({ team, selected, onClick }) {
  return (
    <button onClick={onClick} style={{
      position:'relative', cursor:'pointer', textAlign:'left',
      padding: 14, borderRadius: 16, height: 160,
      border: selected ? '1.5px solid var(--green-bright)' : '1px solid var(--line-2)',
      background: selected ? 'rgba(41,196,107,0.06)' : 'rgba(255,255,255,0.03)',
      color:'var(--ink)', overflow:'hidden',
      display:'flex', flexDirection:'column', justifyContent:'space-between'
    }}>
      <TeamCrest team={team} size={56} />
      <div>
        <div style={{
          fontFamily:'Barlow Condensed', fontStyle:'italic', fontWeight:700,
          fontSize: 22, lineHeight: 0.95, textTransform:'uppercase', color:'#F4F4F0'
        }}>{team.name}</div>
        <div style={{ fontSize: 10, color:'var(--ink-mute)', fontFamily:'JetBrains Mono', letterSpacing:'0.1em', marginTop: 4 }}>
          {team.fans} HINCHAS · {team.founded}
        </div>
      </div>
      {selected && (
        <div style={{
          position:'absolute', top:10, right:10,
          width: 22, height: 22, borderRadius:'50%',
          background:'var(--green-bright)', color:'#0A0A0A',
          display:'flex', alignItems:'center', justifyContent:'center'
        }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <path d="M5 12L10 17L20 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      )}
    </button>
  );
}

function TeamCrest({ team, size = 48 }) {
  // Stylized crest using stripes/colors per team
  const styles = {
    flamengo: (
      <div style={{
        width: size, height: size, borderRadius: 8,
        background: `repeating-linear-gradient(0deg, #c8102e 0 ${size/8}px, #000 ${size/8}px ${size/4}px)`,
        position:'relative', overflow:'hidden',
        display:'flex', alignItems:'center', justifyContent:'center'
      }}>
        <span style={{ fontFamily:'Barlow Condensed', fontStyle:'italic', fontWeight:700, color:'#fff', fontSize: size/2.4, textShadow:'0 1px 2px rgba(0,0,0,0.5)' }}>F</span>
      </div>
    ),
    fluminense: (
      <div style={{
        width: size, height: size, borderRadius: 8,
        background: `repeating-linear-gradient(90deg, #7a1d1d 0 ${size/8}px, #0e5c2f ${size/8}px ${size/4}px, #fff ${size/4}px ${size/4 + size/16}px)`,
        display:'flex', alignItems:'center', justifyContent:'center'
      }}>
        <span style={{ fontFamily:'Barlow Condensed', fontStyle:'italic', fontWeight:700, color:'#fff', fontSize: size/2.4, textShadow:'0 1px 2px rgba(0,0,0,0.7)' }}>F</span>
      </div>
    ),
    vasco: (
      <div style={{
        width: size, height: size, borderRadius: 8, background:'#000',
        display:'flex', alignItems:'center', justifyContent:'center', position:'relative'
      }}>
        <div style={{
          position:'absolute', top:'50%', left:0, right:0, height: size/8, marginTop:-size/16,
          background:'#fff', transform:'rotate(-25deg)'
        }} />
        <span style={{ fontFamily:'Barlow Condensed', fontStyle:'italic', fontWeight:700, color:'#fff', fontSize: size/2.4, position:'relative', zIndex: 2 }}>V</span>
      </div>
    ),
    botafogo: (
      <div style={{
        width: size, height: size, borderRadius: 8, background:'#000',
        display:'flex', alignItems:'center', justifyContent:'center'
      }}>
        <div style={{ width: size/2.5, height: size/2.5, borderRadius:'50%', background:'#fff' }} />
      </div>
    ),
  };
  return styles[team.id] || null;
}

// ─────────────────────────────────────────────────────────
// 02. TEAM MATCHES — list of matches for chosen team, with filters
// ─────────────────────────────────────────────────────────
function TeamMatchesScreen({ teamId, navigate, back }) {
  const team = TEAMS.find(t => t.id === teamId) || TEAMS[0];
  const [comp, setComp] = useState('all');
  const [when, setWhen] = useState('all');

  const all = matchesForTeam(teamId);
  const competitions = ['all', ...new Set(all.map(m => m.league))];
  const filtered = all.filter(m => {
    if (comp !== 'all' && m.league !== comp) return false;
    return true;
  });

  return (
    <div style={{ padding:'0 18px', paddingBottom: 30, height:'100%', overflowY:'auto' }}>
      <div style={{ paddingTop: 8 }}>
        <TopBar title={team.name} onBack={back} right={<IconButton onClick={() => navigate('profile')}><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M20 21V19C20 16.79 18.21 15 16 15H8C5.79 15 4 16.79 4 19V21M16 7C16 9.21 14.21 11 12 11C9.79 11 8 9.21 8 7C8 4.79 9.79 3 12 3C14.21 3 16 4.79 16 7Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg></IconButton>} />
      </div>

      {/* Team identity hero */}
      <div style={{
        display:'flex', alignItems:'center', gap: 14,
        padding: 16, borderRadius: 16, marginTop: 12, marginBottom: 18,
        background: `linear-gradient(135deg, ${team.primary}30, ${team.dark}20)`,
        border:'1px solid var(--line)'
      }}>
        <TeamCrest team={team} size={56} />
        <div style={{ flex:1 }}>
          <div style={{ fontSize:10, fontFamily:'JetBrains Mono', letterSpacing:'0.12em', color:'var(--ink-mute)' }}>HINCHA OFICIAL</div>
          <div style={{ fontFamily:'Barlow Condensed', fontStyle:'italic', fontWeight:700, fontSize: 24, textTransform:'uppercase', lineHeight:1 }}>{team.name}</div>
          <div style={{ fontSize:11, color:'var(--ink-dim)', marginTop:3 }}>{team.stadium} · {team.city}</div>
        </div>
        <button onClick={() => navigate('teamSelect')} style={{
          background:'transparent', border:'1px solid var(--line-2)', color:'var(--ink)',
          padding:'6px 10px', borderRadius:8, fontSize: 10, cursor:'pointer',
          fontFamily:'JetBrains Mono', letterSpacing:'0.05em'
        }}>CAMBIAR</button>
      </div>

      {/* Filters */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize:10, fontFamily:'JetBrains Mono', letterSpacing:'0.15em', color:'var(--ink-mute)', marginBottom: 8 }}>
          COMPETICIÓN
        </div>
        <div style={{ display:'flex', gap: 8, overflowX:'auto', marginLeft:-18, paddingLeft: 18, paddingRight:18, marginBottom: 12 }}>
          {competitions.map(c => (
            <button key={c} onClick={() => setComp(c)} style={{
              padding:'7px 12px', borderRadius: 999, whiteSpace:'nowrap',
              border: comp === c ? '1px solid #F4F4F0' : '1px solid var(--line-2)',
              background: comp === c ? '#F4F4F0' : 'transparent',
              color: comp === c ? '#0A0A0A' : 'var(--ink)',
              fontSize: 11, fontWeight: 600, cursor:'pointer'
            }}>{c === 'all' ? 'Todas' : c}</button>
          ))}
        </div>
        <div style={{ fontSize:10, fontFamily:'JetBrains Mono', letterSpacing:'0.15em', color:'var(--ink-mute)', marginBottom: 8 }}>
          FECHA
        </div>
        <div style={{ display:'flex', gap: 8 }}>
          {[
            { id:'all', label:'Todos' },
            { id:'week', label:'Esta semana' },
            { id:'month', label:'Este mes' },
          ].map(w => (
            <button key={w.id} onClick={() => setWhen(w.id)} style={{
              padding:'7px 12px', borderRadius: 999,
              border: when === w.id ? '1px solid #F4F4F0' : '1px solid var(--line-2)',
              background: when === w.id ? '#F4F4F0' : 'transparent',
              color: when === w.id ? '#0A0A0A' : 'var(--ink)',
              fontSize: 11, fontWeight: 600, cursor:'pointer'
            }}>{w.label}</button>
          ))}
        </div>
      </div>

      {/* Match list */}
      <div style={{ fontSize:10, fontFamily:'JetBrains Mono', letterSpacing:'0.15em', color:'var(--ink-mute)', marginBottom: 10, marginTop: 8 }}>
        PRÓXIMOS PARTIDOS · {filtered.length}
      </div>
      {filtered.length === 0 ? (
        <div style={{
          padding: 20, borderRadius: 12, textAlign:'center',
          background:'rgba(255,255,255,0.03)', border:'1px dashed var(--line-2)',
          color:'var(--ink-mute)', fontSize: 12
        }}>Sin partidos para los filtros seleccionados</div>
      ) : (
        <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
          {filtered.map(m => (
            <div key={m.id} onClick={() => navigate('match', { match: m })} style={{
              display:'flex', gap: 12, padding: 10, borderRadius: 14,
              background:'rgba(255,255,255,0.03)', border:'1px solid var(--line)',
              cursor:'pointer', alignItems:'center'
            }}>
              <div style={{ width:80, flexShrink:0 }}>
                <MatchPoster match={m} height={104} compact />
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:9, letterSpacing:'0.12em', color:'var(--ink-mute)', fontFamily:'JetBrains Mono' }}>{m.league}</div>
                <div style={{
                  fontFamily:'Barlow Condensed', fontStyle:'italic', fontWeight:700,
                  fontSize:18, lineHeight: 1, marginTop:2, textTransform:'uppercase'
                }}>{m.home.short} <span style={{color:'var(--ink-mute)'}}>×</span> {m.away.short}</div>
                <div style={{ fontSize:11, color:'var(--ink-dim)', marginTop:6 }}>{m.dateFull} · {m.time}</div>
                <div style={{ fontSize:11, color:'var(--ink-mute)', marginTop:2 }}>{m.stadium}</div>
              </div>
              <div style={{ textAlign:'right', flexShrink:0 }}>
                <div style={{ fontSize:9, color:'var(--ink-mute)', fontFamily:'JetBrains Mono', letterSpacing:'0.1em' }}>DESDE</div>
                <div style={{ fontFamily:'Barlow Condensed', fontStyle:'italic', fontWeight:700, fontSize:18, color:'#F4F4F0' }}>
                  {formatPrice(m.fromMin)}
                </div>
                <AvailabilityChip level={m.availability} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// 03. FACIAL ONBOARDING — selfie + liveness, after payment
// ─────────────────────────────────────────────────────────
function FacialOnboardingScreen({ team, next, back }) {
  const [stage, setStage] = useState('intro'); // intro · redirect · webview · done
  const _team = team || TEAMS[0];
  const bepassUrl = _team.bepass || `${_team.id}.bepass.com.br`;

  return (
    <div style={{ padding:'0 18px', paddingBottom: 130, height:'100%', overflowY:'auto' }}>
      <div style={{ paddingTop: 8 }}>
        <TopBar title="Registro biométrico" onBack={back} />
        <ProgressBar step={4} total={5} />
      </div>

      {/* Header */}
      <div style={{ marginTop: 16, marginBottom: 14 }}>
        <div style={{
          display:'inline-flex', alignItems:'center', gap: 8,
          padding:'6px 10px', borderRadius:999,
          background: `${_team.primary}30`, border:`1px solid ${_team.primary}80`,
          fontSize: 10, fontFamily:'JetBrains Mono', letterSpacing:'0.1em', color:'#F4F4F0'
        }}>
          <TeamCrest team={_team} size={18} />
          ACCESO {_team.short} · BIOMÉTRICO
        </div>
        <div style={{
          fontFamily:'Barlow Condensed', fontStyle:'italic', fontWeight:700,
          fontSize: 28, lineHeight: 0.95, marginTop: 12, textTransform:'uppercase'
        }}>Tu rostro<br/>es tu entrada.</div>
        <div style={{ fontSize: 13, color:'var(--ink-dim)', marginTop: 8, lineHeight:1.5 }}>
          Te llevamos al portal oficial de <b style={{ color:'#F4F4F0' }}>{_team.name}</b> en Bepass para completar tu registro biométrico — 30 segundos.
        </div>
      </div>

      {/* Bepass redirect card */}
      <div style={{
        padding: 16, borderRadius: 16,
        background: `linear-gradient(135deg, ${_team.primary}26, rgba(255,255,255,0.02))`,
        border: `1px solid ${_team.primary}55`,
        marginBottom: 14
      }}>
        <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom: 10 }}>
          <div style={{
            width:34, height:34, borderRadius:8, flexShrink:0,
            background:'#F4F4F0', color:'#0a0a0a',
            display:'flex', alignItems:'center', justifyContent:'center',
            fontFamily:'Barlow Condensed', fontStyle:'italic', fontWeight:800, fontSize:18, letterSpacing:'-0.02em'
          }}>be</div>
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ fontSize:10, fontFamily:'JetBrains Mono', letterSpacing:'0.12em', color:'var(--ink-mute)' }}>POWERED BY</div>
            <div style={{ fontSize:13, fontWeight:600 }}>Bepass · Identidad biométrica</div>
          </div>
          <div style={{ fontSize:9, fontFamily:'JetBrains Mono', color:'var(--green-bright)', letterSpacing:'0.1em' }}>SSL</div>
        </div>
        <div style={{
          padding:'10px 12px', borderRadius:8,
          background:'rgba(0,0,0,0.45)', border:'1px solid var(--line)',
          fontFamily:'JetBrains Mono', fontSize:11, color:'#F4F4F0',
          display:'flex', alignItems:'center', gap:8, overflow:'hidden'
        }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" style={{ color:'var(--green-bright)', flexShrink:0 }}>
            <path d="M12 11V7C12 5.34 13.34 4 15 4C16.66 4 18 5.34 18 7V11M5 11H19V20H5V11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span style={{ overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>https://{bepassUrl}/registro</span>
        </div>
      </div>

      {/* In-app browser preview when redirecting */}
      {(stage === 'redirect' || stage === 'webview') && (
        <div style={{
          borderRadius: 14, overflow:'hidden',
          border:'1px solid var(--line-2)', marginBottom: 14,
          background:'#fff', color:'#0a0a0a'
        }}>
          <div style={{
            background:'#e9e9eb', padding:'8px 12px',
            display:'flex', alignItems:'center', gap:8,
            borderBottom:'1px solid #d4d4d8'
          }}>
            <div style={{ display:'flex', gap:5 }}>
              <span style={{ width:9, height:9, borderRadius:'50%', background:'#ff5f57' }}/>
              <span style={{ width:9, height:9, borderRadius:'50%', background:'#febc2e' }}/>
              <span style={{ width:9, height:9, borderRadius:'50%', background:'#28c840' }}/>
            </div>
            <div style={{
              flex:1, padding:'4px 8px', borderRadius:6, background:'#fff',
              fontFamily:'JetBrains Mono', fontSize:10, color:'#5a5a5f',
              overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'
            }}>{bepassUrl}</div>
          </div>
          <div style={{ padding:'18px 16px', background:_team.primary, color:'#fff' }}>
            <div style={{ fontFamily:'Barlow Condensed', fontStyle:'italic', fontWeight:800, fontSize:20, lineHeight:0.95, textTransform:'uppercase' }}>
              {_team.name}<br/><span style={{ opacity:0.7 }}>BIOMETRIA</span>
            </div>
          </div>
          <div style={{ padding:16 }}>
            {stage === 'redirect' ? (
              <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:12, padding:'20px 0' }}>
                <div style={{
                  width:32, height:32, borderRadius:'50%',
                  border:`3px solid ${_team.primary}33`, borderTopColor:_team.primary,
                  animation:'feSpin 0.8s linear infinite'
                }}/>
                <div style={{ fontSize:12, color:'#5a5a5f' }}>Conectando con Bepass…</div>
                <style>{`@keyframes feSpin { to { transform: rotate(360deg); } }`}</style>
              </div>
            ) : (
              <div>
                <div style={{ fontSize:13, fontWeight:600, marginBottom:10 }}>Captura facial</div>
                <div style={{
                  aspectRatio:'1/1', borderRadius:12, background:'#0a0a0a',
                  position:'relative', overflow:'hidden', marginBottom:12
                }}>
                  <svg viewBox="0 0 100 100" width="100%" height="100%" style={{ position:'absolute', inset:0 }}>
                    <ellipse cx="50" cy="48" rx="22" ry="28" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" strokeDasharray="2 2"/>
                  </svg>
                  <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <div style={{
                      width:'40%', height:'50%',
                      background:'radial-gradient(ellipse at 50% 40%, #d6a988 0%, #a07a5f 60%, transparent 75%)',
                      borderRadius:'50%', position:'relative'
                    }}>
                      <div style={{ position:'absolute', top:'42%', left:'30%', width:5, height:5, borderRadius:'50%', background:'#0a0a0a' }}/>
                      <div style={{ position:'absolute', top:'42%', right:'30%', width:5, height:5, borderRadius:'50%', background:'#0a0a0a' }}/>
                    </div>
                  </div>
                  <div style={{
                    position:'absolute', left:0, right:0, height:2,
                    background:`linear-gradient(90deg, transparent, ${_team.primary}, transparent)`,
                    boxShadow:`0 0 12px ${_team.primary}`,
                    animation:'scanLine 1.6s linear infinite'
                  }}/>
                  <style>{`@keyframes scanLine { 0%{ top:8% } 100%{ top:92% } }`}</style>
                </div>
                <div style={{ fontSize:11, color:'#5a5a5f', textAlign:'center' }}>Parpadea lentamente y mantén el rostro centrado</div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Intro illustration when stage = intro */}
      {stage === 'intro' && (
        <div style={{
          aspectRatio: '1.4/1', borderRadius: 16, overflow:'hidden',
          background:`linear-gradient(135deg, ${_team.primary}1a, #0a0a0a 70%)`,
          border:'1px solid var(--line)',
          position:'relative', marginBottom: 14,
          display:'flex', alignItems:'center', justifyContent:'center'
        }}>
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" style={{ color:'#F4F4F0', opacity:0.9 }}>
            <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12Z" stroke="currentColor" strokeWidth="1.4"/>
            <path d="M5 21V19C5 16.79 6.79 15 9 15H15C17.21 15 19 16.79 19 19V21" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
            <path d="M3 3L7 3M3 3V7M21 3L17 3M21 3V7M3 21L7 21M3 21V17M21 21L17 21M21 21V17" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
        </div>
      )}

      {/* Steps checklist */}
      <div style={{
        padding: 14, borderRadius: 12,
        background:'rgba(255,255,255,0.03)', border:'1px solid var(--line)',
        marginBottom: 18
      }}>
        <div style={{ fontSize:10, fontFamily:'JetBrains Mono', letterSpacing:'0.12em', color:'var(--ink-mute)', marginBottom: 10 }}>
          PROCESO
        </div>
        {[
          { lbl:`Abrir portal ${_team.name}`, done: stage !== 'intro' },
          { lbl:'Captura facial + prueba de vida', done: stage === 'webview' || stage === 'done' },
          { lbl:'Volver a Football Experience', done: stage === 'done' },
        ].map((c, i) => (
          <div key={i} style={{ display:'flex', alignItems:'center', gap: 10, padding: '6px 0' }}>
            <div style={{
              width: 18, height: 18, borderRadius:'50%',
              border: c.done ? 'none' : '1.5px solid var(--line-2)',
              background: c.done ? 'var(--green-bright)' : 'transparent',
              color:'#0A0A0A',
              display:'flex', alignItems:'center', justifyContent:'center'
            }}>
              {c.done && <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M5 12L10 17L20 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>}
            </div>
            <div style={{ fontSize:12, color: c.done ? '#F4F4F0' : 'var(--ink-mute)' }}>{c.lbl}</div>
          </div>
        ))}
      </div>

      <StickyCTA
        label={
          stage === 'intro' ? `Abrir ${_team.short}.bepass.com.br` :
          stage === 'redirect' ? 'Conectando…' :
          stage === 'webview' ? 'Confirmar y volver a la app' : 'Finalizar'
        }
        onPress={() => {
          if (stage === 'intro') {
            setStage('redirect');
            setTimeout(() => setStage('webview'), 1100);
          } else if (stage === 'webview') {
            setStage('done');
            next && next();
          }
        }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// 04. WHATSAPP HANDOFF — embedded chat preview
// ─────────────────────────────────────────────────────────
function WhatsAppHandoffScreen({ booking, match, team, navigate, back }) {
  const [sent, setSent] = useState(false);
  const _team = team || TEAMS[0];
  const reservaId = booking?.reservaId || 'FE-A2X9C8';

  return (
    <div style={{ padding: 0, height:'100%', overflowY:'auto', background:'#0a0a0a' }}>
      {/* WhatsApp-styled header */}
      <div style={{
        background:'#202c33', padding:'14px 16px',
        display:'flex', alignItems:'center', gap: 12,
        borderBottom:'1px solid rgba(255,255,255,0.05)'
      }}>
        <button onClick={back} style={{ background:'none', border:'none', color:'#F4F4F0', cursor:'pointer', padding:0 }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <div style={{
          width: 38, height: 38, borderRadius:'50%', flexShrink:0,
          background:'#25D366', display:'flex', alignItems:'center', justifyContent:'center',
          color:'#fff', fontWeight:700, fontFamily:'Inter', fontSize: 14
        }}>FE</div>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color:'#F4F4F0' }}>FE · Anfitrión {_team.name}</div>
          <div style={{ fontSize: 11, color:'#8696a0', display:'flex', alignItems:'center', gap:4 }}>
            <span style={{ width:6, height:6, borderRadius:'50%', background:'#25D366' }}/>
            en línea ahora
          </div>
        </div>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ color:'#8696a0' }}>
          <path d="M15 4H22V11M14 10L21 3M19 13V19C19 20.1 18.1 21 17 21H5C3.9 21 3 20.1 3 19V7C3 5.9 3.9 5 5 5H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* Hint banner */}
      <div style={{
        padding:'10px 16px', background:'rgba(37,211,102,0.08)',
        borderBottom:'1px solid rgba(37,211,102,0.2)',
        fontSize: 11, color:'#25D366', fontFamily:'JetBrains Mono', letterSpacing:'0.05em',
        display:'flex', alignItems:'center', gap: 8
      }}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.099-.473-.149-.673.15-.198.297-.771.964-.944 1.162-.175.197-.349.222-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.297-.018-.458.13-.606.136-.135.301-.345.451-.523.146-.181.194-.301.297-.498.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.18 2.095 3.195 5.076 4.483.71.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.573-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884"/></svg>
          Reserva confirmada · Comprobante adjunto
      </div>

      {/* Messages */}
      <div style={{
        padding: 14, display:'flex', flexDirection:'column', gap: 8,
        background:'#0e1418',
        backgroundImage:'radial-gradient(rgba(255,255,255,0.02) 1px, transparent 1px)',
        backgroundSize:'8px 8px'
      }}>
        {/* System message */}
        <div style={{
          alignSelf:'center', padding:'5px 10px', borderRadius: 8,
          background:'rgba(255,255,255,0.05)', fontSize: 10, color:'#8696a0'
        }}>HOY · {match?.dateFull?.split(',')[0] || 'Reserva enviada'}</div>

        {/* User: receipt card */}
        <div style={{
          alignSelf:'flex-end', maxWidth: '85%',
          background:'#005c4b', padding: 8, borderRadius:'8px 2px 8px 8px'
        }}>
          {/* Receipt summary */}
          <div style={{
            background:'rgba(0,0,0,0.25)', padding: 10, borderRadius: 6,
            marginBottom: 6, color:'#F4F4F0'
          }}>
            <div style={{ fontSize:9, fontFamily:'JetBrains Mono', letterSpacing:'0.12em', color:'rgba(255,255,255,0.6)' }}>COMPROBANTE</div>
            <div style={{ fontFamily:'Barlow Condensed', fontStyle:'italic', fontWeight:700, fontSize: 16, marginTop:2, textTransform:'uppercase' }}>
              {match ? `${match.home.short} × ${match.away.short}` : 'Reserva FE'}
            </div>
            <div style={{ fontSize:10, color:'rgba(255,255,255,0.7)', marginTop:2 }}>
              {match?.dateFull} · {match?.time} · {match?.stadium}
            </div>
            <div style={{ fontSize:10, color:'rgba(255,255,255,0.7)', marginTop:1 }}>
              {booking?.experience?.name || 'Tribuna Central'} · {booking?.count || 2} {(booking?.count||2)===1?'persona':'personas'}
            </div>
            <div style={{
              display:'flex', justifyContent:'space-between', marginTop:8, paddingTop:8,
              borderTop:'1px solid rgba(255,255,255,0.15)'
            }}>
              <span style={{ fontSize:10, color:'rgba(255,255,255,0.6)' }}>{reservaId}</span>
              <span style={{ fontFamily:'JetBrains Mono', fontWeight:600, fontSize:11, color:'#F4F4F0' }}>
                {formatPrice(booking?.total || 290)}
              </span>
            </div>
          </div>
          <div style={{ fontSize: 13, color:'#F4F4F0', lineHeight:1.4 }}>
            Hola, acabo de completar mi reserva. Confirmo asistencia 🟢
          </div>
          <div style={{ fontSize: 9, color:'rgba(255,255,255,0.5)', textAlign:'right', marginTop:4 }}>
            14:32 ✓✓
          </div>
        </div>

        {/* Agent reply */}
        <div style={{
          alignSelf:'flex-start', maxWidth: '85%',
          background:'#202c33', padding: 8, borderRadius:'2px 8px 8px 8px',
          color:'#F4F4F0'
        }}>
          <div style={{ fontSize: 11, color:'#25D366', fontWeight: 600, marginBottom: 2 }}>
            Marina · Anfitriona FE
          </div>
          <div style={{ fontSize: 13, lineHeight: 1.4 }}>
            ¡Bienvenido, Rafael! 👋 Soy tu anfitriona para el {match?.home?.short}×{match?.away?.short}.
          </div>
          <div style={{ fontSize: 9, color:'rgba(255,255,255,0.5)', textAlign:'right', marginTop:4 }}>14:33</div>
        </div>

        {/* Document request — verifies the ID used in biometric registration */}
        <div style={{
          alignSelf:'flex-start', maxWidth: '85%',
          background:'#202c33', padding: 10, borderRadius:'2px 8px 8px 8px',
          color:'#F4F4F0', border:'1px solid rgba(255,255,255,0.06)'
        }}>
          <div style={{
            display:'inline-flex', alignItems:'center', gap:6,
            padding:'3px 8px', borderRadius:999,
            background:'rgba(108,255,106,0.12)', border:'1px solid rgba(108,255,106,0.35)',
            fontSize:9, fontFamily:'JetBrains Mono', letterSpacing:'0.1em',
            color:'var(--green-bright)', marginBottom: 8
          }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M12 11V7C12 5.34 13.34 4 15 4C16.66 4 18 5.34 18 7V11M5 11H19V20H5V11Z" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            VERIFICACIÓN BIOMÉTRICA
          </div>
          <div style={{ fontSize: 13, lineHeight: 1.45 }}>
            Antes del partido necesito confirmar tu identidad 🪪
          </div>
          <div style={{ fontSize: 13, lineHeight: 1.45, marginTop: 8 }}>
            Por favor envíame una <strong style={{color:'#25D366'}}>foto del documento</strong> que usaste en el registro Bepass:
          </div>
          <div style={{
            marginTop: 8, padding:'8px 10px', borderRadius:6,
            background:'rgba(0,0,0,0.25)', fontSize:11, color:'rgba(255,255,255,0.85)',
            display:'flex', flexDirection:'column', gap:4
          }}>
            <div style={{ display:'flex', alignItems:'center', gap:6 }}>
              <span style={{ color:'#25D366' }}>•</span> RG, CNH o pasaporte
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:6 }}>
              <span style={{ color:'#25D366' }}>•</span> Frente y dorso, sin reflejos
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:6 }}>
              <span style={{ color:'#25D366' }}>•</span> Mismo nombre del registro facial
            </div>
          </div>
          <div style={{ fontSize: 11, color:'rgba(255,255,255,0.55)', marginTop: 8, lineHeight:1.4 }}>
            🔒 Es solo para validar tu acceso al estadio — luego se elimina de nuestros servidores.
          </div>
          <div style={{ fontSize: 9, color:'rgba(255,255,255,0.5)', textAlign:'right', marginTop:4 }}>14:33</div>
        </div>

        {/* Quick replies — primary action is sending the ID photo */}
        <div style={{ display:'flex', gap: 6, flexWrap:'wrap', marginTop: 4, justifyContent:'flex-end' }}>
          <button onClick={() => setSent(true)} style={{
            padding:'8px 12px', borderRadius: 999,
            background:'#25D366', border:'1px solid #25D366',
            color:'#0a0a0a', fontSize: 12, fontWeight:600, cursor:'pointer',
            display:'inline-flex', alignItems:'center', gap:6
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M3 7L3 19C3 19.55 3.45 20 4 20L20 20C20.55 20 21 19.55 21 19L21 7C21 6.45 20.55 6 20 6L16 6L14 4L10 4L8 6L4 6C3.45 6 3 6.45 3 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="13" r="4" stroke="currentColor" strokeWidth="2"/></svg>
            Enviar foto de RG
          </button>
          {['Usar CNH', 'Más tarde'].map(q => (
            <button key={q} onClick={() => setSent(true)} style={{
              padding:'6px 10px', borderRadius: 999,
              background:'rgba(37,211,102,0.1)', border:'1px solid rgba(37,211,102,0.4)',
              color:'#25D366', fontSize: 11, cursor:'pointer'
            }}>{q}</button>
          ))}
        </div>

        {sent && (
          <>
            {/* User: sent document */}
            <div style={{
              alignSelf:'flex-end', maxWidth: '78%',
              background:'#005c4b', padding: 6, borderRadius:'8px 2px 8px 8px',
              color:'#F4F4F0'
            }}>
              <div style={{
                width:'100%', aspectRatio:'1.6/1', borderRadius:6, overflow:'hidden',
                background:'linear-gradient(135deg, #2a3a5c, #1a2540)',
                position:'relative', display:'flex', flexDirection:'column', justifyContent:'space-between',
                padding:10
              }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
                  <div>
                    <div style={{ fontSize:7, fontFamily:'JetBrains Mono', color:'rgba(255,255,255,0.6)', letterSpacing:'0.1em' }}>REPÚBLICA FEDERATIVA DO BRASIL</div>
                    <div style={{ fontFamily:'Barlow Condensed', fontStyle:'italic', fontWeight:700, fontSize:14, color:'#fff', marginTop:2, letterSpacing:'0.05em' }}>CARTEIRA DE IDENTIDADE</div>
                  </div>
                  <div style={{ width:18, height:22, background:'rgba(255,255,255,0.15)', borderRadius:2 }}/>
                </div>
                <div style={{ display:'flex', gap:8, alignItems:'flex-end' }}>
                  <div style={{
                    width:42, height:48, borderRadius:3, flexShrink:0,
                    background:'radial-gradient(ellipse at 50% 35%, #d6a988 0%, #a07a5f 60%, #6a4a35 100%)',
                    position:'relative'
                  }}>
                    <div style={{ position:'absolute', top:'38%', left:'30%', width:3, height:3, borderRadius:'50%', background:'#0a0a0a' }}/>
                    <div style={{ position:'absolute', top:'38%', right:'30%', width:3, height:3, borderRadius:'50%', background:'#0a0a0a' }}/>
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:7, color:'rgba(255,255,255,0.5)', letterSpacing:'0.08em' }}>NOME</div>
                    <div style={{ fontSize:10, color:'#fff', fontWeight:600, lineHeight:1.2 }}>RAFAEL S. ANDRADE</div>
                    <div style={{ fontSize:7, color:'rgba(255,255,255,0.5)', letterSpacing:'0.08em', marginTop:3 }}>RG · DATA NASC.</div>
                    <div style={{ fontSize:9, color:'#fff', fontFamily:'JetBrains Mono' }}>32.847.193-1 · 14/06/95</div>
                  </div>
                </div>
              </div>
              <div style={{ padding:'4px 4px 0' }}>
                <div style={{ fontSize: 12, color:'#F4F4F0', lineHeight:1.4 }}>RG frente y dorso ✅</div>
                <div style={{ fontSize: 9, color:'rgba(255,255,255,0.5)', textAlign:'right', marginTop:2 }}>14:34 ✓✓</div>
              </div>
            </div>

            {/* Agent: validation in progress */}
            <div style={{
              alignSelf:'flex-start', maxWidth: '85%',
              background:'#202c33', padding: 10, borderRadius:'2px 8px 8px 8px',
              color:'#F4F4F0'
            }}>
              <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                <div style={{
                  width:14, height:14, borderRadius:'50%',
                  border:'2px solid rgba(108,255,106,0.3)', borderTopColor:'var(--green-bright)',
                  animation:'feSpin 0.8s linear infinite'
                }}/>
                <div style={{ fontSize: 12, lineHeight: 1.4 }}>Validando con tu registro biométrico…</div>
              </div>
              <div style={{ fontSize: 9, color:'rgba(255,255,255,0.5)', textAlign:'right', marginTop:6 }}>14:34</div>
            </div>

            {/* Agent: confirmed */}
            <div style={{
              alignSelf:'flex-start', maxWidth: '85%',
              background:'#202c33', padding: 10, borderRadius:'2px 8px 8px 8px',
              color:'#F4F4F0',
              borderLeft:'3px solid var(--green-bright)'
            }}>
              <div style={{ fontSize: 13, lineHeight: 1.4 }}>
                ¡Coincide con el registro Bepass! ✅<br/>
                Identidad <strong style={{color:'var(--green-bright)'}}>verificada</strong>.
              </div>
              <div style={{ fontSize: 12, lineHeight: 1.4, marginTop: 6 }}>
                Te envío en breve la hora exacta de embarque y el punto de encuentro 🚐
              </div>
              <div style={{ fontSize: 9, color:'rgba(255,255,255,0.5)', textAlign:'right', marginTop:4 }}>14:35</div>
            </div>
          </>
        )}
      </div>

      {/* Composer */}
      <div style={{
        padding:'10px 12px', background:'#202c33',
        display:'flex', alignItems:'center', gap: 8,
        borderTop:'1px solid rgba(255,255,255,0.05)'
      }}>
        <div style={{
          flex:1, padding:'10px 14px', borderRadius: 999,
          background:'#2a3942', color:'#8696a0', fontSize: 13
        }}>Escribe un mensaje…</div>
        <div style={{
          width: 38, height: 38, borderRadius:'50%', background:'#25D366',
          display:'flex', alignItems:'center', justifyContent:'center', color:'#fff'
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M2 21L23 12L2 3V10L17 12L2 14V21Z"/></svg>
        </div>
      </div>

      {/* Bottom action — go to boarding status */}
      <div style={{ padding: 14, background:'#0a0a0a' }}>
        <button onClick={() => navigate && navigate('boarding')} style={{
          width:'100%', padding:'14px 16px', borderRadius: 14,
          background:'transparent', color:'var(--green-bright)',
          border:'1px solid var(--green-bright)',
          fontFamily:'Inter', fontWeight: 600, fontSize: 13, cursor:'pointer'
        }}>Ver estado del embarque →</button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// 05. BOARDING STATUS — countdown + pickup location
// ─────────────────────────────────────────────────────────
function BoardingStatusScreen({ match, team, back, navigate }) {
  const _team = team || TEAMS[0];
  const _match = match || MATCHES[0];

  return (
    <div style={{ padding:'0 18px', paddingBottom: 30, height:'100%', overflowY:'auto' }}>
      <div style={{ paddingTop: 8 }}>
        <TopBar title="Estado del embarque" onBack={back} />
      </div>

      {/* Live status pill */}
      <div style={{
        display:'inline-flex', alignItems:'center', gap: 8,
        padding:'6px 12px', borderRadius:999,
        background:'rgba(41,196,107,0.1)', border:'1px solid var(--green-bright)',
        marginTop: 12, marginBottom: 14
      }}>
        <span style={{
          width:8, height:8, borderRadius:'50%', background:'var(--green-bright)',
          boxShadow:'0 0 12px var(--green-bright)', animation:'fePulse 1.4s infinite'
        }}/>
        <span style={{ fontSize: 10, color:'var(--green-bright)', fontFamily:'JetBrains Mono', letterSpacing:'0.12em' }}>
          CONFIRMADO POR MARINA · HACE 12 MIN
        </span>
      </div>

      {/* Countdown hero */}
      <div style={{
        padding: 22, borderRadius: 18,
        background:'linear-gradient(160deg, rgba(41,196,107,0.12), rgba(41,196,107,0.02))',
        border:'1px solid var(--line)', marginBottom: 18
      }}>
        <div style={{ fontSize:11, fontFamily:'JetBrains Mono', letterSpacing:'0.15em', color:'var(--ink-mute)', marginBottom: 4 }}>
          HORA DE EMBARQUE
        </div>
        <div style={{
          fontFamily:'Barlow Condensed', fontStyle:'italic', fontWeight:700,
          fontSize: 64, lineHeight: 0.9, color:'#F4F4F0', marginTop:2
        }}>15:30</div>
        <div style={{ fontSize:13, color:'var(--ink-dim)', marginTop: 2 }}>
          {_match.dateFull} · 2h 30min antes del partido
        </div>

        {/* Countdown */}
        <div style={{ display:'flex', gap: 10, marginTop: 16 }}>
          {[
            { v:'02', l:'DÍAS' },
            { v:'14', l:'HORAS' },
            { v:'37', l:'MIN' },
            { v:'12', l:'SEG' },
          ].map((b,i) => (
            <div key={i} style={{
              flex:1, padding:'10px 0', borderRadius: 10,
              background:'rgba(0,0,0,0.4)', border:'1px solid var(--line-2)',
              textAlign:'center'
            }}>
              <div style={{ fontFamily:'JetBrains Mono', fontWeight:600, fontSize: 22, color:'#F4F4F0' }}>{b.v}</div>
              <div style={{ fontSize: 9, color:'var(--ink-mute)', letterSpacing:'0.12em' }}>{b.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Pickup location */}
      <div style={{ fontSize:10, fontFamily:'JetBrains Mono', letterSpacing:'0.15em', color:'var(--ink-mute)', marginBottom: 8 }}>
        PUNTO DE EMBARQUE
      </div>
      <div style={{
        borderRadius: 14, overflow:'hidden',
        border:'1px solid var(--line)', marginBottom: 14
      }}>
        {/* Mock map */}
        <div style={{
          height: 140, position:'relative', overflow:'hidden',
          background:'#0e1f1a',
          backgroundImage: `
            linear-gradient(135deg, rgba(41,196,107,0.15) 0%, transparent 60%),
            repeating-linear-gradient(45deg, rgba(255,255,255,0.04) 0 1px, transparent 1px 24px),
            repeating-linear-gradient(-45deg, rgba(255,255,255,0.04) 0 1px, transparent 1px 24px)
          `
        }}>
          {/* Streets */}
          <div style={{ position:'absolute', top:'40%', left:0, right:0, height:2, background:'rgba(255,255,255,0.15)' }}/>
          <div style={{ position:'absolute', top:0, bottom:0, left:'30%', width:2, background:'rgba(255,255,255,0.15)' }}/>
          <div style={{ position:'absolute', top:0, bottom:0, left:'70%', width:2, background:'rgba(255,255,255,0.15)' }}/>
          {/* Pin */}
          <div style={{
            position:'absolute', top:'40%', left:'30%', transform:'translate(-50%, -100%)',
            width: 30, height: 38,
            display:'flex', alignItems:'center', justifyContent:'center',
            color:'var(--green-bright)'
          }}>
            <svg width="30" height="38" viewBox="0 0 24 30" fill="currentColor">
              <path d="M12 0C7.6 0 4 3.6 4 8c0 6 8 14 8 14s8-8 8-14c0-4.4-3.6-8-8-8z"/>
              <circle cx="12" cy="8" r="3" fill="#0a0a0a"/>
            </svg>
          </div>
          {/* Stadium pin */}
          <div style={{
            position:'absolute', top:'70%', left:'70%', transform:'translate(-50%, -50%)',
            padding:'4px 8px', borderRadius:6,
            background:'#F4F4F0', color:'#0a0a0a',
            fontSize: 10, fontWeight: 700, fontFamily:'Barlow Condensed', fontStyle:'italic',
            textTransform:'uppercase', letterSpacing:'0.05em'
          }}>{_match.stadium}</div>
        </div>
        {/* Address */}
        <div style={{ padding: 14, background:'rgba(255,255,255,0.03)' }}>
          <div style={{ fontFamily:'Barlow Condensed', fontStyle:'italic', fontWeight:700, fontSize: 18, color:'#F4F4F0', textTransform:'uppercase' }}>
            Hotel Fasano · Ipanema
          </div>
          <div style={{ fontSize: 12, color:'var(--ink-dim)', marginTop: 2 }}>
            Av. Vieira Souto 80 · Rio de Janeiro
          </div>
          <div style={{ display:'flex', gap: 8, marginTop: 12 }}>
            <button style={{
              flex:1, padding:'10px 0', borderRadius: 10,
              background:'#F4F4F0', color:'#0A0A0A', border:'none',
              fontFamily:'Inter', fontWeight: 600, fontSize: 12, cursor:'pointer'
            }}>↗ Abrir en Maps</button>
            <button style={{
              flex:1, padding:'10px 0', borderRadius: 10,
              background:'transparent', color:'var(--ink)', border:'1px solid var(--line-2)',
              fontFamily:'Inter', fontWeight: 500, fontSize: 12, cursor:'pointer'
            }}>Compartir ubicación</button>
          </div>
        </div>
      </div>

      {/* Anfitrión info */}
      <div style={{
        padding: 14, borderRadius: 14,
        background:'rgba(255,255,255,0.03)', border:'1px solid var(--line)',
        display:'flex', alignItems:'center', gap: 12, marginBottom: 14
      }}>
        <div style={{
          width: 44, height: 44, borderRadius:'50%',
          background:'linear-gradient(135deg, #d6a988, #a07a5f)',
          display:'flex', alignItems:'center', justifyContent:'center',
          color:'#fff', fontWeight: 700, fontSize: 16, fontFamily:'Inter'
        }}>M</div>
        <div style={{ flex:1 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color:'#F4F4F0' }}>Marina Costa</div>
          <div style={{ fontSize: 10, color:'var(--ink-mute)', fontFamily:'JetBrains Mono', letterSpacing:'0.08em' }}>
            ANFITRIONA · {_team.name.toUpperCase()}
          </div>
        </div>
        <button onClick={() => navigate && navigate('whatsapp')} style={{
          width: 40, height: 40, borderRadius:'50%',
          background:'#25D366', border:'none', cursor:'pointer',
          display:'flex', alignItems:'center', justifyContent:'center', color:'#fff'
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.099-.473-.149-.673.15-.198.297-.771.964-.944 1.162-.175.197-.349.222-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.297-.018-.458.13-.606.136-.135.301-.345.451-.523.146-.181.194-.301.297-.498.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.18 2.095 3.195 5.076 4.483.71.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.573-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884"/></svg>
        </button>
      </div>

      {/* Itinerary */}
      <div style={{ fontSize:10, fontFamily:'JetBrains Mono', letterSpacing:'0.15em', color:'var(--ink-mute)', marginBottom: 8 }}>
        TU JORNADA
      </div>
      <div style={{ paddingLeft: 8 }}>
        {[
          { time:'15:30', title:'Embarque · Hotel Fasano', sub:'Anfitriona Marina te recibe', done: false, current: true },
          { time:'16:00', title:'Salida · Bus FE', sub:'30 min · Tráfico fluido', done: false },
          { time:'16:45', title:'Acceso al estadio', sub:'Check-in facial · Fila exclusiva', done: false },
          { time:'17:00', title:'Ingreso a tribuna', sub:'Sector centro · Fila 14', done: false },
          { time:'18:00', title:'⚽ Inicio del partido', sub:_match.stadium, done: false },
          { time:'~20:30', title:'Regreso al hotel', sub:'Bus FE · Salida desde portón 4', done: false },
        ].map((step, i, arr) => (
          <div key={i} style={{ display:'flex', gap: 12, position:'relative' }}>
            <div style={{ display:'flex', flexDirection:'column', alignItems:'center', flexShrink:0, width: 24 }}>
              <div style={{
                width: 14, height: 14, borderRadius:'50%',
                background: step.current ? 'var(--green-bright)' : 'transparent',
                border: step.current ? 'none' : '1.5px solid var(--line-2)',
                boxShadow: step.current ? '0 0 0 4px rgba(41,196,107,0.2)' : 'none'
              }}/>
              {i < arr.length - 1 && <div style={{ flex:1, width:1, background:'var(--line-2)', margin:'4px 0' }}/>}
            </div>
            <div style={{ paddingBottom: 16, flex:1, marginTop:-2 }}>
              <div style={{ fontFamily:'JetBrains Mono', fontSize:11, color: step.current ? 'var(--green-bright)' : 'var(--ink-mute)', letterSpacing:'0.08em' }}>{step.time}</div>
              <div style={{ fontSize:13, color:'#F4F4F0', fontWeight: step.current ? 600 : 500, marginTop: 1 }}>{step.title}</div>
              <div style={{ fontSize:11, color:'var(--ink-dim)', marginTop:1 }}>{step.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// 06. FACIAL CHECK-IN — at the stadium gate, day of match
// ─────────────────────────────────────────────────────────
function FacialCheckinScreen({ match, team, back }) {
  const [state, setState] = useState('scanning'); // scanning · success
  const _team = team || TEAMS[0];
  const _match = match || MATCHES[0];

  useEffect(() => {
    const t = setTimeout(() => setState('success'), 2400);
    return () => clearTimeout(t);
  }, []);

  if (state === 'success') {
    return (
      <div style={{
        height:'100%', display:'flex', flexDirection:'column',
        background:'linear-gradient(180deg, #0a2818 0%, #0a0a0a 100%)',
        padding:'0 18px'
      }}>
        <div style={{ paddingTop: 8 }}>
          <TopBar title="Check-in" onBack={back} />
        </div>
        <div style={{
          flex:1, display:'flex', flexDirection:'column',
          alignItems:'center', justifyContent:'center', textAlign:'center'
        }}>
          <div style={{
            width: 110, height: 110, borderRadius:'50%',
            background:'var(--green-bright)', color:'#0A0A0A',
            display:'flex', alignItems:'center', justifyContent:'center',
            marginBottom: 22, boxShadow:'0 0 60px rgba(41,196,107,0.4)'
          }}>
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none">
              <path d="M5 12L10 17L20 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div style={{
            fontFamily:'Barlow Condensed', fontStyle:'italic', fontWeight:700,
            fontSize: 38, textTransform:'uppercase', lineHeight: 0.9
          }}>Adelante,<br/>Rafael.</div>
          <div style={{ fontSize: 13, color:'var(--ink-dim)', marginTop: 14, lineHeight: 1.6 }}>
            Acceso confirmado a <strong style={{color:'#F4F4F0'}}>{_match.stadium}</strong><br/>
            {_match.home.short} × {_match.away.short} · Sector centro · Fila 14
          </div>
          <div style={{
            marginTop: 28, padding:'10px 16px', borderRadius:999,
            background:'rgba(255,255,255,0.05)', border:'1px solid var(--line-2)',
            fontSize: 11, color:'var(--ink-dim)', fontFamily:'JetBrains Mono', letterSpacing:'0.08em'
          }}>17:42 · PORTÓN 3 · DESBLOQUEADO</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      padding:'0 18px', height:'100%', display:'flex', flexDirection:'column',
      background:'#0a0a0a'
    }}>
      <div style={{ paddingTop: 8 }}>
        <TopBar title="Check-in" onBack={back} />
      </div>

      <div style={{
        marginTop: 12, padding: 12, borderRadius: 12,
        background:'rgba(214,185,106,0.08)', border:'1px solid rgba(214,185,106,0.3)',
        display:'flex', alignItems:'center', gap: 10
      }}>
        <span style={{ width:8, height:8, borderRadius:'50%', background:'#d6b96a', animation:'fePulse 1.4s infinite' }}/>
        <div style={{ fontSize:11, color:'#d6b96a', fontFamily:'JetBrains Mono', letterSpacing:'0.1em' }}>
          PORTÓN 3 · ACERCATE A LA CÁMARA
        </div>
      </div>

      <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', padding:'18px 0' }}>
        <div style={{
          width:'100%', aspectRatio:'1/1.2', borderRadius: 24, overflow:'hidden',
          background:'radial-gradient(circle at 50% 40%, #1a1a1a, #0a0a0a)',
          border:'2px solid var(--green-bright)', position:'relative'
        }}>
          <svg viewBox="0 0 100 100" width="100%" height="100%" style={{ position:'absolute', inset:0 }}>
            <ellipse cx="50" cy="48" rx="22" ry="28" fill="none" stroke="var(--green-bright)" strokeWidth="0.5" strokeDasharray="2 2"/>
          </svg>
          <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
            <div style={{
              width: '40%', height: '50%',
              background:'radial-gradient(ellipse at 50% 40%, #d6a988 0%, #a07a5f 60%, transparent 75%)',
              borderRadius:'50%', position:'relative'
            }}>
              <div style={{ position:'absolute', top:'42%', left:'30%', width:5, height:5, borderRadius:'50%', background:'#0a0a0a' }}/>
              <div style={{ position:'absolute', top:'42%', right:'30%', width:5, height:5, borderRadius:'50%', background:'#0a0a0a' }}/>
              <div style={{ position:'absolute', bottom:'25%', left:'40%', width:'20%', height:3, borderRadius:2, background:'rgba(0,0,0,0.5)' }}/>
            </div>
          </div>
          <div style={{
            position:'absolute', left:0, right:0, height:2,
            background:'linear-gradient(90deg, transparent, var(--green-bright), transparent)',
            boxShadow:'0 0 16px var(--green-bright)',
            animation:'scanLine 1.6s linear infinite'
          }}/>
          <style>{`@keyframes scanLine { 0%{ top:8% } 100%{ top:92% } }`}</style>
        </div>
      </div>

      <div style={{
        padding: 14, borderRadius: 14,
        background:'rgba(255,255,255,0.03)', border:'1px solid var(--line)',
        marginBottom: 18, display:'flex', alignItems:'center', gap: 12
      }}>
        <TeamCrest team={_team} size={36} />
        <div style={{ flex:1 }}>
          <div style={{ fontFamily:'Barlow Condensed', fontStyle:'italic', fontWeight:700, fontSize: 16, textTransform:'uppercase' }}>
            {_match.home.short} × {_match.away.short}
          </div>
          <div style={{ fontSize: 11, color:'var(--ink-dim)' }}>{_match.stadium} · Fila 14, asientos 12-13</div>
        </div>
        <div style={{
          fontSize: 9, fontFamily:'JetBrains Mono', letterSpacing:'0.1em',
          color:'var(--green-bright)', padding:'4px 8px',
          background:'rgba(41,196,107,0.12)', borderRadius: 6
        }}>VERIFICANDO</div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// Confirmation v2 — adds "Send to WhatsApp" CTA
// ─────────────────────────────────────────────────────────
function StepConfirmationV2({ booking, match, navigate }) {
  const exp = booking.experience;
  const reservaId = booking.reservaId || ('FE-' + Math.random().toString(36).slice(2,8).toUpperCase());

  return (
    <div style={{ padding:'0 18px', paddingBottom: 130, height:'100%', overflowY:'auto' }}>
      <div style={{ paddingTop: 8 }}>
        <TopBar title="Reserva lista" />
        <ProgressBar step={5} total={5} />
      </div>

      {/* Hero */}
      <div style={{ textAlign:'center', marginTop: 22, marginBottom: 18 }}>
        <div style={{
          width: 64, height: 64, borderRadius:'50%',
          background:'var(--green-bright)', color:'#0A0A0A',
          display:'inline-flex', alignItems:'center', justifyContent:'center',
          marginBottom: 14
        }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M5 12L10 17L20 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div style={{
          fontFamily:'Barlow Condensed', fontStyle:'italic', fontWeight:700,
          fontSize: 32, textTransform:'uppercase', lineHeight: 0.95
        }}>Pago + registro<br/>completados</div>
        <div style={{ fontSize: 12, color:'var(--ink-dim)', marginTop: 8, lineHeight:1.5 }}>
          Falta un paso: enviar tu reserva al anfitrión por WhatsApp para que coordine tu embarque.
        </div>
      </div>

      {/* Receipt summary */}
      <div style={{
        padding: 14, borderRadius: 14,
        background:'rgba(255,255,255,0.04)', border:'1px solid var(--line)',
        marginBottom: 18
      }}>
        <div style={{ display:'flex', gap:12, alignItems:'center', paddingBottom: 12, borderBottom:'1px solid var(--line)' }}>
          <div style={{ width: 56, height: 56, borderRadius: 8, overflow:'hidden', flexShrink:0 }}>
            <MatchPoster match={match} height={56} compact />
          </div>
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ fontFamily:'Barlow Condensed', fontStyle:'italic', fontWeight:700, fontSize: 16, textTransform:'uppercase' }}>
              {match.home.short} × {match.away.short}
            </div>
            <div style={{ fontSize: 11, color:'var(--ink-dim)', marginTop:1 }}>{match.dateFull} · {match.time}</div>
            <div style={{ fontSize: 11, color:'var(--ink-mute)' }}>{exp.name} · {booking.count} {booking.count===1?'persona':'personas'}</div>
          </div>
        </div>
        <div style={{ paddingTop: 12, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div>
            <div style={{ fontSize: 9, fontFamily:'JetBrains Mono', letterSpacing:'0.12em', color:'var(--ink-mute)' }}>RESERVA</div>
            <div style={{ fontFamily:'JetBrains Mono', fontWeight:600, fontSize: 14, color:'#F4F4F0' }}>{reservaId}</div>
          </div>
          <div style={{ textAlign:'right' }}>
            <div style={{ fontSize: 9, fontFamily:'JetBrains Mono', letterSpacing:'0.12em', color:'var(--ink-mute)' }}>TOTAL PAGADO</div>
            <div style={{ fontFamily:'Barlow Condensed', fontStyle:'italic', fontWeight:700, fontSize: 18, color:'#F4F4F0' }}>
              {formatPrice(booking.total)}
            </div>
          </div>
        </div>
      </div>

      {/* Status checklist */}
      <div style={{
        padding: 14, borderRadius: 12,
        background:'rgba(255,255,255,0.03)', border:'1px solid var(--line)',
        marginBottom: 18
      }}>
        {[
          { lbl:'Pago confirmado', done:true },
          { lbl:'Registro biométrico vinculado', done:true },
          { lbl:'Anfitrión asignado · Marina Costa', done:true },
          { lbl:'Hora de embarque · pendiente por WhatsApp', done:false },
        ].map((c,i) => (
          <div key={i} style={{ display:'flex', alignItems:'center', gap: 10, padding:'5px 0' }}>
            <div style={{
              width: 18, height: 18, borderRadius:'50%',
              border: c.done ? 'none' : '1.5px solid var(--line-2)',
              background: c.done ? 'var(--green-bright)' : 'transparent',
              color:'#0A0A0A', display:'flex', alignItems:'center', justifyContent:'center'
            }}>
              {c.done && <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M5 12L10 17L20 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>}
            </div>
            <div style={{ fontSize:12, color: c.done ? '#F4F4F0' : 'var(--ink-dim)', flex:1 }}>{c.lbl}</div>
            {!c.done && <div style={{ fontSize:9, fontFamily:'JetBrains Mono', color:'#d6b96a', letterSpacing:'0.1em' }}>SIGUIENTE</div>}
          </div>
        ))}
      </div>

      {/* Primary CTA → WhatsApp */}
      <div style={{ display:'flex', flexDirection:'column', gap: 10 }}>
        <button onClick={() => navigate && navigate('whatsapp', { booking: { ...booking, reservaId } })} style={{
          padding: '16px', borderRadius: 14,
          background:'#25D366', color:'#fff', border:'none',
          fontFamily:'Inter', fontWeight: 600, fontSize: 14,
          display:'flex', alignItems:'center', justifyContent:'center', gap: 10, cursor:'pointer'
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.099-.473-.149-.673.15-.198.297-.771.964-.944 1.162-.175.197-.349.222-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.297-.018-.458.13-.606.136-.135.301-.345.451-.523.146-.181.194-.301.297-.498.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.18 2.095 3.195 5.076 4.483.71.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.573-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884"/></svg>
          Enviar reserva por WhatsApp
        </button>
        <button onClick={() => navigate && navigate('home')} style={{
          padding: '14px', borderRadius: 14,
          background:'transparent', color:'var(--ink)', border:'1px solid var(--line-2)',
          fontFamily:'Inter', fontWeight: 500, fontSize: 13, cursor:'pointer'
        }}>Volver al inicio</button>
      </div>
    </div>
  );
}

Object.assign(window, {
  TeamSelectScreen, TeamMatchesScreen, FacialOnboardingScreen,
  WhatsAppHandoffScreen, BoardingStatusScreen, FacialCheckinScreen,
  StepConfirmationV2, TeamCrest
});
