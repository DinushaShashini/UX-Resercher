/* ═══════════════════════════════════════════════════════════════════
   InternLink — Skill Match Dashboard
   Full interactive analytics: radar chart, horizontal bar chart,
   circular progress ring, skills grid, courses, internships, roadmap
   ═══════════════════════════════════════════════════════════════════ */

'use strict';

/* ═══════════════════════════════════════════════════
   1. DATA MODEL — role-specific skill profiles
   ═══════════════════════════════════════════════════ */
const ROLE_DATA = {
  swe: {
    label: 'Software Engineer Intern',
    matchScore: 87,
    atsScore: 91,
    radarLabels: ['Algorithms', 'Frontend', 'Backend', 'Systems', 'DevOps', 'Testing'],
    userRadar:   [85, 90, 78, 65, 50, 70],
    roleRadar:   [90, 85, 85, 80, 75, 80],
    categories: {
      labels: ['Programming', 'Web Tech', 'Databases', 'CS Fundamentals', 'Tools & DevOps'],
      user:   [88, 82, 70, 78, 55],
    },
    keywords: [
      { name: 'Python',         pct: 95, color: '#10B981' },
      { name: 'React',          pct: 88, color: '#06B6D4' },
      { name: 'Algorithms',     pct: 82, color: '#10B981' },
      { name: 'REST APIs',      pct: 76, color: '#4F46E5' },
      { name: 'Docker',         pct: 30, color: '#F59E0B' },
      { name: 'Kubernetes',     pct: 15, color: '#EF4444' },
    ],
    matched: [
      { name: 'Python',      level: 'Expert',       icon: 'code-2' },
      { name: 'JavaScript',  level: 'Expert',       icon: 'code-2' },
      { name: 'React',       level: 'Intermediate', icon: 'layers' },
      { name: 'TypeScript',  level: 'Intermediate', icon: 'file-code' },
      { name: 'Node.js',     level: 'Intermediate', icon: 'server' },
      { name: 'SQL',         level: 'Intermediate', icon: 'database' },
      { name: 'Git',         level: 'Expert',       icon: 'git-branch' },
      { name: 'REST APIs',   level: 'Expert',       icon: 'cable' },
      { name: 'HTML / CSS',  level: 'Expert',       icon: 'layout' },
      { name: 'Jest',        level: 'Beginner',     icon: 'test-tube' },
      { name: 'PostgreSQL',  level: 'Intermediate', icon: 'database' },
      { name: 'Linux',       level: 'Intermediate', icon: 'terminal' },
      { name: 'Algorithms',  level: 'Expert',       icon: 'cpu' },
      { name: 'OOP',         level: 'Expert',       icon: 'box' },
      { name: 'GraphQL',     level: 'Beginner',     icon: 'share-2' },
      { name: 'Redis',       level: 'Beginner',     icon: 'database' },
      { name: 'AWS S3',      level: 'Beginner',     icon: 'cloud' },
      { name: 'Agile/Scrum', level: 'Intermediate', icon: 'repeat' },
    ],
    missing: [
      { name: 'Kubernetes',     reason: 'Required for container orchestration at scale',    impact: 'Critical', icon: 'package' },
      { name: 'Docker',         reason: 'Used in CI/CD pipelines and container deployment', impact: 'High',     icon: 'box' },
      { name: 'System Design',  reason: 'Tested in technical interviews at FAANG',          impact: 'High',     icon: 'layout-template' },
      { name: 'Go (Golang)',    reason: 'Used in backend microservices at target companies', impact: 'Medium',   icon: 'code' },
    ],
    suggestions: [
      {
        title: 'Add Kubernetes to your resume',
        desc: 'Even a basic K8s project would move this from "Missing" to "Matched" — adds up to 12% to your score.',
        icon: 'package', iconClass: 'icon-amber',
        effort: '~2 weeks', impact: 4,
      },
      {
        title: 'Containerize an existing project with Docker',
        desc: 'Wrap one of your GitHub projects in a Dockerfile and push it. Recruiters look for this in junior-level candidates.',
        icon: 'box', iconClass: 'icon-cyan',
        effort: '~3 days', impact: 4,
      },
      {
        title: 'Add a System Design note to your resume',
        desc: 'Document one past project\'s architecture in your resume bullets. Use terms like "microservices", "load balancing", and "caching".',
        icon: 'layout-template', iconClass: 'icon-indigo',
        effort: '~1 day', impact: 3,
      },
      {
        title: 'Strengthen your algorithm keywords',
        desc: 'Your LeetCode practice isn\'t reflected in resume language. Add "dynamic programming", "BFS/DFS", and "O(n log n) optimization".',
        icon: 'cpu', iconClass: 'icon-emerald',
        effort: '~1 hour', impact: 2,
      },
      {
        title: 'Quantify impact in your experience bullets',
        desc: 'Replace vague descriptions with measurable outcomes: "Reduced API latency by 40% using caching layer."',
        icon: 'trending-up', iconClass: 'icon-violet',
        effort: '~2 hours', impact: 3,
      },
      {
        title: 'Add a CI/CD pipeline to a GitHub project',
        desc: 'Set up GitHub Actions to auto-run tests and deploy. This single addition covers DevOps, testing, and automation keywords.',
        icon: 'git-branch', iconClass: 'icon-rose',
        effort: '~1 day', impact: 3,
      },
    ],
    courses: [
      {
        title: 'Docker & Kubernetes: The Complete Guide',
        platform: 'Udemy',
        platformClass: 'platform-udemy',
        platformShort: 'U',
        duration: '22h',
        rating: '4.8',
        price: '$14.99',
        type: 'paid',
        skill: 'Docker + Kubernetes',
        cert: true,
      },
      {
        title: 'System Design for Beginners',
        platform: 'YouTube',
        platformClass: 'platform-yt',
        platformShort: 'YT',
        duration: '4h',
        rating: '4.9',
        price: 'Free',
        type: 'free',
        skill: 'System Design',
        cert: false,
      },
      {
        title: 'Go Programming Language',
        platform: 'Coursera',
        platformClass: 'platform-coursera',
        platformShort: 'C',
        duration: '18h',
        rating: '4.6',
        price: 'Free Audit',
        type: 'free',
        skill: 'Go (Golang)',
        cert: true,
      },
      {
        title: 'Kubernetes for Absolute Beginners',
        platform: 'freeCodeCamp',
        platformClass: 'platform-freecode',
        platformShort: 'FC',
        duration: '3h',
        rating: '4.7',
        price: 'Free',
        type: 'free',
        skill: 'Kubernetes',
        cert: false,
      },
      {
        title: 'Advanced JavaScript Patterns',
        platform: 'LinkedIn Learning',
        platformClass: 'platform-linkedin',
        platformShort: 'LI',
        duration: '6h',
        rating: '4.5',
        price: '$29.99',
        type: 'cert',
        skill: 'JavaScript',
        cert: true,
      },
      {
        title: 'MIT OpenCourseWare: Algorithms',
        platform: 'MIT OCW',
        platformClass: 'platform-mit',
        platformShort: 'MIT',
        duration: '40h',
        rating: '4.9',
        price: 'Free',
        type: 'free',
        skill: 'Algorithms',
        cert: false,
      },
    ],
    internships: [
      { company: 'Google',    logoClass: 'logo-google',    logoText: 'G',  position: 'SWE Intern',              location: 'Mountain View, CA', workType: 'hybrid', matchPct: 94, matchColor: '#10B981' },
      { company: 'Stripe',    logoClass: 'logo-stripe',    logoText: 'S',  position: 'Backend Engineer Intern', location: 'Seattle, WA',       workType: 'hybrid', matchPct: 87, matchColor: '#06B6D4' },
      { company: 'Figma',     logoClass: 'logo-figma',     logoText: 'F',  position: 'Design Eng Intern',       location: 'Remote',            workType: 'remote', matchPct: 89, matchColor: '#06B6D4' },
      { company: 'Microsoft', logoClass: 'logo-microsoft', logoText: 'MS', position: 'SWE Intern',              location: 'Redmond, WA',       workType: 'hybrid', matchPct: 82, matchColor: '#4F46E5' },
    ],
    roadmap: [
      { week: 'Week 1–2', title: 'Complete Docker fundamentals',          sub: 'Containerize 2 existing projects',         status: 'done',    dotClass: 'rd-done'    },
      { week: 'Week 2–3', title: 'Build Kubernetes mini cluster',         sub: 'Deploy a Node.js app on local minikube',   status: 'active',  dotClass: 'rd-active'  },
      { week: 'Week 3–4', title: 'System Design study (Grokking)',        sub: 'Complete 10 design walkthroughs',          status: 'pending', dotClass: 'rd-pending' },
      { week: 'Week 4–5', title: 'Start Go programming course',          sub: 'Build a REST API in Go',                   status: 'pending', dotClass: 'rd-pending' },
      { week: 'Week 5–6', title: 'Add CI/CD to 3 GitHub repos',          sub: 'GitHub Actions: test → build → deploy',   status: 'pending', dotClass: 'rd-pending' },
      { week: 'Week 6',   title: 'Re-run Skill Match Analysis',          sub: 'Target score: 95%+',                       status: 'pending', dotClass: 'rd-pending' },
    ],
  },

  ds: {
    label: 'Data Science Intern',
    matchScore: 78,
    atsScore: 84,
    radarLabels: ['Python/R', 'ML/DL', 'Statistics', 'SQL', 'Visualization', 'Big Data'],
    userRadar:   [90, 65, 72, 80, 60, 40],
    roleRadar:   [95, 90, 85, 85, 80, 70],
    categories: {
      labels: ['Programming', 'Machine Learning', 'Statistics', 'Data Tools', 'Cloud/Big Data'],
      user:   [90, 65, 72, 68, 40],
    },
    keywords: [
      { name: 'Python',     pct: 92, color: '#10B981' },
      { name: 'SQL',        pct: 80, color: '#10B981' },
      { name: 'Pandas',     pct: 75, color: '#06B6D4' },
      { name: 'PyTorch',    pct: 45, color: '#F59E0B' },
      { name: 'Spark',      pct: 20, color: '#EF4444' },
      { name: 'Tableau',    pct: 25, color: '#F59E0B' },
    ],
    matched: [
      { name: 'Python',     level: 'Expert',       icon: 'code-2'   },
      { name: 'SQL',        level: 'Expert',       icon: 'database' },
      { name: 'Pandas',     level: 'Intermediate', icon: 'table'    },
      { name: 'NumPy',      level: 'Intermediate', icon: 'hash'     },
      { name: 'Scikit-learn',level:'Intermediate', icon: 'cpu'      },
      { name: 'Statistics', level: 'Intermediate', icon: 'bar-chart'},
      { name: 'Jupyter',    level: 'Expert',       icon: 'file-code'},
    ],
    missing: [
      { name: 'PyTorch / TensorFlow', reason: 'Deep learning required for most DS roles', impact: 'Critical', icon: 'cpu'         },
      { name: 'Apache Spark',         reason: 'Big data processing — common in DS pipelines', impact: 'High',  icon: 'zap'         },
      { name: 'Tableau / Power BI',   reason: 'Data visualization used by all analyst teams', impact: 'High',  icon: 'bar-chart-2' },
      { name: 'A/B Testing',          reason: 'Experimental design for product analytics',    impact: 'Medium', icon: 'test-tube'   },
    ],
    courses: [
      { title: 'Deep Learning Specialization', platform: 'Coursera', platformClass: 'platform-coursera', platformShort: 'C', duration: '80h', rating: '4.9', price: 'Free Audit', type: 'cert', skill: 'PyTorch', cert: true },
      { title: 'Tableau for Beginners', platform: 'Udemy', platformClass: 'platform-udemy', platformShort: 'U', duration: '8h', rating: '4.7', price: '$12.99', type: 'paid', skill: 'Tableau', cert: true },
      { title: 'Apache Spark with Python', platform: 'YouTube', platformClass: 'platform-yt', platformShort: 'YT', duration: '5h', rating: '4.6', price: 'Free', type: 'free', skill: 'Spark', cert: false },
      { title: 'A/B Testing & Experimentation', platform: 'Coursera', platformClass: 'platform-coursera', platformShort: 'C', duration: '12h', rating: '4.8', price: 'Free Audit', type: 'free', skill: 'A/B Testing', cert: true },
    ],
    internships: [
      { company: 'Amazon',  logoClass: 'logo-amazon',  logoText: 'A',  position: 'Data Science Intern', location: 'Austin, TX',  workType: 'hybrid', matchPct: 82, matchColor: '#10B981' },
      { company: 'Netflix', logoClass: 'logo-netflix', logoText: 'N',  position: 'Analytics Intern',    location: 'Remote',      workType: 'remote', matchPct: 79, matchColor: '#06B6D4' },
      { company: 'Twitter', logoClass: 'logo-twitter', logoText: 'X',  position: 'ML Intern',           location: 'Remote',      workType: 'remote', matchPct: 72, matchColor: '#4F46E5' },
    ],
    roadmap: [
      { week: 'Week 1–3', title: 'Complete Deep Learning Specialization', sub: 'Focus on CNNs and RNNs', status: 'active', dotClass: 'rd-active' },
      { week: 'Week 3–4', title: 'Build a PyTorch project',               sub: 'Image classifier on CIFAR-10', status: 'pending', dotClass: 'rd-pending' },
      { week: 'Week 4–5', title: 'Learn Spark basics',                    sub: 'Process a 1M row dataset', status: 'pending', dotClass: 'rd-pending' },
      { week: 'Week 5–6', title: 'Tableau portfolio chart',               sub: 'Publish to Tableau Public', status: 'pending', dotClass: 'rd-pending' },
    ],
  },
};

// Populate other roles with minimal data (re-use swe structure with different scores)
ROLE_DATA.pm = { ...ROLE_DATA.swe, label: 'Product Manager Intern', matchScore: 72, atsScore: 79 };
ROLE_DATA.ux = { ...ROLE_DATA.swe, label: 'UX Design Intern',       matchScore: 81, atsScore: 86 };
ROLE_DATA.devops = { ...ROLE_DATA.swe, label: 'DevOps / Cloud Intern', matchScore: 65, atsScore: 74 };

/* ═══════════════════════════════════════════════════
   2. STATE
   ═══════════════════════════════════════════════════ */
const state = {
  currentRole: 'swe',
  courseFilter: 'all',
  chartInstances: {},
  analyzing: false,
};

let analysisTimer = null;
let stepTimer = null;

/* ═══════════════════════════════════════════════════
   3. DOM
   ═══════════════════════════════════════════════════ */
const $ = id => document.getElementById(id);
const $$ = sel => document.querySelectorAll(sel);

/* ═══════════════════════════════════════════════════
   4. INIT
   ═══════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  hideAnalysisOverlays();
  if (typeof lucide !== 'undefined') lucide.createIcons();
  renderDashboard('swe');
  bindEvents();
});

/* ═══════════════════════════════════════════════════
   5. RENDER DASHBOARD
   ═══════════════════════════════════════════════════ */
function renderDashboard(roleKey) {
  const data = ROLE_DATA[roleKey];
  if (!data) return;
  state.currentRole = roleKey;

  // Animate ring score
  animateRingScore(data.matchScore);

  // Role pill
  const pill = $('currentRolePill');
  if (pill) pill.textContent = data.label;

  // Mini stats
  const d = data;
  setEl('miniMatched', d.matched?.length || 18);
  setEl('miniMissing', d.missing?.length || 4);
  setEl('miniTotal',   (d.matched?.length || 18) + (d.missing?.length || 4));

  // Quick stat cards — update inline
  updateQuickStats(data);

  // Charts
  renderRadarChart(data);
  renderCategoryChart(data);

  // Keyword density
  renderKeywordDensity(data);

  // Skills sections
  renderMatchedSkills(data);
  renderMissingSkills(data);

  // Suggestions
  renderSuggestions(data);

  // Courses
  renderCourses(data, state.courseFilter);

  // Internships
  renderInternships(data);

  // Roadmap
  renderRoadmap(data);

  // Re-init icons for dynamic content
  lucide.createIcons();
}

/* ═══════════════════════════════════════════════════
   6. CIRCULAR RING ANIMATION
   ═══════════════════════════════════════════════════ */
function animateRingScore(targetScore) {
  const ringFill  = $('ringFill');
  const ringScore = $('ringScore');
  const ringGrade = $('ringGrade');
  if (!ringFill || !ringScore) return;

  // r = 82 → circumference ≈ 515.22
  const CIRC = 2 * Math.PI * 82;
  const offset = CIRC - (targetScore / 100) * CIRC;

  // Trigger CSS transition
  requestAnimationFrame(() => {
    ringFill.style.strokeDashoffset = offset;
  });

  // Count-up animation
  let current = parseInt(ringScore.textContent) || 0;
  const step = Math.ceil((targetScore - current) / 60);
  const timer = setInterval(() => {
    current = Math.min(current + step, targetScore);
    ringScore.textContent = current;
    if (current >= targetScore) clearInterval(timer);
  }, 20);

  // Grade label
  if (ringGrade) {
    if (targetScore >= 85) { ringGrade.innerHTML = `<i data-lucide="trending-up"></i><span>Strong</span>`; ringGrade.style.color = '#10B981'; }
    else if (targetScore >= 70) { ringGrade.innerHTML = `<i data-lucide="minus"></i><span>Good</span>`; ringGrade.style.color = '#06B6D4'; }
    else { ringGrade.innerHTML = `<i data-lucide="trending-down"></i><span>Needs Work</span>`; ringGrade.style.color = '#F59E0B'; }
  }
}

/* ═══════════════════════════════════════════════════
   7. CHART: RADAR
   ═══════════════════════════════════════════════════ */
function renderRadarChart(data) {
  const canvas = $('radarChart');
  if (!canvas || typeof Chart === 'undefined') return;

  if (state.chartInstances.radar) {
    state.chartInstances.radar.destroy();
  }

  state.chartInstances.radar = new Chart(canvas, {
    type: 'radar',
    data: {
      labels: data.radarLabels,
      datasets: [
        {
          label: 'Your Profile',
          data: data.userRadar,
          borderColor: '#4F46E5',
          backgroundColor: 'rgba(79, 70, 229, 0.15)',
          borderWidth: 2,
          pointBackgroundColor: '#4F46E5',
          pointRadius: 4,
          pointHoverRadius: 6,
        },
        {
          label: 'Role Required',
          data: data.roleRadar,
          borderColor: '#06B6D4',
          backgroundColor: 'rgba(6, 182, 212, 0.08)',
          borderWidth: 2,
          borderDash: [5, 5],
          pointBackgroundColor: '#06B6D4',
          pointRadius: 3,
          pointHoverRadius: 5,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 1000, easing: 'easeInOutQuart' },
      scales: {
        r: {
          min: 0, max: 100,
          ticks: {
            stepSize: 25,
            color: '#6b7280',
            font: { size: 10, family: 'Inter' },
            backdropColor: 'transparent',
          },
          grid:        { color: 'rgba(255,255,255,0.06)' },
          angleLines:  { color: 'rgba(255,255,255,0.06)' },
          pointLabels: { color: '#9ca3af', font: { size: 11, family: 'Inter', weight: '500' } },
        },
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgba(30,41,59,0.95)',
          borderColor: 'rgba(255,255,255,0.08)',
          borderWidth: 1,
          titleColor: '#f3f4f6',
          bodyColor: '#9ca3af',
          padding: 10,
          callbacks: {
            label: ctx => ` ${ctx.dataset.label}: ${ctx.raw}%`,
          },
        },
      },
    },
  });
}

/* ═══════════════════════════════════════════════════
   8. CHART: HORIZONTAL BAR (Category Coverage)
   ═══════════════════════════════════════════════════ */
function renderCategoryChart(data) {
  const canvas = $('categoryChart');
  if (!canvas || typeof Chart === 'undefined') return;

  if (state.chartInstances.category) {
    state.chartInstances.category.destroy();
  }

  const colors = ['#4F46E5','#06B6D4','#10B981','#F59E0B','#8B5CF6'];

  state.chartInstances.category = new Chart(canvas, {
    type: 'bar',
    data: {
      labels: data.categories.labels,
      datasets: [{
        data: data.categories.user,
        backgroundColor: colors.map(c => c + '33'),
        borderColor: colors,
        borderWidth: 2,
        borderRadius: 6,
        borderSkipped: false,
      }],
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 900, easing: 'easeInOutCubic' },
      scales: {
        x: {
          min: 0, max: 100,
          grid:  { color: 'rgba(255,255,255,0.05)' },
          ticks: { color: '#9ca3af', font: { size: 10, family: 'Inter' }, callback: v => v + '%' },
        },
        y: {
          grid:  { display: false },
          ticks: { color: '#9ca3af', font: { size: 11, family: 'Inter' } },
        },
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgba(30,41,59,0.95)',
          borderColor: 'rgba(255,255,255,0.08)',
          borderWidth: 1,
          callbacks: {
            label: ctx => ` Coverage: ${ctx.raw}%`,
          },
        },
      },
    },
  });
}

/* ═══════════════════════════════════════════════════
   9. KEYWORD DENSITY BARS
   ═══════════════════════════════════════════════════ */
function renderKeywordDensity(data) {
  const container = $('keywordDensityList');
  if (!container) return;

  container.innerHTML = data.keywords.map(kw => `
    <div class="kw-density-item">
      <span class="kw-name">${kw.name}</span>
      <div class="kw-bar-track">
        <div class="kw-bar-fill" style="width:0%; background:${kw.color};" data-target="${kw.pct}"></div>
      </div>
      <span class="kw-pct" style="color:${kw.color}">${kw.pct}%</span>
    </div>
  `).join('');

  // Animate bars after render
  requestAnimationFrame(() => {
    container.querySelectorAll('.kw-bar-fill').forEach(bar => {
      bar.style.width = bar.dataset.target + '%';
    });
  });
}

/* ═══════════════════════════════════════════════════
   10. MATCHED SKILLS GRID
   ═══════════════════════════════════════════════════ */
function renderMatchedSkills(data) {
  const grid = $('matchedSkillsGrid');
  const count = $('matchedCount');
  if (!grid) return;

  const skills = data.matched || [];
  if (count) count.textContent = skills.length;

  const levelClass = { 'Expert': 'sb-expert', 'Intermediate': 'sb-inter', 'Beginner': 'sb-beginner' };
  const levelDot   = { 'Expert': '#10B981', 'Intermediate': '#06B6D4', 'Beginner': '#4F46E5' };

  grid.innerHTML = skills.map((sk, i) => `
    <span
      class="skill-badge ${levelClass[sk.level] || 'sb-beginner'}"
      style="animation-delay:${i * 30}ms"
      title="${sk.level}"
      tabindex="0"
    >
      <span class="badge-level-dot" style="background:${levelDot[sk.level]}"></span>
      <i data-lucide="${sk.icon}"></i>
      ${sk.name}
    </span>
  `).join('');
}

/* ═══════════════════════════════════════════════════
   11. MISSING SKILLS LIST
   ═══════════════════════════════════════════════════ */
function renderMissingSkills(data) {
  const list  = $('missingSkillsList');
  const count = $('missingCount');
  if (!list) return;

  const skills = data.missing || [];
  if (count) count.textContent = skills.length;

  const impactClass = { 'Critical': 'impact-critical', 'High': 'impact-high', 'Medium': 'impact-medium' };

  list.innerHTML = skills.map((sk, i) => `
    <div class="missing-skill-item" style="animation-delay:${i * 60}ms">
      <div class="missing-icon">
        <i data-lucide="${sk.icon}"></i>
      </div>
      <div class="missing-info">
        <p class="missing-name">${sk.name}</p>
        <p class="missing-meta">${sk.reason}</p>
      </div>
      <span class="impact-badge ${impactClass[sk.impact] || 'impact-medium'}">${sk.impact}</span>
    </div>
  `).join('');
}

/* ═══════════════════════════════════════════════════
   12. IMPROVEMENT SUGGESTIONS
   ═══════════════════════════════════════════════════ */
function renderSuggestions(data) {
  const grid = $('suggestionsGrid');
  if (!grid) return;

  grid.innerHTML = (data.suggestions || []).map((s, i) => {
    const dots = Array.from({ length: 5 }, (_, d) =>
      `<span class="impact-dot${d < s.impact ? ' filled' : ''}"></span>`
    ).join('');

    return `
      <div class="suggestion-card" style="animation-delay:${i * 50}ms">
        <div class="sug-header">
          <div class="sug-icon ${s.iconClass}">
            <i data-lucide="${s.icon}"></i>
          </div>
          <p class="sug-title">${s.title}</p>
        </div>
        <p class="sug-desc">${s.desc}</p>
        <div class="sug-footer">
          <span class="sug-effort">
            <i data-lucide="clock"></i> ${s.effort}
          </span>
          <div class="sug-impact-bar">
            <span>Impact:</span>
            <div class="impact-dots">${dots}</div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

/* ═══════════════════════════════════════════════════
   13. COURSES
   ═══════════════════════════════════════════════════ */
function renderCourses(data, filter) {
  const grid = $('coursesGrid');
  if (!grid) return;

  let courses = data.courses || [];
  if (filter === 'free')  courses = courses.filter(c => c.type === 'free');
  if (filter === 'quick') courses = courses.filter(c => parseFloat(c.duration) <= 5);
  if (filter === 'cert')  courses = courses.filter(c => c.cert);

  if (courses.length === 0) {
    grid.innerHTML = `<div class="empty-courses">No courses match this filter.</div>`;
    return;
  }

  grid.innerHTML = courses.map((c, i) => {
    const badgeClass = c.type === 'free' ? 'badge-free' : c.type === 'cert' ? 'badge-cert' : 'badge-paid';
    return `
      <div class="course-card" style="animation-delay:${i * 60}ms" tabindex="0" role="article" aria-label="${c.title} on ${c.platform}">
        <div class="course-top">
          <div class="course-platform-icon ${c.platformClass}">${c.platformShort}</div>
          <div class="course-info">
            <p class="course-title">${c.title}</p>
            <p class="course-platform">${c.platform}</p>
          </div>
        </div>
        <div class="course-meta">
          <span class="course-meta-item"><i data-lucide="clock"></i> ${c.duration}</span>
          <span class="course-meta-item"><i data-lucide="star"></i> ${c.rating}</span>
          <span class="course-badge ${badgeClass}">${c.price}</span>
          ${c.cert ? '<span class="course-badge badge-cert">Certificate</span>' : ''}
        </div>
        <div class="course-skill-tag">
          <i data-lucide="target"></i>
          Covers: <span class="skill-tag-label">${c.skill}</span>
        </div>
        <div class="course-actions">
          <button class="btn-course btn-course-primary" onclick="handleCourseEnroll('${c.title}')">
            <i data-lucide="play-circle"></i> Start Course
          </button>
          <button class="btn-course btn-course-ghost" onclick="handleCourseSave('${c.title}')">
            <i data-lucide="bookmark"></i>
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function handleCourseEnroll(title) { showToast(`Opening: ${title}`); }
function handleCourseSave(title)   { showToast(`Saved: ${title} to your learning list`); }

/* ═══════════════════════════════════════════════════
   14. RECOMMENDED INTERNSHIPS
   ═══════════════════════════════════════════════════ */
const LOGO_CLASSES = {
  google: 'logo-google', meta: 'logo-meta', microsoft: 'logo-microsoft',
  stripe: 'logo-stripe', amazon: 'logo-amazon', apple: 'logo-apple',
  netflix: 'logo-netflix', salesforce: 'logo-salesforce', figma: 'logo-figma',
  airbnb: 'logo-airbnb', twitter: 'logo-twitter',
};

function renderInternships(data) {
  const grid = $('internshipsRecoGrid');
  if (!grid) return;

  const items = data.internships || [];
  const workBadge = wt => {
    const map = { remote: ['work-remote','🌐 Remote'], hybrid: ['work-hybrid','🏢 Hybrid'], onsite: ['work-onsite','📍 On-site'] };
    return map[wt] || ['work-hybrid','Hybrid'];
  };

  grid.innerHTML = items.map((item, i) => {
    const [badgeClass, badgeLabel] = workBadge(item.workType);
    return `
      <div class="intern-reco-card" style="animation-delay:${i * 70}ms" tabindex="0" aria-label="${item.position} at ${item.company}">
        <div class="reco-top">
          <div class="reco-logo ${item.logoClass}">${item.logoText}</div>
          <div class="reco-info">
            <p class="reco-position">${item.position}</p>
            <p class="reco-company">${item.company}</p>
          </div>
          <div class="reco-match">
            <span class="reco-match-pct" style="color:${item.matchColor}">${item.matchPct}%</span>
            <span class="reco-match-label">Match</span>
          </div>
        </div>
        <div class="reco-meta">
          <span class="reco-meta-item"><i data-lucide="map-pin"></i>${item.location}</span>
          <span class="work-badge ${badgeClass}">${badgeLabel}</span>
        </div>
        <button class="reco-apply-btn" onclick="handleApply('${item.company}', '${item.position}')">
          <i data-lucide="send"></i> Apply Now
        </button>
      </div>
    `;
  }).join('');

  setTimeout(applyLogoColors, 50);
}

function handleApply(company, position) {
  showToast(`Opening application: ${position} at ${company}`);
}

/* ═══════════════════════════════════════════════════
   15. ROADMAP TIMELINE
   ═══════════════════════════════════════════════════ */
function renderRoadmap(data) {
  const container = $('roadmapTimeline');
  if (!container) return;

  const statusClass = { done: 'rs-done', active: 'rs-active', pending: 'rs-pending' };
  const statusLabel = { done: '✓ Complete', active: '⚡ In Progress', pending: 'Upcoming' };
  const iconMap     = { done: 'check', active: 'loader', pending: 'circle' };

  container.innerHTML = (data.roadmap || []).map((item, i) => `
    <div class="roadmap-item" style="animation-delay:${i * 80}ms">
      <div class="roadmap-dot ${item.dotClass}">
        <i data-lucide="${iconMap[item.status]}"></i>
      </div>
      <p class="roadmap-week">${item.week}</p>
      <div class="roadmap-content">
        <div>
          <p class="roadmap-title">${item.title}</p>
          <p class="roadmap-sub">${item.sub}</p>
        </div>
        <span class="roadmap-status ${statusClass[item.status]}">${statusLabel[item.status]}</span>
      </div>
    </div>
  `).join('');
}

/* ═══════════════════════════════════════════════════
   16. QUICK STATS HELPER
   ═══════════════════════════════════════════════════ */
function updateQuickStats(data) {
  const statCards = $$('.qstat-card');
  if (!statCards.length) return;

  const stats = [
    { val: `${data.matchScore}%`, label: 'Match Score',    trend: '+7%',      trendClass: 'trend-up'   },
    { val: data.matched?.length,  label: 'Skills Matched', trend: '+3 skills', trendClass: 'trend-up'   },
    { val: data.missing?.length,  label: 'Gaps Found',     trend: '−2 gaps',  trendClass: 'trend-down'  },
    { val: data.courses?.length,  label: 'Courses Ready',  trend: 'Curated',  trendClass: 'trend-new'   },
  ];

  statCards.forEach((card, i) => {
    if (!stats[i]) return;
    const valEl = card.querySelector('.qstat-val');
    const trendEl = card.querySelector('.qstat-trend');
    if (valEl) valEl.firstChild.textContent = stats[i].val;
    if (trendEl) {
      trendEl.className = `qstat-trend ${stats[i].trendClass}`;
    }
  });
}

/* ═══════════════════════════════════════════════════
   17. BIND EVENTS
   ═══════════════════════════════════════════════════ */
function bindEvents() {

  // Target role dropdown
  const roleSelect = $('targetRoleSelect');
  roleSelect?.addEventListener('change', () => {
    triggerAnalysis(roleSelect.value);
  });

  // Re-analyze button
  $('reAnalyzeBtn')?.addEventListener('click', () => {
    triggerAnalysis(state.currentRole);
  });

  // Upload resume button
  $('uploadResumeBtn')?.addEventListener('click', () => {
    $('resumeFileInput')?.click();
  });

  // File input change
  $('resumeFileInput')?.addEventListener('change', e => {
    const file = e.target.files?.[0];
    if (file) {
      showToast(`Resume uploaded: ${file.name}`);
      triggerAnalysis(state.currentRole);
    }
  });

  // Download report
  $('downloadReportBtn')?.addEventListener('click', () => {
    showToast('Skill Match Report downloaded as PDF');
  });

  // Course filter tabs
  $$('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.tab-btn').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected','false'); });
      btn.classList.add('active');
      btn.setAttribute('aria-selected','true');
      state.courseFilter = btn.dataset.tab;
      renderCourses(ROLE_DATA[state.currentRole], state.courseFilter);
      lucide.createIcons();
    });
  });

  // Sidebar collapse
  $('sidebarCollapseBtn')?.addEventListener('click', () => {
    document.getElementById('sidebar')?.classList.toggle('collapsed');
  });

  // Show all matched skills toggle
  $('toggleMatchedAll')?.addEventListener('click', function() {
    const grid = $('matchedSkillsGrid');
    const isHidden = grid?.style.maxHeight === 'none' ? false : true;
    if (grid) grid.style.maxHeight = isHidden ? 'none' : '160px';
    this.textContent = isHidden ? 'Show less' : 'Show all';
  });

  // Drag & drop on upload zone
  const uploadZone = $('uploadZone');
  if (uploadZone) {
    uploadZone.addEventListener('dragover', e => { e.preventDefault(); uploadZone.classList.add('drag-over'); });
    uploadZone.addEventListener('dragleave', () => uploadZone.classList.remove('drag-over'));
    uploadZone.addEventListener('drop', e => {
      e.preventDefault();
      uploadZone.classList.remove('drag-over');
      const file = e.dataTransfer.files[0];
      if (file) { showToast(`Resume uploaded: ${file.name}`); triggerAnalysis(state.currentRole); }
    });
  }

  // Keyboard: Escape dismisses loading overlay
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && state.analyzing) {
      finishAnalysis(state.currentRole, true);
    }
  });
}

/* ═══════════════════════════════════════════════════
   18. TRIGGER ANALYSIS (with animated loader)
   ═══════════════════════════════════════════════════ */
function hideAnalysisOverlays() {
  const reanalyze = $('reanalyzeOverlay');
  const analyzing = $('analyzingOverlay');
  const dashboard = $('skillDashboard');

  if (reanalyze) reanalyze.hidden = true;
  if (analyzing) analyzing.hidden = true;
  if (dashboard) {
    dashboard.style.opacity = '1';
    dashboard.removeAttribute('aria-busy');
  }
}

function finishAnalysis(roleKey, cancelled = false) {
  clearTimeout(analysisTimer);
  clearInterval(stepTimer);
  analysisTimer = null;
  stepTimer = null;

  try {
    if (!cancelled) {
      renderDashboard(roleKey);
      if (typeof lucide !== 'undefined') lucide.createIcons();
      const analyzeLabel = $('analyzeRoleLabel');
      if (analyzeLabel) analyzeLabel.textContent = ROLE_DATA[roleKey]?.label || roleKey;
      showToast(`Analysis complete for ${ROLE_DATA[roleKey]?.label || roleKey}`);
    } else {
      showToast('Analysis cancelled');
    }
  } catch (err) {
    console.error('Skill Match analysis failed:', err);
    showToast('Could not refresh analysis. Showing previous results.');
  } finally {
    hideAnalysisOverlays();
    state.analyzing = false;
  }
}

function triggerAnalysis(roleKey) {
  if (!ROLE_DATA[roleKey]) return;

  clearTimeout(analysisTimer);
  clearInterval(stepTimer);

  state.analyzing = true;
  state.currentRole = roleKey;

  const overlay   = $('reanalyzeOverlay');
  const dashboard = $('skillDashboard');

  if (overlay) overlay.hidden = false;
  if (dashboard) {
    dashboard.style.opacity = '0.4';
    dashboard.setAttribute('aria-busy', 'true');
  }

  // Animate progress steps in the inline loader (if present)
  const steps = $$('#progressSteps .prog-step');
  let stepIndex = 0;
  steps.forEach(s => s.classList.remove('active', 'done'));

  stepTimer = setInterval(() => {
    if (steps[stepIndex]) {
      steps.forEach(s => s.classList.remove('active'));
      steps[stepIndex].classList.add('active', 'done');
    }
    stepIndex++;
    if (stepIndex >= steps.length) {
      clearInterval(stepTimer);
      stepTimer = null;
    }
  }, 500);

  analysisTimer = setTimeout(() => finishAnalysis(roleKey), 2400);
}

/* ═══════════════════════════════════════════════════
   19. UTILITIES
   ═══════════════════════════════════════════════════ */
function setEl(id, val) {
  const el = $(id);
  if (el) el.textContent = val;
}

let toastTimer;
function showToast(msg) {
  const toast    = $('toast');
  const toastMsg = $('toastMsg');
  if (!toast) return;
  toastMsg.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
}

/* ─── Logo colour map (for dynamic cards) ─── */
const logo_swatch = {
  'logo-google':     'linear-gradient(135deg,#4285F4,#34A853)',
  'logo-meta':       'linear-gradient(135deg,#0082FB,#00C6FF)',
  'logo-microsoft':  'linear-gradient(135deg,#00A2ED,#0067B8)',
  'logo-stripe':     'linear-gradient(135deg,#6772E5,#9FA8DA)',
  'logo-amazon':     'linear-gradient(135deg,#FF9900,#FFB347)',
  'logo-netflix':    'linear-gradient(135deg,#E50914,#B81D24)',
  'logo-salesforce': 'linear-gradient(135deg,#009EDB,#00B5E2)',
  'logo-figma':      'linear-gradient(135deg,#F24E1E,#A259FF)',
  'logo-airbnb':     'linear-gradient(135deg,#FF5A5F,#FC642D)',
  'logo-twitter':    'linear-gradient(135deg,#1DA1F2,#0C85D0)',
};

/* Inject logo backgrounds after render */
function applyLogoColors() {
  document.querySelectorAll('.reco-logo[class*="logo-"]').forEach(el => {
    const cls = [...el.classList].find(c => c.startsWith('logo-'));
    if (cls && logo_swatch[cls]) el.style.background = logo_swatch[cls];
  });
}
