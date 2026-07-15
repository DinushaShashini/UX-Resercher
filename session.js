/* InternLink — Client-side session (demo prototype) */

'use strict';

const SESSION_KEY = 'internlink_session';

const APP_PAGES = new Set([
  'dashboard.html',
  'internships.html',
  'internship-detail.html',
  'tracker.html',
  'resume.html',
  'skills.html',
  'profile.html',
]);

const InternLinkSession = {
  login(user = {}) {
    const session = {
      name: user.name || 'Arjun Patel',
      subtitle: user.subtitle || 'CS Junior · UT Austin',
      email: user.email || 'arjun@utexas.edu',
      loggedInAt: Date.now(),
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return session;
  },

  logout() {
    localStorage.removeItem(SESSION_KEY);
    window.location.href = 'login.html';
  },

  getUser() {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  isLoggedIn() {
    return !!this.getUser();
  },

  currentPage() {
    return window.location.pathname.split('/').pop() || 'index.html';
  },

  isAppPage() {
    return APP_PAGES.has(this.currentPage());
  },

  redirectIfAuthed() {
    if (!this.isLoggedIn()) return;
    const page = this.currentPage();
    if (page === 'login.html' || page === 'register.html') {
      window.location.replace('dashboard.html');
    }
  },

  guardAppPages() {
    if (!this.isAppPage() || this.isLoggedIn()) return;
    const redirect = encodeURIComponent(this.currentPage());
    window.location.replace(`login.html?redirect=${redirect}`);
  },

  bindLogoutButtons() {
    document.querySelectorAll('.logout-btn').forEach((btn) => {
      if (btn.dataset.bound === 'true') return;
      btn.dataset.bound = 'true';

      if (!this.isLoggedIn()) {
        btn.setAttribute('aria-label', 'Log in');
        btn.setAttribute('title', 'Log in');
        btn.innerHTML = '<i data-lucide="log-in"></i>';
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          window.location.href = `login.html?redirect=${encodeURIComponent(this.currentPage())}`;
        });
      } else {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          if (window.confirm('Log out of InternLink?')) {
            this.logout();
          }
        });
      }
    });

    if (typeof lucide !== 'undefined') lucide.createIcons();
  },

  updateUserWidgets() {
    const user = this.getUser();
    if (!user) return;

    document.querySelectorAll('.user-name').forEach((el) => {
      el.textContent = user.name;
    });
    document.querySelectorAll('.user-sub').forEach((el) => {
      el.textContent = user.subtitle;
    });
  },

  renderAuthBanner() {
    const banner = document.getElementById('authBanner');
    if (!banner) return;

    if (this.isLoggedIn()) {
      banner.hidden = true;
      return;
    }

    banner.hidden = false;
    banner.innerHTML = `
      <div class="auth-banner-content">
        <div class="auth-banner-text">
          <strong>You're viewing a demo profile.</strong>
          <span>Log in or create a free account to save your progress.</span>
        </div>
        <div class="auth-banner-actions">
          <a href="login.html?redirect=${encodeURIComponent(this.currentPage())}" class="btn btn-ghost btn-sm">Log In</a>
          <a href="register.html" class="btn btn-primary btn-sm">Sign Up Free</a>
        </div>
      </div>
    `;
  },

  initLoginPage() {
    const form = document.getElementById('loginForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('loginEmail')?.value.trim();
      const password = document.getElementById('loginPassword')?.value;

      if (!email || !password) {
        alert('Please enter your email and password.');
        return;
      }

      const displayName = email === 'demo@internlink.io'
        ? 'Arjun Patel'
        : email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

      this.login({
        name: displayName,
        subtitle: 'CS Junior · UT Austin',
        email,
      });

      const params = new URLSearchParams(window.location.search);
      const redirect = params.get('redirect') || 'dashboard.html';
      window.location.href = redirect;
    });

    document.getElementById('googleLoginBtn')?.addEventListener('click', (e) => {
      e.preventDefault();
      this.login({ name: 'Arjun Patel', subtitle: 'CS Junior · UT Austin', email: 'arjun@utexas.edu' });
      window.location.href = 'dashboard.html';
    });

    document.getElementById('universityLoginBtn')?.addEventListener('click', (e) => {
      e.preventDefault();
      this.login({ name: 'Arjun Patel', subtitle: 'CS Junior · UT Austin', email: 'arjun@utexas.edu' });
      window.location.href = 'dashboard.html';
    });

    document.getElementById('demoLoginBtn')?.addEventListener('click', (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('loginEmail');
      const pwdInput = document.getElementById('loginPassword');
      if (emailInput) emailInput.value = 'demo@internlink.io';
      if (pwdInput) pwdInput.value = 'Demo1234';
    });
  },

  initRegisterPage() {
    const form = document.getElementById('registerForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const firstName = document.getElementById('regFirstName')?.value.trim();
      const lastName = document.getElementById('regLastName')?.value.trim();
      const email = document.getElementById('regEmail')?.value.trim();
      const major = document.getElementById('regMajor')?.value.trim();
      const gradYear = document.getElementById('regGradYear')?.value;
      const password = document.getElementById('regPassword')?.value;

      if (!firstName || !lastName || !email || !major || !gradYear || !password) {
        alert('Please fill in all required fields.');
        return;
      }

      if (password.length < 8) {
        alert('Password must be at least 8 characters.');
        return;
      }

      const terms = document.getElementById('agreeTerms');
      if (terms && !terms.checked) {
        alert('Please agree to the Terms of Service and Privacy Policy.');
        return;
      }

      this.login({
        name: `${firstName} ${lastName}`,
        subtitle: `${major} · Class of ${gradYear}`,
        email,
      });

      window.location.href = 'onboarding.html';
    });

    document.getElementById('googleRegisterBtn')?.addEventListener('click', (e) => {
      e.preventDefault();
      this.login({ name: 'New Student', subtitle: 'Getting started', email: 'student@university.edu' });
      window.location.href = 'onboarding.html';
    });
  },

  init() {
    const page = this.currentPage();

    if (page === 'login.html') {
      this.redirectIfAuthed();
      this.initLoginPage();
      return;
    }

    if (page === 'register.html') {
      this.redirectIfAuthed();
      this.initRegisterPage();
      return;
    }

    if (this.isAppPage()) {
      this.bindLogoutButtons();
      this.updateUserWidgets();
      this.renderAuthBanner();
    }
  },
};

document.addEventListener('DOMContentLoaded', () => InternLinkSession.init());
