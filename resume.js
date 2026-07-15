/* ═══════════════════════════════════════════════════════════════════
   InternLink — Resume Manager
   Upload, score chart, improvements, versions, links, preview, toast
   ═══════════════════════════════════════════════════════════════════ */

'use strict';

/* ─────────────────────────────────────────────────────
   1. DATA
   ───────────────────────────────────────────────────── */
const SUGGESTIONS = [
  {
    id: 's1',
    icon: 'box',
    iconClass: 'si-amber',
    title: 'Add Docker & Kubernetes to your skills',
    desc: 'These keywords appear in 76% of SWE internship JDs. Adding them raises your ATS score by an estimated +6 points.',
    priority: 'high',
    impact: 5,
    done: false,
  },
  {
    id: 's2',
    icon: 'trending-up',
    iconClass: 'si-cyan',
    title: 'Quantify all impact bullets',
    desc: '3 of your 6 experience bullets lack measurable outcomes. Recruiters scan for numbers — add %, $, or user counts.',
    priority: 'high',
    impact: 5,
    done: false,
  },
  {
    id: 's3',
    icon: 'layout-template',
    iconClass: 'si-violet',
    title: 'Add a System Design project',
    desc: 'No project demonstrates distributed systems knowledge. A simple "URL Shortener" or "Rate Limiter" project signals CS depth.',
    priority: 'medium',
    impact: 4,
    done: false,
  },
  {
    id: 's4',
    icon: 'user',
    iconClass: 'si-rose',
    title: 'Include a professional summary',
    desc: 'A 2–3 line summary at the top helps ATS parsers and gives recruiters instant context. Target: "CS junior seeking SWE internship…"',
    priority: 'medium',
    impact: 3,
    done: false,
  },
  {
    id: 's5',
    icon: 'award',
    iconClass: 'si-emerald',
    title: 'Add certifications or awards',
    desc: 'AWS Cloud Practitioner, Google IT Cert, or Dean\'s List mention adds credibility and fills keyword gaps.',
    priority: 'low',
    impact: 2,
    done: true,
  },
  {
    id: 's6',
    icon: 'git-branch',
    iconClass: 'si-indigo',
    title: 'Link GitHub repos directly in project bullets',
    desc: 'Recruiters click links. Add "(github.com/arjunpatel/project-name)" next to each project title.',
    priority: 'low',
    impact: 2,
    done: false,
  },
];

const VERSIONS = [
  {
    id: 'v3',
    name: 'Arjun_Resume_v3.pdf',
    date: 'June 8, 2026',
    size: '248 KB',
    score: 91,
    active: true,
    notes: 'Added quantified impact bullets. Updated skills section with TypeScript.',
  },
  {
    id: 'v2',
    name: 'Arjun_Resume_v2.pdf',
    date: 'May 14, 2026',
    size: '231 KB',
    score: 80,
    active: false,
    notes: 'Reformatted to single-page. Removed older projects.',
  },
  {
    id: 'v1b',
    name: 'Arjun_Resume_v1b.pdf',
    date: 'Apr 29, 2026',
    size: '218 KB',
    score: 73,
    active: false,
    notes: 'Initial internship-season draft. 2 columns layout.',
  },
  {
    id: 'v1',
    name: 'Arjun_Resume_v1.pdf',
    date: 'Mar 2, 2026',
    size: '205 KB',
    score: 67,
    active: false,
    notes: 'First version. Uploaded from career center template.',
  },
  {
    id: 'v0',
    name: 'Resume_Original.docx',
    date: 'Jan 18, 2026',
    size: '88 KB',
    score: 54,
    active: false,
    notes: 'Original DOCX. Pre-formatting. Kept for reference.',
  },
];

/* ─────────────────────────────────────────────────────
   2. STATE
   ───────────────────────────────────────────────────── */
const state = {
  suggestions: JSON.parse(JSON.stringify(SUGGESTIONS)),
  versions:    JSON.parse(JSON.stringify(VERSIONS)),
  zoomLevel:   1.0,
  activeVersionId: 'v3',
  chartInstance: null,
};

/* ─────────────────────────────────────────────────────
   3. DOM
   ───────────────────────────────────────────────────── */
const $ = id => document.getElementById(id);

/* ─────────────────────────────────────────────────────
   4. INIT
   ───────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
  renderScoreChart();
  renderSuggestions();
  renderVersions();
  initAnimatedBars();
  bindEvents();
});

/* ─────────────────────────────────────────────────────
   5. SCORE DOUGHNUT CHART
   ───────────────────────────────────────────────────── */
function renderScoreChart() {
  const canvas = $('scoreChart');
  if (!canvas) return;

  if (state.chartInstance) { state.chartInstance.destroy(); }

  const score = getActiveVersion()?.score || 91;
  const remainder = 100 - score;

  state.chartInstance = new Chart(canvas, {
    type: 'doughnut',
    data: {
      datasets: [{
        data: [score, remainder],
        backgroundColor: [
          createGradient(canvas, ['#4F46E5', '#06B6D4', '#10B981']),
          'rgba(255,255,255,0.05)',
        ],
        borderWidth: 0,
        hoverOffset: 4,
      }],
    },
    options: {
      cutout: '76%',
      responsive: false,
      animation: { animateRotate: true, duration: 1200, easing: 'easeInOutQuart' },
      plugins: { legend: { display: false }, tooltip: { enabled: false } },
    },
  });

  // Animate score number
  const el = $('scoreNumber');
  if (el) {
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + 2, score);
      el.textContent = current;
      if (current >= score) clearInterval(timer);
    }, 18);
  }
}

function createGradient(canvas, colors) {
  const ctx = canvas.getContext('2d');
  const grad = ctx.createLinearGradient(0, 0, 160, 160);
  colors.forEach((c, i) => grad.addColorStop(i / (colors.length - 1), c));
  return grad;
}

/* ─────────────────────────────────────────────────────
   6. ANIMATED BREAKDOWN BARS
   ───────────────────────────────────────────────────── */
function initAnimatedBars() {
  // Trigger CSS transition on breakdown bars
  setTimeout(() => {
    document.querySelectorAll('.breakdown-fill').forEach(bar => {
      const w = bar.style.width;
      bar.style.width = '0';
      requestAnimationFrame(() => {
        requestAnimationFrame(() => { bar.style.width = w; });
      });
    });
  }, 200);
}

/* ─────────────────────────────────────────────────────
   7. SUGGESTIONS
   ───────────────────────────────────────────────────── */
function renderSuggestions() {
  const container = $('suggestionsList');
  if (!container) return;

  container.innerHTML = state.suggestions.map((s, i) => {
    const dots = Array.from({ length: 5 }, (_, d) =>
      `<span class="impact-dot${d < s.impact ? ' on' : ''}"></span>`
    ).join('');

    const priClass = { high: 'sp-high', medium: 'sp-medium', low: 'sp-low' }[s.priority] || 'sp-low';
    const priLabel = { high: '🔴 High', medium: '🟡 Medium', low: '🟢 Low' }[s.priority];

    return `
      <div class="suggestion-item${s.done ? ' dismissed' : ''}"
        id="sug-${s.id}"
        style="animation-delay:${i * 55}ms"
      >
        <div class="sug-icon-wrap ${s.iconClass}">
          <i data-lucide="${s.icon}"></i>
        </div>
        <div class="sug-body">
          <p class="sug-title">${s.title}</p>
          <p class="sug-desc">${s.desc}</p>
        </div>
        <div class="sug-right">
          <span class="sug-priority ${priClass}">${priLabel}</span>
          <div class="sug-impact" title="Impact: ${s.impact}/5">${dots}</div>
          <button
            class="sug-done-btn${s.done ? ' done' : ''}"
            data-id="${s.id}"
            aria-label="${s.done ? 'Mark as not done' : 'Mark as done'}"
            title="${s.done ? 'Undo' : 'Mark done'}"
          >
            <i data-lucide="${s.done ? 'check-circle-2' : 'circle'}"></i>
          </button>
        </div>
      </div>
    `;
  }).join('');

  lucide.createIcons();
  attachSuggestionEvents();
}

function attachSuggestionEvents() {
  document.querySelectorAll('.sug-done-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const sug = state.suggestions.find(s => s.id === id);
      if (sug) {
        sug.done = !sug.done;
        renderSuggestions();
        showToast(sug.done ? `✓ Marked done: ${sug.title}` : 'Restored suggestion', sug.done ? 'success' : 'info');
      }
    });
  });
}

/* ─────────────────────────────────────────────────────
   8. VERSIONS
   ───────────────────────────────────────────────────── */
function renderVersions() {
  const container = $('versionsList');
  if (!container) return;

  container.innerHTML = state.versions.map((v, i) => {
    const scoreColor = v.score >= 85 ? '#10B981' : v.score >= 70 ? '#06B6D4' : '#F59E0B';
    const scoreBg    = v.score >= 85
      ? 'rgba(16,185,129,.1)'
      : v.score >= 70
        ? 'rgba(6,182,212,.1)'
        : 'rgba(245,158,11,.1)';
    const isActive = v.id === state.activeVersionId;

    return `
      <div class="version-item${isActive ? ' active-version' : ''}"
        id="ver-${v.id}"
        data-id="${v.id}"
        role="button"
        tabindex="0"
        aria-label="Version ${v.name}"
        style="animation-delay:${i * 60}ms"
      >
        <div class="version-file-icon">
          <i data-lucide="${v.name.endsWith('.docx') ? 'file-type' : 'file-text'}"></i>
        </div>
        <div class="version-info">
          <p class="version-name">${v.name}</p>
          <div class="version-meta">
            <span><i data-lucide="calendar"></i>${v.date}</span>
            <span><i data-lucide="hard-drive"></i>${v.size}</span>
            ${v.notes ? `<span style="color:var(--clr-faint);font-style:italic">${trunc(v.notes, 40)}</span>` : ''}
          </div>
        </div>
        <span class="version-score-badge"
          style="background:${scoreBg};color:${scoreColor};border:1px solid ${scoreColor}33;padding:3px 9px;border-radius:999px;font-size:.72rem;font-weight:700;">
          ${v.score}%
        </span>
        ${isActive
          ? `<span class="v-active-tag">Active</span>`
          : `<div class="version-actions">
               <button class="icon-action-btn" data-action="set-active" data-id="${v.id}" aria-label="Set as active version" title="Restore">
                 <i data-lucide="rotate-ccw"></i>
               </button>
               <button class="icon-action-btn" data-action="download-ver" data-id="${v.id}" aria-label="Download this version" title="Download">
                 <i data-lucide="download"></i>
               </button>
             </div>`
        }
      </div>
    `;
  }).join('');

  lucide.createIcons();
  attachVersionEvents();
}

function attachVersionEvents() {
  document.querySelectorAll('.version-item').forEach(el => {
    el.addEventListener('click', e => {
      if (e.target.closest('[data-action]')) return;
      // Click → highlight but don't set active yet
      document.querySelectorAll('.version-item').forEach(v => v.classList.remove('active-version'));
      el.classList.add('active-version');
    });
    el.addEventListener('keydown', e => {
      if (e.key === 'Enter') el.click();
    });
  });

  document.querySelectorAll('[data-action="set-active"]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const id  = btn.dataset.id;
      const ver = state.versions.find(v => v.id === id);
      if (!ver) return;

      // Update active
      state.versions.forEach(v => v.active = (v.id === id));
      state.activeVersionId = id;

      // Update header
      const nameEl = $('activeResumeName');
      const activeFileEl = $('activeFileDisplay');
      const tagEl = $('versionTag');

      if (nameEl) nameEl.textContent = ver.name;
      if (activeFileEl) activeFileEl.textContent = ver.name;
      if (tagEl) tagEl.textContent = `v${state.versions.indexOf(ver) === 0 ? '3' : state.versions.indexOf(ver) + 1 <= 1 ? '2' : '1'} — Active`;

      // Re-render score chart with new score
      state.chartInstance?.destroy();
      setTimeout(() => {
        const el = $('scoreNumber');
        if (el) el.textContent = ver.score;
        renderScoreChart();
      }, 100);

      renderVersions();
      showToast(`Restored: ${ver.name}`, 'success');
    });
  });

  document.querySelectorAll('[data-action="download-ver"]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const id  = btn.dataset.id;
      const ver = state.versions.find(v => v.id === id);
      if (ver) showToast(`Downloading: ${ver.name}`, 'info');
    });
  });
}

/* ─────────────────────────────────────────────────────
   9. UPLOAD FLOW
   ───────────────────────────────────────────────────── */
function handleFileUpload(file) {
  if (!file) return;
  const allowed = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  if (!allowed.includes(file.type) && !file.name.match(/\.(pdf|docx)$/i)) {
    showToast('Invalid file type. Please upload PDF or DOCX.', 'error');
    return;
  }
  if (file.size > 10 * 1024 * 1024) {
    showToast('File too large. Max 10 MB allowed.', 'error');
    return;
  }

  // Show progress
  const wrap  = $('uploadProgressWrap');
  const fill  = $('progressFill');
  const pct   = $('uploadPct');
  const fname = $('uploadFileName');

  if (wrap) wrap.hidden = false;
  if (fname) fname.textContent = file.name;

  let progress = 0;
  const timer = setInterval(() => {
    progress += Math.random() * 18 + 4;
    if (progress > 100) progress = 100;
    const p = Math.round(progress);
    if (fill) fill.style.width = p + '%';
    if (pct)  pct.textContent  = p + '%';

    if (p >= 100) {
      clearInterval(timer);
      setTimeout(() => {
        // Add new version
        const newVer = {
          id: 'vNew_' + Date.now(),
          name: file.name,
          date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
          size: formatBytes(file.size),
          score: 87 + Math.floor(Math.random() * 8), // simulated
          active: true,
          notes: 'Freshly uploaded.',
        };
        // Deactivate others
        state.versions.forEach(v => v.active = false);
        state.versions.unshift(newVer);
        state.activeVersionId = newVer.id;

        if (wrap) wrap.hidden = true;
        if (fill) fill.style.width = '0';

        // Update header
        const nameEl = $('activeResumeName');
        const activeFileEl = $('activeFileDisplay');
        if (nameEl) nameEl.textContent = file.name;
        if (activeFileEl) activeFileEl.textContent = file.name;

        renderVersions();
        renderScoreChart();

        showToast(`Uploaded: ${file.name} — Analyzing…`, 'success');
        setTimeout(() => {
          showToast(`Analysis complete! Score: ${newVer.score}/100`, 'success');
        }, 2200);
      }, 400);
    }
  }, 80);
}

/* ─────────────────────────────────────────────────────
   10. PREVIEW ZOOM
   ───────────────────────────────────────────────────── */
function setZoom(level) {
  const doc = $('resumeDoc');
  if (!doc) return;
  state.zoomLevel = Math.max(.5, Math.min(1.4, level));
  doc.style.setProperty('--zoom', state.zoomLevel);
}

/* ─────────────────────────────────────────────────────
   11. FULLSCREEN PREVIEW MODAL
   ───────────────────────────────────────────────────── */
function openPreviewModal() {
  const backdrop = $('previewModalBackdrop');
  const modalDoc = $('previewModalDoc');
  const src      = $('resumeDoc');

  if (modalDoc && src) {
    modalDoc.innerHTML = '';
    const clone = src.cloneNode(true);
    clone.style.setProperty('--zoom', '1');
    modalDoc.appendChild(clone);
    lucide.createIcons();
  }
  backdrop?.classList.add('open');
  backdrop?.setAttribute('aria-hidden', 'false');
}

function closePreviewModal() {
  const backdrop = $('previewModalBackdrop');
  backdrop?.classList.remove('open');
  backdrop?.setAttribute('aria-hidden', 'true');
}

/* ─────────────────────────────────────────────────────
   12. LINK VALIDATION
   ───────────────────────────────────────────────────── */
function updateLinkStatus(inputId, statusId) {
  const input  = $(inputId);
  const status = $(statusId);
  if (!input || !status) return;

  const val = input.value.trim();
  if (val) {
    status.className = 'link-status connected';
    status.innerHTML = `<i data-lucide="check-circle-2"></i><span>Connected</span>`;
  } else {
    status.className = 'link-status';
    status.innerHTML = `<i data-lucide="plus-circle"></i><span>Not added</span>`;
  }
  lucide.createIcons();
}

function saveAllLinks() {
  const github    = $('githubInput')?.value.trim();
  const linkedin  = $('linkedinInput')?.value.trim();
  const portfolio = $('portfolioInput')?.value.trim();
  const leetcode  = $('leetcodeInput')?.value.trim();

  const connected = [github, linkedin, portfolio, leetcode].filter(Boolean).length;
  showToast(`${connected} professional link${connected !== 1 ? 's' : ''} saved to your profile`, 'success');
}

/* ─────────────────────────────────────────────────────
   13. LINK OPEN BUTTONS
   ───────────────────────────────────────────────────── */
function bindLinkOpenButtons() {
  const config = [
    { card: 'github',    input: 'githubInput',    prefix: 'https://github.com/' },
    { card: 'linkedin',  input: 'linkedinInput',  prefix: 'https://linkedin.com/in/' },
    { card: 'portfolio', input: 'portfolioInput', prefix: 'https://' },
    { card: 'leetcode',  input: 'leetcodeInput',  prefix: 'https://leetcode.com/u/' },
  ];

  config.forEach(({ input, prefix }) => {
    const inp = $(input);
    const card = inp?.closest('.link-card');
    const openBtn = card?.querySelector('.link-open-btn');
    if (!openBtn) return;

    openBtn.addEventListener('click', () => {
      const val = inp?.value.trim();
      if (!val) { showToast('Enter a username or URL first', 'warning'); return; }
      const url = val.startsWith('http') ? val : prefix + val;
      showToast(`Opening: ${url}`, 'info');
    });
  });
}

/* ─────────────────────────────────────────────────────
   14. BIND ALL EVENTS
   ───────────────────────────────────────────────────── */
function bindEvents() {

  // Upload button → trigger file input
  $('uploadBtn')?.addEventListener('click', () => $('fileInput')?.click());
  $('browseBtn')?.addEventListener('click', () => $('fileInput')?.click());

  $('fileInput')?.addEventListener('change', e => {
    const file = e.target.files?.[0];
    if (file) handleFileUpload(file);
    e.target.value = ''; // reset so same file can be re-selected
  });

  // Drag & drop on drop zone
  const dropZone = $('dropZone');
  if (dropZone) {
    dropZone.addEventListener('dragover', e => { e.preventDefault(); dropZone.classList.add('drag-over'); });
    dropZone.addEventListener('dragleave', () => dropZone.classList.remove('drag-over'));
    dropZone.addEventListener('drop', e => {
      e.preventDefault();
      dropZone.classList.remove('drag-over');
      handleFileUpload(e.dataTransfer.files?.[0]);
    });
    dropZone.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') $('fileInput')?.click(); });
    dropZone.addEventListener('click', e => { if (!e.target.closest('.link-btn')) $('fileInput')?.click(); });
  }

  // Download buttons
  $('downloadBtn')?.addEventListener('click', () => {
    const active = getActiveVersion();
    showToast(`Downloading: ${active?.name || 'resume'}`, 'info');
  });
  $('downloadActiveBtn')?.addEventListener('click', () => {
    const active = getActiveVersion();
    showToast(`Downloading: ${active?.name || 'resume'}`, 'info');
  });

  // Preview buttons
  $('previewBtn')?.addEventListener('click',       openPreviewModal);
  $('previewActiveBtn')?.addEventListener('click', openPreviewModal);
  $('fullscreenBtn')?.addEventListener('click',    openPreviewModal);

  $('previewModalCloseBtn')?.addEventListener('click', closePreviewModal);
  $('previewModalBackdrop')?.addEventListener('click', e => {
    if (e.target === $('previewModalBackdrop')) closePreviewModal();
  });
  $('modalDownloadBtn')?.addEventListener('click', () => {
    const active = getActiveVersion();
    showToast(`Downloading: ${active?.name || 'resume'}`, 'info');
  });

  // Zoom controls
  $('zoomInBtn')?.addEventListener('click',  () => setZoom(state.zoomLevel + .1));
  $('zoomOutBtn')?.addEventListener('click', () => setZoom(state.zoomLevel - .1));

  // Rescan
  $('rescanBtn')?.addEventListener('click', () => {
    showToast('Re-scanning resume…', 'info');
    const el = $('scoreNumber');
    if (el) el.textContent = '…';
    setTimeout(() => {
      const active = getActiveVersion();
      if (el && active) el.textContent = active.score;
      state.chartInstance?.destroy();
      renderScoreChart();
      showToast('Scan complete! Score updated.', 'success');
    }, 1800);
  });

  // Save links
  $('saveLinksBtn')?.addEventListener('click', saveAllLinks);

  // Link input live validation
  [
    ['githubInput',    'github-status'],
    ['linkedinInput',  'linkedin-status'],
    ['portfolioInput', 'portfolio-status'],
    ['leetcodeInput',  'leetcode-status'],
  ].forEach(([inputId, statusId]) => {
    $(inputId)?.addEventListener('input', () => updateLinkStatus(inputId, statusId));
  });

  bindLinkOpenButtons();

  // Manage versions button
  $('manageVersionsBtn')?.addEventListener('click', () => {
    showToast('Version management coming in v1.1', 'info');
  });

  // Toast dismiss
  $('toastDismiss')?.addEventListener('click', () => $('toast').classList.remove('show'));

  // Sidebar collapse
  $('sidebarCollapseBtn')?.addEventListener('click', () => {
    document.getElementById('sidebar')?.classList.toggle('collapsed');
  });

  // Keyboard: Escape closes modal
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closePreviewModal();
  });
}

/* ─────────────────────────────────────────────────────
   15. TOAST
   ───────────────────────────────────────────────────── */
let toastTimer;
function showToast(msg, type = 'success') {
  const toast    = $('toast');
  const toastMsg = $('toastMsg');
  const iconWrap = $('toastIconWrap');
  if (!toast) return;

  const iconMap = { success: 'check-circle', info: 'info', warning: 'alert-triangle', error: 'alert-circle' };
  iconWrap.innerHTML = `<i data-lucide="${iconMap[type] || 'check-circle'}"></i>`;
  toast.className    = `toast show toast-${type}`;
  toastMsg.textContent = msg;

  lucide.createIcons();
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
}

/* ─────────────────────────────────────────────────────
   16. UTILITIES
   ───────────────────────────────────────────────────── */
function getActiveVersion() {
  return state.versions.find(v => v.id === state.activeVersionId) || state.versions[0];
}

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(0) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

function trunc(str, max) {
  if (!str) return '';
  return str.length > max ? str.slice(0, max) + '…' : str;
}
