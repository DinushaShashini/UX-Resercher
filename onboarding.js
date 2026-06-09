/* ═══════════════════════════════════════════════════════════════════
   InternLink — Onboarding Wizard
   Step 1: Interests  →  Step 2: Skills  →  Step 3: Resume
   ═══════════════════════════════════════════════════════════════════ */
'use strict';

/* ─── SKILLS DATA ─── */
const SKILLS_DATA = [
  // Languages
  {name:'Python',    cat:'languages', icon:'code-2'},
  {name:'JavaScript',cat:'languages', icon:'code-2'},
  {name:'TypeScript',cat:'languages', icon:'file-code'},
  {name:'Java',      cat:'languages', icon:'coffee'},
  {name:'C++',       cat:'languages', icon:'code'},
  {name:'Go',        cat:'languages', icon:'terminal'},
  {name:'Rust',      cat:'languages', icon:'zap'},
  {name:'Swift',     cat:'languages', icon:'smartphone'},
  {name:'Kotlin',    cat:'languages', icon:'smartphone'},
  {name:'SQL',       cat:'languages', icon:'database'},
  {name:'R',         cat:'languages', icon:'bar-chart'},
  {name:'PHP',       cat:'languages', icon:'code'},
  // Frameworks
  {name:'React',     cat:'frameworks',icon:'layers'},
  {name:'Vue.js',    cat:'frameworks',icon:'layers'},
  {name:'Angular',   cat:'frameworks',icon:'layers'},
  {name:'Next.js',   cat:'frameworks',icon:'globe'},
  {name:'Node.js',   cat:'frameworks',icon:'server'},
  {name:'Django',    cat:'frameworks',icon:'server'},
  {name:'FastAPI',   cat:'frameworks',icon:'zap'},
  {name:'Spring Boot',cat:'frameworks',icon:'leaf'},
  {name:'Flutter',   cat:'frameworks',icon:'smartphone'},
  {name:'React Native',cat:'frameworks',icon:'smartphone'},
  {name:'Express',   cat:'frameworks',icon:'server'},
  {name:'GraphQL',   cat:'frameworks',icon:'share-2'},
  // Tools
  {name:'Git',       cat:'tools',     icon:'git-branch'},
  {name:'Docker',    cat:'tools',     icon:'package'},
  {name:'Kubernetes',cat:'tools',     icon:'cloud'},
  {name:'AWS',       cat:'tools',     icon:'cloud'},
  {name:'Azure',     cat:'tools',     icon:'cloud'},
  {name:'PostgreSQL',cat:'tools',     icon:'database'},
  {name:'MongoDB',   cat:'tools',     icon:'database'},
  {name:'Redis',     cat:'tools',     icon:'zap'},
  {name:'Linux',     cat:'tools',     icon:'terminal'},
  {name:'Jest',      cat:'tools',     icon:'check-circle'},
  {name:'CI/CD',     cat:'tools',     icon:'refresh-cw'},
  // Design
  {name:'Figma',     cat:'design',    icon:'pen-tool'},
  {name:'Adobe XD',  cat:'design',    icon:'pen-tool'},
  {name:'Sketch',    cat:'design',    icon:'pen-tool'},
  {name:'Prototyping',cat:'design',   icon:'layout'},
  {name:'Wireframing',cat:'design',   icon:'grid'},
  {name:'UI Design', cat:'design',    icon:'layout-dashboard'},
  {name:'User Research',cat:'design', icon:'users'},
  {name:'Tailwind CSS',cat:'design',  icon:'paintbrush'},
  // Soft Skills
  {name:'Communication',  cat:'soft', icon:'message-square'},
  {name:'Leadership',     cat:'soft', icon:'star'},
  {name:'Problem Solving',cat:'soft', icon:'lightbulb'},
  {name:'Teamwork',       cat:'soft', icon:'users'},
  {name:'Agile/Scrum',    cat:'soft', icon:'repeat'},
  {name:'Time Management',cat:'soft', icon:'clock'},
];

/* ─── STATE ─── */
const state = {
  step:       1,
  interests:  new Set(),
  skills:     new Set(),
  resumeFile: null,
  currentSkillTab: 'all',
};

/* ─── DOM ─── */
const $ = id => document.getElementById(id);

/* ─── INIT ─── */
document.addEventListener('DOMContentLoaded', () => {
  if (typeof lucide !== 'undefined') lucide.createIcons();
  renderSkillsPool('all');
  bindEvents();
  updateProgress();
});

/* ─────────────────────────────────────────────────────
   STEP NAVIGATION
   ───────────────────────────────────────────────────── */
function goToStep(step) {
  // Hide current
  document.querySelectorAll('.ob-panel').forEach(p => {
    p.classList.remove('active');
    p.hidden = true;
  });

  // Show target
  const panel = $(`panel-${step}`);
  if (panel) { panel.classList.add('active'); panel.hidden = false; }

  // Update step indicators
  document.querySelectorAll('.ob-step').forEach(el => {
    const s = parseInt(el.dataset.step);
    el.classList.remove('active','done');
    if (s < step)  { el.classList.add('done');   el.querySelector('.ob-step-num').style.display='none'; el.querySelector('.ob-step-check').style.display=''; }
    else            { el.querySelector('.ob-step-num').style.display=''; el.querySelector('.ob-step-check').style.display='none'; }
    if (s === step) el.classList.add('active');
  });

  // Connectors
  document.querySelectorAll('.ob-step-connector').forEach((con, i) => {
    con.classList.toggle('done', i < step - 1);
  });

  // Back button
  const backBtn = $('obBackBtn');
  if (backBtn) backBtn.style.display = step > 1 ? '' : 'none';

  // Next button label
  const nextBtn = $('obNextBtn');
  if (nextBtn) {
    if (step === 3) nextBtn.innerHTML = `Finish &amp; Go to Dashboard <i data-lucide="arrow-right"></i>`;
    else            nextBtn.innerHTML = `Continue <i data-lucide="arrow-right"></i>`;
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }

  state.step = step;
  updateProgress();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateProgress() {
  const fill = $('obProgressFill');
  if (fill) fill.style.width = (state.step / 3 * 100) + '%';
}

/* ─────────────────────────────────────────────────────
   STEP 1: INTERESTS
   ───────────────────────────────────────────────────── */
function bindInterestCards() {
  document.querySelectorAll('.interest-card').forEach(card => {
    card.addEventListener('click', () => {
      const key     = card.dataset.interest;
      const pressed = card.getAttribute('aria-pressed') === 'true';
      card.setAttribute('aria-pressed', !pressed);
      if (!pressed) state.interests.add(key);
      else           state.interests.delete(key);
      updateInterestHint();
    });
  });
}

function updateInterestHint() {
  const hint = $('interestsHint');
  const n    = state.interests.size;
  if (!hint) return;
  if (n === 0) hint.textContent = 'Select at least 1 interest to continue';
  else         hint.textContent = `${n} interest${n>1?'s':''} selected — great choice!`;
}

/* ─────────────────────────────────────────────────────
   STEP 2: SKILLS
   ───────────────────────────────────────────────────── */
function renderSkillsPool(tab) {
  const pool = $('skillsPool');
  if (!pool) return;

  const filtered = tab === 'all'
    ? SKILLS_DATA
    : SKILLS_DATA.filter(s => s.cat === tab);

  pool.innerHTML = filtered.map(sk => {
    const isSelected = state.skills.has(sk.name);
    return `
      <button class="skill-chip-btn${isSelected ? ' selected' : ''}"
        data-skill="${esc(sk.name)}"
        type="button"
        aria-pressed="${isSelected}"
      >
        <i data-lucide="${sk.icon}"></i>
        ${esc(sk.name)}
      </button>
    `;
  }).join('');

  if (typeof lucide !== 'undefined') lucide.createIcons();

  pool.querySelectorAll('.skill-chip-btn').forEach(btn => {
    btn.addEventListener('click', () => toggleSkill(btn.dataset.skill, btn));
  });
}

function toggleSkill(name, btn) {
  if (state.skills.has(name)) {
    state.skills.delete(name);
    btn?.classList.remove('selected');
    btn?.setAttribute('aria-pressed','false');
  } else {
    state.skills.add(name);
    btn?.classList.add('selected');
    btn?.setAttribute('aria-pressed','true');
  }
  renderSelectedSkills();
}

function renderSelectedSkills() {
  const wrap      = $('selectedSkillsWrap');
  const countEl   = $('selectedSkillCount');
  if (!wrap) return;

  const skills = [...state.skills];
  if (countEl) countEl.textContent = skills.length;

  if (skills.length === 0) {
    wrap.innerHTML = '<span class="selected-empty-hint">No skills selected yet — tap skill chips above</span>';
    return;
  }

  wrap.innerHTML = skills.map(sk => `
    <span class="selected-skill-tag">
      ${esc(sk)}
      <button type="button" data-remove="${esc(sk)}" aria-label="Remove ${esc(sk)}">
        <i data-lucide="x"></i>
      </button>
    </span>
  `).join('');

  if (typeof lucide !== 'undefined') lucide.createIcons();

  wrap.querySelectorAll('[data-remove]').forEach(btn => {
    btn.addEventListener('click', () => {
      const name = btn.dataset.remove;
      state.skills.delete(name);
      // Update pool chip
      const poolChip = document.querySelector(`.skill-chip-btn[data-skill="${name}"]`);
      if (poolChip) { poolChip.classList.remove('selected'); poolChip.setAttribute('aria-pressed','false'); }
      renderSelectedSkills();
    });
  });
}

/* ─────────────────────────────────────────────────────
   STEP 3: RESUME UPLOAD
   ───────────────────────────────────────────────────── */
function handleResumeFile(file) {
  if (!file) return;
  const allowed = ['application/pdf','application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  if (!allowed.includes(file.type) && !file.name.match(/\.(pdf|docx)$/i)) {
    showToast('Please upload a PDF or DOCX file.', 'error'); return;
  }
  if (file.size > 10 * 1024 * 1024) {
    showToast('File too large — max 10 MB.', 'error'); return;
  }

  state.resumeFile = file;

  // Show progress card
  const progressCard = $('uploadProgressCard');
  const dropZone     = $('resumeDropZone');
  const fileNameEl   = $('uploadFileName');
  const fileSizeEl   = $('uploadFileSize');
  const fillEl       = $('uploadFill');
  const pctEl        = $('uploadPct');

  if (progressCard) progressCard.hidden = false;
  if (dropZone)     dropZone.style.display = 'none';
  if (fileNameEl)   fileNameEl.textContent = file.name;
  if (fileSizeEl)   fileSizeEl.textContent = formatBytes(file.size);

  // Animate progress
  let pct = 0;
  const timer = setInterval(() => {
    pct = Math.min(pct + Math.random() * 18 + 4, 100);
    const p = Math.round(pct);
    if (fillEl) fillEl.style.width = p + '%';
    if (pctEl)  pctEl.textContent  = p + '%';
    if (p >= 100) {
      clearInterval(timer);
      setTimeout(() => {
        if (progressCard) progressCard.hidden = true;
        const successCard = $('uploadSuccessCard');
        if (successCard) {
          successCard.hidden = false;
          const nameEl = $('uploadSuccessName');
          if (nameEl) nameEl.textContent = file.name;
        }
        showToast('Resume uploaded! Analysing skills…', 'success');
      }, 300);
    }
  }, 80);
}

/* ─────────────────────────────────────────────────────
   BIND EVENTS
   ───────────────────────────────────────────────────── */
function bindEvents() {

  bindInterestCards();

  // Skill tabs
  document.querySelectorAll('.skills-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.skills-tab').forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected','false'); });
      tab.classList.add('active');
      tab.setAttribute('aria-selected','true');
      state.currentSkillTab = tab.dataset.tab;
      renderSkillsPool(tab.dataset.tab);
    });
  });

  // Custom skill add
  $('addCustomSkillBtn')?.addEventListener('click', addCustomSkill);
  $('customSkillInput')?.addEventListener('keydown', e => {
    if (e.key === 'Enter') { e.preventDefault(); addCustomSkill(); }
  });

  // Resume drop zone
  const dropZone   = $('resumeDropZone');
  const fileInput  = $('resumeFileInput');

  dropZone?.addEventListener('click',  e => { if (!e.target.closest('.link-btn')) fileInput?.click(); });
  dropZone?.addEventListener('keydown', e => { if (e.key==='Enter'||e.key===' ') fileInput?.click(); });
  $('dropBrowseBtn')?.addEventListener('click', () => fileInput?.click());
  fileInput?.addEventListener('change', e => { handleResumeFile(e.target.files?.[0]); e.target.value=''; });

  dropZone?.addEventListener('dragover', e => { e.preventDefault(); dropZone.classList.add('drag-over'); });
  dropZone?.addEventListener('dragleave', () => dropZone.classList.remove('drag-over'));
  dropZone?.addEventListener('drop', e => {
    e.preventDefault(); dropZone.classList.remove('drag-over');
    handleResumeFile(e.dataTransfer.files?.[0]);
  });

  // Remove resume
  $('uploadRemoveBtn')?.addEventListener('click', () => {
    state.resumeFile = null;
    const successCard = $('uploadSuccessCard');
    const dropZone    = $('resumeDropZone');
    if (successCard) successCard.hidden = true;
    if (dropZone)    dropZone.style.display = '';
  });

  // Navigation
  $('obNextBtn')?.addEventListener('click', () => {
    if (state.step === 1) {
      if (state.interests.size === 0) { showToast('Please select at least 1 interest.', 'error'); return; }
      goToStep(2);
    } else if (state.step === 2) {
      goToStep(3);
    } else if (state.step === 3) {
      finishOnboarding();
    }
  });

  $('obBackBtn')?.addEventListener('click', () => {
    if (state.step > 1) goToStep(state.step - 1);
  });

  $('obSkipStepBtn')?.addEventListener('click', () => {
    if (state.step < 3) goToStep(state.step + 1);
    else finishOnboarding();
  });

  $('skipAllBtn')?.addEventListener('click', finishOnboarding);
}

function addCustomSkill() {
  const input = $('customSkillInput');
  const name  = input?.value.trim();
  if (!name) { showToast('Enter a skill name first.', 'error'); return; }
  if (name.length > 40) { showToast('Skill name too long.', 'error'); return; }
  if (state.skills.has(name)) { showToast(`"${name}" already added.`, 'info'); return; }
  state.skills.add(name);
  if (input) input.value = '';
  renderSelectedSkills();
  showToast(`"${name}" added!`, 'success');
}

function finishOnboarding() {
  showToast('Setup complete! Taking you to your dashboard…', 'success');
  setTimeout(() => { window.location.href = 'dashboard.html'; }, 1400);
}

/* ─── Utilities ─── */
function esc(str) {
  return String(str||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
function formatBytes(b) {
  if (b < 1024) return b+' B';
  if (b < 1048576) return (b/1024).toFixed(0)+' KB';
  return (b/1048576).toFixed(1)+' MB';
}
let toastTimer;
function showToast(msg, type='success') {
  const toast  = $('toast');
  const icon   = $('toastIcon');
  const msgEl  = $('toastMsg');
  if (!toast) return;
  const icons  = {success:'check-circle',error:'alert-circle',info:'info'};
  icon.innerHTML = `<i data-lucide="${icons[type]||'check-circle'}"></i>`;
  toast.className= `toast show t-${type}`;
  msgEl.textContent = msg;
  if (typeof lucide !== 'undefined') lucide.createIcons();
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
}
