/* ============================================================
   HASNA & JIMNAS WEDDING — JavaScript
   Scroll animations · Nav highlight · Lightbox · Cloudinary
   ============================================================ */

// ─── 3D Envelope Opening Flow ────────────────────────────────
(function initEnvelopeFlow() {
  const overlay = document.getElementById('envelope-overlay');
  const envelope = document.getElementById('envelope');
  const btn = document.getElementById('open-envelope-btn');
  const nav = document.getElementById('floating-nav');

  if (!overlay || !envelope || !btn) return;

  // Initial setup: Lock scrolling
  document.body.classList.add('envelope-locked');
  window.scrollTo(0, 0);

  btn.addEventListener('click', () => {
    // 1. Break the seal
    btn.classList.add('broken');

    // 2. Open the envelope (flap folds up, card slides out)
    setTimeout(() => {
      envelope.classList.add('open');
    }, 600);

    // 3. Zoom/fade overlay out & reveal main website content
    setTimeout(() => {
      overlay.classList.add('hide-envelope');
      document.body.classList.remove('envelope-locked');
      
      // Fade in nav bar
      if (nav) nav.classList.add('visible');

      // Initialize ambient particles after open
      initAmbientParticles();
    }, 2200);
  });
})();

// ─── Countdown Timer ─────────────────────────────────────────
(function initCountdown() {
  const targetDate = new Date('June 18, 2026 13:00:00').getTime();
  const daysEl = document.getElementById('cd-days');
  const hoursEl = document.getElementById('cd-hours');
  const minsEl = document.getElementById('cd-mins');
  const secsEl = document.getElementById('cd-secs');

  if (!daysEl) return;

  function updateTimer() {
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff <= 0) {
      daysEl.innerText = '00';
      hoursEl.innerText = '00';
      minsEl.innerText = '00';
      secsEl.innerText = '00';
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

  updateTimer();
  setInterval(updateTimer, 1000);
})();

// ─── Ambient Falling Particles ────────────────────────────────
function initAmbientParticles() {
  const container = document.getElementById('ambient-particles');
  if (!container) return;

  const particleTypes = ['🌸', '🍂', '✨', '❄️'];
  
  function createParticle() {
    const p = document.createElement('span');
    const type = particleTypes[Math.floor(Math.random() * particleTypes.length)];
    
    p.className = 'ambient-particle';
    p.innerText = type;

    // Randomize position, scale, opacity, rotation, and speed
    const left = Math.random() * 100;
    const scale = Math.random() * 0.7 + 0.4;
    const op = Math.random() * 0.5 + 0.3;
    const rot = Math.random() * 360 + 180;
    const sway = Math.random() * 60 - 30;
    const duration = Math.random() * 8 + 6;

    Object.assign(p.style, {
      left: `${left}vw`,
      fontSize: `${18 * scale}px`,
      animationDuration: `${duration}s`,
      '--op': op,
      '--rot': `${rot}deg`,
      '--sway': `${sway}px`
    });

    container.appendChild(p);

    setTimeout(() => {
      p.remove();
    }, duration * 1000);
  }

  // Initial bursts
  for (let i = 0; i < 15; i++) {
    createParticle();
  }

  // Spawn interval
  setInterval(createParticle, 500);
}

// ─── Gallery Infinite Marquee Track ───────────────────────────
(function initMarqueeTrack() {
  const track = document.getElementById('marquee-track');
  if (!track) return;

  // Clone original items to double the width and achieve a seamless loop
  const children = Array.from(track.children);
  children.forEach(child => {
    const clone = child.cloneNode(true);
    track.appendChild(clone);
  });
})();

// ─── Scroll Reveal with IntersectionObserver ──────────────────
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
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  targets.forEach((el) => observer.observe(el));
})();

// ─── Active Nav Indicator on Scroll ───────────────────────────
(function initNavHighlight() {
  const sections = ['hero', 'countdown', 'story', 'events', 'gallery', 'venue', 'blessings'];
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
    { threshold: 0.2, rootMargin: '-10% 0px -60% 0px' }
  );

  sections.forEach((id) => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });
})();

// ─── Smooth Scroll ───────────────────────────────────────────
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

// ─── Hero Scroll Indicator Click ─────────────────────────────
(function initScrollHint() {
  const hint = document.getElementById('hero-scroll-hint');
  if (!hint) return;
  hint.addEventListener('click', () => {
    const target = document.getElementById('countdown');
    if (!target) return;
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
})();

// ─── Lightbox Modal Viewer ───────────────────────────────────
(function initLightbox() {
  const galleryCards = document.querySelectorAll('.gallery-card');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = document.getElementById('lightbox-close');

  if (!lightbox || !lightboxImg) return;

  function openLightbox(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt || 'Wedding Photo';
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => { lightboxImg.src = ''; }, 300);
  }

  // Attach click to gallery marquee cards (both original and cloned)
  document.getElementById('marquee-track').addEventListener('click', (e) => {
    const card = e.target.closest('.gallery-card');
    if (!card) return;
    const img = card.querySelector('img');
    if (img) {
      openLightbox(img.src, img.alt);
    }
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
  if (typeof cloudinary === 'undefined') {
    alert('Upload widget is loading. Please try again in a moment.');
    return;
  }

  const widget = cloudinary.createUploadWidget(
    {
      cloudName: 'dzbonbmvv',
      uploadPreset: 'ml_default',
      folder: 'hasna wedding',
      multiple: true,
      maxFiles: 20,
      maxFileSize: 15000000, // 15 MB
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
          window: '#140526',
          windowBorder: '#c8a063',
          tabIcon: '#c8a063',
          menuIcons: '#c8a063',
          textDark: '#f4e2bd',
          textLight: '#f4e2bd',
          link: '#c8a063',
          action: '#c8a063',
          inactiveTabIcon: '#6b4c9e',
          error: '#f44336',
          inProgress: '#c8a063',
          complete: '#4caf50',
          sourceBg: '#230b3d',
        },
        fonts: {
          '"Cinzel", serif': 'https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500',
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
        showUploadSuccess();

        // Add the uploaded image to the gallery marquee dynamically
        const track = document.getElementById('marquee-track');
        if (track) {
          const newCard = document.createElement('div');
          newCard.className = 'gallery-card';
          
          const newImg = document.createElement('img');
          newImg.src = info.secure_url;
          newImg.alt = 'Uploaded Wedding Photo';
          newImg.loading = 'lazy';
          
          newCard.appendChild(newImg);
          track.appendChild(newCard);
        }
      }
    }
  );

  widget.open();
}

function showUploadSuccess() {
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
