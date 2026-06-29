// ════════════════════════════════════════════════════════════
// MRC Widgets — Botón flotante de WhatsApp + Chatbot FAQ
// Se auto-inyecta. Incluir como script externo
// después de mrc/store.js en cualquier página.
// ════════════════════════════════════════════════════════════
(function () {
  const FAQ = (window.MRC && window.MRC.FAQ) || [];
  const PHONE = (window.MRC && window.MRC.WHATSAPP) || '5521999990000';

  const css = `
  .mrc-fab-wrap { position: fixed; right: 22px; bottom: 22px; z-index: 9000; display:flex; flex-direction:column; align-items:flex-end; gap: 14px; font-family: Inter, system-ui, sans-serif; }
  .mrc-fab { width: 58px; height: 58px; border-radius: 50%; border:none; cursor:pointer; display:flex; align-items:center; justify-content:center; box-shadow: 0 10px 30px rgba(0,0,0,0.4); transition: transform .2s cubic-bezier(.22,1,.36,1); position:relative; }
  .mrc-fab:hover { transform: translateY(-3px) scale(1.05); }
  .mrc-fab.wa { background: #25D366; }
  .mrc-fab.bot { background: #fff; }
  .mrc-fab .mrc-badge { position:absolute; top:-3px; right:-3px; width:18px; height:18px; border-radius:50%; background:#d11a2a; color:#fff; font-size:10px; font-weight:700; display:flex; align-items:center; justify-content:center; border:2px solid #070708; }
  .mrc-fab .mrc-tip { position:absolute; right: 70px; white-space:nowrap; background:#111; color:#f4f4f0; font-size:12px; padding:8px 12px; border-radius:10px; opacity:0; pointer-events:none; transform: translateX(6px); transition: all .2s; box-shadow:0 8px 24px rgba(0,0,0,.4); }
  .mrc-fab:hover .mrc-tip { opacity:1; transform:none; }

  .mrc-chat { position: fixed; right: 22px; bottom: 92px; z-index: 9001; width: 360px; max-width: calc(100vw - 44px); height: 520px; max-height: calc(100vh - 130px); background:#0f0f12; border:1px solid rgba(255,255,255,0.12); border-radius: 20px; box-shadow: 0 30px 70px rgba(0,0,0,0.6); display:none; flex-direction:column; overflow:hidden; font-family: Inter, system-ui, sans-serif; }
  .mrc-chat.open { display:flex; animation: mrcUp .3s cubic-bezier(.22,1,.36,1); }
  @keyframes mrcUp { from{opacity:0; transform:translateY(20px)} to{opacity:1; transform:none} }
  .mrc-chat-head { background: linear-gradient(135deg,#1a1a1f,#0f0f12); padding: 16px 18px; display:flex; align-items:center; gap:12px; border-bottom:1px solid rgba(255,255,255,0.08); }
  .mrc-chat-head .av { width:40px; height:40px; border-radius:50%; background:linear-gradient(135deg,#d11a2a,#0e5c2f); display:flex; align-items:center; justify-content:center; font-family:'Barlow Condensed',sans-serif; font-style:italic; font-weight:800; color:#fff; font-size:16px; }
  .mrc-chat-head .t { flex:1; }
  .mrc-chat-head .t b { color:#f4f4f0; font-size:14px; display:block; }
  .mrc-chat-head .t span { color:#8a8a92; font-size:11px; display:flex; align-items:center; gap:5px; }
  .mrc-chat-head .t span i { width:6px; height:6px; border-radius:50%; background:#46e08a; display:inline-block; }
  .mrc-chat-head button { background:none; border:none; color:#8a8a92; cursor:pointer; padding:4px; }
  .mrc-chat-body { flex:1; overflow-y:auto; padding: 16px; display:flex; flex-direction:column; gap:10px; background:#0b0b0e; }
  .mrc-msg { max-width:85%; padding:10px 13px; border-radius:14px; font-size:13px; line-height:1.45; }
  .mrc-msg.bot { align-self:flex-start; background:#1c1c22; color:#f4f4f0; border-bottom-left-radius:4px; }
  .mrc-msg.user { align-self:flex-end; background:#d11a2a; color:#fff; border-bottom-right-radius:4px; }
  .mrc-chips { display:flex; flex-wrap:wrap; gap:8px; padding: 12px 16px; border-top:1px solid rgba(255,255,255,0.08); background:#0f0f12; }
  .mrc-chip { padding:8px 12px; border-radius:999px; border:1px solid rgba(255,255,255,0.18); background:transparent; color:#cfcfd4; font-size:12px; cursor:pointer; transition: all .2s; font-family:inherit; }
  .mrc-chip:hover { background:#fff; color:#111; border-color:#fff; }
  .mrc-chat-foot { padding:10px 16px; border-top:1px solid rgba(255,255,255,0.08); background:#0f0f12; }
  .mrc-chat-foot a { display:flex; align-items:center; justify-content:center; gap:8px; background:#25D366; color:#fff; text-decoration:none; padding:11px; border-radius:12px; font-size:13px; font-weight:600; }
  `;
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  const waHref = (txt) => `https://wa.me/${PHONE}?text=${encodeURIComponent(txt || 'Hola, quiero información sobre las entradas para el Maracanã')}`;

  const wrap = document.createElement('div');
  wrap.className = 'mrc-fab-wrap';
  wrap.innerHTML = `
    <div class="mrc-chat" id="mrcChat">
      <div class="mrc-chat-head">
        <div class="av">FE</div>
        <div class="t"><b>Asistente Football Experience</b><span><i></i> en línea · responde al instante</span></div>
        <button id="mrcChatClose" aria-label="Cerrar"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button>
      </div>
      <div class="mrc-chat-body" id="mrcChatBody"></div>
      <div class="mrc-chips" id="mrcChips"></div>
      <div class="mrc-chat-foot">
        <a href="${waHref()}" target="_blank" rel="noopener">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.1-.3.2-.6.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.4.1-.6l.5-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.4M12 2a10 10 0 00-8.6 15l-1 3.6 3.7-1A10 10 0 1012 2z"/></svg>
          Hablar con un anfitrión por WhatsApp
        </a>
      </div>
    </div>
    <button class="mrc-fab bot" id="mrcBotFab" aria-label="Preguntas frecuentes">
      <span class="mrc-tip">¿Dudas? Pregúntame</span>
      <span class="mrc-badge">?</span>
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z" stroke="#111" stroke-width="1.8" stroke-linejoin="round"/><circle cx="9" cy="10" r="1.1" fill="#111"/><circle cx="13" cy="10" r="1.1" fill="#111"/></svg>
    </button>
    <a class="mrc-fab wa" href="${waHref()}" target="_blank" rel="noopener" aria-label="WhatsApp">
      <span class="mrc-tip">Escríbenos por WhatsApp</span>
      <svg width="30" height="30" viewBox="0 0 24 24" fill="#fff"><path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.1-.3.2-.6.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.4.1-.6l.5-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.4M12 2a10 10 0 00-8.6 15l-1 3.6 3.7-1A10 10 0 1012 2z"/></svg>
    </a>
  `;
  document.body.appendChild(wrap);

  const chat = wrap.querySelector('#mrcChat');
  const body = wrap.querySelector('#mrcChatBody');
  const chips = wrap.querySelector('#mrcChips');

  function addMsg(text, who) {
    const m = document.createElement('div');
    m.className = 'mrc-msg ' + who;
    m.innerHTML = text;
    body.appendChild(m);
    body.scrollTop = body.scrollHeight;
  }
  function renderChips() {
    chips.innerHTML = '';
    FAQ.forEach(f => {
      const c = document.createElement('button');
      c.className = 'mrc-chip';
      c.textContent = f.q;
      c.addEventListener('click', () => {
        addMsg(f.q, 'user');
        setTimeout(() => addMsg(f.a, 'bot'), 350);
      });
      chips.appendChild(c);
    });
  }
  let greeted = false;
  function openChat() {
    chat.classList.add('open');
    if (!greeted) {
      greeted = true;
      addMsg('¡Hola! 👋 Soy el asistente de <b>Football Experience</b>. Toca una pregunta o escríbenos por WhatsApp.', 'bot');
      renderChips();
    }
  }
  wrap.querySelector('#mrcBotFab').addEventListener('click', () => {
    chat.classList.contains('open') ? chat.classList.remove('open') : openChat();
  });
  wrap.querySelector('#mrcChatClose').addEventListener('click', () => chat.classList.remove('open'));
})();
