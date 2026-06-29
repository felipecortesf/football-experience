// 5-step booking flow screens

// Step 1: Select Experience (seat type)
function StepExperience({ booking, setBooking, next, back, match }) {
  const sel = booking.experience;
  const slot = booking.slot || TIME_SLOTS[1];

  return (
    <div style={{ padding:'0 18px', paddingBottom: 130, height:'100%', overflowY:'auto' }}>
      <div style={{ paddingTop: 8 }}>
        <TopBar title="Reserva" onBack={back} />
        <ProgressBar step={1} />
      </div>

      {/* Mini hero — match context */}
      <div style={{ marginTop: 14, marginBottom: 18 }}>
        <MatchPoster match={match} height={150} compact />
      </div>

      <div style={{
        fontFamily:'Barlow Condensed', fontStyle:'italic', fontWeight:700,
        fontSize: 26, lineHeight: 0.95, marginBottom: 4, textTransform:'uppercase'
      }}>Elige tu<br/>experiencia</div>
      <div style={{ fontSize:12, color:'var(--ink-dim)', marginBottom: 16 }}>
        Solo asientos. Sin distracciones.
      </div>

      <div style={{ display:'flex', flexDirection:'column', gap: 10, marginBottom: 22 }}>
        {EXPERIENCES.map(exp => (
          <ExperienceCard key={exp.id} exp={exp}
            selected={sel?.id === exp.id}
            onSelect={() => setBooking({ ...booking, experience: exp })} />
        ))}
      </div>

      {/* Time slots */}
      <div style={{
        fontFamily:'JetBrains Mono', fontSize:10, letterSpacing:'0.15em',
        color:'var(--ink-mute)', marginBottom: 10
      }}>HORARIO DE INGRESO · {match.dateFull}</div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:8, marginBottom: 14 }}>
        {TIME_SLOTS.map(t => (
          <button key={t} onClick={() => setBooking({ ...booking, slot: t })} style={{
            padding:'12px 0', borderRadius: 10, cursor:'pointer',
            border: slot === t ? '1.5px solid var(--green-bright)' : '1px solid var(--line-2)',
            background: slot === t ? 'rgba(41,196,107,0.10)' : 'rgba(255,255,255,0.03)',
            color: slot === t ? '#F4F4F0' : 'var(--ink-dim)',
            fontFamily: 'JetBrains Mono', fontSize: 12, fontWeight: 500
          }}>{t}</button>
        ))}
      </div>

      <StickyCTA
        total={sel ? sel.price : 0}
        label="Continuar"
        hint="por persona"
        disabled={!sel}
        onPress={() => sel && next()}
      />
    </div>
  );
}

function ExperienceCard({ exp, selected, onSelect }) {
  const icon = {
    fans: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M17 21V19C17 16.79 15.21 15 13 15H5C2.79 15 1 16.79 1 19V21M23 21V19C23 17.13 21.74 15.55 20 15.13M16 3.13C17.74 3.55 19 5.13 19 7C19 8.87 17.74 10.45 16 10.87M13 7C13 9.21 11.21 11 9 11C6.79 11 5 9.21 5 7C5 4.79 6.79 3 9 3C11.21 3 13 4.79 13 7Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    seat: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M3 18V20H21V18M5 13V18H19V13M7 6V13H17V6L12 3L7 6Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>,
    crown: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M2 17H22M3 8L7 12L12 5L17 12L21 8V17H3V8Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>,
  };

  return (
    <button onClick={onSelect} style={{
      position:'relative', textAlign:'left', cursor:'pointer',
      padding: 16, borderRadius: 16,
      border: selected ? '1.5px solid var(--green-bright)' : '1px solid var(--line-2)',
      background: selected ? 'rgba(41,196,107,0.06)' : 'rgba(255,255,255,0.03)',
      color: 'var(--ink)', transition: 'all 0.2s',
      display:'flex', gap: 14, alignItems:'center'
    }}>
      {exp.badge && (
        <div style={{
          position:'absolute', top: -8, right: 14,
          padding:'3px 8px', borderRadius: 6,
          background: 'var(--green-bright)', color:'#0A0A0A',
          fontSize: 9, fontWeight: 700, fontFamily:'JetBrains Mono', letterSpacing:'0.1em'
        }}>★ {exp.badge}</div>
      )}
      <div style={{
        width: 52, height: 52, borderRadius: 12,
        background: selected ? 'var(--green-bright)' : 'rgba(255,255,255,0.06)',
        color: selected ? '#0A0A0A' : '#F4F4F0',
        display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0
      }}>{icon[exp.icon]}</div>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{
          fontFamily:'Barlow Condensed', fontStyle:'italic', fontWeight:700,
          fontSize: 18, textTransform:'uppercase', letterSpacing:'0.02em'
        }}>{exp.name}</div>
        <div style={{ fontSize: 11, color:'var(--ink-dim)', marginTop:2 }}>{exp.description}</div>
        <div style={{ display:'flex', gap: 6, marginTop: 8, flexWrap:'wrap' }}>
          {exp.perks.slice(0, 2).map(p => (
            <span key={p} style={{
              fontSize:9, padding:'2px 6px', borderRadius: 4,
              background:'rgba(255,255,255,0.05)', color:'var(--ink-dim)',
              fontFamily:'JetBrains Mono', letterSpacing:'0.05em'
            }}>{p}</span>
          ))}
        </div>
      </div>
      <div style={{ textAlign:'right', flexShrink:0 }}>
        <div style={{ fontSize:9, color:'var(--ink-mute)', fontFamily:'JetBrains Mono', letterSpacing:'0.1em' }}>DESDE</div>
        <div style={{
          fontFamily:'Barlow Condensed', fontStyle:'italic', fontWeight:700,
          fontSize: 20, color:'#F4F4F0'
        }}>{formatPrice(exp.price)}</div>
      </div>
    </button>
  );
}

// Step 2: Asistentes (count + names)
function StepAttendees({ booking, setBooking, next, back, match }) {
  const count = booking.count || 1;
  const exp = booking.experience;
  const subtotal = exp.price * count;

  const updateCount = (delta) => {
    const nc = Math.max(1, Math.min(8, count + delta));
    const arr = booking.attendees ? [...booking.attendees] : [];
    while (arr.length < nc) arr.push({ name:'', doc:'' });
    while (arr.length > nc) arr.pop();
    if (arr.length > 0 && !arr[0].name) arr[0] = { name:'Rafael Andrade', doc:'12.345.678-9' };
    setBooking({ ...booking, count: nc, attendees: arr });
  };

  // initialize
  useEffect(() => {
    if (!booking.attendees) {
      const arr = [{ name:'Rafael Andrade', doc:'12.345.678-9' }];
      setBooking({ ...booking, count: 1, attendees: arr });
    }
  }, []);

  return (
    <div style={{ padding:'0 18px', paddingBottom: 130, height:'100%', overflowY:'auto' }}>
      <div style={{ paddingTop: 8 }}>
        <TopBar title="Reserva" onBack={back} />
        <ProgressBar step={2} />
      </div>

      <div style={{
        fontFamily:'Barlow Condensed', fontStyle:'italic', fontWeight:700,
        fontSize: 26, lineHeight: 0.95, marginBottom: 4, marginTop: 18, textTransform:'uppercase'
      }}>¿Cuántos<br/>van al partido?</div>
      <div style={{ fontSize:12, color:'var(--ink-dim)', marginBottom: 18 }}>
        Reserva hasta 8 entradas en una sola transacción.
      </div>

      {/* Counter */}
      <div style={{
        padding: 22, borderRadius: 16,
        background:'rgba(255,255,255,0.04)', border:'1px solid var(--line)',
        display:'flex', alignItems:'center', justifyContent:'space-between',
        marginBottom: 18
      }}>
        <CounterButton onClick={() => updateCount(-1)} disabled={count <= 1}>−</CounterButton>
        <div style={{ textAlign:'center' }}>
          <div style={{
            fontFamily:'Barlow Condensed', fontStyle:'italic', fontWeight:700,
            fontSize: 56, lineHeight:1, color:'#F4F4F0'
          }}>{count}</div>
          <div style={{ fontSize:11, color:'var(--ink-mute)', fontFamily:'JetBrains Mono', letterSpacing:'0.1em', marginTop:4 }}>
            {count === 1 ? 'PERSONA' : 'PERSONAS'}
          </div>
        </div>
        <CounterButton onClick={() => updateCount(1)} disabled={count >= 8}>+</CounterButton>
      </div>

      {/* Attendees list */}
      <div style={{
        fontFamily:'JetBrains Mono', fontSize:10, letterSpacing:'0.15em',
        color:'var(--ink-mute)', marginBottom: 10
      }}>DATOS DE ASISTENTES</div>

      <div style={{ display:'flex', flexDirection:'column', gap: 10 }}>
        {(booking.attendees || []).map((a, i) => (
          <AttendeeRow key={i} index={i} attendee={a} />
        ))}
      </div>

      <div style={{
        marginTop: 14, padding: 12, borderRadius: 10,
        background:'rgba(255,255,255,0.03)', border:'1px dashed var(--line-2)',
        fontSize: 11, color:'var(--ink-dim)', display:'flex', gap:8, alignItems:'flex-start'
      }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ flexShrink:0, marginTop:1, color:'var(--ink-mute)' }}>
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M12 8V13M12 16V16.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        <div>El primer asistente toma tus datos. Solo nombre y documento — nada más.</div>
      </div>

      <StickyCTA
        total={subtotal}
        label="Continuar"
        hint={`${count} × ${formatPrice(exp.price)}`}
        breakdown={[
          { label: `${exp.name} × ${count}`, value: formatPrice(subtotal) },
          { label: 'Total', value: formatPrice(subtotal) },
        ]}
        onPress={next}
      />
    </div>
  );
}

function CounterButton({ onClick, disabled, children }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      width: 56, height: 56, borderRadius:'50%',
      border: '1px solid var(--line-2)',
      background: disabled ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.06)',
      color: disabled ? 'var(--ink-mute)' : '#F4F4F0',
      fontSize: 26, fontWeight: 300, cursor: disabled ? 'not-allowed' : 'pointer',
      display:'flex', alignItems:'center', justifyContent:'center'
    }}>{children}</button>
  );
}

function AttendeeRow({ index, attendee }) {
  return (
    <div style={{
      padding: 14, borderRadius: 12,
      background:'rgba(255,255,255,0.03)', border:'1px solid var(--line)'
    }}>
      <div style={{
        display:'flex', alignItems:'center', gap:8, marginBottom:10,
      }}>
        <div style={{
          width: 22, height: 22, borderRadius:'50%',
          background: 'var(--green-bright)', color:'#0A0A0A',
          display:'flex', alignItems:'center', justifyContent:'center',
          fontSize: 11, fontWeight:700, fontFamily:'JetBrains Mono'
        }}>{index + 1}</div>
        <div style={{ fontSize: 12, color:'var(--ink-dim)', fontFamily:'JetBrains Mono', letterSpacing:'0.05em' }}>
          ASISTENTE {index + 1} {index === 0 && <span style={{ color:'var(--green-bright)' }}>· TÚ</span>}
        </div>
      </div>
      <div style={{ display:'grid', gap: 8 }}>
        <FormField label="Nombre completo" value={attendee.name} placeholder="Ej. Lucas Silva" />
        <FormField label="Documento" value={attendee.doc} placeholder="RUT / DNI / Pasaporte" />
      </div>
    </div>
  );
}

function FormField({ label, value, placeholder }) {
  return (
    <div style={{
      padding: '8px 12px', borderRadius: 10,
      background:'rgba(255,255,255,0.04)', border:'1px solid var(--line)'
    }}>
      <div style={{ fontSize:9, color:'var(--ink-mute)', fontFamily:'JetBrains Mono', letterSpacing:'0.08em' }}>{label.toUpperCase()}</div>
      <div style={{
        fontSize: 13, color: value ? '#F4F4F0' : 'var(--ink-mute)',
        marginTop: 2, fontWeight: 500
      }}>{value || placeholder}</div>
    </div>
  );
}

// Step 3: Resumen (el pago se confirma y coordina por WhatsApp, no en la app)
function StepPayment({ booking, setBooking, next, back, match }) {
  const exp = booking.experience;
  const subtotal = exp.price * booking.count;
  const total = subtotal;

  return (
    <div style={{ padding:'0 18px', paddingBottom: 130, height:'100%', overflowY:'auto' }}>
      <div style={{ paddingTop: 8 }}>
        <TopBar title="Resumen" onBack={back} />
        <ProgressBar step={3} />
      </div>

      <div style={{
        fontFamily:'Barlow Condensed', fontStyle:'italic', fontWeight:700,
        fontSize: 26, lineHeight: 0.95, marginBottom: 4, marginTop: 18, textTransform:'uppercase'
      }}>Casi listo.<br/>Confirmamos por WhatsApp.</div>
      <div style={{ fontSize:12, color:'var(--ink-dim)', marginBottom: 18 }}>
        El precio es referencial y puede variar de un partido a otro. Tu anfitrión confirma el valor final y el pago directamente por WhatsApp.
      </div>

      {/* Order summary card */}
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
        <div style={{ paddingTop: 12, display:'flex', flexDirection:'column', gap: 4 }}>
          <RowKV label="Subtotal referencial" value={formatPrice(subtotal)} />
          <div style={{ height:1, background:'var(--line)', margin:'8px 0' }} />
          <RowKV label="Total referencial" value={formatPrice(total)} bold />
        </div>
      </div>

      <div style={{
        marginTop: 4, padding: 12, borderRadius: 10,
        background:'rgba(255,255,255,0.03)', border:'1px solid var(--line)',
        fontSize: 11, color:'var(--ink-dim)', display:'flex', gap:8, alignItems:'center'
      }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ color:'#25D366', flexShrink:0 }}><path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.1-.3.2-.6.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.4.1-.6l.5-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.4M12 2a10 10 0 00-8.6 15l-1 3.6 3.7-1A10 10 0 1012 2z"/></svg>
        <div>Sin cobro en la app. Tu anfitrión te escribe por WhatsApp para cerrar disponibilidad y forma de pago.</div>
      </div>

      <StickyCTA
        total={total}
        label="Continuar por WhatsApp"
        breakdown={[
          { label: `${exp.name} × ${booking.count}`, value: formatPrice(subtotal) },
          { label: 'Total referencial', value: formatPrice(total) },
        ]}
        onPress={() => { setBooking({ ...booking, total }); next(); }}
      />
    </div>
  );
}

function PaymentOption({ selected, onClick, icon, name, sub }) {
  return (
    <button onClick={onClick} style={{
      display:'flex', alignItems:'center', gap: 12, padding: 14, borderRadius: 12,
      border: selected ? '1.5px solid var(--green-bright)' : '1px solid var(--line-2)',
      background: selected ? 'rgba(41,196,107,0.06)' : 'rgba(255,255,255,0.03)',
      color:'var(--ink)', cursor:'pointer', textAlign:'left', width:'100%'
    }}>
      <div style={{
        width: 40, height: 40, borderRadius: 10,
        background: 'rgba(255,255,255,0.06)',
        display:'flex', alignItems:'center', justifyContent:'center',
        color: '#F4F4F0', flexShrink:0
      }}>{icon}</div>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ fontSize: 14, fontWeight: 600 }}>{name}</div>
        <div style={{ fontSize: 11, color:'var(--ink-dim)', marginTop:1 }}>{sub}</div>
      </div>
      <div style={{
        width: 20, height: 20, borderRadius:'50%',
        border: selected ? '6px solid var(--green-bright)' : '1.5px solid var(--line-2)',
      }} />
    </button>
  );
}

function RowKV({ label, value, muted, bold, accent }) {
  return (
    <div style={{
      display:'flex', justifyContent:'space-between',
      fontSize: bold ? 14 : 12,
      color: muted ? 'var(--ink-mute)' : 'var(--ink-dim)',
      fontWeight: bold ? 600 : 400
    }}>
      <span>{label}</span>
      <span style={{
        color: accent || (bold ? '#F4F4F0' : muted ? 'var(--ink-mute)' : 'var(--ink)'),
        fontFamily: bold ? 'Barlow Condensed' : 'JetBrains Mono',
        fontStyle: bold ? 'italic' : 'normal',
        fontWeight: bold ? 700 : 500,
        fontSize: bold ? 16 : 12,
      }}>{value}</span>
    </div>
  );
}

// Step 4: Processing
function StepProcessing({ next }) {
  useEffect(() => {
    const t = setTimeout(next, 1800);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{
      height:'100%', display:'flex', flexDirection:'column', alignItems:'center',
      justifyContent:'center', padding: 30, textAlign:'center'
    }}>
      <div className="fe-pulse" style={{
        width: 90, height: 90, borderRadius: '50%',
        background:'rgba(41,196,107,0.08)', border:'1px solid rgba(41,196,107,0.3)',
        display:'flex', alignItems:'center', justifyContent:'center', marginBottom: 26
      }}>
        <div style={{
          width: 60, height: 60, borderRadius:'50%',
          background:'rgba(41,196,107,0.15)',
          display:'flex', alignItems:'center', justifyContent:'center'
        }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" style={{ color:'var(--green-bright)' }}>
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6"/>
            <path d="M12 7V12L15 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
          </svg>
        </div>
      </div>
      <div style={{
        fontFamily:'Barlow Condensed', fontStyle:'italic', fontWeight:700,
        fontSize: 28, textTransform:'uppercase', lineHeight: 0.95
      }}>Procesando<br/>tu reserva</div>
      <div style={{ fontSize:13, color:'var(--ink-dim)', marginTop: 14 }}>
        Generando tu ticket digital…
      </div>
      <style>{`
        @keyframes fePulse { 0%,100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.08); opacity: 0.85; } }
        .fe-pulse { animation: fePulse 1.4s ease-in-out infinite; }
      `}</style>
    </div>
  );
}

// Step 5: Confirmation + ticket
function StepConfirmation({ booking, match, navigate, restart }) {
  const exp = booking.experience;
  const reservaId = 'FE-' + (Math.random().toString(36).slice(2, 8)).toUpperCase();

  return (
    <div style={{ padding:'0 18px', paddingBottom: 130, height:'100%', overflowY:'auto' }}>
      <div style={{ paddingTop: 8 }}>
        <TopBar title="¡Listo!" />
        <ProgressBar step={5} />
      </div>

      {/* Hero check */}
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
        }}>Reserva<br/>confirmada</div>
        <div style={{ fontSize: 12, color:'var(--ink-dim)', marginTop: 8 }}>
          Te enviamos el comprobante por correo.
        </div>
      </div>

      {/* Ticket card */}
      <TicketCard match={match} exp={exp} count={booking.count} reservaId={reservaId} total={booking.total} />

      {/* Actions */}
      <div style={{ marginTop: 18, display:'flex', flexDirection:'column', gap: 10 }}>
        <button style={{
          padding: '14px 16px', borderRadius: 14,
          background:'#F4F4F0', color:'#0A0A0A', border:'none',
          fontFamily:'Inter', fontWeight: 600, fontSize: 14,
          display:'flex', alignItems:'center', justifyContent:'center', gap: 10, cursor:'pointer'
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 12.04C17.04 9.49 19.18 8.27 19.28 8.21C18.13 6.55 16.34 6.32 15.71 6.30C14.20 6.14 12.74 7.20 11.97 7.20C11.19 7.20 10.00 6.31 8.73 6.34C7.10 6.36 5.58 7.30 4.74 8.77C3.04 11.74 4.30 16.13 5.95 18.55C6.78 19.74 7.74 21.07 9.00 21.02C10.24 20.97 10.71 20.22 12.21 20.22C13.71 20.22 14.13 21.02 15.42 20.99C16.75 20.97 17.58 19.79 18.39 18.59C19.34 17.22 19.73 15.88 19.75 15.81C19.71 15.79 17.06 14.78 17.05 12.04Z"/></svg>
          Agregar a Apple Wallet
        </button>
        <button onClick={() => navigate('home')} style={{
          padding: '14px 16px', borderRadius: 14,
          background:'transparent', color:'#F4F4F0',
          border:'1px solid var(--line-2)',
          fontFamily:'Inter', fontWeight: 500, fontSize: 14, cursor:'pointer'
        }}>Volver al inicio</button>
      </div>

      <div style={{
        marginTop: 22, padding: 14, borderRadius: 12,
        background:'rgba(255,255,255,0.03)', border:'1px solid var(--line)',
        display:'flex', gap: 12, alignItems:'flex-start'
      }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ color:'var(--green-bright)', flexShrink:0, marginTop:1 }}>
          <path d="M22 12C22 17.52 17.52 22 12 22C10.39 22 8.86 21.62 7.5 20.95L2 22L3.05 16.5C2.38 15.14 2 13.61 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        </svg>
        <div style={{ fontSize: 12, color:'var(--ink-dim)', lineHeight: 1.5 }}>
          Recibirás un recordatorio <strong style={{ color:'#F4F4F0' }}>3 horas antes</strong> con el mapa al estadio.
        </div>
      </div>
    </div>
  );
}

function TicketCard({ match, exp, count, reservaId, total }) {
  return (
    <div style={{ position:'relative' }}>
      {/* Top half */}
      <div style={{
        background:'#F4F4F0', color:'#0A0A0A', borderRadius: '18px 18px 0 0',
        padding: 16, position:'relative', overflow:'hidden'
      }}>
        {/* subtle stripe accent */}
        <div style={{
          position:'absolute', top:0, left:0, right:0, height: 4,
          background: 'linear-gradient(90deg, #c8102e 0 33%, #1f7a3a 33% 66%, #0a0a0a 66%)'
        }} />
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom: 14, paddingTop: 4 }}>
          <div>
            <div style={{ fontSize: 10, fontFamily:'JetBrains Mono', letterSpacing:'0.15em', color:'rgba(0,0,0,0.5)' }}>{match.league}</div>
            <div style={{ fontFamily:'Barlow Condensed', fontStyle:'italic', fontWeight:700, fontSize: 22, marginTop:2, textTransform:'uppercase', lineHeight: 1 }}>
              {match.home.short} <span style={{ opacity:0.4 }}>×</span> {match.away.short}
            </div>
          </div>
          <BrandStripes size={14} />
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap: 12, marginBottom: 14 }}>
          <TicketField label="Estadio" value={match.stadium} />
          <TicketField label="Fecha" value={match.date} />
          <TicketField label="Hora" value={match.time} />
          <TicketField label="Sector" value={exp.name} />
        </div>
      </div>

      {/* Perforation */}
      <div style={{ position:'relative', height: 14, background:'#F4F4F0' }}>
        <div style={{
          position:'absolute', left:-8, top:'50%', transform:'translateY(-50%)',
          width: 16, height: 16, borderRadius:'50%', background:'#0A0A0A'
        }} />
        <div style={{
          position:'absolute', right:-8, top:'50%', transform:'translateY(-50%)',
          width: 16, height: 16, borderRadius:'50%', background:'#0A0A0A'
        }} />
        <div style={{
          position:'absolute', left:14, right:14, top:'50%', height:1,
          background: 'repeating-linear-gradient(to right, rgba(0,0,0,0.3) 0 4px, transparent 4px 8px)'
        }} />
      </div>

      {/* Bottom — QR */}
      <div style={{
        background:'#F4F4F0', color:'#0A0A0A', borderRadius: '0 0 18px 18px',
        padding: 16, display:'flex', alignItems:'center', gap: 14
      }}>
        <QRPlaceholder />
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ fontSize: 9, fontFamily:'JetBrains Mono', letterSpacing:'0.12em', color:'rgba(0,0,0,0.5)' }}>RESERVA</div>
          <div style={{ fontFamily:'JetBrains Mono', fontWeight:600, fontSize: 14 }}>{reservaId}</div>
          <div style={{ fontSize: 10, color:'rgba(0,0,0,0.6)', marginTop: 8 }}>
            {count} {count === 1 ? 'asistente' : 'asistentes'} · {formatPrice(total)}
          </div>
        </div>
      </div>
    </div>
  );
}

function TicketField({ label, value }) {
  return (
    <div>
      <div style={{ fontSize: 9, fontFamily:'JetBrains Mono', letterSpacing:'0.12em', color:'rgba(0,0,0,0.45)' }}>{label.toUpperCase()}</div>
      <div style={{ fontSize: 13, fontWeight: 600, marginTop: 2, color:'#0A0A0A' }}>{value}</div>
    </div>
  );
}

function QRPlaceholder() {
  // generate a stable pseudo-random 17x17 QR-ish pattern
  const N = 17;
  const cells = [];
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      const seed = (r*31 + c*17 + r*c) % 7;
      const fill = seed < 3;
      cells.push({ r, c, fill });
    }
  }
  // Force position markers (corners 3x3 inside 7x7)
  const isInCorner = (r, c) =>
    (r < 7 && c < 7) || (r < 7 && c >= N-7) || (r >= N-7 && c < 7);

  return (
    <div style={{
      width: 96, height: 96, padding: 6, background:'#fff', borderRadius: 8,
      flexShrink: 0, position:'relative'
    }}>
      <svg viewBox={`0 0 ${N} ${N}`} width="100%" height="100%">
        {cells.map(({r,c,fill}, i) => {
          if (isInCorner(r,c)) return null;
          return fill ? <rect key={i} x={c} y={r} width="1" height="1" fill="#0a0a0a" /> : null;
        })}
        {/* Corner markers */}
        {[[0,0],[0,N-7],[N-7,0]].map(([y,x],i)=>(
          <g key={i}>
            <rect x={x} y={y} width="7" height="7" fill="#0a0a0a"/>
            <rect x={x+1} y={y+1} width="5" height="5" fill="#fff"/>
            <rect x={x+2} y={y+2} width="3" height="3" fill="#0a0a0a"/>
          </g>
        ))}
      </svg>
    </div>
  );
}

Object.assign(window, {
  StepExperience, StepAttendees, StepPayment, StepProcessing, StepConfirmation,
  TicketCard, QRPlaceholder
});
