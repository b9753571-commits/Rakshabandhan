const config = {
  brotherName: 'Kuku',
  photo: 'assets/kuku-photo.jpg',
  video: 'assets/kuku-memory.mp4',
  music: 'assets/background-music.mp3',
  message: `Happy rakshabandhan bachcha 😘🥰🫶🏻

Uk mere liye tum bhut jyada special ho 🥹🙈😁

Mera chota bhai mujhe mila 😌😁

Maine bss wish manga aur dekho meko mil gyaa 🤭🫣

Apan ki vibe bhut milti h bss thoda tu preshan Krta h 😒😒

Issi liye bss iss janam jhelungi kyuki agar next year wps janam hua tb toh mera saga bhai hoga fr toh daily prasad dungi 😌😌😂

Seedha kr dungi 😒

Lkn pyar usse jyada krungi meli jaan jo h 😭😭🫂😘😘 rula diya yeh likhte hue 🥲🥲

Chor koi n 😁🫂

Love uhh bhut sara meri jaan 🥹🫶🏻🫂💟`
};

const $ = (selector) => document.querySelector(selector);

function init() {
  const nameNodes = document.querySelectorAll('[data-brother-name]');
  nameNodes.forEach((node) => { node.textContent = node.textContent === 'KUKU' ? config.brotherName.toUpperCase() : config.brotherName; });
  try {
    $('#specialPhoto').src = config.photo;
    $('#modalPhoto').src = config.photo;
    $('#specialVideo source').src = config.video;
    $('#backgroundMusic source').src = config.music;
    $('#specialVideo').load();
  } catch (error) {}

function createAtmosphere() {
  const sets = [
    ['.heart-field', '♥', 9],
    ['.sparkle-field', '✦', 13],
    ['.petal-field', '✿', 10]
  ];
  sets.forEach(([selector, symbol, count]) => {
    const field = $(selector);
    for (let index = 0; index < count; index += 1) {
      const item = document.createElement('span');
      item.textContent = symbol;
      item.style.left = `${Math.random() * 100}%`;
      item.style.animationDelay = `${Math.random() * -18}s`;
      item.style.animationDuration = `${12 + Math.random() * 12}s`;
      item.style.fontSize = `${.65 + Math.random() * .65}rem`;
      field.appendChild(item);
    }
  });
}

function typeMessage() {
  const target = $('#messageCopy');
  const lines = config.message.split('\n');
  let lineIndex = 0;
  let characterIndex = 0;
  const typeNext = () => {
    if (lineIndex >= lines.length) return;
    if (characterIndex < lines[lineIndex].length) {
      target.textContent += lines[lineIndex][characterIndex];
      characterIndex += 1;
      setTimeout(typeNext, 25);
    } else {
      target.textContent += '\n';
      lineIndex += 1;
      characterIndex = 0;
      setTimeout(typeNext, 130);
    }
  };
  typeNext();
}

const music = $('#backgroundMusic');
function playMusic() {
  try {
    const playPromise = music.play();
    if (playPromise) {
      playPromise.then(() => {
        $('#musicToggle').setAttribute('aria-pressed', 'true');
        $('#musicToggle span').textContent = 'Music on';
      }).catch(() => {});
    }
  } catch (error) {}
}

$('#openSurprise').addEventListener('click', () => {
  playMusic();
  $('#introScreen').classList.add('leaving');
  setTimeout(() => {
    $('#introScreen').hidden = true;
    $('#messageScreen').hidden = false;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 500);
});

$('#readMessage').addEventListener('click', () => {
  $('#readMessage').hidden = true;
  $('#letterCard').hidden = false;
  $('#memoryContent').hidden = false;
  typeMessage();
});

$('#videoReveal').addEventListener('click', () => {
  $('#videoReveal').hidden = true;
  $('#videoContent').hidden = false;
  $('#videoContent').scrollIntoView({ behavior: 'smooth', block: 'start' });
});

$('#musicToggle').addEventListener('click', () => {
  if (music.paused) {
    playMusic();
  } else {
    music.pause();
    $('#musicToggle').setAttribute('aria-pressed', 'false');
    $('#musicToggle span').textContent = 'Music off';
  }
});

$('#photoButton').addEventListener('click', () => { $('#photoModal').hidden = false; });
$('#closeModal').addEventListener('click', () => { $('#photoModal').hidden = true; });
$('#photoModal').addEventListener('click', (event) => { if (event.target === $('#photoModal')) $('#photoModal').hidden = true; });
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') $('#photoModal').hidden = true; });
  createAtmosphere();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
