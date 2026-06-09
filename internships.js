/* ═══════════════════════════════════════════════════════════════════
   InternLink — Internship Search Page
   Full interactive search, filter, sort, pagination & card rendering
   ═══════════════════════════════════════════════════════════════════ */

'use strict';

/* ═══════════════════════════════════════════════════
   1. DATA — 24 internship listings
   ═══════════════════════════════════════════════════ */
const ALL_LISTINGS = [
  {
    id: 1,
    company: 'Google',
    logoClass: 'logo-google',
    logoText: 'G',
    position: 'Software Engineering Intern',
    location: 'Mountain View, CA',
    workType: 'hybrid',
    field: 'software-engineering',
    salary: 9000,
    salaryLabel: '$9,000 / mo',
    skills: ['Python', 'Go', 'Distributed Systems', 'Algorithms'],
    matchedSkills: ['Python', 'Algorithms'],
    matchScore: 94,
    tags: ['new', 'earlyapp'],
    deadline: 'Jul 12, 2026',
    daysPosted: 1,
    applied: false,
    saved: false,
  },
  {
    id: 2,
    company: 'Meta',
    logoClass: 'logo-meta',
    logoText: 'M',
    position: 'Front-End Engineer Intern',
    location: 'Menlo Park, CA',
    workType: 'onsite',
    field: 'software-engineering',
    salary: 8500,
    salaryLabel: '$8,500 / mo',
    skills: ['React', 'TypeScript', 'GraphQL', 'CSS'],
    matchedSkills: ['React', 'TypeScript'],
    matchScore: 88,
    tags: ['earlyapp'],
    deadline: 'Jul 20, 2026',
    daysPosted: 3,
    applied: false,
    saved: false,
  },
  {
    id: 3,
    company: 'Stripe',
    logoClass: 'logo-stripe',
    logoText: 'S',
    position: 'Backend Engineer Intern',
    location: 'Seattle, WA',
    workType: 'hybrid',
    field: 'software-engineering',
    salary: 8000,
    salaryLabel: '$8,000 / mo',
    skills: ['Ruby', 'API Design', 'PostgreSQL', 'Docker'],
    matchedSkills: ['PostgreSQL', 'Docker'],
    matchScore: 82,
    tags: ['new'],
    deadline: 'Jun 30, 2026',
    daysPosted: 2,
    applied: false,
    saved: true,
  },
  {
    id: 4,
    company: 'Microsoft',
    logoClass: 'logo-microsoft',
    logoText: 'MS',
    position: 'Cloud Infrastructure Intern',
    location: 'Redmond, WA',
    workType: 'hybrid',
    field: 'devops',
    salary: 7800,
    salaryLabel: '$7,800 / mo',
    skills: ['Azure', 'Terraform', 'Kubernetes', 'CI/CD'],
    matchedSkills: ['Azure'],
    matchScore: 71,
    tags: ['sponsored'],
    deadline: 'Aug 1, 2026',
    daysPosted: 7,
    applied: false,
    saved: false,
  },
  {
    id: 5,
    company: 'Amazon',
    logoClass: 'logo-amazon',
    logoText: 'A',
    position: 'Data Science Intern',
    location: 'Austin, TX',
    workType: 'hybrid',
    field: 'data-science',
    salary: 8200,
    salaryLabel: '$8,200 / mo',
    skills: ['Python', 'SQL', 'Machine Learning', 'Spark'],
    matchedSkills: ['Python', 'SQL'],
    matchScore: 90,
    tags: ['new', 'earlyapp'],
    deadline: 'Jul 5, 2026',
    daysPosted: 1,
    applied: false,
    saved: false,
  },
  {
    id: 6,
    company: 'Netflix',
    logoClass: 'logo-netflix',
    logoText: 'N',
    position: 'UX Research Intern',
    location: 'Remote',
    workType: 'remote',
    field: 'product-design',
    salary: 7000,
    salaryLabel: '$7,000 / mo',
    skills: ['User Research', 'Figma', 'Usability Testing', 'Survey Design'],
    matchedSkills: ['Figma', 'User Research'],
    matchScore: 86,
    tags: ['new'],
    deadline: 'Jul 15, 2026',
    daysPosted: 2,
    applied: false,
    saved: false,
  },
  {
    id: 7,
    company: 'Airbnb',
    logoClass: 'logo-airbnb',
    logoText: 'AB',
    position: 'Product Design Intern',
    location: 'San Francisco, CA',
    workType: 'hybrid',
    field: 'product-design',
    salary: 7500,
    salaryLabel: '$7,500 / mo',
    skills: ['Figma', 'Prototyping', 'Design Systems', 'User Testing'],
    matchedSkills: ['Figma', 'Prototyping'],
    matchScore: 91,
    tags: ['earlyapp'],
    deadline: 'Jun 28, 2026',
    daysPosted: 5,
    applied: true,
    saved: false,
  },
  {
    id: 8,
    company: 'Salesforce',
    logoClass: 'logo-salesforce',
    logoText: 'SF',
    position: 'Product Manager Intern',
    location: 'San Francisco, CA',
    workType: 'hybrid',
    field: 'product-management',
    salary: 7200,
    salaryLabel: '$7,200 / mo',
    skills: ['Market Research', 'Roadmap Planning', 'SQL', 'Agile'],
    matchedSkills: ['SQL', 'Agile'],
    matchScore: 74,
    tags: ['sponsored'],
    deadline: 'Aug 10, 2026',
    daysPosted: 10,
    applied: false,
    saved: false,
  },
  {
    id: 9,
    company: 'Figma',
    logoClass: 'logo-figma',
    logoText: 'F',
    position: 'Design Engineering Intern',
    location: 'Remote',
    workType: 'remote',
    field: 'product-design',
    salary: 8000,
    salaryLabel: '$8,000 / mo',
    skills: ['React', 'CSS', 'Figma API', 'JavaScript'],
    matchedSkills: ['React', 'JavaScript'],
    matchScore: 89,
    tags: ['new', 'earlyapp'],
    deadline: 'Jul 1, 2026',
    daysPosted: 1,
    applied: false,
    saved: false,
  },
  {
    id: 10,
    company: 'Apple',
    logoClass: 'logo-apple',
    logoText: 'A',
    position: 'iOS Developer Intern',
    location: 'Cupertino, CA',
    workType: 'onsite',
    field: 'software-engineering',
    salary: 9200,
    salaryLabel: '$9,200 / mo',
    skills: ['Swift', 'UIKit', 'SwiftUI', 'Xcode'],
    matchedSkills: ['Swift'],
    matchScore: 68,
    tags: ['sponsored'],
    deadline: 'Jul 22, 2026',
    daysPosted: 8,
    applied: false,
    saved: false,
  },
  {
    id: 11,
    company: 'Slack',
    logoClass: 'logo-slack',
    logoText: 'SL',
    position: 'Growth Marketing Intern',
    location: 'New York, NY',
    workType: 'hybrid',
    field: 'marketing',
    salary: 5500,
    salaryLabel: '$5,500 / mo',
    skills: ['SEO', 'Content Strategy', 'A/B Testing', 'Analytics'],
    matchedSkills: ['A/B Testing', 'Analytics'],
    matchScore: 78,
    tags: ['new'],
    deadline: 'Aug 5, 2026',
    daysPosted: 3,
    applied: false,
    saved: false,
  },
  {
    id: 12,
    company: 'Twitter',
    logoClass: 'logo-twitter',
    logoText: 'X',
    position: 'ML Engineer Intern',
    location: 'Remote',
    workType: 'remote',
    field: 'data-science',
    salary: 8800,
    salaryLabel: '$8,800 / mo',
    skills: ['PyTorch', 'NLP', 'Python', 'MLOps'],
    matchedSkills: ['Python'],
    matchScore: 72,
    tags: ['new', 'earlyapp'],
    deadline: 'Jul 8, 2026',
    daysPosted: 2,
    applied: false,
    saved: true,
  },
  {
    id: 13,
    company: 'Google',
    logoClass: 'logo-google',
    logoText: 'G',
    position: 'Site Reliability Engineer Intern',
    location: 'New York, NY',
    workType: 'hybrid',
    field: 'devops',
    salary: 9000,
    salaryLabel: '$9,000 / mo',
    skills: ['Linux', 'Go', 'Monitoring', 'On-call'],
    matchedSkills: ['Linux'],
    matchScore: 65,
    tags: [],
    deadline: 'Aug 15, 2026',
    daysPosted: 12,
    applied: false,
    saved: false,
  },
  {
    id: 14,
    company: 'Microsoft',
    logoClass: 'logo-microsoft',
    logoText: 'MS',
    position: 'Cybersecurity Analyst Intern',
    location: 'Boston, MA',
    workType: 'hybrid',
    field: 'cybersecurity',
    salary: 7400,
    salaryLabel: '$7,400 / mo',
    skills: ['Network Security', 'SIEM', 'Python', 'Threat Analysis'],
    matchedSkills: ['Python'],
    matchScore: 69,
    tags: ['earlyapp'],
    deadline: 'Aug 20, 2026',
    daysPosted: 9,
    applied: false,
    saved: false,
  },
  {
    id: 15,
    company: 'Amazon',
    logoClass: 'logo-amazon',
    logoText: 'A',
    position: 'Operations Research Intern',
    location: 'Austin, TX',
    workType: 'onsite',
    field: 'data-science',
    salary: 7600,
    salaryLabel: '$7,600 / mo',
    skills: ['Operations Research', 'Python', 'SQL', 'Simulation Modeling'],
    matchedSkills: ['Python', 'SQL'],
    matchScore: 83,
    tags: [],
    deadline: 'Jul 30, 2026',
    daysPosted: 6,
    applied: false,
    saved: false,
  },
  {
    id: 16,
    company: 'Salesforce',
    logoClass: 'logo-salesforce',
    logoText: 'SF',
    position: 'Finance Operations Intern',
    location: 'Chicago, IL',
    workType: 'hybrid',
    field: 'finance',
    salary: 5800,
    salaryLabel: '$5,800 / mo',
    skills: ['Excel', 'Financial Modeling', 'SQL', 'PowerBI'],
    matchedSkills: ['SQL'],
    matchScore: 61,
    tags: ['sponsored'],
    deadline: 'Sep 1, 2026',
    daysPosted: 15,
    applied: false,
    saved: false,
  },
  {
    id: 17,
    company: 'Figma',
    logoClass: 'logo-figma',
    logoText: 'F',
    position: 'Brand Marketing Intern',
    location: 'Remote',
    workType: 'remote',
    field: 'marketing',
    salary: 5200,
    salaryLabel: '$5,200 / mo',
    skills: ['Content Writing', 'Brand Strategy', 'Social Media', 'Canva'],
    matchedSkills: [],
    matchScore: 55,
    tags: ['new'],
    deadline: 'Aug 12, 2026',
    daysPosted: 4,
    applied: false,
    saved: false,
  },
  {
    id: 18,
    company: 'Netflix',
    logoClass: 'logo-netflix',
    logoText: 'N',
    position: 'Product Analytics Intern',
    location: 'Remote',
    workType: 'remote',
    field: 'product-management',
    salary: 7800,
    salaryLabel: '$7,800 / mo',
    skills: ['SQL', 'Python', 'Looker', 'A/B Testing'],
    matchedSkills: ['SQL', 'Python'],
    matchScore: 87,
    tags: ['new', 'earlyapp'],
    deadline: 'Jul 14, 2026',
    daysPosted: 2,
    applied: false,
    saved: false,
  },
  {
    id: 19,
    company: 'Airbnb',
    logoClass: 'logo-airbnb',
    logoText: 'AB',
    position: 'Data Engineering Intern',
    location: 'San Francisco, CA',
    workType: 'hybrid',
    field: 'data-science',
    salary: 8400,
    salaryLabel: '$8,400 / mo',
    skills: ['Spark', 'dbt', 'Airflow', 'Python'],
    matchedSkills: ['Python'],
    matchScore: 76,
    tags: [],
    deadline: 'Aug 8, 2026',
    daysPosted: 11,
    applied: false,
    saved: false,
  },
  {
    id: 20,
    company: 'Stripe',
    logoClass: 'logo-stripe',
    logoText: 'S',
    position: 'Technical Recruiting Intern',
    location: 'New York, NY',
    workType: 'hybrid',
    field: 'marketing',
    salary: 5500,
    salaryLabel: '$5,500 / mo',
    skills: ['Talent Sourcing', 'Communication', 'Excel', 'Recruiting Tools'],
    matchedSkills: [],
    matchScore: 52,
    tags: ['new'],
    deadline: 'Aug 18, 2026',
    daysPosted: 3,
    applied: false,
    saved: false,
  },
  {
    id: 21,
    company: 'Apple',
    logoClass: 'logo-apple',
    logoText: 'A',
    position: 'Machine Learning Intern',
    location: 'Cupertino, CA',
    workType: 'onsite',
    field: 'data-science',
    salary: 9500,
    salaryLabel: '$9,500 / mo',
    skills: ['TensorFlow', 'Core ML', 'Python', 'Computer Vision'],
    matchedSkills: ['Python'],
    matchScore: 79,
    tags: ['earlyapp', 'sponsored'],
    deadline: 'Jul 25, 2026',
    daysPosted: 7,
    applied: false,
    saved: false,
  },
  {
    id: 22,
    company: 'Meta',
    logoClass: 'logo-meta',
    logoText: 'M',
    position: 'VR/AR Research Intern',
    location: 'Seattle, WA',
    workType: 'hybrid',
    field: 'software-engineering',
    salary: 8800,
    salaryLabel: '$8,800 / mo',
    skills: ['C++', '3D Graphics', 'Unity', 'Computer Vision'],
    matchedSkills: [],
    matchScore: 62,
    tags: [],
    deadline: 'Aug 22, 2026',
    daysPosted: 13,
    applied: false,
    saved: false,
  },
  {
    id: 23,
    company: 'Slack',
    logoClass: 'logo-slack',
    logoText: 'SL',
    position: 'Security Engineering Intern',
    location: 'Boston, MA',
    workType: 'hybrid',
    field: 'cybersecurity',
    salary: 7000,
    salaryLabel: '$7,000 / mo',
    skills: ['Application Security', 'Python', 'OWASP', 'Pen Testing'],
    matchedSkills: ['Python'],
    matchScore: 74,
    tags: ['new'],
    deadline: 'Aug 1, 2026',
    daysPosted: 5,
    applied: false,
    saved: false,
  },
  {
    id: 24,
    company: 'Twitter',
    logoClass: 'logo-twitter',
    logoText: 'X',
    position: 'Product Design Intern',
    location: 'Remote',
    workType: 'remote',
    field: 'product-design',
    salary: 7200,
    salaryLabel: '$7,200 / mo',
    skills: ['Figma', 'Motion Design', 'Design Tokens', 'Accessibility'],
    matchedSkills: ['Figma'],
    matchScore: 84,
    tags: ['new', 'earlyapp'],
    deadline: 'Jul 18, 2026',
    daysPosted: 2,
    applied: false,
    saved: false,
  },
];

/* ═══════════════════════════════════════════════════
   2. STATE
   ═══════════════════════════════════════════════════ */
const state = {
  listings: JSON.parse(JSON.stringify(ALL_LISTINGS)), // mutable copy
  filtered: [],
  currentPage: 1,
  perPage: 12,
  sortBy: 'relevance',
  viewMode: 'grid',       // 'grid' | 'list'
  filters: {
    search: '',
    location: '',
    tech: [],
    worktype: 'any',
    company: [],
    salaryMin: 1000,
    salaryMax: 10000,
    paidOnly: false,
    exp: ['no-exp'],
    duration: [],
    quickPills: [],
  },
};

/* ═══════════════════════════════════════════════════
   3. DOM REFERENCES
   ═══════════════════════════════════════════════════ */
const dom = {
  cardsGrid:        document.getElementById('cardsGrid'),
  emptyState:       document.getElementById('emptyState'),
  paginationNav:    document.getElementById('paginationNav'),
  pageNumbers:      document.getElementById('pageNumbers'),
  prevBtn:          document.getElementById('prevBtn'),
  nextBtn:          document.getElementById('nextBtn'),
  resultCount:      document.getElementById('resultCount'),
  resultsShowing:   document.getElementById('resultsShowing'),
  totalResults:     document.getElementById('totalResults'),
  sortSelect:       document.getElementById('sortSelect'),
  activeFilters:    document.getElementById('activeFilters'),
  filterPanel:      document.getElementById('filterPanel'),
  filterOverlay:    document.getElementById('filterOverlay'),
  mobileFilterBtn:  document.getElementById('mobileFilterBtn'),
  clearAllFilters:  document.getElementById('clearAllFilters'),
  heroSearchInput:  document.getElementById('heroSearchInput'),
  heroSearchBtn:    document.getElementById('heroSearchBtn'),
  globalSearchInput:document.getElementById('globalSearchInput'),
  locationInput:    document.getElementById('locationSearchInput'),
  gridViewBtn:      document.getElementById('gridViewBtn'),
  listViewBtn:      document.getElementById('listViewBtn'),
  salaryMinRange:   document.getElementById('salaryMin'),
  salaryMaxRange:   document.getElementById('salaryMax'),
  salaryMinLabel:   document.getElementById('salaryMinLabel'),
  salaryMaxLabel:   document.getElementById('salaryMaxLabel'),
  paidOnlyToggle:   document.getElementById('paidOnlyToggle'),
  toast:            document.getElementById('toast'),
  toastMessage:     document.getElementById('toastMessage'),
};

/* ═══════════════════════════════════════════════════
   4. FILTER + SORT LOGIC
   ═══════════════════════════════════════════════════ */
function applyFilters() {
  const f = state.filters;
  let results = state.listings.filter(item => {

    // keyword search (position, company, skills)
    if (f.search) {
      const q = f.search.toLowerCase();
      const hay = `${item.position} ${item.company} ${item.skills.join(' ')}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }

    // location search (text input)
    if (f.location) {
      const q = f.location.toLowerCase();
      if (!item.location.toLowerCase().includes(q)) return false;
    }

    // tech checkboxes
    if (f.tech.length > 0 && !f.tech.includes(item.field)) return false;

    // work type
    if (f.worktype !== 'any' && item.workType !== f.worktype) return false;

    // company checkboxes
    if (f.company.length > 0 && !f.company.includes(item.company.toLowerCase())) return false;

    // salary range
    if (f.paidOnly && item.salary === 0) return false;
    if (item.salary > 0 && (item.salary < f.salaryMin || item.salary > f.salaryMax)) return false;

    // quick pills
    if (f.quickPills.includes('remote') && item.workType !== 'remote') return false;
    if (f.quickPills.includes('paid') && item.salary === 0) return false;
    if (f.quickPills.includes('no-exp') && !item.matchScore) return false;
    if (f.quickPills.includes('new') && item.daysPosted > 2) return false;

    return true;
  });

  // Sort
  results = sortListings(results, state.sortBy);

  state.filtered = results;
  state.currentPage = 1;
  updateUI();
}

function sortListings(list, mode) {
  const copy = [...list];
  switch (mode) {
    case 'recent':      return copy.sort((a, b) => a.daysPosted - b.daysPosted);
    case 'salary-high': return copy.sort((a, b) => b.salary - a.salary);
    case 'salary-low':  return copy.sort((a, b) => a.salary - b.salary);
    case 'match-score': return copy.sort((a, b) => b.matchScore - a.matchScore);
    case 'deadline':    return copy.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
    case 'relevance':
    default:            return copy.sort((a, b) => b.matchScore - a.matchScore);
  }
}

/* ═══════════════════════════════════════════════════
   5. UI RENDERING
   ═══════════════════════════════════════════════════ */
function updateUI() {
  renderCards();
  renderPagination();
  renderActiveFilters();
  updateCounts();
}

function renderCards() {
  const { currentPage, perPage, filtered } = state;
  const start  = (currentPage - 1) * perPage;
  const end    = Math.min(start + perPage, filtered.length);
  const page   = filtered.slice(start, end);

  // Empty state
  if (filtered.length === 0) {
    dom.cardsGrid.innerHTML = '';
    dom.emptyState.hidden = false;
    dom.paginationNav.hidden = true;
    return;
  }

  dom.emptyState.hidden = true;
  dom.paginationNav.hidden = false;

  // Build cards HTML
  dom.cardsGrid.innerHTML = page.map((item, i) => buildCard(item, i)).join('');

  // Apply view mode class
  dom.cardsGrid.className = `cards-grid${state.viewMode === 'list' ? ' list-view' : ''}`;

  // Re-init Lucide icons for dynamic content
  if (typeof lucide !== 'undefined') lucide.createIcons();

  // Attach card-level events
  attachCardEvents();
}

function buildCard(item, animIndex) {
  const matchClass = item.matchScore >= 85 ? 'high' : item.matchScore >= 70 ? 'mid' : 'low';
  const matchData  = item.matchScore >= 85 ? 'high' : item.matchScore >= 70 ? 'mid' : 'low';

  // Skills — show max 3, indicate matched
  const skillsHtml = item.skills.slice(0, 3).map(sk => {
    const isMatched = item.matchedSkills.includes(sk);
    return `<span class="skill-chip${isMatched ? ' matched' : ''}">${sk}</span>`;
  }).join('');
  const moreSkills = item.skills.length > 3
    ? `<span class="skill-more">+${item.skills.length - 3} more</span>`
    : '';

  // Tags
  const tagsHtml = item.tags.map(t => {
    const labels = { new: '🆕 New', deadline: '⏰ Closing soon', sponsored: '⭐ Sponsored', earlyapp: '🚀 Early App' };
    return `<span class="tag tag-${t}">${labels[t] || t}</span>`;
  }).join('');

  // Work type badge
  const workLabels = { remote: '🌐 Remote', hybrid: '🏢 Hybrid', onsite: '📍 On-site' };
  const workBadge  = `<span class="work-badge ${item.workType}">${workLabels[item.workType]}</span>`;

  const applyLabel = item.applied ? '✓ Applied' : 'Apply Now';
  const applyExtra = item.applied ? ' applied' : '';

  const savedIcon  = item.saved ? 'bookmark' : 'bookmark';
  const savedClass = item.saved ? ' saved' : '';

  return `
    <div class="intern-card"
      data-id="${item.id}"
      data-match="${matchData}"
      role="listitem"
      tabindex="0"
      aria-label="${item.position} at ${item.company}"
      style="animation-delay: ${animIndex * 40}ms"
    >
      <!-- Save button -->
      <button class="card-save-btn${savedClass}" data-id="${item.id}" aria-label="${item.saved ? 'Remove from saved' : 'Save internship'}">
        <i data-lucide="${item.saved ? 'bookmark' : 'bookmark'}"></i>
      </button>

      <!-- Top: logo + info -->
      <div class="card-top">
        <div class="company-logo ${item.logoClass}" aria-hidden="true">${item.logoText}</div>
        <div class="card-company-info">
          <h3 class="card-position">${item.position}</h3>
          <p class="card-company-name">${item.company}</p>
        </div>
      </div>

      <!-- Meta: location + work type -->
      <div class="card-meta">
        <span class="meta-item">
          <i data-lucide="map-pin"></i>
          ${item.location}
        </span>
        ${workBadge}
        <span class="meta-item">
          <i data-lucide="calendar"></i>
          ${item.deadline}
        </span>
      </div>

      <!-- Skills -->
      <div class="card-skills" aria-label="Required skills">
        ${skillsHtml}${moreSkills}
      </div>

      <!-- Footer: match + salary + apply -->
      <div class="card-bottom">
        <div class="match-score-wrapper">
          <span class="match-label">Match score</span>
          <div class="match-row">
            <span class="match-pct ${matchClass}">${item.matchScore}%</span>
            <div class="match-bar" role="progressbar" aria-valuenow="${item.matchScore}" aria-valuemin="0" aria-valuemax="100">
              <div class="match-fill ${matchClass}" style="width:${item.matchScore}%"></div>
            </div>
          </div>
        </div>

        ${item.salary > 0 ? `
        <span class="salary-chip">
          <i data-lucide="dollar-sign"></i>${item.salaryLabel}
        </span>` : ''}

        <button class="apply-btn${applyExtra}" data-id="${item.id}" aria-label="Apply to ${item.position} at ${item.company}">
          <i data-lucide="${item.applied ? 'check' : 'send'}"></i>
          ${applyLabel}
        </button>
      </div>

      <!-- Footer tags -->
      ${tagsHtml ? `<div class="card-footer-tags">${tagsHtml}</div>` : ''}
    </div>
  `;
}

function attachCardEvents() {
  // Apply buttons
  dom.cardsGrid.querySelectorAll('.apply-btn:not(.applied)').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const id = parseInt(btn.dataset.id);
      const item = state.listings.find(l => l.id === id);
      if (item && !item.applied) {
        item.applied = true;
        showToast(`Applied to ${item.position} at ${item.company}!`);
        renderCards();
      }
    });
  });

  // Save buttons
  dom.cardsGrid.querySelectorAll('.card-save-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const id = parseInt(btn.dataset.id);
      const item = state.listings.find(l => l.id === id);
      if (item) {
        item.saved = !item.saved;
        showToast(item.saved ? `Saved ${item.company} role` : `Removed from saved`);
        renderCards();
      }
    });
  });

  // Card keyboard support
  dom.cardsGrid.querySelectorAll('.intern-card').forEach(card => {
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        card.querySelector('.apply-btn')?.click();
      }
    });
  });
}

/* ── Pagination ────────────────────────────────────── */
function renderPagination() {
  const totalPages = Math.ceil(state.filtered.length / state.perPage);
  const current    = state.currentPage;

  dom.prevBtn.disabled = current === 1;
  dom.nextBtn.disabled = current === totalPages || totalPages === 0;

  // Build page number buttons
  const pages = getPaginationRange(current, totalPages);
  dom.pageNumbers.innerHTML = pages.map(p => {
    if (p === '...') return `<span class="page-ellipsis">…</span>`;
    return `
      <button class="page-num${p === current ? ' active' : ''}"
        data-page="${p}"
        aria-label="Page ${p}"
        ${p === current ? 'aria-current="page"' : ''}>
        ${p}
      </button>
    `;
  }).join('');

  dom.pageNumbers.querySelectorAll('.page-num').forEach(btn => {
    btn.addEventListener('click', () => {
      state.currentPage = parseInt(btn.dataset.page);
      renderCards();
      renderPagination();
      updateCounts();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
}

function getPaginationRange(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 4) return [1, 2, 3, 4, 5, '...', total];
  if (current >= total - 3) return [1, '...', total - 4, total - 3, total - 2, total - 1, total];
  return [1, '...', current - 1, current, current + 1, '...', total];
}

/* ── Counts ────────────────────────────────────────── */
function updateCounts() {
  const total = state.filtered.length;
  const start = total === 0 ? 0 : (state.currentPage - 1) * state.perPage + 1;
  const end   = Math.min(state.currentPage * state.perPage, total);

  if (dom.resultCount)    dom.resultCount.textContent   = total;
  if (dom.resultsShowing) dom.resultsShowing.textContent = `${start}–${end}`;
  if (dom.totalResults)   dom.totalResults.textContent  = total;
}

/* ── Active filter tags ────────────────────────────── */
function renderActiveFilters() {
  const f = state.filters;
  const tags = [];

  if (f.search)                             tags.push({ label: `"${f.search}"`, key: 'search' });
  if (f.location)                           tags.push({ label: `📍 ${f.location}`, key: 'location' });
  if (f.worktype !== 'any')                 tags.push({ label: `🖥 ${f.worktype}`, key: 'worktype' });
  if (f.paidOnly)                           tags.push({ label: '💰 Paid only', key: 'paidOnly' });
  f.tech.forEach(v =>                       tags.push({ label: formatFieldLabel(v), key: `tech:${v}` }));
  f.company.forEach(v =>                    tags.push({ label: `🏢 ${capitalize(v)}`, key: `company:${v}` }));
  f.quickPills.forEach(v =>                 tags.push({ label: pillLabel(v), key: `pill:${v}` }));

  dom.activeFilters.innerHTML = tags.map(t => `
    <span class="filter-tag" data-key="${t.key}">
      ${t.label}
      <button aria-label="Remove filter ${t.label}">
        <i data-lucide="x"></i>
      </button>
    </span>
  `).join('');

  if (typeof lucide !== 'undefined') lucide.createIcons();

  dom.activeFilters.querySelectorAll('.filter-tag button').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.closest('.filter-tag').dataset.key;
      removeFilter(key);
    });
  });
}

function removeFilter(key) {
  const f = state.filters;
  if (key === 'search')     { f.search = '';    if (dom.heroSearchInput)  dom.heroSearchInput.value  = ''; if (dom.globalSearchInput) dom.globalSearchInput.value = ''; }
  if (key === 'location')   { f.location = '';  if (dom.locationInput)   dom.locationInput.value   = ''; }
  if (key === 'worktype')   { f.worktype = 'any'; document.querySelector('input[name="worktype"][value="any"]').checked = true; }
  if (key === 'paidOnly')   { f.paidOnly = false; if (dom.paidOnlyToggle) dom.paidOnlyToggle.checked = false; }
  if (key.startsWith('tech:'))    { const v = key.split(':')[1]; f.tech    = f.tech.filter(x => x !== v);    document.querySelector(`input[name="tech"][value="${v}"]`)?.removeAttribute('checked'); document.querySelector(`input[name="tech"][value="${v}"]`)&&(document.querySelector(`input[name="tech"][value="${v}"]`).checked = false); }
  if (key.startsWith('company:')) { const v = key.split(':')[1]; f.company = f.company.filter(x => x !== v); document.querySelector(`input[name="company"][value="${v}"]`)&&(document.querySelector(`input[name="company"][value="${v}"]`).checked = false); }
  if (key.startsWith('pill:'))    { const v = key.split(':')[1]; f.quickPills = f.quickPills.filter(x => x !== v); document.querySelector(`.pill[data-filter="${v}"]`)?.classList.remove('pill-active'); }
  applyFilters();
}

/* ═══════════════════════════════════════════════════
   6. EVENT LISTENERS
   ═══════════════════════════════════════════════════ */
function bindEvents() {

  /* Search inputs */
  let searchTimer;
  const handleSearch = () => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      state.filters.search = dom.heroSearchInput.value.trim();
      if (dom.globalSearchInput) dom.globalSearchInput.value = state.filters.search;
      applyFilters();
    }, 280);
  };
  dom.heroSearchInput?.addEventListener('input', handleSearch);
  dom.heroSearchBtn?.addEventListener('click', handleSearch);
  dom.heroSearchInput?.addEventListener('keydown', e => { if (e.key === 'Enter') handleSearch(); });

  dom.globalSearchInput?.addEventListener('input', () => {
    state.filters.search = dom.globalSearchInput.value.trim();
    if (dom.heroSearchInput) dom.heroSearchInput.value = state.filters.search;
    clearTimeout(searchTimer);
    searchTimer = setTimeout(applyFilters, 280);
  });

  dom.locationInput?.addEventListener('input', () => {
    state.filters.location = dom.locationInput.value.trim();
    clearTimeout(searchTimer);
    searchTimer = setTimeout(applyFilters, 280);
  });

  /* Sort */
  dom.sortSelect?.addEventListener('change', () => {
    state.sortBy = dom.sortSelect.value;
    applyFilters();
  });

  /* View toggle */
  dom.gridViewBtn?.addEventListener('click', () => {
    state.viewMode = 'grid';
    dom.gridViewBtn.classList.add('active');
    dom.listViewBtn.classList.remove('active');
    renderCards();
  });
  dom.listViewBtn?.addEventListener('click', () => {
    state.viewMode = 'list';
    dom.listViewBtn.classList.add('active');
    dom.gridViewBtn.classList.remove('active');
    renderCards();
  });

  /* Prev / Next */
  dom.prevBtn?.addEventListener('click', () => {
    if (state.currentPage > 1) {
      state.currentPage--;
      renderCards();
      renderPagination();
      updateCounts();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
  dom.nextBtn?.addEventListener('click', () => {
    const totalPages = Math.ceil(state.filtered.length / state.perPage);
    if (state.currentPage < totalPages) {
      state.currentPage++;
      renderCards();
      renderPagination();
      updateCounts();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  /* Filter group accordions */
  document.querySelectorAll('.filter-group-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      const contentId = btn.getAttribute('aria-controls');
      const content   = document.getElementById(contentId);
      if (content) {
        btn.setAttribute('aria-expanded', !expanded);
        content.classList.toggle('collapsed', expanded);
      }
    });
  });

  /* Checkboxes: tech */
  document.querySelectorAll('input[name="tech"]').forEach(cb => {
    cb.addEventListener('change', () => {
      state.filters.tech = [...document.querySelectorAll('input[name="tech"]:checked')].map(x => x.value);
      applyFilters();
    });
  });

  /* Checkboxes: location */
  document.querySelectorAll('input[name="location"]').forEach(cb => {
    cb.addEventListener('change', () => {
      const checkedLocs = [...document.querySelectorAll('input[name="location"]:checked')].map(x => x.value);
      // map to city-name match
      const cityMap = {
        'san-francisco': 'San Francisco',
        'new-york': 'New York',
        'seattle': 'Seattle',
        'austin': 'Austin',
        'boston': 'Boston',
        'chicago': 'Chicago',
      };
      if (checkedLocs.length > 0) {
        state.filters.location = cityMap[checkedLocs[0]] || '';
      } else {
        state.filters.location = '';
      }
      applyFilters();
    });
  });

  /* Radio: work type */
  document.querySelectorAll('input[name="worktype"]').forEach(r => {
    r.addEventListener('change', () => {
      state.filters.worktype = r.value;
      applyFilters();
    });
  });

  /* Checkboxes: company */
  document.querySelectorAll('input[name="company"]').forEach(cb => {
    cb.addEventListener('change', () => {
      state.filters.company = [...document.querySelectorAll('input[name="company"]:checked')].map(x => x.value);
      applyFilters();
    });
  });

  /* Salary toggle */
  dom.paidOnlyToggle?.addEventListener('change', () => {
    state.filters.paidOnly = dom.paidOnlyToggle.checked;
    applyFilters();
  });

  /* Salary range sliders */
  dom.salaryMinRange?.addEventListener('input', () => {
    state.filters.salaryMin = parseInt(dom.salaryMinRange.value);
    dom.salaryMinLabel.textContent = `$${Number(dom.salaryMinRange.value).toLocaleString()}`;
    applyFilters();
  });
  dom.salaryMaxRange?.addEventListener('input', () => {
    state.filters.salaryMax = parseInt(dom.salaryMaxRange.value);
    dom.salaryMaxLabel.textContent = `$${Number(dom.salaryMaxRange.value).toLocaleString()}`;
    applyFilters();
  });

  /* Quick filter pills */
  document.querySelectorAll('.pill').forEach(pill => {
    pill.addEventListener('click', () => {
      const f = pill.dataset.filter;
      const active = pill.classList.toggle('pill-active');
      if (active) {
        if (!state.filters.quickPills.includes(f)) state.filters.quickPills.push(f);
      } else {
        state.filters.quickPills = state.filters.quickPills.filter(x => x !== f);
      }
      applyFilters();
    });
  });

  /* Clear all filters */
  dom.clearAllFilters?.addEventListener('click', resetAllFilters);
  document.getElementById('resetEmptyBtn')?.addEventListener('click', resetAllFilters);

  /* Mobile filter drawer */
  dom.mobileFilterBtn?.addEventListener('click', () => {
    dom.filterPanel.classList.add('drawer-open');
    dom.filterOverlay.classList.add('visible');
    document.body.style.overflow = 'hidden';
  });
  dom.filterOverlay?.addEventListener('click', closeFilterDrawer);

  /* Keyboard shortcut ⌘K / Ctrl+K */
  document.addEventListener('keydown', e => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      dom.heroSearchInput?.focus();
    }
  });
}

function closeFilterDrawer() {
  dom.filterPanel.classList.remove('drawer-open');
  dom.filterOverlay.classList.remove('visible');
  document.body.style.overflow = '';
}

function resetAllFilters() {
  state.filters = {
    search: '',
    location: '',
    tech: [],
    worktype: 'any',
    company: [],
    salaryMin: 1000,
    salaryMax: 10000,
    paidOnly: false,
    exp: ['no-exp'],
    duration: [],
    quickPills: [],
  };

  // Reset DOM form elements
  document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
  document.querySelector('input[name="worktype"][value="any"]').checked = true;
  if (dom.heroSearchInput)   dom.heroSearchInput.value  = '';
  if (dom.globalSearchInput) dom.globalSearchInput.value = '';
  if (dom.locationInput)     dom.locationInput.value    = '';
  if (dom.paidOnlyToggle)    dom.paidOnlyToggle.checked = false;
  if (dom.salaryMinRange)    { dom.salaryMinRange.value = 1000;  dom.salaryMinLabel.textContent = '$1,000'; }
  if (dom.salaryMaxRange)    { dom.salaryMaxRange.value = 10000; dom.salaryMaxLabel.textContent = '$10,000'; }
  document.querySelectorAll('.pill').forEach(p => p.classList.remove('pill-active'));
  // Re-check default
  const noExpCb = document.querySelector('input[name="exp"][value="no-exp"]');
  if (noExpCb) noExpCb.checked = true;

  applyFilters();
}

/* ═══════════════════════════════════════════════════
   7. TOAST
   ═══════════════════════════════════════════════════ */
let toastTimer;
function showToast(msg) {
  dom.toastMessage.textContent = msg;
  dom.toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => dom.toast.classList.remove('show'), 2800);
}

/* ═══════════════════════════════════════════════════
   8. HELPERS
   ═══════════════════════════════════════════════════ */
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
function formatFieldLabel(val) {
  const map = {
    'software-engineering': '💻 Software Eng.',
    'data-science':         '📊 Data Science',
    'product-design':       '🎨 Product Design',
    'product-management':   '📋 Product Mgmt.',
    'marketing':            '📣 Marketing',
    'finance':              '💰 Finance',
    'cybersecurity':        '🔒 Cybersecurity',
    'devops':               '☁️ DevOps',
  };
  return map[val] || val;
}
function pillLabel(val) {
  const map = { remote: '🌐 Remote', 'no-exp': '🎓 No Exp.', paid: '💰 Paid', visa: '✈️ Visa', summer: '☀️ Summer', new: '🆕 New' };
  return map[val] || val;
}

/* ═══════════════════════════════════════════════════
   9. INIT
   ═══════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  // Init icons
  if (typeof lucide !== 'undefined') lucide.createIcons();

  // Initial render
  state.filtered = sortListings(state.listings, 'relevance');
  updateUI();
  bindEvents();
});
