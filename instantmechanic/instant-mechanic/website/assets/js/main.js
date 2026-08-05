// ThinkTank Engineering — site interactivity

document.addEventListener('DOMContentLoaded', () => {
  /* ---------- Sticky header ---------- */
  const header = document.querySelector('.site-header');
  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 40);
    backToTop.classList.toggle('is-visible', window.scrollY > 700);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.querySelector('.nav-toggle');
  const mainNav = document.querySelector('.main-nav');
  navToggle.addEventListener('click', () => {
    const open = mainNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.style.overflow = open ? 'hidden' : '';
  });

  /* Mobile: tap to expand mega menu instead of hover */
  document.querySelectorAll('.has-mega > .nav-link').forEach((link) => {
    link.addEventListener('click', (e) => {
      if (window.innerWidth <= 1080) {
        e.preventDefault();
        link.parentElement.classList.toggle('mega-open');
      }
    });
  });

  /* Close mobile nav after clicking a real link */
  document.querySelectorAll('.main-nav a:not(.has-mega > .nav-link)').forEach((a) => {
    a.addEventListener('click', () => {
      mainNav.classList.remove('is-open');
      document.body.style.overflow = '';
    });
  });

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
  revealEls.forEach((el) => io.observe(el));

  /* ---------- Animated counters ---------- */
  const counters = document.querySelectorAll('[data-count]');
  const animateCounter = (el) => {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const duration = 1600;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = target * eased;
      el.textContent = (Number.isInteger(target) ? Math.round(value) : value.toFixed(1)) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const counterIO = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterIO.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach((el) => counterIO.observe(el));

  /* ---------- Back to top ---------- */
  const backToTop = document.querySelector('.back-to-top');
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ---------- Contact form (placeholder — no backend wired up) ---------- */
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const original = btn.textContent;
      btn.textContent = 'Thank you — we will be in touch shortly';
      btn.disabled = true;
      setTimeout(() => { btn.textContent = original; btn.disabled = false; form.reset(); }, 3200);
    });
  }

  /* ---------- Current year in footer ---------- */
  const yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
