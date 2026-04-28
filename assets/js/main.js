/* ═══════════════════════════════════════
   M Aziz – Personal Branding | main.js
═══════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── CUSTOM CURSOR ── */
  const cursor     = document.getElementById('cursor');
  const cursorRing = document.getElementById('cursor-ring');
  let ringX = 0, ringY = 0, mouseX = 0, mouseY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  });

  (function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top  = ringY + 'px';
    requestAnimationFrame(animateRing);
  })();

  document.querySelectorAll('a, button, .tool-card, .about-card, .skill-tag').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });


  /* ── NAVBAR SCROLL ── */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    updateActiveNav();
    toggleBackTop();
  });


  /* ── HAMBURGER MENU ── */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });


  /* ── ACTIVE NAV ── */
  const sections  = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');

  function updateActiveNav() {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 140) current = s.id;
    });
    navAnchors.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  }


  /* ── SCROLL REVEAL ── */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 80);
        revealObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.tool-card, .about-card, .blog-card').forEach(el => revealObserver.observe(el));


  /* ── TYPEWRITER ── */
  const roles  = ['Vibe Coder ✨', 'Bot Builder 🤖', 'Web Explorer 🌐', 'Always Building 🚀'];
  let roleIdx  = 0, charIdx = 0, deleting = false;
  const typeEl = document.getElementById('typewriter');

  function type() {
    const current = roles[roleIdx];
    if (!deleting) {
      typeEl.textContent = current.slice(0, ++charIdx);
      if (charIdx === current.length) { deleting = true; setTimeout(type, 1800); return; }
    } else {
      typeEl.textContent = current.slice(0, --charIdx);
      if (charIdx === 0) { deleting = false; roleIdx = (roleIdx + 1) % roles.length; }
    }
    setTimeout(type, deleting ? 50 : 90);
  }
  if (typeEl) setTimeout(type, 600);


  /* ── COUNT-UP STATS ── */
  function countUp(el) {
    const target = +el.dataset.count;
    if (!target) return;
    let count = 0;
    const step = Math.ceil(target / 60);
    const timer = setInterval(() => {
      count = Math.min(count + step, target);
      el.textContent = count + (el.dataset.suffix || '');
      if (count >= target) clearInterval(timer);
    }, 25);
  }

  const statObs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { countUp(e.target); statObs.unobserve(e.target); } });
  }, { threshold: 0.5 });
  document.querySelectorAll('.stat strong[data-count]').forEach(el => statObs.observe(el));


  /* ── CONTACT FORM ── */
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('.btn-send');
      btn.textContent = '✓ Pesan Terkirim!';
      btn.style.background = '#4CAF50';
      setTimeout(() => { btn.textContent = 'Kirim Pesan →'; btn.style.background = ''; form.reset(); }, 3000);
    });
  }


  /* ── BACK TO TOP ── */
  const backTop = document.getElementById('back-top');
  function toggleBackTop() { backTop.classList.toggle('visible', window.scrollY > 400); }
  backTop.addEventListener('click', e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); });

});
