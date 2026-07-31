const loaderScreen = document.getElementById('loader-screen');
const messageScreen = document.getElementById('message-screen');
const percentText = document.getElementById('percent-text');
const startBtn = document.getElementById('start-btn');
const scene3d = document.getElementById('scene-3d');
const bgMusic = document.getElementById('bg-music');

// محاكاة التحميل
let progress = 0;
const loadInterval = setInterval(() => {
  progress += Math.floor(Math.random() * 6) + 3;
  if (progress >= 100) {
    progress = 100;
    clearInterval(loadInterval);
    setTimeout(showButtonScreen, 400);
  }
  percentText.textContent = `${progress}%`;
}, 40);

function showButtonScreen() {
  loaderScreen.style.opacity = '0';
  setTimeout(() => {
    loaderScreen.style.display = 'none';
    messageScreen.style.display = 'flex';
    setTimeout(() => messageScreen.style.opacity = '1', 50);
  }, 500);
}

// العبارات المخصصة بالإنجليزية مع اسم Shourqe و I LOVE YOU
const phrases = [
  "I LOVE YOU", 
  "SHOURQE", 
  "MY SUNSHINE", 
  "FOREVER", 
  "MY EVERYTHING", 
  "I LOVE YOU", 
  "FOREVER & ALWAYS", 
  "MY LOVE", 
  "YOU ARE MY WORLD", 
  "SHOURQE"
];

// صور الاستيكرات الرومانسية
const stickerImages = [
  "WhatsApp Image 2026-07-31 at 2.25.15 AM.jpeg",
  "WhatsApp Image 2026-07-31 at 2.25.18 AM.jpeg",
  "WhatsApp Image 2026-07-31 at 2.54.29 AM (1).jpeg",
  "WhatsApp Image 2026-07-31 at 2.54.29 AM.jpeg",
  "WhatsApp Image 2026-07-31 at 2.54.30 AM.jpeg",
  "WhatsApp Image 2026-07-31 at 4.04.29 AM.jpeg"
];

// متغيرات زوايا ورؤية الكاميرا
let mouseX = 0;
let mouseY = 0;
let zoomZ = 0;

startBtn.addEventListener('click', () => {
  bgMusic.play().catch(() => {});

  messageScreen.style.opacity = '0';
  setTimeout(() => {
    messageScreen.style.display = 'none';
    scene3d.style.display = 'block';
    create3DEffect();
    enableInteractiveCamera(); // تفعيل تفاعل حركة الكاميرا عند النقر والتكبير
  }, 400);
});

function create3DEffect() {
  const totalItems = 180; 

  for (let i = 0; i < totalItems; i++) {
    const item = document.createElement('div');
    item.classList.add('floating-item');

    const randVal = Math.random();

    if (randVal < 0.4) {
      const textEl = document.createElement('div');
      textEl.classList.add('floating-text');
      textEl.textContent = phrases[Math.floor(Math.random() * phrases.length)];
      item.appendChild(textEl);
    } else if (randVal < 0.75) {
      const imgEl = document.createElement('div');
      imgEl.classList.add('card-img');
      const randomImg = stickerImages[Math.floor(Math.random() * stickerImages.length)];
      imgEl.style.backgroundImage = `url('${randomImg}')`;
      item.appendChild(imgEl);
    } else {
      const heartEl = document.createElement('div');
      heartEl.classList.add('heart-item');
      heartEl.textContent = "❤️";
      item.appendChild(heartEl);
    }

    const x = (Math.random() - 0.5) * 1600;
    const y = (Math.random() - 0.5) * 1100;
    item.style.setProperty('--x', `${x}px`);
    item.style.setProperty('--y', `${y}px`);

    const delay = Math.random() * 3.5;
    item.style.animationDelay = `${delay}s`;

    scene3d.appendChild(item);
  }
}

// دالة تحريك الكاميرا والتفاعل عند النقر للاتجاه نحو العناصر
function enableInteractiveCamera() {
  // تفاعل حركة الماوس التلقائي الخفيف
  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 40; // زاوية التوجيه
    mouseY = (e.clientY / window.innerHeight - 0.5) * 40;
    updateCameraTransform();
  });

  // عند الضغط بـ الضغطة الأولى أو المستمرة (Click)
  window.addEventListener('mousedown', () => {
    zoomZ += 150; // اندفاع خفيف وسريع للكاميرا للأمام نحو الصور
    updateCameraTransform();
  });

  // إذا تم اللمس في الهواتف الذكية
  window.addEventListener('touchstart', () => {
    zoomZ += 150;
    updateCameraTransform();
  });
}

function updateCameraTransform() {
  scene3d.style.transform = `rotateY(${mouseX}deg) rotateX(${-mouseY}deg) translateZ(${zoomZ}px)`;
}