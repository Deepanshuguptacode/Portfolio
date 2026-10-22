/* =============================================
   DEEPANSHU GUPTA PORTFOLIO — MAIN SCRIPT
   ============================================= */

'use strict';

// ===== PAGE LOADER =====
(function initLoader() {
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
    }, 1800);
  });
})();

// ===== CUSTOM CURSOR =====
(function initCursor() {
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');
  if (!cursor || !follower) return;

  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });

  function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    follower.style.left = followerX + 'px';
    follower.style.top = followerY + 'px';
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  document.querySelectorAll('a, button, .skill-card, .project-card, .cert-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1.8)';
      cursor.style.background = 'transparent';
      cursor.style.border = '2px solid var(--primary)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      cursor.style.background = 'var(--primary)';
      cursor.style.border = 'none';
    });
  });
})();

// ===== NAVBAR SCROLL EFFECT =====
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    updateActiveNavLink();
  });

  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  // Smooth scroll for nav links
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
          // Close mobile menu if open
          const navLinksEl = document.getElementById('navLinks');
          navLinksEl.classList.remove('open');
          hamburger.classList.remove('active');
        }
      }
    });
  });
})();

// ===== HAMBURGER MENU =====
(function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });
})();

// ===== PARTICLE CANVAS =====
(function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, particles = [];

  const THEME_PALETTES = {
    indigo: { c1: '99,102,241', c2: '6,182,212', line: '99,102,241' },
    emerald: { c1: '16,185,129', c2: '52,211,153', line: '16,185,129' },
    rose: { c1: '244,63,94', c2: '236,72,153', line: '244,63,94' },
    amber: { c1: '245,158,11', c2: '251,146,60', line: '245,158,11' }
  };

  let currentPalette = THEME_PALETTES[document.body.getAttribute('data-theme') || 'indigo'] || THEME_PALETTES.indigo;

  window.updateParticleTheme = function(themeId) {
    if (THEME_PALETTES[themeId]) {
      currentPalette = THEME_PALETTES[themeId];
      particles.forEach(p => p.updateColor());
    }
  };

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  class Particle {
    constructor() {
      this.reset();
    }
    updateColor() {
      this.color = Math.random() > 0.5 ? currentPalette.c1 : currentPalette.c2;
    }
    reset() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.size = Math.random() * 2 + 0.5;
      this.opacity = Math.random() * 0.5 + 0.1;
      this.updateColor();
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > W) this.vx *= -1;
      if (this.y < 0 || this.y > H) this.vy *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color},${this.opacity})`;
      ctx.fill();
    }
  }

  function initParticleArray() {
    const count = Math.min(Math.floor((W * H) / 12000), 80);
    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }
  }

  function drawConnections() {
    const lineCol = currentPalette.line;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const opacity = (1 - dist / 120) * 0.15;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(${lineCol},${opacity})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    drawConnections();
    requestAnimationFrame(animate);
  }

  resize();
  initParticleArray();
  animate();

  window.addEventListener('resize', () => {
    resize();
    initParticleArray();
  });
})();

// ===== SCROLL REVEAL ANIMATIONS =====
(function initScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger siblings
        const siblings = entry.target.parentElement.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
        let delay = 0;
        siblings.forEach((sib, idx) => {
          if (sib === entry.target) delay = idx * 80;
        });
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  });

  revealEls.forEach(el => observer.observe(el));
})();

// ===== ANIMATED COUNTER =====
(function initCounters() {
  const counters = document.querySelectorAll('.stat-number[data-count]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count);
        const duration = 1800;
        const start = performance.now();

        function updateCounter(now) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.floor(eased * target);
          if (progress < 1) requestAnimationFrame(updateCounter);
          else el.textContent = target;
        }
        requestAnimationFrame(updateCounter);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
})();

// ===== HERO ROLE CYCLER =====
(function initRoleCycler() {
  const items = document.querySelectorAll('.role-item');
  if (items.length === 0) return;

  let current = 0;

  setInterval(() => {
    items[current].classList.remove('active');
    current = (current + 1) % items.length;
    items[current].classList.add('active');
  }, 3000);
})();

// ===== SKILLS FILTER =====
(function initSkillsFilter() {
  const filters = document.querySelectorAll('.skills-filter');
  const cards = document.querySelectorAll('.skill-card');

  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      filters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      cards.forEach((card, i) => {
        const match = filter === 'all' || card.dataset.category === filter;
        if (match) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, i * 40);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
})();

// ===== PROJECTS FILTER =====
(function initProjectsFilter() {
  const filters = document.querySelectorAll('.proj-filter');
  const cards = document.querySelectorAll('.project-card');

  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      filters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.pfilter;

      cards.forEach(card => {
        const tag = card.dataset.ptag;
        const match = filter === 'all' || tag === filter;
        card.style.display = match ? 'flex' : 'none';

        // Re-apply featured spanning for all filter
        if (filter === 'all' && card.classList.contains('featured')) {
          card.style.gridColumn = 'span 2';
        } else {
          card.style.gridColumn = '';
        }
      });
    });
  });
})();

// ===== CONTACT FORM =====
(function initContactForm() {
  const form = document.getElementById('contactForm');
  const statusEl = document.getElementById('formStatus');
  const submitBtn = document.getElementById('submitBtn');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const message = document.getElementById('contactMessage').value.trim();

    if (!name || !email || !message) {
      showStatus('Please fill in all required fields.', 'error');
      return;
    }

    // Simulate form submission
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
      form.reset();
      showStatus('Message sent! I\'ll get back to you soon.', 'success');
    }, 1800);
  });

  function showStatus(msg, type) {
    statusEl.textContent = msg;
    statusEl.className = `form-status ${type}`;
    setTimeout(() => { statusEl.className = 'form-status'; }, 5000);
  }
})();

// ===== SMOOTH SCROLL FOR ALL ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== NAVBAR ACTIVE HIGHLIGHT ON LOAD =====
window.dispatchEvent(new Event('scroll'));

// ===== TILT EFFECT ON PROJECT CARDS =====
(function initTilt() {
  const cards = document.querySelectorAll('.project-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const dx = (x - cx) / cx;
      const dy = (y - cy) / cy;
      card.style.transform = `perspective(800px) rotateX(${-dy * 4}deg) rotateY(${dx * 4}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();

// ===== SKILL CARD ICON GLOW COLOR =====
(function initSkillIconGlow() {
  document.querySelectorAll('.skill-icon-wrap').forEach(el => {
    const clr = el.style.getPropertyValue('--clr');
    if (clr) {
      el.addEventListener('mouseenter', () => {
        el.style.boxShadow = `0 0 20px ${clr}44`;
      });
      el.addEventListener('mouseleave', () => {
        el.style.boxShadow = '';
      });
    }
  });
})();

// ===== THEME SWITCHER (SEQUENTIAL) =====
(function initThemeSwitcher() {
  const toggleBtn = document.getElementById('themeToggleBtn');
  const badgeDot = document.getElementById('themeBadgeDot');
  if (!toggleBtn) return;

  const THEMES = [
    { id: 'indigo', name: 'Indigo Cosmos', color: '#6366f1' },
    { id: 'emerald', name: 'Emerald Night', color: '#10b981' },
    { id: 'rose', name: 'Rose Neon', color: '#f43f5e' },
    { id: 'amber', name: 'Amber Forge', color: '#f59e0b' }
  ];

  let currentTheme = localStorage.getItem('portfolio-theme') || 'indigo';
  if (!THEMES.some(t => t.id === currentTheme)) {
    currentTheme = 'indigo';
  }

  let toast = document.getElementById('themeToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'themeToast';
    toast.className = 'theme-toast';
    document.body.appendChild(toast);
  }

  let toastTimer = null;
  function showThemeToast(themeObj) {
    clearTimeout(toastTimer);
    toast.innerHTML = `<span class="theme-toast-dot" style="background:${themeObj.color}; box-shadow:0 0 12px ${themeObj.color}"></span><span>Theme: ${themeObj.name}</span>`;
    toast.classList.add('show');
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 1500);
  }

  function applyTheme(themeId, isInteractive = false) {
    const themeObj = THEMES.find(t => t.id === themeId) || THEMES[0];
    currentTheme = themeObj.id;
    document.body.setAttribute('data-theme', themeObj.id);
    localStorage.setItem('portfolio-theme', themeObj.id);

    // Update button attributes and badge
    const nextIndex = (THEMES.findIndex(t => t.id === themeObj.id) + 1) % THEMES.length;
    const nextTheme = THEMES[nextIndex];
    toggleBtn.setAttribute('title', `Theme: ${themeObj.name} (Click to switch to ${nextTheme.name})`);
    toggleBtn.setAttribute('aria-label', `Theme: ${themeObj.name}. Click to switch to ${nextTheme.name}`);

    if (badgeDot) {
      badgeDot.style.background = themeObj.color;
      badgeDot.style.boxShadow = `0 0 8px ${themeObj.color}`;
    }

    // Update particle canvas if initialized
    if (window.updateParticleTheme) {
      window.updateParticleTheme(themeObj.id);
    }

    if (isInteractive) {
      // Rotation micro-animation
      toggleBtn.classList.remove('rotating');
      void toggleBtn.offsetWidth; // trigger reflow
      toggleBtn.classList.add('rotating');
      setTimeout(() => toggleBtn.classList.remove('rotating'), 500);

      showThemeToast(themeObj);
    }
  }

  // Initial apply without animation or toast
  applyTheme(currentTheme, false);

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    // Close resume dropdown if open
    document.getElementById('resumeDropdown')?.classList.remove('open');

    // Advance sequentially
    const currentIndex = THEMES.findIndex(t => t.id === currentTheme);
    const nextIndex = (currentIndex + 1) % THEMES.length;
    applyTheme(THEMES[nextIndex].id, true);
  });
})();

// ===== RESUME DROPDOWN =====
(function initResumeDropdown() {
  const dropdown = document.getElementById('resumeDropdown');
  const trigger = document.getElementById('resumeTrigger');
  const menu = document.getElementById('resumeMenu');
  if (!dropdown || !trigger) return;

  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.classList.toggle('open');
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove('open');
    }
  });

  // Close when a menu item is clicked (after a tiny delay to allow navigation)
  menu?.querySelectorAll('.resume-menu-item').forEach(item => {
    item.addEventListener('click', () => {
      setTimeout(() => dropdown.classList.remove('open'), 120);
    });
  });
})();

