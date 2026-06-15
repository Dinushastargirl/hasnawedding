/* ============================================================
   HASNA & JIMNAS WEDDING — JavaScript
   Scroll animations · Nav highlight · Lightbox · Cloudinary
============================================================ */

// ─── Envelope Logic ──────────────────────────────────────────
(function initEnvelope() {
  const envelope = document.getElementById('envelope-overlay');
  const btn = document.getElementById('open-envelope-btn');
  if (!envelope || !btn) return;

  document.body.style.overflow = 'hidden'; // Lock scroll initially
  window.scrollTo(0, 0);

  btn.addEventListener('click', () => {
    envelope.classList.add('open');
    document.body.style.overflow = ''; // Unlock scroll
  });
})();

// ─── Countdown Logic ─────────────────────────────────────────
(function initCountdown() {
  const targetDate = new Date('June 18, 2026 13:00:00').getTime();
  const daysEl = document.getElementById('cd-days');
  const hoursEl = document.getElementById('cd-hours');
  const minsEl = document.getElementById('cd-mins');
  const secsEl = document.getElementById('cd-secs');

  if (!daysEl) return;

  function update() {
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff <= 0) {
      daysEl.innerText = '00'; hoursEl.innerText = '00';
      minsEl.innerText = '00'; secsEl.innerText = '00';
      return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    daysEl.innerText = d.toString().padStart(2, '0');
    hoursEl.innerText = h.toString().padStart(2, '0');
    minsEl.innerText = m.toString().padStart(2, '0');
    secsEl.innerText = s.toString().padStart(2, '0');
  }

  update();
  setInterval(update, 1000);
})();

// ─── Falling Particles ───────────────────────────────────────
(function initParticles() {
  const envContainer = document.getElementById('envelope-particles');
  const mainContainer = document.getElementById('main-particles');
  
  function createParticle(container) {
    if (!container) return;
    const isFlower = Math.random() > 0.4;
    const particle = document.createElement('div');
    particle.className = `particle ${isFlower ? 'particle-flower' : 'particle-snow'}`;
    
    if (isFlower) {
      particle.innerHTML = '🌸';
      particle.style.fontSize = (Math.random() * 10 + 10) + 'px';
    } else {
      const size = Math.random() * 6 + 4;
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
    }
    
    particle.style.left = Math.random() * 100 + 'vw';
    const duration = Math.random() * 5 + 5; 
    particle.style.animationDuration = duration + 's';
    
    container.appendChild(particle);
    
    setTimeout(() => {
      particle.remove();
    }, duration * 1000);
  }
  
  setInterval(() => createParticle(envContainer), 300);
  setInterval(() => createParticle(mainContainer), 600);
})();

// ─── Scroll-reveal with IntersectionObserver ─────────────────
(function initReveal() {
  const targets = document.querySelectorAll('.reveal');
  if (!targets.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
  );

  targets.forEach((el) => observer.observe(el));
})();

// ─── Active nav on scroll ─────────────────────────────────────
(function initNavHighlight() {
  const sections = ['hero', 'couple', 'events', 'gallery', 'blessings'];
  const navLinks = document.querySelectorAll('.nav-link');
  if (!navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach((link) => {
            link.classList.toggle('active', link.dataset.section === id);
          });
        }
      });
    },
    { threshold: 0.35 }
  );

  sections.forEach((id) => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });
})();

// ─── Parallax hero on scroll ──────────────────────────────────
(function initHeroParallax() {
  const heroBg = document.querySelector('.hero-bg');
  if (!heroBg) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        heroBg.style.transform = `scale(1.05) translateY(${scrollY * 0.25}px)`;
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();

// ─── Smooth scroll for anchor links ──────────────────────────
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href').slice(1);
    const target = document.getElementById(targetId);
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ─── Gallery Lightbox ─────────────────────────────────────────
(function initLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = document.getElementById('lightbox-close');

  if (!lightbox || !lightboxImg) return;

  function openLightbox(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => { lightboxImg.src = ''; }, 350);
  }

  galleryItems.forEach((item) => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (img) openLightbox(img.src, img.alt);
    });

    // Keyboard support
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const img = item.querySelector('img');
        if (img) openLightbox(img.src, img.alt);
      }
    });
  });

  closeBtn?.addEventListener('click', closeLightbox);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox();
  });
})();

// ─── Cloudinary Upload Widget ─────────────────────────────────
function openCloudinaryUpload() {
  // Cloudinary account: dzbonbmvv  |  folder: hasna wedding
  if (typeof cloudinary === 'undefined') {
    alert('Upload widget is loading. Please try again in a moment.');
    return;
  }

  const widget = cloudinary.createUploadWidget(
    {
      cloudName: 'dzbonbmvv',
      uploadPreset: 'ml_default',          // Using default unsigned preset
      folder: 'hasna wedding',             // Save into hasna wedding folder
      multiple: true,
      maxFiles: 20,
      maxFileSize: 15000000,               // 15 MB per file
      clientAllowedFormats: ['image'],
      sources: ['local', 'camera', 'google_drive', 'dropbox'],
      theme: 'minimal',
      text: {
        'queue.title': 'Upload Wedding Photos',
        'queue.title.uploading': 'Uploading your memories…',
        'local.browse': 'Choose Your Photos',
        'local.dd_title_single': 'Drag & drop your photo here',
        'local.dd_title_multi': 'Drag & drop photos here',
      },
      styles: {
        palette: {
          window: '#1a0a2e',
          windowBorder: '#d4af37',
          tabIcon: '#d4af37',
          menuIcons: '#d4af37',
          textDark: '#f5e9d8',
          textLight: '#f5e9d8',
          link: '#d4af37',
          action: '#d4af37',
          inactiveTabIcon: '#9b8fb8',
          error: '#f44336',
          inProgress: '#d4af37',
          complete: '#4caf50',
          sourceBg: '#2d1055',
        },
        fonts: {
          '"Playfair Display", serif': 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500',
        },
      },
    },
    (error, result) => {
      if (error) {
        console.error('Cloudinary upload error:', error);
        return;
      }

      if (result.event === 'success') {
        const info = result.info;
        console.log('Upload successful:', info.secure_url);
        showUploadSuccess(info.original_filename);
      }
    }
  );

  widget.open();
}

function showUploadSuccess(filename) {
  const existing = document.getElementById('upload-success-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'upload-success-toast';
  toast.setAttribute('role', 'status');
  toast.setAttribute('aria-live', 'polite');
  toast.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
      <polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
    <span>Photo uploaded successfully! ✨</span>
  `;

  Object.assign(toast.style, {
    position: 'fixed',
    bottom: '5rem',
    left: '50%',
    transform: 'translateX(-50%) translateY(20px)',
    background: 'linear-gradient(135deg, #2d1055, #1a0a2e)',
    color: '#e2c870',
    border: '1px solid rgba(212,175,55,0.45)',
    borderRadius: '50px',
    padding: '0.85rem 1.75rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.6rem',
    fontSize: '0.82rem',
    fontFamily: "'Inter', sans-serif",
    fontWeight: '600',
    zIndex: '300',
    boxShadow: '0 16px 48px -12px rgba(26,10,46,0.6)',
    backdropFilter: 'blur(12px)',
    opacity: '0',
    transition: 'opacity 0.35s, transform 0.35s',
  });

  document.body.appendChild(toast);

  // Animate in
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateX(-50%) translateY(0)';
    });
  });

  // Remove after 4 seconds
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(20px)';
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}

// ─── Gold particle floating animation on hero ─────────────────
(function initGoldParticles() {
  const hero = document.getElementById('hero');
  if (!hero) return;

  const COUNT = 8;
  for (let i = 0; i < COUNT; i++) {
    const dot = document.createElement('span');
    const size = Math.random() * 4 + 2;
    const left = Math.random() * 100;
    const delay = Math.random() * 6;
    const duration = Math.random() * 8 + 8;

    Object.assign(dot.style, {
      position: 'absolute',
      width: size + 'px',
      height: size + 'px',
      borderRadius: '50%',
      background: 'rgba(212,175,55,0.6)',
      left: left + '%',
      bottom: '-10px',
      opacity: '0',
      pointerEvents: 'none',
      zIndex: '5',
      animation: `floatUp ${duration}s ${delay}s infinite`,
    });

    hero.appendChild(dot);
  }

  // Inject keyframes if not already present
  if (!document.getElementById('particle-keyframes')) {
    const style = document.createElement('style');
    style.id = 'particle-keyframes';
    style.textContent = `
      @keyframes floatUp {
        0% { opacity: 0; transform: translateY(0) scale(0.5); }
        10% { opacity: 0.7; }
        80% { opacity: 0.3; }
        100% { opacity: 0; transform: translateY(-100vh) scale(1.5); }
      }
    `;
    document.head.appendChild(style);
  }
})();

// ─── Entrance animation for hero content ──────────────────────
(function initHeroEntrance() {
  const content = document.getElementById('hero-content');
  if (!content) return;
  content.style.opacity = '0';
  content.style.transform = 'translateY(20px)';

  setTimeout(() => {
    content.style.transition = 'opacity 1.2s ease, transform 1.2s ease';
    content.style.opacity = '1';
    content.style.transform = 'translateY(0)';
  }, 200);
})();
