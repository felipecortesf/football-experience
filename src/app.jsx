// Main App — orchestrates navigation across multiple iPhone frames in a row

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accentColor": "green",
  "showAllScreens": true,
  "fontPair": "antonio"
}/*EDITMODE-END*/;

function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);

  useEffect(() => {
    const root = document.documentElement;
    const map = {
      green: { bright:'#29c46b', deep:'#1f7a3a' },
      red:   { bright:'#ff3b53', deep:'#c8102e' },
      gold:  { bright:'#e6c275', deep:'#a8893f' },
    };
    const v = map[tweaks.accentColor] || map.green;
    root.style.setProperty('--green-bright', v.bright);
    root.style.setProperty('--green', v.deep);
  }, [tweaks.accentColor]);

  return (
    <>
      <TweaksPanel title="Tweaks">
        <TweakSection title="Apariencia">
          <TweakRadio
            label="Acento"
            value={tweaks.accentColor}
            options={[
              { value:'green', label:'Verde' },
              { value:'red', label:'Rojo' },
              { value:'gold', label:'Oro' },
            ]}
            onChange={(v) => setTweak('accentColor', v)}
          />
        </TweakSection>
        <TweakSection title="Vista">
          <TweakToggle
            label="Mostrar todas las pantallas"
            value={tweaks.showAllScreens}
            onChange={(v) => setTweak('showAllScreens', v)}
          />
        </TweakSection>
      </TweaksPanel>

      {tweaks.showAllScreens
        ? <ScreenWall />
        : <SingleApp />}
    </>
  );
}

function ScreenWall() {
  const flowMatch = MATCHES[0];
  const flowExp = EXPERIENCES[1];
  const flowTeam = TEAMS[1]; // Fluminense
  const flowAttendees = [
    { name:'Rafael Andrade', doc:'12.345.678-9' },
    { name:'Camila Rocha', doc:'18.221.998-K' },
  ];
  const flowBooking = {
    experience: flowExp, slot: '17:30', count: 2,
    attendees: flowAttendees, method: 'apple', total: 290,
    reservaId:'FE-A2X9C8'
  };

  const screens = [
    { label:'01 · ELEGIR EQUIPO', node: <TeamSelectScreen onSelect={()=>{}} /> },
    { label:'02 · PARTIDOS DEL EQUIPO', node: <TeamMatchesScreen teamId="fluminense" navigate={()=>{}} back={()=>{}} /> },
    { label:'03 · DETALLE DE PARTIDO', node: <MatchDetailScreen match={flowMatch} navigate={()=>{}} back={()=>{}} /> },
    { label:'04 · EXPERIENCIA · 1/5', node: <StepExperience booking={{ experience: flowExp, slot:'17:30' }} setBooking={()=>{}} next={()=>{}} back={()=>{}} match={flowMatch} /> },
    { label:'05 · ASISTENTES · 2/5', node: <StepAttendees booking={{ experience: flowExp, count:2, attendees: flowAttendees }} setBooking={()=>{}} next={()=>{}} back={()=>{}} match={flowMatch} /> },
    { label:'06 · PAGO · 3/5', node: <StepPayment booking={flowBooking} setBooking={()=>{}} next={()=>{}} back={()=>{}} match={flowMatch} /> },
    { label:'07 · REGISTRO FACIAL · 4/5', node: <FacialOnboardingScreen team={flowTeam} next={()=>{}} back={()=>{}} /> },
    { label:'08 · CONFIRMACIÓN · 5/5', node: <StepConfirmationV2 booking={flowBooking} match={flowMatch} navigate={()=>{}} /> },
    { label:'09 · WHATSAPP · ANFITRIÓN', node: <WhatsAppHandoffScreen booking={flowBooking} match={flowMatch} team={flowTeam} navigate={()=>{}} back={()=>{}} /> },
    { label:'10 · ESTADO DE EMBARQUE', node: <BoardingStatusScreen match={flowMatch} team={flowTeam} navigate={()=>{}} back={()=>{}} /> },
    { label:'11 · CHECK-IN FACIAL', node: <FacialCheckinScreen match={flowMatch} team={flowTeam} back={()=>{}} /> },
    { label:'12 · MIS EMBARQUES', node: <ReservasScreen back={()=>{}} /> },
    { label:'13 · PERFIL', node: <ProfileScreen back={()=>{}} /> },
  ];

  return (
    <div style={{
      padding: '40px 20px',
      display: 'flex', gap: 32, overflowX: 'auto',
      minWidth: '100vw', alignItems:'flex-start',
    }}>
      <div style={{ flexShrink: 0, paddingRight: 20, width: 280 }}>
        <BrandStripes size={20} />
        <div style={{
          fontFamily:'Barlow Condensed', fontStyle:'italic', fontWeight:700,
          fontSize: 56, lineHeight: 0.9, marginTop: 12, textTransform:'uppercase',
          color:'#F4F4F0'
        }}>Football<br/>Experience</div>
        <div style={{
          fontFamily:'JetBrains Mono', fontSize: 11, color:'var(--ink-dim)',
          marginTop: 14, letterSpacing:'0.08em', lineHeight: 1.6
        }}>FLUJO BIOMÉTRICO + WHATSAPP<br/>13 PANTALLAS · v2.0<br/>RIO DE JANEIRO · 2026</div>
        <div style={{
          marginTop: 22, padding: 14, borderRadius: 12,
          background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.1)',
          fontSize: 12, color:'var(--ink-dim)', lineHeight: 1.5
        }}>
          Equipo → partido → pago → <strong style={{color:'var(--green-bright)'}}>registro facial</strong> →
          envío a anfitrión por WhatsApp → hora de embarque → check-in biométrico en el estadio.
        </div>
        <div style={{
          marginTop: 22, padding: 12, borderRadius: 10,
          background:'rgba(41,196,107,0.08)', border:'1px solid rgba(41,196,107,0.3)',
          fontSize: 11, color:'var(--green-bright)', lineHeight: 1.5
        }}>
          ⚡ Click en <strong>01 · ELEGIR EQUIPO</strong> para recorrer el flujo completo.
        </div>
        <div style={{
          marginTop: 18,
          fontFamily:'JetBrains Mono', fontSize:10, color:'var(--ink-mute)', letterSpacing:'0.1em'
        }}>↓ DESLIZA →</div>
      </div>

      {screens.map((s, i) => (
        <div key={i} style={{ flexShrink: 0, display:'flex', flexDirection:'column', gap: 14, alignItems:'center' }}>
          <div style={{
            fontFamily:'Barlow Condensed', fontStyle:'italic', fontWeight:700,
            fontSize: 12, letterSpacing:'0.18em', color:'var(--ink-dim)',
            textTransform:'uppercase'
          }}>{s.label}</div>
          {i === 0 ? <InteractiveFrame /> : (
            <IOSDevice dark={true} width={390} height={844}>
              <div style={{ background:'#0A0A0A', height:'100%', overflow:'hidden', position:'relative', borderRadius: '47px' }}>
                <div style={{ height:'100%', overflow:'hidden', position:'relative' }}>{s.node}</div>
              </div>
            </IOSDevice>
          )}
        </div>
      ))}
    </div>
  );
}

// Interactive frame — full clickable navigation thru the new flow
function InteractiveFrame() {
  const [route, setRoute] = useState({ name:'teamSelect' });
  const [booking, setBooking] = useState({});
  const [teamId, setTeamId] = useState(null);

  const navigate = (name, params={}) => {
    if (name === 'home' || name === 'teamSelect') {
      setBooking({}); setRoute({ name:'teamSelect' }); return;
    }
    if (name === 'teamMatches') setRoute({ name:'teamMatches' });
    else if (name === 'match') setRoute({ name:'match', match: params.match });
    else if (name === 'flow') {
      setBooking({ match: params.match, count: 1 });
      setRoute({ name:'step1', match: params.match });
    } else if (name === 'whatsapp') {
      if (params.booking) setBooking(params.booking);
      setRoute({ name:'whatsapp' });
    } else setRoute({ name, ...params });
  };

  const back = () => {
    const r = route.name;
    if (r === 'teamMatches') setRoute({ name:'teamSelect' });
    else if (r === 'match') setRoute({ name:'teamMatches' });
    else if (r === 'step1') setRoute({ name:'match', match: route.match });
    else if (r === 'step2') setRoute({ name:'step1', match: route.match });
    else if (r === 'step3') setRoute({ name:'step2', match: route.match });
    else if (r === 'facial') setRoute({ name:'step3', match: route.match });
    else if (r === 'whatsapp') setRoute({ name:'confirm' });
    else if (r === 'boarding') setRoute({ name:'whatsapp' });
    else if (r === 'checkin') setRoute({ name:'boarding' });
    else setRoute({ name:'teamSelect' });
  };

  const m = route.match || MATCHES[0];
  const team = TEAMS.find(t => t.id === teamId) || TEAMS[1];

  let content = null;
  if (route.name === 'teamSelect') content = (
    <TeamSelectScreen onSelect={(id) => { setTeamId(id); setRoute({ name:'teamMatches' }); }} />
  );
  else if (route.name === 'teamMatches') content = (
    <TeamMatchesScreen teamId={teamId || 'fluminense'} navigate={navigate} back={back} />
  );
  else if (route.name === 'match') content = <MatchDetailScreen match={m} navigate={navigate} back={back} />;
  else if (route.name === 'step1') content = (
    <StepExperience booking={booking} setBooking={setBooking}
      next={() => setRoute({ name:'step2', match: m })} back={back} match={m} />
  );
  else if (route.name === 'step2') content = (
    <StepAttendees booking={booking} setBooking={setBooking}
      next={() => setRoute({ name:'step3', match: m })} back={back} match={m} />
  );
  else if (route.name === 'step3') content = (
    <StepPayment booking={booking} setBooking={setBooking}
      next={() => setRoute({ name:'facial', match: m })} back={back} match={m} />
  );
  else if (route.name === 'facial') content = (
    <FacialOnboardingScreen team={team}
      next={() => setRoute({ name:'confirm', match: m })} back={back} />
  );
  else if (route.name === 'confirm') content = (
    <StepConfirmationV2 booking={booking} match={m} navigate={navigate} />
  );
  else if (route.name === 'whatsapp') content = (
    <WhatsAppHandoffScreen booking={booking} match={m} team={team} navigate={navigate} back={back} />
  );
  else if (route.name === 'boarding') content = (
    <BoardingStatusScreen match={m} team={team} navigate={navigate} back={back} />
  );
  else if (route.name === 'checkin') content = (
    <FacialCheckinScreen match={m} team={team} back={back} />
  );
  else if (route.name === 'reservas') content = <ReservasScreen navigate={navigate} back={back} />;
  else if (route.name === 'profile') content = <ProfileScreen back={back} />;

  return (
    <IOSDevice dark={true} width={390} height={844}>
      <div style={{
        background:'#0A0A0A', height:'100%', overflow:'auto', position:'relative',
        borderRadius:'47px'
      }}>
        {content}
      </div>
    </IOSDevice>
  );
}

function SingleApp() {
  return (
    <div style={{ padding: 40 }}>
      <InteractiveFrame />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
