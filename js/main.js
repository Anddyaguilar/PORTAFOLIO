// Menú móvil
const navToggle = document.getElementById('nav-toggle');
const nav = document.getElementById('primary-nav');
navToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
});
nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => nav.classList.remove('open'));
});

// Resaltar el enlace de la sección visible
const navLinks = Array.from(nav.querySelectorAll('a'));
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const id = '#' + entry.target.id;
      const link = navLinks.find((a) => a.getAttribute('href') === id);
      if (!link) return;
      if (entry.isIntersecting) {
        navLinks.forEach((a) => a.classList.remove('active'));
        link.classList.add('active');
      }
    });
  },
  { rootMargin: '-45% 0px -50% 0px' }
);
sections.forEach((s) => sectionObserver.observe(s));

// Revelar secciones al hacer scroll
const revealObserver = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        obs.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll('main section').forEach((s) => revealObserver.observe(s));

// Interruptor de tema (solo para esta visita; no se guarda)
const themeToggle = document.getElementById('theme-toggle');
const root = document.documentElement;
themeToggle.addEventListener('click', () => {
  const current = root.getAttribute('data-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark = current ? current === 'dark' : prefersDark;
  root.setAttribute('data-theme', isDark ? 'light' : 'dark');
  themeToggle.textContent = isDark ? '◐ Oscuro' : '◑ Claro';
});

// Año del footer
document.getElementById('year').textContent = new Date().getFullYear();
