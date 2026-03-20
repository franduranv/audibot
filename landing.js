(function () {
  'use strict';

  var THEME_KEY = 'zxy-theme';
  var LANG_KEY  = 'zxy-lang';

  var SUN_ICON  = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';
  var MOON_ICON = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';

  /* ── Theme ── */
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
    var btn = document.getElementById('theme-toggle');
    if (btn) {
      btn.innerHTML = theme === 'dark' ? SUN_ICON : MOON_ICON;
      btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    }
  }

  /* ── Language ── */
  function applyLang(lang) {
    document.documentElement.lang = lang;
    localStorage.setItem(LANG_KEY, lang);
    document.querySelectorAll('[data-en][data-es]').forEach(function (el) {
      el.innerHTML = el.getAttribute('data-' + lang) || el.getAttribute('data-en');
    });
    document.querySelectorAll('.lang-toggle').forEach(function (b) {
      b.textContent = lang === 'en' ? 'ES' : 'EN';
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    /* Theme init */
    var savedTheme = localStorage.getItem(THEME_KEY);
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(savedTheme || (prefersDark ? 'dark' : 'light'));

    var themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
      themeBtn.addEventListener('click', function () {
        var current = document.documentElement.getAttribute('data-theme');
        applyTheme(current === 'dark' ? 'light' : 'dark');
      });
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
      if (!localStorage.getItem(THEME_KEY)) applyTheme(e.matches ? 'dark' : 'light');
    });

    /* Lang init */
    var savedLang = localStorage.getItem(LANG_KEY);
    var sysLang = (navigator.language || 'es').toLowerCase().startsWith('es') ? 'es' : 'en';
    applyLang(savedLang || sysLang);

    document.querySelectorAll('.lang-toggle').forEach(function (btn) {
      btn.addEventListener('click', function () {
        applyLang(document.documentElement.lang === 'en' ? 'es' : 'en');
      });
    });

    /* Fade-in on scroll */
    var fadeEls = document.querySelectorAll('.fade-in');
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
        });
      }, { threshold: 0.1 });
      fadeEls.forEach(function (el) { io.observe(el); });
    } else {
      fadeEls.forEach(function (el) { el.classList.add('visible'); });
    }
  });
})();
