
// Cargar el SVG y animar los corazones
fetch('Img/treelove.svg')
  .then(res => res.text())
  .then(svgText => {
    const container = document.getElementById('tree-container');
    container.innerHTML = svgText;
    const svg = container.querySelector('svg');
    if (!svg) return;

    const allPaths = Array.from(svg.querySelectorAll('path'));
    allPaths.forEach(path => {
      path.style.stroke = '#222';
      path.style.strokeWidth = '2.5';
      path.style.fillOpacity = '0';
      const length = path.getTotalLength();
      path.style.strokeDasharray = length;
      path.style.strokeDashoffset = length;
      path.style.transition = 'none';
    });

    setTimeout(() => {
      allPaths.forEach((path, i) => {
        path.style.transition = `stroke-dashoffset 1.2s cubic-bezier(.77,0,.18,1) ${i * 0.08}s, fill-opacity 0.5s ${0.9 + i * 0.08}s`;
        path.style.strokeDashoffset = 0;
        setTimeout(() => {
          path.style.fillOpacity = '1';
          path.style.stroke = '';
          path.style.strokeWidth = '';
        }, 1200 + i * 80);
      });

      const totalDuration = 1200 + (allPaths.length - 1) * 80 + 500;
      setTimeout(() => {
        svg.classList.add('move-and-scale');
        setTimeout(() => {
          showDedicationText();
          startFloatingObjects();
          showCountdown();
          playBackgroundMusic();
        }, 1200);
      }, totalDuration);
    }, 50);

    const heartPaths = allPaths.filter(el => {
      const style = el.getAttribute('style') || '';
      return style.includes('#FC6F58') || style.includes('#C1321F');
    });
    heartPaths.forEach(path => {
      path.classList.add('animated-heart');
    });
  });

function getURLParam(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}
function showDedicationText() {
  let text = getURLParam('text');
  if (!text) {
    text = `Para ti, Ketty, mi amor 💖\n
    \nHoy celebramos nuestro primer mes juntos… y aunque el tiempo pueda parecer breve, lo que has sembrado en mi corazón se siente inmenso, como si cada día a tu lado guardara una eternidad.
    
    \nKetty, desde que llegaste, todo cambió de una forma tan sutil y tan hermosa… como la luz del amanecer que entra sin hacer ruido, pero transforma por completo la oscuridad en esperanza.
    
    \nMe gusta tu forma de ser, tu esencia, tu manera de ver la vida… pero sobre todo, me gusta cómo haces que mi mundo se sienta más cálido, más vivo, más lleno de sentido.
    
    \nA veces me quedo pensando en lo afortunado que soy de coincidir contigo en este momento de nuestras vidas… porque entre millones de caminos posibles, elegimos encontrarnos.
    
    \nLa palabra de Dios dice en 1 Corintios 13:4-7:
    \n“El amor es paciente, es bondadoso; el amor no es envidioso ni jactancioso ni orgulloso. No se comporta con rudeza, no es egoísta, no se enoja fácilmente, no guarda rencor. Todo lo disculpa, todo lo cree, todo lo espera, todo lo soporta.”
    
    \nY eso es lo que deseo contigo, Ketty… un amor que no solo se sienta, sino que se construya con paciencia, con respeto y con verdad, día a día.
    
    \nTambién dice en Eclesiastés 4:9:
    \n“Mejores son dos que uno, porque tienen mejor recompensa por su trabajo.”
    
    \nY contigo todo tiene más sentido… los días son más bonitos, las risas más sinceras, y los silencios más tranquilos.
    
    \nHay algo que nace en lo más profundo de mí y necesito decírtelo:
    \nOjalá pudiera vivir 5 vidas, con 5 empleos diferentes, 5 familias diferentes, 5 caminos distintos… porque aun así, en cada una de esas vidas, estoy seguro de que me volvería a enamorar de ti, Ketty.
    
    \nPorque lo que siento por ti no es pasajero… es como un susurro constante en mi alma que me recuerda que amar también es encontrar un hogar en otra persona.
    
    \nNo somos perfectos, pero contigo entendí que el amor verdadero no busca perfección… busca permanecer, crecer y florecer incluso en los días grises.
    
    \nQuiero que este primer mes sea solo el inicio de algo mucho más grande… de una historia escrita con paciencia, con cariño y con momentos que se vuelvan eternos en nuestra memoria.
    
    \nGracias por existir, por llegar a mi vida y por permitirme caminar a tu lado.
    
    \nFeliz primer mes, Ketty ❤️
    
    \nTe quiero muchísimo… hoy, mañana y en cada vida donde el destino vuelva a cruzarnos.
    `;
  } else {
    text = decodeURIComponent(text).replace(/\\n/g, '\n');
  }
}
  const container = document.getElementById('dedication-text');
  container.classList.add('typing');
  let i = 0;
  function type() {
    if (i <= text.length) {
      container.textContent = text.slice(0, i);
      i++;
      setTimeout(type, text[i - 2] === '\n' ? 350 : 45);
    } else {
      setTimeout(showSignature, 600);
    }
  }
  type();
}

function showSignature() {
  const dedication = document.getElementById('dedication-text');
  let signature = dedication.querySelector('#signature');
  if (!signature) {
    signature = document.createElement('div');
    signature.id = 'signature';
    signature.className = 'signature';
    dedication.appendChild(signature);
  }
  let firma = getURLParam('firma');
  signature.textContent = firma ? decodeURIComponent(firma) : "Mi corazon siempre sera tuyo; Omar";
  signature.classList.add('visible');
}

function startFloatingObjects() {
  const container = document.getElementById('floating-objects');
  let count = 0;
  function spawn() {
    let el = document.createElement('div');
    el.className = 'floating-petal';
    el.style.left = `${Math.random() * 90 + 2}%`;
    el.style.top = `${100 + Math.random() * 10}%`;
    el.style.opacity = 0.7 + Math.random() * 0.3;
    container.appendChild(el);

    const duration = 6000 + Math.random() * 4000;
    const drift = (Math.random() - 0.5) * 60;
    setTimeout(() => {
      el.style.transition = `transform ${duration}ms linear, opacity 1.2s`;
      el.style.transform = `translate(${drift}px, -110vh) scale(${0.8 + Math.random() * 0.6}) rotate(${Math.random() * 360}deg)`;
      el.style.opacity = 0.2;
    }, 30);

    setTimeout(() => {
      if (el.parentNode) el.parentNode.removeChild(el);
    }, duration + 2000);

    if (count++ < 32) setTimeout(spawn, 350 + Math.random() * 500);
    else setTimeout(spawn, 1200 + Math.random() * 1200);
  }
  spawn();
}

function showCountdown() {
  const container = document.getElementById('countdown');
  let startParam = getURLParam('start');
  let eventParam = getURLParam('event');
  let startDate = startParam ? new Date(startParam + 'T00:00:00') : new Date('2026-02-24T00:00:00'); 
  let eventDate = eventParam ? new Date(eventParam + 'T00:00:00') : new Date('2026-02-24T00:00:00');

  function update() {
    const now = new Date();
    let diff = now - startDate;
    let days = Math.floor(diff / (1000 * 60 * 60 * 24));
    let eventDiff = now - eventDate;
    let eventDays = Math.floor(eventDiff / (1000 * 60 * 60 * 24));
    let eventHours = Math.floor((eventDiff / (1000 * 60 * 60)) % 24);
    let eventMinutes = Math.floor((eventDiff / (1000 * 60)) % 60);
    let eventSeconds = Math.floor((eventDiff / 1000) % 60);

     container.innerHTML =
      `Llevas en mi mente: <b>${days}</b> días<br>` +
      `Lo que llevas en mi corazon: <b>${eventDays}d ${eventHours}h ${eventMinutes}m ${eventSeconds}s</b>`;
    container.classList.add('visible');
  }
  update();
  setInterval(update, 1000);
}

function playBackgroundMusic() {
  const audio = document.getElementById('bg-music');
  if (!audio) return;

  let musicaParam = getURLParam('musica');
  if (musicaParam) {
    musicaParam = decodeURIComponent(musicaParam).replace(/[^\w\d .\-]/g, '');
    audio.src = 'Music/' + musicaParam;
  }

  let youtubeParam = getURLParam('youtube');
  if (youtubeParam) {
    let helpMsg = document.getElementById('yt-help-msg');
    if (!helpMsg) {
      helpMsg = document.createElement('div');
      helpMsg.id = 'yt-help-msg';
      helpMsg.style.position = 'fixed';
      helpMsg.style.right = '18px';
      helpMsg.style.bottom = '180px';
      helpMsg.style.background = 'rgba(255,255,255,0.95)';
      helpMsg.style.color = '#e60026';
      helpMsg.style.padding = '10px 16px';
      helpMsg.style.borderRadius = '12px';
      helpMsg.style.boxShadow = '0 2px 8px #e6002633';
      helpMsg.style.fontSize = '1.05em';
      helpMsg.style.zIndex = 100;
      helpMsg.innerHTML = 'Para usar música de YouTube, descarga el audio (por ejemplo, usando y2mate, 4K Video Downloader, etc.), colócalo en la carpeta <b>Music</b> y usa la URL así:<br><br><code>?musica=nombre.mp3</code>';
      document.body.appendChild(helpMsg);
      setTimeout(() => { if(helpMsg) helpMsg.remove(); }, 15000);
    }
  }

  let btn = document.getElementById('music-btn');
  if (!btn) {
    btn = document.createElement('button');
    btn.id = 'music-btn';
    btn.textContent = '🔊 Música';
    btn.style.position = 'fixed';
    btn.style.bottom = '18px';
    btn.style.right = '18px';
    btn.style.zIndex = 99;
    btn.style.background = 'rgba(255,255,255,0.85)';
    btn.style.border = 'none';
    btn.style.borderRadius = '24px';
    btn.style.padding = '10px 18px';
    btn.style.fontSize = '1.1em';
    btn.style.cursor = 'pointer';
    document.body.appendChild(btn);
  }
  audio.volume = 0.7;
  audio.loop = true;
  audio.play().then(() => {
    btn.textContent = '🔊 Música';
  }).catch(() => {
    btn.textContent = '▶️ Música';
  });
  btn.onclick = () => {
    if (audio.paused) {
      audio.play();
      btn.textContent = '🔊 Música';
    } else {
      audio.pause();
      btn.textContent = '🔈 Música';
    }
  };
}


window.addEventListener('DOMContentLoaded', () => {
  playBackgroundMusic();

  // Botón enviar respuesta
  const btn = document.getElementById("send-email-btn");
  if (btn) {
    btn.addEventListener("click", () => {
      const mensaje = document.getElementById("dedication-text").innerText;
      const asunto = "Respuesta a tu dedicatoria ❤️";
      const correo = "anonimatoSecreto1910@gmail.com"; // cambia aquí si deseas otro destino
      window.location.href = `mailto:${correo}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(mensaje)}`;
    });
  }
});
