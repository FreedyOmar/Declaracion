
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
    text = `Para ti; Con la sinceridad de mi corazon y mi alma :\n
    \nQuiero empezar pidiendote disculpas.......
    \n por todas las veces que deliveradamente te ignore, por las veces que minimice tus problemas y priorice los mios,por todas las lagrimas que deramaste por mi infantileria
    y falta de compromiso, y por no tomar las cosas con mas seriedad y siempre dudar de tus sentimientos hacia mi.
      \n desde que tengo memoria me decian que era muy maduro para mi edad, y crei tanto en eso que cuando debi seguir madurando me quede esctancado, no podia ver mas aya de lo que yo cria.
      deje a un lado tus sentimentos, y te lastime de la peor forma posible, de manera sentimental. En pocas palabras, fui un total egosita que simplemente se prioriso a si mismo
      por eso tenia tanto temor a decir que te amaba, por que si al final ya no deseabas estar conmigo, mi excusa para evitar el dolor seria esa decir que solo me gustabas y que debia ser algo pasajero.
      \n debo de confesar que siempre tuve miedo de que tus semtimientos hacia mi solo fueran una burbuja, que tarde o temprano revienta lo mas ironico es que por actuar como actue
      ese miedo se volvio una realidad.
      \n decirte, o bueno escribirte todo esto no cambia el pasado pero, sirve para que sepas que me siento arrepentido por todo lo que te cause
      \n en segundo lugar queria agradecerte 
      \n incluso despues de todo lo vivido me brindaste tu amistad, has estado ahi para mi cuando mas lo necesite, me has ayuado a sonreir, a sentir que mis sentimientos tambien importan
      a que incluso, lo que considero que me hace un "monstruo" es lo que mas humano me hace, que no soy perfecto, pero que eso no me hace una mala persona.
      \n eres como el sol en mi vida, lo alumbras todo,haces que todo se sienta tan calido, haces que todo gire y yo.... soy tan feliz con solo girar a tu alrededor.
      \n si no mal recuerdo una vez te dije que lo sentimientos jamas cambian, los adaptas para usarlos de otra manera; con cada sonrisa con cada pelea y con cada broma trate de 
      convencerme de que lo que sentia por ti era solo amistad, pero no puedo evitar sentir que no es asi.
      \n y si como seguramente lo estas suponiendo o pensando........ Aun me gustas.
      \n El que me contaras tus problemas, y que sintiera un fuerte dolor en mi mente, en mi pecho y en mi corazon me llevaron a dejar de engañarme a mi mismo.
      \n Quiero estar ahi para ti..... y no me mal entiedas no necesito que me respondas si sientes lo mismo o no, solo quiero que lo sepas y ya. 
      \n Quiero poder ayudarte cuando lo necesites, extenderte mi mano, y formar una nueva sonrisa en tu cara, recordarte lo valiosa que eres cuando te haga falta,
      como te mencione no necesito saber si sientes lo mismo.
      \n solo quiero que me permitas ser parte de tu vida.
      
      
      `;  } else {
    text = decodeURIComponent(text).replace(/\\n/g, '\n');
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
  let startDate = startParam ? new Date(startParam + 'T00:00:00') : new Date('2022-07-22T00:00:00'); 
  let eventDate = eventParam ? new Date(eventParam + 'T00:00:00') : new Date('2022-07-22T00:00:00');

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
