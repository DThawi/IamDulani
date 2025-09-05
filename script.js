// Theme toggle with localStorage
const themeToggleButton = document.getElementById('themeToggle');
const rootElement = document.documentElement;

const STORAGE_KEY = 'preferred-theme';
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

function applyTheme(theme) {
  if (theme === 'dark') {
    rootElement.style.colorScheme = 'dark';
    document.body.classList.add('dark');
  } else {
    rootElement.style.colorScheme = 'light';
    document.body.classList.remove('dark');
  }
  if (themeToggleButton) themeToggleButton.textContent = theme === 'dark' ? '☀️' : '🌙';
}

function getStoredTheme() {
  return localStorage.getItem(STORAGE_KEY);
}

function setStoredTheme(theme) {
  localStorage.setItem(STORAGE_KEY, theme);
}

const initialTheme = getStoredTheme() || (prefersDark ? 'dark' : 'light');
applyTheme(initialTheme);

if (themeToggleButton) {
  themeToggleButton.addEventListener('click', () => {
    const newTheme = document.body.classList.contains('dark') ? 'light' : 'dark';
    applyTheme(newTheme);
    setStoredTheme(newTheme);
  });
}

// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.getElementById('nav-menu');
if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
  navMenu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }));
}

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  }
}, { threshold: 0.12 });

revealEls.forEach((el) => observer.observe(el));

// Year in footer
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}


