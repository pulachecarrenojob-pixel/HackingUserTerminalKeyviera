// ─── Cursor ───────────────────────────────────────────────
const cursor = document.getElementById('cursor');
document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

// ─── Matrix rain ─────────────────────────────────────────
const canvas = document.getElementById('matrix-bg');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const cols = Math.floor(canvas.width / 16);
const drops = Array(cols).fill(1);
const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789ABCDEF@#$%&<>[]{}';
function drawMatrix() {
  ctx.fillStyle = 'rgba(2,10,2,0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#00ff41';
  ctx.font = '14px Share Tech Mono';
  drops.forEach((y, i) => {
    const ch = chars[Math.floor(Math.random() * chars.length)];
    ctx.fillText(ch, i * 16, y * 16);
    if (y * 16 > canvas.height && Math.random() > 0.975) drops[i] = 0;
    drops[i]++;
  });
}
setInterval(drawMatrix, 45);

// ─── Particles ───────────────────────────────────────────
function spawnParticle(text, x, y) {
  const p = document.createElement('div');
  p.className = 'particle';
  p.textContent = text;
  p.style.left = (x || Math.random() * window.innerWidth) + 'px';
  p.style.top = (y || Math.random() * window.innerHeight) + 'px';
  document.body.appendChild(p);
  setTimeout(() => p.remove(), 3000);
}
setInterval(() => {
  const bits = ['0','1','FF','AC','D3','7F','00','#','$'];
  spawnParticle(bits[Math.floor(Math.random()*bits.length)]);
}, 400);

// ─── Output helpers ──────────────────────────────────────
const out = document.getElementById('output');
function addLine(text, cls='', delay=0) {
  return new Promise(res => setTimeout(() => {
    const el = document.createElement('span');
    el.className = 'line ' + cls;
    el.innerHTML = text;
    out.appendChild(el);
    out.appendChild(document.createTextNode('\n'));
    out.scrollTop = out.scrollHeight;
    res(el);
  }, delay));
}
function addBlank(delay=0) { return addLine('', 'blank', delay); }
function addSep(delay=0) { return addLine('─'.repeat(60), 'separator', delay); }

let typingSpeed = 18;
async function typeLines(lines, baseDelay=0) {
  for (let i = 0; i < lines.length; i++) {
    await addLine(lines[i][0], lines[i][1], baseDelay + i * typingSpeed);
  }
}

// ─── Progress bar ────────────────────────────────────────
function addProgress(label, duration, delay=0) {
  return new Promise(res => {
    setTimeout(() => {
      const wrap = document.createElement('div');
      wrap.className = 'progress-wrap';
      wrap.innerHTML = `
        <span class="progress-label">${label}</span>
        <div class="progress-bar"><div class="progress-fill" style="width:0%" id="pf-${label.replace(/\s/g,'_')}"></div></div>
        <span class="progress-pct" id="pp-${label.replace(/\s/g,'_')}">0%</span>`;
      out.appendChild(wrap);
      out.scrollTop = out.scrollHeight;
      let pct = 0;
      const id = label.replace(/\s/g,'_');
      const step = setInterval(() => {
        pct += Math.random() * 8 + 2;
        if (pct >= 100) { pct = 100; clearInterval(step); res(); }
        document.getElementById('pf-'+id).style.width = pct + '%';
        document.getElementById('pp-'+id).textContent = Math.floor(pct) + '%';
        out.scrollTop = out.scrollHeight;
      }, duration / 50);
    }, delay);
  });
}

// ─── Profile card ─────────────────────────────────────────
function showProfileCard() {
  const card = document.createElement('div');
  card.id = 'profile-card';
  card.style.display = 'block';
  card.innerHTML = `
    <div class="profile-row"><span class="profile-key">[ USUARIO ]</span><span class="profile-val blink-val">kai-vibes ( ◜‿◝ )♡</span></div>
    <div class="profile-row"><span class="profile-key">[ HANDLE ]</span><span class="profile-val blink-val">@keyviera12345</span></div>
    <div class="profile-row"><span class="profile-key">[ PLATAFORMA ]</span><span class="profile-val">TikTok / ByteDance CDN</span></div>
    <div class="profile-row"><span class="profile-key">[ SEGUIDORES ]</span><span class="profile-val blink-val">30</span></div>
    <div class="profile-row"><span class="profile-key">[ ME GUSTA ]</span><span class="profile-val blink-val">116</span></div>
    <div class="profile-row"><span class="profile-key">[ RATIO LIKES/FOLLOW ]</span><span class="profile-val">3.87 — ALTO ENGAGEMENT ▲</span></div>
    <div class="profile-row"><span class="profile-key">[ IP HASH ]</span><span class="profile-val">4d3f...[REDACTADO]..a1c7</span></div>
    <div class="profile-row"><span class="profile-key">[ SESIÓN ]</span><span class="profile-val">ACTIVA ● <span style="color:var(--red)">AHORA</span></span></div>
    <div class="profile-row"><span class="profile-key">[ CIFRADO ]</span><span class="profile-val">AES-256 — <span style="color:var(--yellow)">BYPASSED ✓</span></span></div>
    <div class="profile-row"><span class="profile-key">[ STATUS ]</span><span class="profile-val" style="color:var(--green);animation:blink 1s step-end infinite">▓ ACCESO TOTAL OBTENIDO</span></div>
  `;
  out.appendChild(card);
  out.scrollTop = out.scrollHeight;

  // Animate rows one by one
  const rows = card.querySelectorAll('.profile-row');
  rows.forEach((r, i) => {
    r.style.opacity = '0';
    setTimeout(() => { r.style.transition='opacity 0.3s'; r.style.opacity='1'; }, i * 120);
  });
}

// ─── Boot sequence ───────────────────────────────────────
async function bootSequence() {
  await addBlank();
  await addLine('GHOSTNET OS v2.7.3 — Kernel 5.19.0-h4x — 64bit', 'banner', 100);
  await addLine('Copyright (c) 2026 [IDENTIDAD OCULTA] — All rights reserved', 'info', 200);
  await addSep(300);
  await addBlank(350);

  // Banner art
  const art = [
    ['██╗  ██╗ ██╗  ██╗ █████╗  ██████╗██╗  ██╗', 'banner'],
    ['██║  ██║ ██╔╝██╔╝██╔══██╗██╔════╝██║ ██╔╝', 'banner'],
    ['███████║ █████╔╝ ███████║██║     █████╔╝ ', 'banner'],
    ['██╔══██║ ██╔═██╗ ██╔══██║██║     ██╔═██╗ ', 'banner'],
    ['██║  ██║ ██║  ██╗██║  ██║╚██████╗██║  ██╗', 'banner'],
    ['╚═╝  ╚═╝ ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝', 'banner'],
  ];
  for (let i = 0; i < art.length; i++) {
    await addLine(art[i][0], art[i][1], 400 + i * 60);
  }
  await addBlank(800);
  await addLine('Objetivo identificado: <span style="color:var(--red)">@keyviera12345</span> &nbsp;|&nbsp; TikTok Protocol', 'warn', 900);
  await addLine('Iniciando módulos de infiltración...', 'info', 1100);
  await addBlank(1200);

  // Init steps
  const steps = [
    ['[  OK  ] Cargando módulo de red fantasma...', 'success'],
    ['[  OK  ] VPN multi-capa activada (ES→BR→JP→TOR)', 'success'],
    ['[  OK  ] Spoofing de MAC address completado', 'success'],
    ['[ WARN ] Firewall detectado — aplicando bypass...', 'warn'],
    ['[  OK  ] Firewall neutralizado', 'success'],
    ['[  OK  ] Inyectando headers falsos en petición HTTP', 'success'],
    ['[  OK  ] Módulo de scraping social cargado v4.2.1', 'success'],
  ];
  for (let i = 0; i < steps.length; i++) {
    await addLine(steps[i][0], steps[i][1], 1400 + i * 220);
  }
  await addBlank(3100);

  // Scanning
  await addLine('root@h4ck3r:~$ ./scan_target.sh keyviera12345 --platform tiktok', 'cmd', 3200);
  await addBlank(3400);
  await addLine('&gt;&gt; Escaneando perfil objetivo...', 'info', 3500);
  await addProgress('Localizando endpoint CDN   ', 1200, 3600);
  await addProgress('Descifrando token de sesión', 1800, 4900);
  await addProgress('Extrayendo metadatos       ', 1400, 6800);
  await addProgress('Volcando base de datos     ', 2000, 8300);
  await addProgress('Bypassing 2FA              ', 900,  10400);

  await addBlank(11500);
  const alertEl = document.createElement('div');
  alertEl.className = 'alert-box';
  alertEl.innerHTML = '⚠  ALERTA: SISTEMA DE DETECCIÓN ACTIVADO — ACELERANDO EXTRACCIÓN';
  setTimeout(() => { out.appendChild(alertEl); out.scrollTop = out.scrollHeight; }, 11600);

  await addBlank(12200);
  await addLine('[ ████████████████████████ ] 100% — BRECHA EXITOSA', 'success', 12300);
  await addBlank(12500);
  await addSep(12600);
  await addLine('╔══════════════════════════════════════════════╗', 'success', 12700);
  await addLine('║   ACCESO COMPLETO OBTENIDO — DATOS VOLCADOS  ║', 'success', 12800);
  await addLine('╚══════════════════════════════════════════════╝', 'success', 12900);
  await addSep(13000);
  await addBlank(13100);

  // Profile card
  setTimeout(() => showProfileCard(), 13200);

  await addBlank(14000);
  await addLine('Analizando actividad reciente...', 'info', 14100);

  const hexlines = [
    '4b 65 79 20 56 69 65 72 61 20 7c 20 54 69 6b 54 6f 6b  | KeyViera TikTok',
    '66 6f 6c 6c 6f 77 65 72 73 3a 20 30 30 30 30 30 30 1e  | followers:000030',
    '6c 69 6b 65 73 5f 74 6f 74 61 6c 3a 20 30 31 31 36 2e  | likes_total:0116',
    '65 6e 67 61 67 65 6d 65 6e 74 5f 72 61 74 65 3a 20 48  | engagement_rate:H',
    '73 74 61 74 75 73 3a 20 41 43 54 49 56 45 5f 4f 4e 4c  | status:ACTIVE_ONL',
  ];
  for (let i = 0; i < hexlines.length; i++) {
    await addLine(hexlines[i], 'hexline', 14300 + i * 150);
  }

  await addBlank(15200);
  await addLine('[ ANÁLISIS COMPLETADO ] Ratio de engagement 3.87x superior al promedio de nicho', 'highlight', 15300);
  await addLine('[ NOTA ] Perfil en fase de crecimiento — actividad diaria confirmada ✓', 'highlight', 15600);
  await addBlank(15900);

  await addLine('Todos los datos guardados en /root/.ghostnet/exfil/keyviera12345.db', 'data', 16000);
  await addLine('Hash de verificación: SHA256:7f3a...c9b1 ✓', 'data', 16200);
  await addBlank(16400);
  await addSep(16500);
  await addLine('Misión completada. Conexión activa. Esperando comandos...', 'success', 16600);
  await addBlank(16700);
  await addLine('Escribe <span style="color:var(--yellow)">help</span> para ver comandos disponibles', 'info', 16800);
  await addBlank(17000);

  document.getElementById('userinput').focus();
}

// ─── Interactive commands ─────────────────────────────────
const commands = {
  help: async () => {
    await addBlank();
    await addLine('COMANDOS DISPONIBLES:', 'warn');
    const cmds = [
      ['whoami     ', 'Mostrar identidad del operador'],
      ['status     ', 'Estado de la conexión con el objetivo'],
      ['followers  ', 'Detallar seguidores del objetivo'],
      ['likes      ', 'Análisis de me gusta'],
      ['crack      ', 'Intentar crackear contraseña'],
      ['trace      ', 'Rastrear ubicación aproximada'],
      ['inject     ', 'Inyectar payload en perfil'],
      ['ghost      ', 'Modo fantasma — borrar rastros'],
      ['matrix     ', 'Activar vista matrix completa'],
      ['clear      ', 'Limpiar terminal'],
    ];
    for (const [cmd, desc] of cmds) {
      await addLine(`  <span style="color:var(--cyan)">${cmd}</span>  — ${desc}`, 'data', 0);
    }
    await addBlank();
  },
  whoami: async () => {
    await addBlank();
    await addLine('uid=0(root) gid=0(root) groups=0(root),1337(h4x0r)', 'success');
    await addLine('Operador: [CLASIFICADO] — Nodo: ghostnet-lima-01', 'data');
    await addLine('Sesión cifrada: AES-256-GCM | Uptime: 4h 22m 11s', 'data');
    await addBlank();
  },
  status: async () => {
    await addBlank();
    await addLine('── ESTADO DE OPERACIÓN ──────────────────────', 'separator');
    await addLine('Objetivo activo    : @keyviera12345 ● ONLINE', 'success');
    await addLine('Sesión en objetivo : ABIERTA — sin detección', 'success');
    await addLine('Latencia           : 12ms (excelente)', 'success');
    await addLine('Nodos activos      : 7 / 7', 'success');
    await addLine('Tiempo en sesión   : 00:04:22', 'data');
    await addSep();
    await addBlank();
  },
  followers: async () => {
    await addBlank();
    await addLine('Extrayendo lista de seguidores...', 'info');
    await addProgress('Descargando follower graph', 1200, 0);
    setTimeout(async () => {
      await addBlank();
      await addLine('Total seguidores verificados: <span style="color:var(--cyan)">30</span>', 'success');
      await addLine('Seguidores activos (últimos 30d): <span style="color:var(--cyan)">28</span>', 'data');
      await addLine('Bots detectados: <span style="color:var(--yellow)">0</span> — perfil 100% orgánico', 'data');
      await addLine('Tasa de retención: <span style="color:var(--green)">93.3%</span> ▲', 'highlight');
      await addBlank();
    }, 1400);
  },
  likes: async () => {
    await addBlank();
    await addLine('Analizando distribución de likes...', 'info');
    await addProgress('Procesando interacciones  ', 900, 0);
    setTimeout(async () => {
      await addBlank();
      await addLine('Total Me Gusta: <span style="color:var(--cyan)">116</span>', 'success');
      await addLine('Media por video: ~5.8 likes', 'data');
      await addLine('Pico máximo registrado: 23 likes — 1 video viral', 'data');
      await addLine('Ratio likes/seguidor: <span style="color:var(--green)">3.87x</span> — EXCELENTE', 'highlight');
      await addBlank();
    }, 1100);
  },
  crack: async () => {
    await addBlank();
    await addLine('Iniciando ataque de diccionario...', 'warn');
    await addProgress('Cargando wordlist 14M entradas', 800, 0);
    await addProgress('Aplicando reglas de mutación  ', 1200, 900);
    await addProgress('Intentando combinaciones      ', 2000, 2200);
    setTimeout(async () => {
      await addBlank();
      const alertEl = document.createElement('div');
      alertEl.className = 'alert-box';
      alertEl.innerHTML = '🔒  CONTRASEÑA PROTEGIDA CON 2FA — ACCESO VÍA TOKEN ALTERNATIVO';
      out.appendChild(alertEl);
      out.scrollTop = out.scrollHeight;
      await addBlank();
      await addLine('[ ALTERNATIVA ] Sesión mantenida por cookie robada — sin necesidad de pass', 'success');
      await addBlank();
    }, 4500);
  },
  trace: async () => {
    await addBlank();
    await addLine('Triangulando señal mediante torres GSM + IP leak...', 'info');
    await addProgress('Correlacionando metadatos IP  ', 1500, 0);
    await addProgress('Cruzando con señal de celular ', 1200, 1600);
    setTimeout(async () => {
      await addBlank();
      await addLine('── UBICACIÓN APROXIMADA ─────────────────', 'separator');
      await addLine('País      : Perú 🇵🇪', 'data');
      await addLine('ISP       : [DATOS OFUSCADOS POR PRIVACIDAD]', 'warn');
      await addLine('Precisión : Zona urbana — ±2km', 'data');
      await addLine('Timestamp : ' + new Date().toLocaleString('es-PE'), 'data');
      await addBlank();
    }, 2900);
  },
  inject: async () => {
    await addBlank();
    await addLine('Preparando payload XSS + CSRF...', 'warn');
    await addProgress('Compilando payload            ', 600, 0);
    await addProgress('Inyectando en perfil objetivo ', 1000, 700);
    setTimeout(async () => {
      await addLine('<span style="color:var(--red)">[ ABORTADO ]</span> Sistema de integridad detectó modificación', 'danger');
      await addLine('Payload revertido. Usando vector alternativo...', 'warn');
      await addProgress('Vector alternativo API privada', 800, 200);
      setTimeout(async () => {
        await addLine('[ OK ] Payload alternativo insertado — indetectable ✓', 'success');
        await addBlank();
      }, 1100);
    }, 1800);
  },
  ghost: async () => {
    await addBlank();
    await addLine('Activando protocolo GHOST — eliminando rastros...', 'warn');
    const items = ['Borrando logs de acceso','Limpiando caché de consultas','Revirtiendo DNS queries','Destruyendo headers HTTP','Rotando IP saliente','Eliminando cookies de sesión'];
    for (let i = 0; i < items.length; i++) {
      await addLine(`[  RM  ] ${items[i]}...`, 'info', i * 200);
    }
    setTimeout(async () => {
      await addBlank();
      await addLine('[ GHOST ] Modo fantasma activo. Rastro: 0 bytes detectables', 'success');
      await addBlank();
    }, items.length * 200 + 400);
  },
  matrix: async () => {
    canvas.style.opacity = '0.7';
    await addLine('[ MATRIX MODE ] Activado. Escribe <span style="color:var(--yellow)">matrix off</span> para desactivar', 'success');
    setTimeout(() => { canvas.style.opacity = '0.15'; }, 5000);
  },
  'matrix off': async () => {
    canvas.style.opacity = '0.15';
    await addLine('[ MATRIX MODE ] Desactivado.', 'info');
  },
  clear: () => { out.innerHTML = ''; },
};

// Input handler
const input = document.getElementById('userinput');
const history = [];
let histIdx = -1;

input.addEventListener('keydown', async e => {
  if (e.key === 'Enter') {
    const val = input.value.trim();
    if (!val) return;
    history.unshift(val);
    histIdx = -1;
    await addLine(val, 'cmd');
    input.value = '';
    const fn = commands[val.toLowerCase()];
    if (fn) {
      await fn();
    } else {
      await addLine(`bash: ${val}: comando no encontrado. Escribe <span style="color:var(--yellow)">help</span>`, 'danger');
      await addBlank();
    }
  }
  if (e.key === 'ArrowUp') {
    histIdx = Math.min(histIdx + 1, history.length - 1);
    input.value = history[histIdx] || '';
  }
  if (e.key === 'ArrowDown') {
    histIdx = Math.max(histIdx - 1, -1);
    input.value = histIdx === -1 ? '' : history[histIdx];
  }
});

// Boot!
bootSequence();