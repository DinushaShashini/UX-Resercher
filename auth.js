/* ═══════════════════════════════════════════════════════════════════
   InternLink — Auth Pages JS
   Handles: Login, Register, password toggle, strength meter,
   validation, OAuth simulation, demo login, toast
   ═══════════════════════════════════════════════════════════════════ */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  // Init Lucide icons
  if (typeof lucide !== 'undefined') lucide.createIcons();

  const page = detectPage();

  if (page === 'login')    initLogin();
  if (page === 'register') initRegister();
});

/* ─────────────────────────────────────────────────────
   HELPERS
   ───────────────────────────────────────────────────── */
function detectPage() {
  if (document.getElementById('loginForm'))    return 'login';
  if (document.getElementById('registerForm')) return 'register';
  return 'unknown';
}

const $ = id => document.getElementById(id);

/* ── Toast ── */
let toastTimer;
function showToast(msg, type = 'success') {
  const toast   = $('toast');
  const icon    = $('toastIcon');
  const msgEl   = $('toastMsg');
  if (!toast) return;

  const icons = { success: 'check-circle', error: 'alert-circle', info: 'info' };
  icon.innerHTML = `<i data-lucide="${icons[type] || 'check-circle'}"></i>`;
  toast.className = `toast show t-${type}`;
  msgEl.textContent = msg;
  if (typeof lucide !== 'undefined') lucide.createIcons();

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3500);
}

/* ── Set field error ── */
function setError(fieldId, wrapperId, msg) {
  const errEl = $(fieldId);
  const wrap  = $(wrapperId);
  if (errEl) {
    errEl.innerHTML = msg
      ? `<i data-lucide="alert-circle"></i> ${msg}`
      : '';
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }
  if (wrap) wrap.classList.toggle('input-error', !!msg);
}

function clearError(fieldId, wrapperId) {
  setError(fieldId, wrapperId, '');
  const wrap = $(wrapperId);
  if (wrap) wrap.classList.remove('input-error', 'input-success');
}

function setSuccess(wrapperId) {
  const wrap = $(wrapperId);
  if (wrap) {
    wrap.classList.remove('input-error');
    wrap.classList.add('input-success');
  }
}

/* ── Password show/hide toggle ── */
function bindPasswordToggle(btnId, inputId, iconId) {
  const btn   = $(btnId);
  const input = $(inputId);
  const icon  = $(iconId);
  if (!btn || !input) return;

  btn.addEventListener('click', () => {
    const shown = input.type === 'text';
    input.type = shown ? 'password' : 'text';
    btn.setAttribute('aria-pressed', !shown);
    btn.setAttribute('aria-label', shown ? 'Show password' : 'Hide password');
    if (icon) {
      icon.setAttribute('data-lucide', shown ? 'eye' : 'eye-off');
      if (typeof lucide !== 'undefined') lucide.createIcons();
    }
  });
}

/* ── Redirect with simulated delay ── */
function redirectToDashboard(delay = 1200) {
  setTimeout(() => { window.location.href = 'dashboard.html'; }, delay);
}

/* ═══════════════════════════════════════════════════
   LOGIN PAGE
   ═══════════════════════════════════════════════════ */
function initLogin() {

  /* Password toggle */
  bindPasswordToggle('loginPwdToggle', 'loginPassword', 'loginEyeIcon');

  /* Real-time email validation */
  const emailInput = $('loginEmail');
  emailInput?.addEventListener('blur', () => {
    const val = emailInput.value.trim();
    if (!val) {
      setError('emailErr', 'iw-email', 'Email is required.');
    } else if (!isValidEmail(val)) {
      setError('emailErr', 'iw-email', 'Enter a valid email address.');
    } else {
      clearError('emailErr', 'iw-email');
      setSuccess('iw-email');
    }
  });
  emailInput?.addEventListener('input', () => {
    if (emailInput.value.trim()) clearError('emailErr', 'iw-email');
  });

  /* Password validation */
  const pwdInput = $('loginPassword');
  pwdInput?.addEventListener('blur', () => {
    if (!pwdInput.value) setError('passwordErr', 'iw-password', 'Password is required.');
    else clearError('passwordErr', 'iw-password');
  });
  pwdInput?.addEventListener('input', () => {
    if (pwdInput.value) clearError('passwordErr', 'iw-password');
  });

  /* Form submit */
  const form = $('loginForm');
  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validateLoginForm()) return;

    setLoading(true, 'loginSubmitBtn', 'loginBtnLabel', 'loginSpinner');

    // Simulate API call
    await wait(1400);
    setLoading(false, 'loginSubmitBtn', 'loginBtnLabel', 'loginSpinner');

    const email = $('loginEmail').value.trim();
    const pwd   = $('loginPassword').value;

    // Demo credentials check
    if (email === 'demo@internlink.io' && pwd === 'Demo1234') {
      showToast('Welcome back, Arjun! Redirecting…', 'success');
      redirectToDashboard(1000);
      return;
    }

    // Simulate any valid email + min 8 char password as success
    if (isValidEmail(email) && pwd.length >= 6) {
      showToast('Logged in successfully! Redirecting…', 'success');
      redirectToDashboard(1200);
    } else {
      showGlobalError('loginGlobalErr', 'loginErrMsg', 'Invalid email or password. Please try again.');
    }
  });

  /* Google OAuth */
  $('googleLoginBtn')?.addEventListener('click', () => {
    showToast('Redirecting to Google… (demo)', 'info');
    setTimeout(() => { window.location.href = 'dashboard.html'; }, 1500);
  });

  /* GitHub OAuth */
  $('githubLoginBtn')?.addEventListener('click', () => {
    showToast('Redirecting to GitHub… (demo)', 'info');
    setTimeout(() => { window.location.href = 'dashboard.html'; }, 1500);
  });

  /* Demo login */
  $('demoLoginBtn')?.addEventListener('click', () => {
    if ($('loginEmail'))    $('loginEmail').value    = 'demo@internlink.io';
    if ($('loginPassword')) $('loginPassword').value = 'Demo1234';
    clearError('emailErr',    'iw-email');
    clearError('passwordErr', 'iw-password');
    setSuccess('iw-email');
    setSuccess('iw-password');
    showToast('Demo credentials filled — click Log In!', 'info');
  });
}

function validateLoginForm() {
  let valid = true;
  const email = $('loginEmail');
  const pwd   = $('loginPassword');

  if (!email.value.trim()) {
    setError('emailErr', 'iw-email', 'Email is required.'); valid = false;
  } else if (!isValidEmail(email.value.trim())) {
    setError('emailErr', 'iw-email', 'Enter a valid email address.'); valid = false;
  } else {
    clearError('emailErr', 'iw-email'); setSuccess('iw-email');
  }

  if (!pwd.value) {
    setError('passwordErr', 'iw-password', 'Password is required.'); valid = false;
  } else {
    clearError('passwordErr', 'iw-password'); setSuccess('iw-password');
  }

  return valid;
}

/* ═══════════════════════════════════════════════════
   REGISTER PAGE
   ═══════════════════════════════════════════════════ */
function initRegister() {

  /* Password toggles */
  bindPasswordToggle('regPwdToggle',     'regPassword',        'regEyeIcon');
  bindPasswordToggle('regConfirmToggle', 'regConfirmPassword', 'confirmEyeIcon');

  /* Password strength meter */
  const pwdInput = $('regPassword');
  pwdInput?.addEventListener('input', () => {
    const val = pwdInput.value;
    const strength = calcPasswordStrength(val);
    updateStrengthMeter(strength, !!val);
    if (val.length >= 8) {
      clearError('passwordErr', 'iw-password');
    }
  });

  /* Confirm password live check */
  $('regConfirmPassword')?.addEventListener('input', () => {
    const pwd     = $('regPassword').value;
    const confirm = $('regConfirmPassword').value;
    if (confirm && confirm !== pwd) {
      setError('confirmErr', 'iw-confirm', 'Passwords do not match.');
    } else if (confirm && confirm === pwd) {
      clearError('confirmErr', 'iw-confirm');
      setSuccess('iw-confirm');
    }
  });

  /* Real-time field validations */
  bindBlurValidation('regFullName',    'fullNameErr',   'iw-fullname',    () => {
    const v = $('regFullName').value.trim();
    if (!v) return 'Full name is required.';
    if (v.length < 2) return 'Name must be at least 2 characters.';
    return '';
  });

  bindBlurValidation('regUniversity',  'universityErr', 'iw-university',  () => {
    const v = $('regUniversity').value.trim();
    if (!v) return 'University name is required.';
    return '';
  });

  bindBlurValidation('regEmail',       'emailErr',      'iw-email',       () => {
    const v = $('regEmail').value.trim();
    if (!v)            return 'Email address is required.';
    if (!isValidEmail(v)) return 'Enter a valid email address.';
    return '';
  });

  bindBlurValidation('regFieldOfStudy','fieldErr',      'iw-field',       () => {
    if (!$('regFieldOfStudy').value) return 'Please select your field of study.';
    return '';
  });

  bindBlurValidation('regGradYear',    'gradYearErr',   'iw-gradyear',    () => {
    if (!$('regGradYear').value) return 'Please select your graduation year.';
    return '';
  });

  /* Form submit */
  const form = $('registerForm');
  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validateRegisterForm()) return;

    setLoading(true, 'registerSubmitBtn', 'registerBtnLabel', 'registerSpinner');
    await wait(1600);
    setLoading(false, 'registerSubmitBtn', 'registerBtnLabel', 'registerSpinner');

    // Show success state
    form.style.display = 'none';
    const successEl = $('registerSuccess');
    if (successEl) successEl.classList.add('show');

    showToast('Account created! Welcome to InternLink 🎉', 'success');
    redirectToDashboard(2000);
  });

  /* Google OAuth */
  $('googleRegisterBtn')?.addEventListener('click', () => {
    showToast('Redirecting to Google… (demo)', 'info');
    setTimeout(() => { window.location.href = 'dashboard.html'; }, 1500);
  });
}

function validateRegisterForm() {
  let valid = true;

  // Full Name
  const name = $('regFullName').value.trim();
  if (!name)        { setError('fullNameErr', 'iw-fullname', 'Full name is required.'); valid = false; }
  else if (name.length < 2) { setError('fullNameErr', 'iw-fullname', 'Name must be at least 2 characters.'); valid = false; }
  else              { clearError('fullNameErr', 'iw-fullname'); setSuccess('iw-fullname'); }

  // University
  const uni = $('regUniversity').value.trim();
  if (!uni)         { setError('universityErr', 'iw-university', 'University name is required.'); valid = false; }
  else              { clearError('universityErr', 'iw-university'); setSuccess('iw-university'); }

  // Email
  const email = $('regEmail').value.trim();
  if (!email)           { setError('emailErr', 'iw-email', 'Email is required.'); valid = false; }
  else if (!isValidEmail(email)) { setError('emailErr', 'iw-email', 'Enter a valid email address.'); valid = false; }
  else                  { clearError('emailErr', 'iw-email'); setSuccess('iw-email'); }

  // Field of Study
  const field = $('regFieldOfStudy').value;
  if (!field)       { setError('fieldErr', 'iw-field', 'Please select your field of study.'); valid = false; }
  else              { clearError('fieldErr', 'iw-field'); setSuccess('iw-field'); }

  // Graduation Year
  const gradYear = $('regGradYear').value;
  if (!gradYear)    { setError('gradYearErr', 'iw-gradyear', 'Please select your graduation year.'); valid = false; }
  else              { clearError('gradYearErr', 'iw-gradyear'); setSuccess('iw-gradyear'); }

  // Password
  const pwd = $('regPassword').value;
  if (!pwd)           { setError('passwordErr', 'iw-password', 'Password is required.'); valid = false; }
  else if (pwd.length < 8) { setError('passwordErr', 'iw-password', 'Password must be at least 8 characters.'); valid = false; }
  else                { clearError('passwordErr', 'iw-password'); setSuccess('iw-password'); }

  // Confirm Password
  const confirm = $('regConfirmPassword').value;
  if (!confirm)           { setError('confirmErr', 'iw-confirm', 'Please confirm your password.'); valid = false; }
  else if (confirm !== pwd) { setError('confirmErr', 'iw-confirm', 'Passwords do not match.'); valid = false; }
  else                    { clearError('confirmErr', 'iw-confirm'); setSuccess('iw-confirm'); }

  // Terms
  const terms = $('agreeTerms');
  if (!terms?.checked) {
    setError('termsErr', null, 'You must agree to the Terms and Privacy Policy.');
    valid = false;
  } else {
    setError('termsErr', null, '');
  }

  return valid;
}

/* ── Password strength ── */
function calcPasswordStrength(pwd) {
  if (!pwd || pwd.length < 6) return 0;
  let score = 0;
  if (pwd.length >= 8)  score++;
  if (pwd.length >= 12) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  return Math.min(score, 4);
}

function updateStrengthMeter(score, hasValue) {
  const wrap   = $('strengthWrap');
  const label  = $('strengthLabel');
  const bars   = ['sb1','sb2','sb3','sb4'];

  if (!wrap) return;
  wrap.style.display = hasValue ? '' : 'none';
  if (!hasValue) return;

  const levels = [
    { cls: 'weak',   text: 'Too weak' },
    { cls: 'weak',   text: 'Weak' },
    { cls: 'fair',   text: 'Fair' },
    { cls: 'good',   text: 'Good' },
    { cls: 'strong', text: 'Strong ✓' },
  ];
  const level = levels[score] || levels[0];

  bars.forEach((id, i) => {
    const bar = $(id);
    if (!bar) return;
    bar.className = 'strength-bar';
    if (i < score) bar.classList.add(level.cls);
  });

  if (label) {
    label.className = `strength-label ${level.cls}`;
    label.textContent = level.text;
  }
}

/* ── Blur validation helper ── */
function bindBlurValidation(inputId, errId, wrapperId, validator) {
  const input = $(inputId);
  if (!input) return;

  input.addEventListener('blur', () => {
    const msg = validator();
    if (msg) setError(errId, wrapperId, msg);
    else { clearError(errId, wrapperId); setSuccess(wrapperId); }
  });
  input.addEventListener('input', () => {
    clearError(errId, wrapperId);
  });
}

/* ── Loading state ── */
function setLoading(isLoading, btnId, labelId, spinnerId) {
  const btn     = $(btnId);
  const label   = $(labelId);
  const spinner = $(spinnerId);
  if (!btn) return;
  btn.disabled = isLoading;
  if (label)   label.style.display = isLoading ? 'none' : '';
  if (spinner) spinner.style.display = isLoading ? 'inline-block' : 'none';
}

/* ── Global error ── */
function showGlobalError(containerId, msgId, msg) {
  const container = $(containerId);
  const msgEl     = $(msgId);
  if (container) container.classList.add('show');
  if (msgEl)     msgEl.textContent = msg;
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

/* ── Utilities ── */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
