// Shared UI primitives
const { useState, useEffect, useRef } = React;

// Match poster — graphic sports-poster style with team crests/colors
function MatchPoster({ match, height = 220, compact = false }) {
  const m = match;
  const posterStyles = {
    classic: { bg: 'linear-gradient(135deg, #1a0606 0%, #0a0a0a 50%, #1a0606 100%)', accent: '#c8102e' },
    libertadores: { bg: 'linear-gradient(135deg, #1a1408 0%, #0a0a0a 60%)', accent: '#d6b96a' },
    sudamericana: { bg: 'linear-gradient(135deg, #0d1a0d 0%, #0a0a0a 60%)', accent: '#29c46b' },
    maracana: { bg: 'linear-gradient(135deg, #0a1a0d 0%, #0a0a0a 60%)', accent: '#1f7a3a' },
  };
  const ps = posterStyles[m.poster] || posterStyles.classic;

  return (
    <div style={{
      position:'relative', height, borderRadius: 18, overflow:'hidden',
      background: ps.bg,
      border: '1px solid rgba(255,255,255,0.08)',
    }}>
      {/* Stripes texture */}
      <div style={{
        position:'absolute', inset:0, opacity: 0.06,
        backgroundImage: 'repeating-linear-gradient(90deg, #fff 0 1px, transparent 1px 8px)'
      }} />
      {/* Stadium silhouette glow */}
      <div style={{
        position:'absolute', left: '50%', bottom: '-20%', transform: 'translateX(-50%)',
        width: '140%', height: '60%', borderRadius: '50%',
        background: `radial-gradient(ellipse at center, ${ps.accent}30 0%, transparent 60%)`,
        filter: 'blur(20px)'
      }} />

      {/* League tag */}
      <div style={{
        position:'absolute', top: 14, left: 14,
        fontFamily:'Barlow Condensed', fontWeight:700, fontStyle:'italic', fontSize:10,
        letterSpacing: '0.18em', color: ps.accent, textTransform:'uppercase'
      }}>{m.league}</div>

      {/* Big diagonal title */}
      <div style={{
        position:'absolute', top: 28, left: 14, right: 14,
        fontFamily:'Barlow Condensed', fontWeight:700, fontStyle:'italic',
        fontSize: compact ? 26 : 34, letterSpacing:'0.02em', lineHeight: 0.92,
        color: '#fff', textTransform:'uppercase',
      }}>{m.tag}</div>

      {/* Date + time pill */}
      <div style={{
        position:'absolute', top: compact ? 64 : 74, left: 14,
        display:'flex', alignItems:'center', gap:8,
        fontFamily:'JetBrains Mono', fontSize: 10, letterSpacing:'0.1em',
        color: 'rgba(255,255,255,0.7)'
      }}>
        <span>{m.dateFull.toUpperCase()}</span>
        <span style={{ width:3, height:3, borderRadius:'50%', background:'rgba(255,255,255,0.4)' }} />
        <span>{m.time}</span>
      </div>

      {/* Crests row at bottom */}
      <div style={{
        position:'absolute', bottom: 16, left: 16, right: 16,
        display:'flex', alignItems:'center', justifyContent:'space-between', gap:10
      }}>
        <CrestBlob team={m.home} />
        <div style={{
          fontFamily:'Barlow Condensed', fontStyle:'italic', fontWeight:700,
          fontSize: 28, color: '#fff'
        }}>X</div>
        <CrestBlob team={m.away} align="right" />
      </div>
    </div>
  );
}

function CrestBlob({ team, align='left' }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems: align==='right' ? 'flex-end':'flex-start', gap:6, flex:1 }}>
      <div style={{
        width: 46, height: 46, borderRadius: 12,
        background: `linear-gradient(135deg, ${team.color}, ${team.accent || '#000'})`,
        border: '2px solid rgba(255,255,255,0.3)',
        display:'flex', alignItems:'center', justifyContent:'center',
        fontFamily:'Barlow Condensed', fontStyle:'italic', fontWeight:700, fontSize: 16, color:'#fff',
        boxShadow: '0 4px 16px rgba(0,0,0,0.5)'
      }}>{team.short}</div>
      <div style={{
        fontFamily:'Barlow Condensed', fontStyle:'italic', fontWeight:600, fontSize: 13,
        color:'#fff', textTransform:'uppercase', letterSpacing:'0.04em'
      }}>{team.name}</div>
    </div>
  );
}

// FE Logo
function FELogo({ size = 22, color = '#F4F4F0' }) {
  return (
    <div style={{
      fontFamily: 'Barlow Condensed', fontStyle:'italic', fontWeight:700,
      fontSize: size, color, letterSpacing: '0.02em', lineHeight: 1,
      textTransform: 'uppercase'
    }}>
      FOOTBALL<br />EXPERIENCE
    </div>
  );
}

// Brand mark — stripe icon
function BrandStripes({ size = 18 }) {
  return (
    <svg width={size*2} height={size} viewBox="0 0 36 18" fill="none">
      <rect x="0" y="0" width="6" height="18" fill="#c8102e" />
      <rect x="0" y="3" width="6" height="2" fill="#0a0a0a" />
      <rect x="0" y="8" width="6" height="2" fill="#0a0a0a" />
      <rect x="0" y="13" width="6" height="2" fill="#0a0a0a" />
      <rect x="8" y="0" width="6" height="18" fill="#1f7a3a" />
      <rect x="8" y="3" width="6" height="2" fill="#7a1d1d" />
      <rect x="8" y="8" width="6" height="2" fill="#7a1d1d" />
      <rect x="8" y="13" width="6" height="2" fill="#7a1d1d" />
      <rect x="16" y="0" width="2" height="18" fill="#fff" />
      <rect x="20" y="0" width="2" height="18" fill="#fff" />
      <rect x="24" y="0" width="2" height="18" fill="#fff" />
      <path d="M30 0 L36 6 L36 18 L30 18 Z" fill="#fff" />
    </svg>
  );
}

// Progress dots
function ProgressBar({ step, total = 5 }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:6, padding:'0 6px' }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{
          flex: 1, height: 3, borderRadius: 2,
          background: i < step ? '#F4F4F0' : 'rgba(255,255,255,0.15)',
          transition: 'background 0.3s'
        }} />
      ))}
      <div style={{
        marginLeft: 8, fontFamily:'JetBrains Mono', fontSize: 10, color: 'rgba(255,255,255,0.5)'
      }}>{step}/{total}</div>
    </div>
  );
}

// Top bar with back / title
function TopBar({ title, onBack, right }) {
  return (
    <div style={{
      display:'flex', alignItems:'center', justifyContent:'space-between',
      padding: '8px 0', minHeight: 40
    }}>
      {onBack ? (
        <button onClick={onBack} style={{
          width:36, height:36, borderRadius:'50%', border:'1px solid var(--line-2)',
          background:'rgba(255,255,255,0.04)', color:'#F4F4F0',
          display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer'
        }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      ) : <div style={{ width: 36 }} />}
      <div style={{
        fontFamily:'Barlow Condensed', fontStyle:'italic', fontWeight:700, fontSize: 13,
        letterSpacing:'0.18em', color:'#F4F4F0', textTransform:'uppercase'
      }}>{title}</div>
      <div style={{ width: 36, display:'flex', justifyContent:'flex-end' }}>{right}</div>
    </div>
  );
}

// Sticky bottom CTA bar with price summary
function StickyCTA({ total, label, onPress, disabled, hint, breakdown }) {
  const showTotal = typeof total === 'number';
  const [open, setOpen] = useState(false);
  return (
    <div style={{
      position:'absolute', left:0, right:0, bottom:0,
      padding: '12px 18px 22px',
      background: 'linear-gradient(to top, #0A0A0A 60%, rgba(10,10,10,0))',
    }}>
      {open && breakdown && (
        <div style={{
          marginBottom: 10, padding: 12, borderRadius: 12,
          background: 'rgba(255,255,255,0.04)', border:'1px solid var(--line)'
        }}>
          {breakdown.map((b,i) => (
            <div key={i} style={{ display:'flex', justifyContent:'space-between', fontSize:12, color:'var(--ink-dim)', padding:'3px 0' }}>
              <span>{b.label}</span><span style={{ color:'#F4F4F0', fontFamily:'JetBrains Mono' }}>{b.value}</span>
            </div>
          ))}
        </div>
      )}
      <div style={{ display:'flex', alignItems:'center', gap:10 }}>
        <div onClick={() => breakdown && setOpen(o=>!o)} style={{ flex:'0 0 auto', cursor: breakdown ? 'pointer':'default', display: showTotal ? 'block' : 'none' }}>
          <div style={{ fontFamily:'JetBrains Mono', fontSize:9, color:'var(--ink-mute)', letterSpacing:'0.1em' }}>TOTAL</div>
          <div style={{ fontFamily:'Barlow Condensed', fontStyle:'italic', fontWeight:700, fontSize:22, color:'#F4F4F0' }}>
            {showTotal ? formatPrice(total) : ''}
            {breakdown && <span style={{ marginLeft:4, fontSize:11, color:'var(--ink-mute)' }}>{open ? '▲' : '▼'}</span>}
          </div>
          {hint && <div style={{ fontSize:10, color:'var(--ink-mute)' }}>{hint}</div>}
        </div>
        <button onClick={onPress} disabled={disabled} style={{
          flex:1, height: 56, borderRadius: 16, border:'none',
          background: disabled ? 'rgba(244,244,240,0.2)' : '#F4F4F0',
          color: '#0A0A0A', fontFamily:'Barlow Condensed', fontStyle:'italic', fontWeight:700,
          fontSize: 16, letterSpacing:'0.1em', textTransform:'uppercase',
          cursor: disabled ? 'not-allowed' : 'pointer',
          display:'flex', alignItems:'center', justifyContent:'center', gap:8,
        }}>
          {label}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8H13M13 8L8 3M13 8L8 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}

Object.assign(window, { MatchPoster, CrestBlob, FELogo, BrandStripes, ProgressBar, TopBar, StickyCTA });
