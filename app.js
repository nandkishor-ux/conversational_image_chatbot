/* ============================================================
   VisionAI — Shared Utilities
   ============================================================ */

// ── Theme ──────────────────────────────────────────────────
const ThemeManager = {
  init() {
    const stored = localStorage.getItem('vision-theme') || 'dark';
    this.apply(stored);
  },
  toggle() {
    const current = document.body.classList.contains('light') ? 'light' : 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    this.apply(next);
    localStorage.setItem('vision-theme', next);
  },
  apply(theme) {
    document.body.classList.toggle('light', theme === 'light');
    const icon = document.querySelector('.theme-toggle i');
    if (icon) {
      icon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    }
  }
};

// ── Toast ──────────────────────────────────────────────────
const Toast = {
  container: null,
  init() {
    this.container = document.getElementById('toast-container');
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.id = 'toast-container';
      document.body.appendChild(this.container);
    }
  },
  show(message, type = 'info', duration = 3200) {
    if (!this.container) this.init();
    const icons = { success: 'fa-circle-check', error: 'fa-circle-xmark', info: 'fa-circle-info' };
    const el = document.createElement('div');
    el.className = `toast ${type}`;
    el.innerHTML = `<i class="fa-solid ${icons[type]}"></i><span>${message}</span>`;
    this.container.appendChild(el);
    setTimeout(() => {
      el.classList.add('removing');
      el.addEventListener('animationend', () => el.remove());
    }, duration);
  }
};

// ── Auth ───────────────────────────────────────────────────
const Auth = {
  getUser() {
    try { return JSON.parse(localStorage.getItem('vision-user')); } catch { return null; }
  },
  setUser(user) {
    localStorage.setItem('vision-user', JSON.stringify(user));
  },
  logout() {
    localStorage.removeItem('vision-user');
    window.location.href = 'index.html';
  },
  requireAuth() {
    if (!this.getUser()) {
      window.location.href = 'index.html';
      return false;
    }
    return true;
  }
};

// ── Page transition ────────────────────────────────────────
function navigateTo(page) {
  document.body.style.opacity = '0';
  document.body.style.transform = 'translateY(-8px)';
  document.body.style.transition = 'opacity .3s, transform .3s';
  setTimeout(() => { window.location.href = page; }, 300);
}

// ── Auto-resize textarea ───────────────────────────────────
function autoResize(el) {
  el.style.height = 'auto';
  el.style.height = Math.min(el.scrollHeight, 140) + 'px';
}

// ── Format file size ───────────────────────────────────────
function formatSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / 1048576).toFixed(1) + ' MB';
}

// ── Time ───────────────────────────────────────────────────
function nowTime() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// ── Init on every page ─────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  ThemeManager.init();
  Toast.init();

  // theme toggle button
  const toggleBtn = document.querySelector('.theme-toggle');
  if (toggleBtn) toggleBtn.addEventListener('click', () => ThemeManager.toggle());

  // page fade-in
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity .4s';
  requestAnimationFrame(() => {
    requestAnimationFrame(() => { document.body.style.opacity = '1'; });
  });
});