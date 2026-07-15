/* ═══════════════════════════════════════════════════════════════════
   InternLink — Kanban Application Tracker
   Full drag-and-drop, CRUD, list view, drawer, modal, localStorage
   ═══════════════════════════════════════════════════════════════════ */

'use strict';

/* ─────────────────────────────────────────────────────
   1. COLUMN DEFINITIONS
   ───────────────────────────────────────────────────── */
const COLUMNS = [
  { id: 'saved',     label: 'Saved',     icon: 'bookmark',     color: '#6366f1', colorRgb: '99,102,241',  emptyMsg: 'Save interesting roles here.' },
  { id: 'applied',   label: 'Applied',   icon: 'send',         color: '#06B6D4', colorRgb: '6,182,212',   emptyMsg: 'Applications you have submitted.' },
  { id: 'interview', label: 'Interview', icon: 'calendar',     color: '#F59E0B', colorRgb: '245,158,11',  emptyMsg: 'Upcoming interviews appear here.' },
  { id: 'offer',     label: 'Offer',     icon: 'award',        color: '#10B981', colorRgb: '16,185,129',  emptyMsg: 'Celebrate — your offers live here!' },
  { id: 'rejected',  label: 'Rejected',  icon: 'x-circle',     color: '#EF4444', colorRgb: '239,68,68',   emptyMsg: 'Keep going — every no is practice.' },
];

/* ─────────────────────────────────────────────────────
   2. SEED DATA — 12 realistic cards
   ───────────────────────────────────────────────────── */
const SEED_CARDS = [
  {
    id: 'c1', stage: 'applied', company: 'Google', position: 'SWE Intern',
    logoText: 'G', logoClass: 'logo-google',
    workType: 'hybrid', location: 'Mountain View, CA', salary: '$9,000/mo',
    dateApplied: '2026-05-14', deadline: '2026-07-12',
    matchScore: 94, priority: 'dream',
    skills: ['Python', 'Algorithms', 'Go', 'Distributed Systems'],
    contact: 'Sarah Kim · recruiting@google.com',
    notes: 'Applied via Handshake. OA link expected within 5 days. Review dynamic programming and system design patterns.',
    interviewDate: '',
  },
  {
    id: 'c2', stage: 'interview', company: 'Meta', position: 'Front-End Intern',
    logoText: 'M', logoClass: 'logo-meta',
    workType: 'onsite', location: 'Menlo Park, CA', salary: '$8,500/mo',
    dateApplied: '2026-05-10', deadline: '2026-07-20',
    matchScore: 88, priority: 'high',
    skills: ['React', 'TypeScript', 'GraphQL'],
    contact: 'James R. · jrec@meta.com',
    notes: 'Technical screen passed. Onsite loop scheduled for June 18 — 3 rounds.',
    interviewDate: '2026-06-18T10:00',
  },
  {
    id: 'c3', stage: 'offer', company: 'Stripe', position: 'Backend Intern',
    logoText: 'S', logoClass: 'logo-stripe',
    workType: 'hybrid', location: 'Seattle, WA', salary: '$8,000/mo',
    dateApplied: '2026-04-28', deadline: '2026-06-30',
    matchScore: 87, priority: 'dream',
    skills: ['Ruby', 'PostgreSQL', 'API Design', 'Docker'],
    contact: 'Nina Patel · npatel@stripe.com',
    notes: 'Offer received June 5! Decision deadline is June 22. Comparing with Google.',
    interviewDate: '',
  },
  {
    id: 'c4', stage: 'applied', company: 'Microsoft', position: 'Cloud Intern',
    logoText: 'MS', logoClass: 'logo-microsoft',
    workType: 'hybrid', location: 'Redmond, WA', salary: '$7,800/mo',
    dateApplied: '2026-05-20', deadline: '2026-08-01',
    matchScore: 71, priority: 'medium',
    skills: ['Azure', 'Terraform', 'Kubernetes'],
    contact: '',
    notes: 'Applied through university portal. Follow up in 2 weeks if no response.',
    interviewDate: '',
  },
  {
    id: 'c5', stage: 'interview', company: 'Amazon', position: 'Data Science Intern',
    logoText: 'A', logoClass: 'logo-amazon',
    workType: 'hybrid', location: 'Austin, TX', salary: '$8,200/mo',
    dateApplied: '2026-05-08', deadline: '2026-07-05',
    matchScore: 90, priority: 'high',
    skills: ['Python', 'SQL', 'Machine Learning', 'Spark'],
    contact: 'recruiter@amazon.jobs',
    notes: 'Bar-raiser loop scheduled June 20. Preparing STAR stories. Leadership principles review.',
    interviewDate: '2026-06-20T14:00',
  },
  {
    id: 'c6', stage: 'saved', company: 'Netflix', position: 'UX Research Intern',
    logoText: 'N', logoClass: 'logo-netflix',
    workType: 'remote', location: 'Remote', salary: '$7,000/mo',
    dateApplied: '', deadline: '2026-07-15',
    matchScore: 86, priority: 'medium',
    skills: ['User Research', 'Figma', 'Usability Testing'],
    contact: '',
    notes: 'Deadline is July 15. Prepare portfolio case study featuring InternLink project.',
    interviewDate: '',
  },
  {
    id: 'c7', stage: 'applied', company: 'Airbnb', position: 'Product Design Intern',
    logoText: 'AB', logoClass: 'logo-airbnb',
    workType: 'hybrid', location: 'San Francisco, CA', salary: '$7,500/mo',
    dateApplied: '2026-05-18', deadline: '2026-06-28',
    matchScore: 91, priority: 'high',
    skills: ['Figma', 'Prototyping', 'Design Systems'],
    contact: 'design-hiring@airbnb.com',
    notes: 'Portfolio submitted. Awaiting portfolio review result.',
    interviewDate: '',
  },
  {
    id: 'c8', stage: 'rejected', company: 'Apple', position: 'iOS Developer Intern',
    logoText: 'A', logoClass: 'logo-apple',
    workType: 'onsite', location: 'Cupertino, CA', salary: '$9,200/mo',
    dateApplied: '2026-04-15', deadline: '2026-07-22',
    matchScore: 68, priority: 'low',
    skills: ['Swift', 'UIKit', 'SwiftUI'],
    contact: '',
    notes: 'Rejected after OA (score 62%). Study Swift more. Re-apply next cycle.',
    interviewDate: '',
  },
  {
    id: 'c9', stage: 'saved', company: 'Figma', position: 'Design Eng Intern',
    logoText: 'F', logoClass: 'logo-figma',
    workType: 'remote', location: 'Remote', salary: '$8,000/mo',
    dateApplied: '', deadline: '2026-07-01',
    matchScore: 89, priority: 'high',
    skills: ['React', 'CSS', 'Figma API', 'JavaScript'],
    contact: '',
    notes: 'High match score! Apply ASAP — deadline July 1.',
    interviewDate: '',
  },
  {
    id: 'c10', stage: 'applied', company: 'Salesforce', position: 'PM Intern',
    logoText: 'SF', logoClass: 'logo-salesforce',
    workType: 'hybrid', location: 'San Francisco, CA', salary: '$7,200/mo',
    dateApplied: '2026-05-25', deadline: '2026-08-10',
    matchScore: 74, priority: 'medium',
    skills: ['Market Research', 'SQL', 'Agile'],
    contact: 'campus@salesforce.com',
    notes: 'Applied via campus portal. Awaiting HR screen invite.',
    interviewDate: '',
  },
  {
    id: 'c11', stage: 'rejected', company: 'Twitter', position: 'ML Engineer Intern',
    logoText: 'X', logoClass: 'logo-twitter',
    workType: 'remote', location: 'Remote', salary: '$8,800/mo',
    dateApplied: '2026-04-20', deadline: '2026-07-08',
    matchScore: 72, priority: 'medium',
    skills: ['PyTorch', 'NLP', 'Python'],
    contact: '',
    notes: 'Ghosted after phone screen. Follow up in 1 week.',
    interviewDate: '',
  },
  {
    id: 'c12', stage: 'interview', company: 'Slack', position: 'Growth Marketing Intern',
    logoText: 'SL', logoClass: 'logo-slack',
    workType: 'hybrid', location: 'New York, NY', salary: '$5,500/mo',
    dateApplied: '2026-05-12', deadline: '2026-08-05',
    matchScore: 78, priority: 'medium',
    skills: ['SEO', 'A/B Testing', 'Analytics'],
    contact: 'talent@slack.com',
    notes: 'Second interview round scheduled. Prepare marketing case study.',
    interviewDate: '2026-06-22T11:00',
  },
];

/* ─────────────────────────────────────────────────────
   3. LOGO GRADIENTS
   ───────────────────────────────────────────────────── */
const LOGO_STYLE = {
  'logo-google':     'linear-gradient(135deg,#4285F4,#34A853)',
  'logo-meta':       'linear-gradient(135deg,#0082FB,#00C6FF)',
  'logo-microsoft':  'linear-gradient(135deg,#00A2ED,#0067B8)',
  'logo-stripe':     'linear-gradient(135deg,#6772E5,#9FA8DA)',
  'logo-amazon':     'linear-gradient(135deg,#FF9900,#FFB347)',
  'logo-apple':      'linear-gradient(135deg,#555,#888)',
  'logo-netflix':    'linear-gradient(135deg,#E50914,#B81D24)',
  'logo-salesforce': 'linear-gradient(135deg,#009EDB,#00B5E2)',
  'logo-figma':      'linear-gradient(135deg,#F24E1E,#A259FF)',
  'logo-airbnb':     'linear-gradient(135deg,#FF5A5F,#FC642D)',
  'logo-twitter':    'linear-gradient(135deg,#1DA1F2,#0C85D0)',
  'logo-slack':      'linear-gradient(135deg,#4A154B,#9C1E9F)',
};

function logoStyle(cls) {
  return LOGO_STYLE[cls] || 'linear-gradient(135deg,#4F46E5,#6366f1)';
}

/* ─────────────────────────────────────────────────────
   4. STATE
   ───────────────────────────────────────────────────── */
const state = {
  cards: [],
  draggedId: null,
  dragOverCol: null,
  viewMode: 'kanban',       // 'kanban' | 'list'
  search: '',
  stageFilter: 'all',
  sortBy: 'newest',
  editingId: null,          // null = new card
  drawerCardId: null,
  pendingDeleteId: null,
  priority: 'medium',
};

/* ─────────────────────────────────────────────────────
   5. PERSISTENCE
   ───────────────────────────────────────────────────── */
const STORAGE_KEY = 'internlink_tracker_v2';

function saveState() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state.cards)); } catch (_) {}
}
function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) { state.cards = JSON.parse(raw); return; }
  } catch (_) {}
  state.cards = JSON.parse(JSON.stringify(SEED_CARDS));
}

/* ─────────────────────────────────────────────────────
   6. DOM SHORTCUTS
   ───────────────────────────────────────────────────── */
const $ = id => document.getElementById(id);

/* ─────────────────────────────────────────────────────
   7. FILTER / SORT HELPERS
   ───────────────────────────────────────────────────── */
function getFilteredCards(colId) {
  let cards = state.cards.filter(c => c.stage === colId);

  if (state.search) {
    const q = state.search.toLowerCase();
    cards = cards.filter(c =>
      c.company.toLowerCase().includes(q) ||
      c.position.toLowerCase().includes(q) ||
      (c.skills || []).join(' ').toLowerCase().includes(q)
    );
  }

  switch (state.sortBy) {
    case 'oldest':   cards.sort((a,b) => (a.dateApplied||'') > (b.dateApplied||'') ?  1 : -1); break;
    case 'newest':   cards.sort((a,b) => (a.dateApplied||'') > (b.dateApplied||'') ? -1 :  1); break;
    case 'company':  cards.sort((a,b) => a.company.localeCompare(b.company)); break;
    case 'deadline': cards.sort((a,b) => (a.deadline||'9') > (b.deadline||'9') ?  1 : -1); break;
  }
  return cards;
}

function getAllFiltered() {
  let cards = [...state.cards];
  if (state.stageFilter !== 'all') cards = cards.filter(c => c.stage === state.stageFilter);
  if (state.search) {
    const q = state.search.toLowerCase();
    cards = cards.filter(c =>
      c.company.toLowerCase().includes(q) ||
      c.position.toLowerCase().includes(q)
    );
  }
  return cards;
}

/* ─────────────────────────────────────────────────────
   8. RENDER BOARD
   ───────────────────────────────────────────────────── */
function renderBoard() {
  const board = $('kanbanBoard');
  if (!board) return;

  board.innerHTML = COLUMNS.map(col => buildColumn(col)).join('');
  attachDragEvents();
  attachCardEvents();
  applyLogos();
  renderPipelineStrip();
  updateHeaderCounts();
  lucide.createIcons();
}

function buildColumn(col) {
  const cards  = getFilteredCards(col.id);
  const colDef = COLUMNS.find(c => c.id === col.id);

  const cardsHtml = cards.length === 0
    ? `<div class="col-empty">
         <i data-lucide="${colDef.icon}"></i>
         <p>${colDef.emptyMsg}</p>
       </div>`
    : cards.map(c => buildCard(c, col)).join('');

  return `
    <div class="kanban-col"
      id="col-${col.id}"
      data-col="${col.id}"
      style="--col-accent:${col.color}; --col-accent-rgb:${col.colorRgb};"
    >
      <div class="col-header">
        <span class="col-dot"></span>
        <span class="col-title">${col.label}</span>
        <span class="col-count" id="col-count-${col.id}">${cards.length}</span>
        <button class="col-add-btn" data-col="${col.id}" aria-label="Add card to ${col.label}" title="Add">
          <i data-lucide="plus"></i>
        </button>
      </div>
      <div class="col-cards"
        id="cards-${col.id}"
        data-col="${col.id}"
        role="list"
        aria-label="${col.label} applications"
      >
        ${cardsHtml}
      </div>
    </div>
  `;
}

function buildCard(card, col) {
  const isOverdue   = card.deadline && card.deadline < new Date().toISOString().slice(0,10) && col.id !== 'rejected';
  const skillsHtml  = (card.skills||[]).slice(0,3).map(s => `<span class="skill-chip">${s}</span>`).join('');
  const moreSkills  = (card.skills||[]).length > 3 ? `<span class="skill-more">+${(card.skills).length - 3}</span>` : '';
  const matchClass  = !card.matchScore ? 'mp-none' : card.matchScore >= 85 ? 'mp-high' : card.matchScore >= 70 ? 'mp-mid' : 'mp-low';
  const wbClass     = { remote: 'wb-remote', hybrid: 'wb-hybrid', onsite: 'wb-onsite' }[card.workType] || 'wb-hybrid';
  const priClass    = { low: 'flag-low', medium: 'flag-medium', high: 'flag-high', dream: 'flag-dream' }[card.priority] || 'flag-medium';

  const deadlineMsg = isOverdue
    ? `<div class="card-deadline-banner"><i data-lucide="alert-triangle"></i> Deadline passed: ${fmtDate(card.deadline)}</div>`
    : (card.deadline && daysUntil(card.deadline) <= 7 && col.id === 'applied')
      ? `<div class="card-deadline-banner"><i data-lucide="clock"></i> Closes in ${daysUntil(card.deadline)}d</div>`
      : '';

  const notesHtml = card.notes
    ? `<div class="card-notes">${esc(card.notes)}</div>`
    : '';

  const interviewTag = card.interviewDate
    ? `<span class="card-meta-chip"><i data-lucide="video"></i>${fmtDateTime(card.interviewDate)}</span>`
    : '';

  return `
    <div class="k-card"
      id="kcard-${card.id}"
      data-id="${card.id}"
      data-col="${col.id}"
      draggable="true"
      role="listitem"
      tabindex="0"
      aria-label="${card.position} at ${card.company}"
      style="--col-accent:${col.color}; --col-accent-rgb:${col.colorRgb};"
    >
      <span class="priority-flag ${priClass}" title="Priority: ${card.priority}" aria-hidden="true"></span>

      <div class="card-top">
        <div class="card-company-row">
          <div class="company-avatar ${card.logoClass}" style="background:${logoStyle(card.logoClass)}" aria-hidden="true">${card.logoText}</div>
          <div class="card-title-block">
            <p class="card-company-name">${esc(card.company)}</p>
            <p class="card-position">${esc(card.position)}</p>
          </div>
        </div>
        <div class="card-actions">
          <button class="card-action-btn" data-action="view" data-id="${card.id}" aria-label="View details" title="View">
            <i data-lucide="eye"></i>
          </button>
          <button class="card-action-btn" data-action="edit" data-id="${card.id}" aria-label="Edit card" title="Edit">
            <i data-lucide="edit-3"></i>
          </button>
          <button class="card-action-btn danger" data-action="delete" data-id="${card.id}" aria-label="Delete card" title="Delete">
            <i data-lucide="trash-2"></i>
          </button>
        </div>
      </div>

      <div class="card-meta">
        <span class="card-meta-chip"><i data-lucide="map-pin"></i>${esc(card.location || 'Location TBD')}</span>
        <span class="work-badge ${wbClass}">${card.workType}</span>
        ${interviewTag}
      </div>

      ${(card.skills||[]).length > 0 ? `<div class="card-skills">${skillsHtml}${moreSkills}</div>` : ''}

      ${notesHtml}

      ${deadlineMsg}

      <div class="card-bottom">
        <span class="card-date ${isOverdue ? 'overdue' : ''}">
          <i data-lucide="${isOverdue ? 'alert-circle' : 'calendar'}"></i>
          ${card.dateApplied ? fmtDate(card.dateApplied) : 'Not applied yet'}
        </span>
        ${card.matchScore
          ? `<span class="match-pill ${matchClass}"><i data-lucide="zap"></i>${card.matchScore}%</span>`
          : ''}
      </div>
    </div>
  `;
}

/* ─────────────────────────────────────────────────────
   9. DRAG AND DROP
   ───────────────────────────────────────────────────── */
function attachDragEvents() {
  // Card dragstart / dragend
  document.querySelectorAll('.k-card').forEach(card => {
    card.addEventListener('dragstart', e => {
      state.draggedId = card.dataset.id;
      card.classList.add('dragging');
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', card.dataset.id);
      setTimeout(() => card.style.opacity = '.4', 0);
    });
    card.addEventListener('dragend', () => {
      card.classList.remove('dragging');
      card.style.opacity = '';
      document.querySelectorAll('.kanban-col').forEach(c => c.classList.remove('drag-over'));
      document.querySelectorAll('.drop-placeholder').forEach(p => p.remove());
      state.draggedId = null;
      state.dragOverCol = null;
    });

    // Keyboard move (← →)
    card.addEventListener('keydown', e => {
      const cols = COLUMNS.map(c => c.id);
      const card_data = state.cards.find(c => c.id === card.dataset.id);
      if (!card_data) return;
      const idx = cols.indexOf(card_data.stage);
      if (e.key === 'ArrowRight' && idx < cols.length - 1) {
        moveCard(card_data.id, cols[idx + 1]);
        showToast(`Moved to ${COLUMNS[idx+1].label}`, 'info');
        e.preventDefault();
      }
      if (e.key === 'ArrowLeft' && idx > 0) {
        moveCard(card_data.id, cols[idx - 1]);
        showToast(`Moved to ${COLUMNS[idx-1].label}`, 'info');
        e.preventDefault();
      }
      if (e.key === 'Enter' || e.key === ' ') { openDrawer(card_data.id); e.preventDefault(); }
    });
  });

  // Column drag events
  document.querySelectorAll('.col-cards').forEach(zone => {
    zone.addEventListener('dragover', e => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      const colId = zone.dataset.col;
      if (state.dragOverCol === colId) return;
      state.dragOverCol = colId;

      // Highlight column
      document.querySelectorAll('.kanban-col').forEach(c => c.classList.remove('drag-over'));
      document.getElementById(`col-${colId}`)?.classList.add('drag-over');

      // Remove old placeholder
      document.querySelectorAll('.drop-placeholder').forEach(p => p.remove());

      // Insert placeholder
      const col     = COLUMNS.find(c => c.id === colId);
      const ph      = document.createElement('div');
      ph.className  = 'drop-placeholder';
      ph.style.setProperty('--col-accent', col?.color || '#4F46E5');
      ph.style.setProperty('--col-accent-rgb', col?.colorRgb || '79,70,229');
      ph.textContent = `Drop here → ${col?.label}`;
      zone.appendChild(ph);
    });

    zone.addEventListener('dragleave', e => {
      if (!zone.contains(e.relatedTarget)) {
        zone.parentElement?.classList.remove('drag-over');
        zone.querySelectorAll('.drop-placeholder').forEach(p => p.remove());
        if (state.dragOverCol === zone.dataset.col) state.dragOverCol = null;
      }
    });

    zone.addEventListener('drop', e => {
      e.preventDefault();
      const cardId = state.draggedId || e.dataTransfer.getData('text/plain');
      const toCol  = zone.dataset.col;
      if (cardId && toCol) {
        const card     = state.cards.find(c => c.id === cardId);
        const fromStage = card?.stage;
        moveCard(cardId, toCol);
        if (fromStage !== toCol) {
          const colMeta = COLUMNS.find(c => c.id === toCol);
          showToast(`${card?.company} moved to ${colMeta?.label}`, 'success');
        }
      }
      document.querySelectorAll('.kanban-col').forEach(c => c.classList.remove('drag-over'));
      document.querySelectorAll('.drop-placeholder').forEach(p => p.remove());
    });
  });
}

function moveCard(cardId, toStage) {
  const card = state.cards.find(c => c.id === cardId);
  if (!card) return;
  if (card.stage === toStage) return;

  const fromStage = card.stage;
  card.stage = toStage;

  // Auto-set dateApplied when moved to applied
  if (toStage === 'applied' && !card.dateApplied) {
    card.dateApplied = new Date().toISOString().slice(0,10);
  }

  saveState();
  renderBoard();
  renderListView();

  // Update drawer if open
  if (state.drawerCardId === cardId) openDrawer(cardId);
}

/* ─────────────────────────────────────────────────────
   10. CARD EVENTS (view / edit / delete)
   ───────────────────────────────────────────────────── */
function attachCardEvents() {
  document.querySelectorAll('[data-action]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const { action, id } = btn.dataset;
      if (action === 'view')   openDrawer(id);
      if (action === 'edit')   openModal(id);
      if (action === 'delete') confirmDelete(id);
    });
  });

  // Column add buttons
  document.querySelectorAll('.col-add-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      openModal(null, btn.dataset.col);
    });
  });

  // Click card body (not buttons) → open drawer
  document.querySelectorAll('.k-card').forEach(card => {
    card.addEventListener('click', e => {
      if (!e.target.closest('[data-action]')) openDrawer(card.dataset.id);
    });
  });
}

/* ─────────────────────────────────────────────────────
   11. PIPELINE STRIP
   ───────────────────────────────────────────────────── */
function renderPipelineStrip() {
  const strip = $('pipelineStrip');
  if (!strip) return;

  strip.innerHTML = COLUMNS.map(col => {
    const count = state.cards.filter(c => c.stage === col.id).length;
    const isActive = state.stageFilter === col.id;
    return `
      <div class="pipe-stat ${isActive ? 'active-filter' : ''}"
        data-stage="${col.id}"
        role="button"
        tabindex="0"
        aria-label="Filter by ${col.label}: ${count}"
        style="--accent:${col.color}; --accent-rgb:${col.colorRgb};"
      >
        <div class="pipe-icon"><i data-lucide="${col.icon}"></i></div>
        <div class="pipe-info">
          <span class="pipe-count" id="pipe-count-${col.id}">${count}</span>
          <span class="pipe-label">${col.label}</span>
        </div>
      </div>
    `;
  }).join('');

  strip.querySelectorAll('.pipe-stat').forEach(el => {
    const handler = () => {
      const stage = el.dataset.stage;
      state.stageFilter = state.stageFilter === stage ? 'all' : stage;
      $('filterStageSelect').value = state.stageFilter;
      renderBoard();
      renderListView();
    };
    el.addEventListener('click', handler);
    el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') handler(); });
  });

  lucide.createIcons();
}

function updateHeaderCounts() {
  const total = state.cards.length;
  const el = $('activeCount');
  if (el) el.textContent = total;
  const badge = $('totalBadge');
  if (badge) badge.textContent = total;
}

/* ─────────────────────────────────────────────────────
   12. LIST VIEW
   ───────────────────────────────────────────────────── */
function renderListView() {
  const tbody = $('listTableBody');
  if (!tbody) return;

  const cards = getAllFiltered();
  if (!cards.length) {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align:center;padding:40px;color:var(--clr-muted)">No applications found.</td></tr>`;
    return;
  }

  tbody.innerHTML = cards.map(card => {
    const col         = COLUMNS.find(c => c.id === card.stage);
    const matchColor  = !card.matchScore ? '#6b7280' : card.matchScore >= 85 ? '#10B981' : card.matchScore >= 70 ? '#06B6D4' : '#F59E0B';
    return `
      <tr data-id="${card.id}">
        <td>
          <div class="list-company-cell">
            <div class="list-avatar" style="background:${logoStyle(card.logoClass)}">${card.logoText}</div>
            <strong>${esc(card.company)}</strong>
          </div>
        </td>
        <td>${esc(card.position)}</td>
        <td>
          <span class="list-stage-badge"
            style="background:rgba(var(--c),0.12);color:var(--tc);border:1px solid rgba(var(--c),0.25);
            --c:${col?.colorRgb||'79,70,229'};--tc:${col?.color||'#4F46E5'}">
            ${col?.label || card.stage}
          </span>
        </td>
        <td>${card.dateApplied ? fmtDate(card.dateApplied) : '—'}</td>
        <td>${card.deadline ? fmtDate(card.deadline) : '—'}</td>
        <td class="list-match-cell" style="color:${matchColor}">${card.matchScore ? card.matchScore+'%' : '—'}</td>
        <td class="list-notes-cell" title="${esc(card.notes||'')}">${esc(card.notes || '—')}</td>
        <td>
          <div class="list-actions">
            <button class="list-action-btn" data-action="view"   data-id="${card.id}" aria-label="View"><i data-lucide="eye"></i></button>
            <button class="list-action-btn" data-action="edit"   data-id="${card.id}" aria-label="Edit"><i data-lucide="edit-3"></i></button>
            <button class="list-action-btn danger" data-action="delete" data-id="${card.id}" aria-label="Delete"><i data-lucide="trash-2"></i></button>
          </div>
        </td>
      </tr>
    `;
  }).join('');

  // Events
  tbody.querySelectorAll('tr').forEach(row => {
    row.addEventListener('click', e => {
      if (!e.target.closest('[data-action]')) openDrawer(row.dataset.id);
    });
  });
  tbody.querySelectorAll('[data-action]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const { action, id } = btn.dataset;
      if (action === 'view')   openDrawer(id);
      if (action === 'edit')   openModal(id);
      if (action === 'delete') confirmDelete(id);
    });
  });

  lucide.createIcons();
}

/* ─────────────────────────────────────────────────────
   13. MODAL (Add / Edit)
   ───────────────────────────────────────────────────── */
function openModal(cardId = null, defaultStage = 'applied') {
  state.editingId = cardId;
  const backdrop = $('modalBackdrop');
  const title    = $('modalTitle');
  const saveLabel = $('modalSaveBtnLabel');

  // Populate form
  const card = cardId ? state.cards.find(c => c.id === cardId) : null;

  $('fCardId').value        = card?.id || '';
  $('fCompany').value       = card?.company || '';
  $('fPosition').value      = card?.position || '';
  $('fStage').value         = card?.stage || defaultStage;
  $('fWorkType').value      = card?.workType || 'hybrid';
  $('fDateApplied').value   = card?.dateApplied || '';
  $('fDeadline').value      = card?.deadline || '';
  $('fLocation').value      = card?.location || '';
  $('fSalary').value        = card?.salary || '';
  $('fMatchScore').value    = card?.matchScore || '';
  $('fContact').value       = card?.contact || '';
  $('fSkills').value        = (card?.skills || []).join(', ');
  $('fNotes').value         = card?.notes || '';
  $('fInterviewDate').value = card?.interviewDate || '';

  // Default date
  if (!card && !$('fDateApplied').value) {
    $('fDateApplied').value = new Date().toISOString().slice(0,10);
  }

  // Priority buttons
  state.priority = card?.priority || 'medium';
  document.querySelectorAll('.priority-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.priority === state.priority);
  });

  // Show interview date row if stage = interview
  toggleInterviewRow($('fStage').value);

  title.textContent    = card ? 'Edit Application' : 'Add Application';
  saveLabel.textContent = card ? 'Save Changes'    : 'Save Application';

  backdrop.classList.add('open');
  backdrop.setAttribute('aria-hidden', 'false');
  $('fCompany').focus();
}

function closeModal() {
  $('modalBackdrop').classList.remove('open');
  $('modalBackdrop').setAttribute('aria-hidden', 'true');
  state.editingId = null;
}

function saveCard() {
  const company  = $('fCompany').value.trim();
  const position = $('fPosition').value.trim();

  if (!company || !position) {
    showToast('Company and Position are required.', 'error');
    if (!company) $('fCompany').focus();
    else $('fPosition').focus();
    return;
  }

  const skillRaw = $('fSkills').value.trim();
  const skills   = skillRaw ? skillRaw.split(',').map(s => s.trim()).filter(Boolean) : [];

  // Infer logo
  const logoData = inferLogo(company);

  if (state.editingId) {
    // Edit existing
    const card = state.cards.find(c => c.id === state.editingId);
    if (card) {
      Object.assign(card, {
        company, position,
        stage:         $('fStage').value,
        workType:      $('fWorkType').value,
        dateApplied:   $('fDateApplied').value,
        deadline:      $('fDeadline').value,
        location:      $('fLocation').value.trim(),
        salary:        $('fSalary').value.trim(),
        matchScore:    parseInt($('fMatchScore').value) || 0,
        priority:      state.priority,
        contact:       $('fContact').value.trim(),
        skills,
        notes:         $('fNotes').value.trim(),
        interviewDate: $('fInterviewDate').value,
        logoText:      logoData.text,
        logoClass:     logoData.cls,
      });
      showToast(`Updated: ${company}`, 'success');
    }
  } else {
    // New card
    const newCard = {
      id:            'c' + Date.now(),
      company, position,
      stage:         $('fStage').value,
      workType:      $('fWorkType').value,
      dateApplied:   $('fDateApplied').value,
      deadline:      $('fDeadline').value,
      location:      $('fLocation').value.trim(),
      salary:        $('fSalary').value.trim(),
      matchScore:    parseInt($('fMatchScore').value) || 0,
      priority:      state.priority,
      contact:       $('fContact').value.trim(),
      skills,
      notes:         $('fNotes').value.trim(),
      interviewDate: $('fInterviewDate').value,
      logoText:      logoData.text,
      logoClass:     logoData.cls,
    };
    state.cards.unshift(newCard);
    showToast(`Added: ${company} — ${position}`, 'success');
  }

  saveState();
  closeModal();
  renderBoard();
  renderListView();
}

function inferLogo(company) {
  const c = company.toLowerCase();
  const map = {
    google: { text: 'G',  cls: 'logo-google'     },
    meta:   { text: 'M',  cls: 'logo-meta'        },
    microsoft: { text:'MS',cls:'logo-microsoft'   },
    stripe: { text: 'S',  cls: 'logo-stripe'      },
    amazon: { text: 'A',  cls: 'logo-amazon'      },
    apple:  { text: 'A',  cls: 'logo-apple'       },
    netflix:{ text: 'N',  cls: 'logo-netflix'     },
    salesforce:{text:'SF',cls:'logo-salesforce'   },
    figma:  { text: 'F',  cls: 'logo-figma'       },
    airbnb: { text: 'AB', cls: 'logo-airbnb'      },
    twitter:{ text: 'X',  cls: 'logo-twitter'     },
    slack:  { text: 'SL', cls: 'logo-slack'       },
  };
  for (const [key, val] of Object.entries(map)) {
    if (c.includes(key)) return val;
  }
  return { text: company.slice(0,2).toUpperCase(), cls: '' };
}

function toggleInterviewRow(stage) {
  const row = $('interviewDateRow');
  if (row) row.style.display = stage === 'interview' ? '' : 'none';
}

/* ─────────────────────────────────────────────────────
   14. DETAIL DRAWER
   ───────────────────────────────────────────────────── */
function openDrawer(cardId) {
  const card = state.cards.find(c => c.id === cardId);
  if (!card) return;

  state.drawerCardId = cardId;
  const col = COLUMNS.find(c => c.id === card.stage);

  $('drawerTitle').textContent = `${card.company} · ${card.position}`;

  // Stage progress bar
  const stageOrder = ['saved','applied','interview','offer','rejected'];
  const stageIndex = stageOrder.indexOf(card.stage);
  const stagesHtml = COLUMNS.map((c, i) => {
    let cls = 'pending';
    if (card.stage === 'rejected' && c.id !== 'rejected') cls = 'done';
    else if (i < stageIndex) cls = 'done';
    else if (i === stageIndex) cls = 'active';
    return `
      <div class="drawer-stage-step ${cls}">
        <div class="stage-dot ${cls}">${cls === 'done' ? '✓' : i + 1}</div>
        <span class="stage-label">${c.label}</span>
      </div>
    `;
  }).join('');

  // Skills
  const skillsHtml = (card.skills||[]).map(s => `<span class="skill-chip">${esc(s)}</span>`).join('');

  $('drawerBody').innerHTML = `
    <div class="drawer-company-hero">
      <div class="drawer-logo" style="background:${logoStyle(card.logoClass)}">${card.logoText}</div>
      <div class="drawer-company-text">
        <p class="drawer-company-name">${esc(card.company)}</p>
        <p class="drawer-position">${esc(card.position)}</p>
      </div>
    </div>

    <div class="drawer-stage-bar" aria-label="Application stage">${stagesHtml}</div>

    <div class="drawer-section">
      <p class="drawer-section-title">Details</p>
      ${detailRow('map-pin',   'Location',      card.location  || '—')}
      ${detailRow('briefcase', 'Work Type',     cap(card.workType) || '—')}
      ${detailRow('calendar',  'Date Applied',  card.dateApplied  ? fmtDate(card.dateApplied)  : '—')}
      ${detailRow('clock',     'Deadline',      card.deadline     ? fmtDate(card.deadline)     : '—')}
      ${detailRow('dollar-sign','Salary',       card.salary    || '—')}
      ${detailRow('zap',       'Match Score',   card.matchScore ? card.matchScore + '%' : '—')}
      ${detailRow('flag',      'Priority',      cap(card.priority) || '—')}
      ${card.interviewDate ? detailRow('video', 'Interview', fmtDateTime(card.interviewDate)) : ''}
      ${card.contact ? detailRow('user', 'Contact', card.contact) : ''}
    </div>

    ${skillsHtml ? `
    <div class="drawer-section">
      <p class="drawer-section-title">Required Skills</p>
      <div class="drawer-skills-row">${skillsHtml}</div>
    </div>` : ''}

    <div class="drawer-section">
      <p class="drawer-section-title">Notes</p>
      <div class="drawer-notes-body">${esc(card.notes || 'No notes yet.')}</div>
    </div>
  `;

  // Wire drawer buttons
  $('drawerEditBtn').onclick   = () => { closeDrawer(); openModal(cardId); };
  $('drawerDeleteBtn').onclick = () => confirmDelete(cardId);

  $('detailDrawer').classList.add('open');
  $('detailDrawer').setAttribute('aria-hidden', 'false');
  $('drawerOverlay').classList.add('open');
  $('drawerOverlay').setAttribute('aria-hidden', 'false');

  lucide.createIcons();
}

function closeDrawer() {
  $('detailDrawer').classList.remove('open');
  $('detailDrawer').setAttribute('aria-hidden', 'true');
  $('drawerOverlay').classList.remove('open');
  $('drawerOverlay').setAttribute('aria-hidden', 'true');
  state.drawerCardId = null;
}

function detailRow(icon, key, val) {
  return `
    <div class="detail-row">
      <span class="detail-row-icon"><i data-lucide="${icon}"></i></span>
      <div>
        <p class="detail-key">${key}</p>
        <p class="detail-val">${esc(String(val))}</p>
      </div>
    </div>
  `;
}

/* ─────────────────────────────────────────────────────
   15. DELETE CONFIRM
   ───────────────────────────────────────────────────── */
function confirmDelete(cardId) {
  const card = state.cards.find(c => c.id === cardId);
  if (!card) return;
  state.pendingDeleteId = cardId;
  $('confirmDesc').textContent = `Delete "${card.position}" at ${card.company}? This cannot be undone.`;
  $('confirmBackdrop').classList.add('open');
  $('confirmBackdrop').setAttribute('aria-hidden', 'false');
}

function executeDelete() {
  const cardId = state.pendingDeleteId;
  if (!cardId) return;
  const card = state.cards.find(c => c.id === cardId);
  state.cards = state.cards.filter(c => c.id !== cardId);
  saveState();
  closeConfirm();
  closeDrawer();
  renderBoard();
  renderListView();
  showToast(`Deleted: ${card?.company || 'card'}`, 'warning');
  state.pendingDeleteId = null;
}

function closeConfirm() {
  $('confirmBackdrop').classList.remove('open');
  $('confirmBackdrop').setAttribute('aria-hidden', 'true');
}

/* ─────────────────────────────────────────────────────
   16. APPLY LOGO COLOURS
   ───────────────────────────────────────────────────── */
function applyLogos() {
  document.querySelectorAll('.company-avatar[class]').forEach(el => {
    const cls = [...el.classList].find(c => c.startsWith('logo-'));
    if (cls && LOGO_STYLE[cls]) el.style.background = LOGO_STYLE[cls];
    else if (!el.style.background) {
      const colors = ['#4F46E5','#06B6D4','#10B981','#F59E0B','#8B5CF6','#F43F5E'];
      const idx = el.textContent.charCodeAt(0) % colors.length;
      el.style.background = colors[idx];
    }
  });
}

/* ─────────────────────────────────────────────────────
   17. BIND GLOBAL EVENTS
   ───────────────────────────────────────────────────── */
function bindEvents() {

  // Add card button
  $('addCardBtn')?.addEventListener('click', () => openModal(null));

  // Modal save / cancel / close
  $('modalSaveBtn')?.addEventListener('click', saveCard);
  $('modalCancelBtn')?.addEventListener('click', closeModal);
  $('modalCloseBtn')?.addEventListener('click', closeModal);
  $('modalBackdrop')?.addEventListener('click', e => { if (e.target === $('modalBackdrop')) closeModal(); });

  // Stage change in modal → show/hide interview date
  $('fStage')?.addEventListener('change', () => toggleInterviewRow($('fStage').value));

  // Priority buttons
  document.querySelectorAll('.priority-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.priority = btn.dataset.priority;
      document.querySelectorAll('.priority-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Drawer close
  $('drawerCloseBtn')?.addEventListener('click', closeDrawer);
  $('drawerOverlay')?.addEventListener('click', closeDrawer);

  // Confirm delete
  $('confirmDeleteBtn')?.addEventListener('click', executeDelete);
  $('confirmCancelBtn')?.addEventListener('click', closeConfirm);
  $('confirmBackdrop')?.addEventListener('click', e => { if (e.target === $('confirmBackdrop')) closeConfirm(); });

  // Toast close
  $('toastClose')?.addEventListener('click', () => $('toast').classList.remove('show'));

  // Search
  let searchTimer;
  $('boardSearchInput')?.addEventListener('input', e => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      state.search = e.target.value.trim();
      renderBoard();
      renderListView();
    }, 220);
  });

  // Stage filter select
  $('filterStageSelect')?.addEventListener('change', e => {
    state.stageFilter = e.target.value;
    renderBoard();
    renderListView();
  });

  // Sort
  $('sortSelect')?.addEventListener('change', e => {
    state.sortBy = e.target.value;
    renderBoard();
    renderListView();
  });

  // View toggle
  $('kanbanViewBtn')?.addEventListener('click', () => {
    state.viewMode = 'kanban';
    $('kanbanViewBtn').classList.add('active');
    $('listViewBtn').classList.remove('active');
    $('boardWrapper').hidden   = false;
    $('listViewWrapper').hidden = true;
    renderBoard();
  });
  $('listViewBtn')?.addEventListener('click', () => {
    state.viewMode = 'list';
    $('listViewBtn').classList.add('active');
    $('kanbanViewBtn').classList.remove('active');
    $('boardWrapper').hidden   = true;
    $('listViewWrapper').hidden = false;
    renderListView();
  });

  // Sidebar collapse
  $('sidebarPinBtn')?.addEventListener('click', () => {
    $('sidebar')?.classList.toggle('collapsed');
  });

  // Keyboard: Escape closes modal/drawer/confirm
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if ($('confirmBackdrop').classList.contains('open')) { closeConfirm(); return; }
      if ($('modalBackdrop').classList.contains('open'))   { closeModal();   return; }
      if ($('detailDrawer').classList.contains('open'))    { closeDrawer();  return; }
    }
    // Ctrl/Cmd + N = new card
    if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
      e.preventDefault();
      openModal(null);
    }
  });
}

/* ─────────────────────────────────────────────────────
   18. TOAST
   ───────────────────────────────────────────────────── */
let toastTimer;
function showToast(msg, type = 'success') {
  const toast     = $('toast');
  const toastMsg  = $('toastMsg');
  const iconWrap  = $('toastIconWrap');
  if (!toast) return;

  const icons = { success: 'check-circle', info: 'info', warning: 'alert-triangle', error: 'alert-circle' };
  iconWrap.innerHTML = `<i data-lucide="${icons[type] || 'check-circle'}"></i>`;
  toast.className    = `toast show toast-${type}`;
  toastMsg.textContent = msg;

  lucide.createIcons();

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
}

/* ─────────────────────────────────────────────────────
   19. UTILITIES
   ───────────────────────────────────────────────────── */
function esc(str) {
  return String(str)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;')
    .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
function cap(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}
function fmtDate(iso) {
  if (!iso) return '—';
  try {
    return new Date(iso + 'T00:00:00').toLocaleDateString('en-US',{ month:'short', day:'numeric', year:'numeric' });
  } catch (_) { return iso; }
}
function fmtDateTime(iso) {
  if (!iso) return '—';
  try {
    return new Date(iso).toLocaleDateString('en-US',{ month:'short', day:'numeric', hour:'2-digit', minute:'2-digit' });
  } catch (_) { return iso; }
}
function daysUntil(isoDate) {
  const now   = new Date(); now.setHours(0,0,0,0);
  const target = new Date(isoDate + 'T00:00:00');
  return Math.round((target - now) / 86400000);
}

/* ─────────────────────────────────────────────────────
   20. INIT
   ───────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
  loadState();
  renderBoard();
  bindEvents();
});
