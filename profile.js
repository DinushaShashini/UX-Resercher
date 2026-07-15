/* ═══════════════════════════════════════════════════════════════════
   InternLink — Student Profile Page
   Full interactive: skills, education, certs, projects, portfolio,
   edit modal, radar chart, completeness, avatar upload, toast
   ═══════════════════════════════════════════════════════════════════ */

'use strict';

/* ─────────────────────────────────────────────────────
   1. PROFILE DATA
   ───────────────────────────────────────────────────── */
const profileData = {
  name:       'Arjun Patel',
  headline:   'Computer Science Junior · University of Texas at Austin',
  tagline:    'Building full-stack products and seeking Summer 2026 SWE internships',
  location:   'Austin, TX',
  major:      'B.S. Computer Science · GPA 3.7',
  grad:       'Graduating May 2027',
  avail:      'Available Jun 2026',
  openToWork: true,
  bio1: `I'm a third-year Computer Science student at UT Austin with a passion for building elegant,
high-performance web applications. I have hands-on experience in full-stack development,
having interned at TechCorp where I reduced API latency by 40% using Redis caching.`,
  bio2: `I'm currently seeking Summer 2026 SWE internships at product-focused tech companies.
I enjoy open-source contributions, algorithm challenges, and building side projects
that solve real problems for university students.`,
  links: {
    github:    'https://github.com/arjunpatel',
    linkedin:  'https://linkedin.com/in/arjun-patel-dev',
    portfolio: 'https://arjunpatel.dev',
    email:     'arjun@utexas.edu',
  },
};

/* ─────────────────────────────────────────────────────
   2. SKILLS DATA
   ───────────────────────────────────────────────────── */
const skillsData = [
  // Languages
  { name: 'Python',     category: 'languages', level: 'expert'       },
  { name: 'JavaScript', category: 'languages', level: 'expert'       },
  { name: 'TypeScript', category: 'languages', level: 'intermediate' },
  { name: 'Java',       category: 'languages', level: 'intermediate' },
  { name: 'Go',         category: 'languages', level: 'beginner'     },
  { name: 'SQL',        category: 'languages', level: 'intermediate' },
  // Frameworks
  { name: 'React',      category: 'frameworks', level: 'expert'       },
  { name: 'Node.js',    category: 'frameworks', level: 'expert'       },
  { name: 'Express',    category: 'frameworks', level: 'intermediate' },
  { name: 'Next.js',    category: 'frameworks', level: 'intermediate' },
  { name: 'FastAPI',    category: 'frameworks', level: 'beginner'     },
  // Tools
  { name: 'Git',        category: 'tools', level: 'expert'       },
  { name: 'AWS',        category: 'tools', level: 'intermediate' },
  { name: 'Docker',     category: 'tools', level: 'beginner'     },
  { name: 'PostgreSQL', category: 'tools', level: 'intermediate' },
  { name: 'Redis',      category: 'tools', level: 'intermediate' },
  { name: 'Linux',      category: 'tools', level: 'intermediate' },
  // Soft Skills
  { name: 'Leadership',     category: 'soft', level: 'expert'       },
  { name: 'Communication',  category: 'soft', level: 'expert'       },
  { name: 'Problem Solving',category: 'soft', level: 'expert'       },
  { name: 'Agile / Scrum',  category: 'soft', level: 'intermediate' },
];

/* ─────────────────────────────────────────────────────
   3. EDUCATION DATA
   ───────────────────────────────────────────────────── */
const educationData = [
  {
    school:  'University of Texas at Austin',
    degree:  'B.S. Computer Science',
    dates:   'Aug 2023 – May 2027',
    gpa:     '3.7 / 4.0',
    status:  'active',
    badges:  ["Dean's List", 'CS Honors', 'Algorithms Club'],
  },
  {
    school:  'Austin Community College',
    degree:  'Dual Enrollment — Linear Algebra & Calc III',
    dates:   'Sep 2021 – May 2023',
    gpa:     '4.0 / 4.0',
    status:  'done',
    badges:  ['High School Dual Enrollment'],
  },
];

/* ─────────────────────────────────────────────────────
   4. CERTIFICATIONS DATA
   ───────────────────────────────────────────────────── */
const certsData = [
  {
    name:    'AWS Certified Cloud Practitioner',
    issuer:  'Amazon Web Services',
    date:    'April 2026',
    expiry:  'April 2029',
    status:  'active',
    logoBg:  'linear-gradient(135deg,#FF9900,#FFB347)',
    logoText:'AWS',
    credUrl: '#',
  },
  {
    name:    'Meta Front-End Developer Certificate',
    issuer:  'Meta (via Coursera)',
    date:    'January 2026',
    expiry:  null,
    status:  'active',
    logoBg:  'linear-gradient(135deg,#0082FB,#00C6FF)',
    logoText:'M',
    credUrl: '#',
  },
  {
    name:    'Google IT Automation with Python',
    issuer:  'Google (via Coursera)',
    date:    'August 2025',
    expiry:  null,
    status:  'active',
    logoBg:  'linear-gradient(135deg,#4285F4,#34A853)',
    logoText:'G',
    credUrl: '#',
  },
  {
    name:    'Certified Associate in Project Management',
    issuer:  'PMI',
    date:    'March 2024',
    expiry:  'March 2025',
    status:  'expired',
    logoBg:  'linear-gradient(135deg,#6366f1,#8B5CF6)',
    logoText:'PM',
    credUrl: '#',
  },
];

/* ─────────────────────────────────────────────────────
   5. PROJECTS DATA
   ───────────────────────────────────────────────────── */
const projectsData = [
  {
    name:    'InternLink',
    tag:     'live',
    desc:    'A full-stack internship tracking platform for university students. Features Kanban application tracker, skill matching engine, and resume analyzer. Used by 500+ beta users.',
    tech:    ['Node.js', 'TypeScript', 'React', 'MongoDB', 'Redis'],
    stars:   128,
    forks:   34,
    views:   '1.2k',
    github:  '#',
    live:    '#',
    accent:  '#4F46E5',
  },
  {
    name:    'APIForge',
    tag:     'github',
    desc:    'CLI tool that auto-generates REST API boilerplate from a JSON schema. Reduced setup time by 80% in my internship. Open-sourced with 120+ GitHub stars.',
    tech:    ['Python', 'FastAPI', 'Click', 'Jinja2'],
    stars:   122,
    forks:   18,
    views:   '890',
    github:  '#',
    live:    null,
    accent:  '#06B6D4',
  },
  {
    name:    'DevDash',
    tag:     'wip',
    desc:    'Personal developer productivity dashboard combining GitHub activity, LeetCode stats, and calendar events. Built with Next.js and deployed on Vercel.',
    tech:    ['Next.js', 'TypeScript', 'TailwindCSS', 'GitHub API'],
    stars:   41,
    forks:   7,
    views:   '320',
    github:  '#',
    live:    '#',
    accent:  '#10B981',
  },
];

/* ─────────────────────────────────────────────────────
   6. PORTFOLIO LINKS
   ───────────────────────────────────────────────────── */
const portfolioLinksData = [
  {
    name:   'Portfolio Website',
    url:    'arjunpatel.dev',
    full:   'https://arjunpatel.dev',
    icon:   'globe',
    bg:     'rgba(6,182,212,.15)',
    color:  '#22d3ee',
    border: 'rgba(6,182,212,.25)',
  },
  {
    name:   'GitHub',
    url:    'github.com/arjunpatel',
    full:   'https://github.com/arjunpatel',
    icon:   'github',
    bg:     'rgba(255,255,255,.07)',
    color:  '#f3f4f6',
    border: 'rgba(255,255,255,.12)',
  },
  {
    name:   'LinkedIn',
    url:    'linkedin.com/in/arjun-patel-dev',
    full:   'https://linkedin.com/in/arjun-patel-dev',
    icon:   'linkedin',
    bg:     'rgba(0,119,181,.15)',
    color:  '#60a5fa',
    border: 'rgba(0,119,181,.25)',
  },
  {
    name:   'Resume (PDF)',
    url:    'arjunpatel.dev/resume.pdf',
    full:   '#',
    icon:   'file-text',
    bg:     'rgba(139,92,246,.15)',
    color:  '#c4b5fd',
    border: 'rgba(139,92,246,.25)',
  },
  {
    name:   'Email',
    url:    'arjun@utexas.edu',
    full:   'mailto:arjun@utexas.edu',
    icon:   'mail',
    bg:     'rgba(244,63,94,.12)',
    color:  '#fda4af',
    border: 'rgba(244,63,94,.22)',
  },
];

/* ─────────────────────────────────────────────────────
   7. STATS
   ───────────────────────────────────────────────────── */
const statsData = [
  { val: '42',  label: 'Applications', sub: 'This season', color: '#4F46E5' },
  { val: '6',   label: 'Interviews',   sub: '+1 scheduled', color: '#06B6D4' },
  { val: '87%', label: 'Match Score',  sub: 'vs top roles', color: '#10B981' },
];

/* ─────────────────────────────────────────────────────
   8. DOM
   ───────────────────────────────────────────────────── */
const $ = id => document.getElementById(id);

/* ─────────────────────────────────────────────────────
   9. INIT
   ───────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
  renderStats();
  renderSkills('all');
  renderSkillRadar();
  renderEducation();
  renderCertifications();
  renderProjects();
  renderPortfolioLinks();
  animateCompleteness(88);
  populateEditModal();
  bindEvents();
});

/* ─────────────────────────────────────────────────────
   10. STATS ROW
   ───────────────────────────────────────────────────── */
function renderStats() {
  const row = $('statsRow');
  if (!row) return;
  row.innerHTML = statsData.map(s => `
    <div class="stat-card">
      <span class="stat-val" style="color:${s.color}">${s.val}</span>
      <span class="stat-label">${s.label}</span>
      <span class="stat-sub">${s.sub}</span>
    </div>
  `).join('');
}

/* ─────────────────────────────────────────────────────
   11. SKILLS
   ───────────────────────────────────────────────────── */
function renderSkills(filter) {
  const container = $('skillsContainer');
  if (!container) return;

  const filtered = filter === 'all'
    ? skillsData
    : skillsData.filter(s => s.category === filter);

  const levelClass = { expert: 'sb-expert', intermediate: 'sb-intermediate', beginner: 'sb-beginner' };

  container.innerHTML = filtered.map((sk, i) => `
    <span class="skill-badge ${levelClass[sk.level]}"
      title="${sk.level} · ${sk.category}"
      style="animation-delay:${i * 25}ms"
    >
      <span class="level-dot"></span>
      ${esc(sk.name)}
    </span>
  `).join('');
}

/* ─────────────────────────────────────────────────────
   12. SKILL RADAR CHART
   ───────────────────────────────────────────────────── */
let radarChart = null;
function renderSkillRadar() {
  const canvas = $('skillRadar');
  if (!canvas) return;
  if (radarChart) radarChart.destroy();

  const categories = ['Languages', 'Frameworks', 'Tools', 'Algorithms', 'Soft Skills', 'CS Fundamentals'];
  const scores     = [88, 82, 74, 85, 92, 79];

  radarChart = new Chart(canvas, {
    type: 'radar',
    data: {
      labels: categories,
      datasets: [{
        label: 'My Proficiency',
        data: scores,
        borderColor: '#4F46E5',
        backgroundColor: 'rgba(79,70,229,.15)',
        borderWidth: 2,
        pointBackgroundColor: '#06B6D4',
        pointRadius: 4,
        pointHoverRadius: 6,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 1000, easing: 'easeInOutQuart' },
      scales: {
        r: {
          min: 0, max: 100,
          ticks: { stepSize: 25, color: '#6b7280', font: { size: 9, family: 'Inter' }, backdropColor: 'transparent' },
          grid:        { color: 'rgba(255,255,255,.06)' },
          angleLines:  { color: 'rgba(255,255,255,.06)' },
          pointLabels: { color: '#9ca3af', font: { size: 10, family: 'Inter', weight: '500' } },
        },
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgba(30,41,59,.95)',
          borderColor: 'rgba(255,255,255,.08)', borderWidth: 1,
          callbacks: { label: ctx => ` ${ctx.raw}%` },
        },
      },
    },
  });
}

/* ─────────────────────────────────────────────────────
   13. EDUCATION
   ───────────────────────────────────────────────────── */
function renderEducation() {
  const timeline = $('educationTimeline');
  if (!timeline) return;

  timeline.innerHTML = educationData.map((edu, i) => {
    const dotClass = edu.status === 'active' ? 'dot-active' : 'dot-done';
    const badgesHtml = edu.badges.map(b => `<span class="tl-badge">${esc(b)}</span>`).join('');
    return `
      <div class="timeline-item" style="animation-delay:${i * 80}ms">
        <div class="timeline-dot ${dotClass}">${edu.status === 'done' ? '✓' : ''}</div>
        <div class="tl-header">
          <span class="tl-school">${esc(edu.school)}</span>
          <span class="tl-dates">${esc(edu.dates)}</span>
        </div>
        <p class="tl-degree">${esc(edu.degree)}</p>
        <div class="tl-badges">
          ${badgesHtml}
          ${edu.gpa ? `<span class="tl-gpa"><i data-lucide="star"></i>GPA ${esc(edu.gpa)}</span>` : ''}
        </div>
      </div>
    `;
  }).join('');
  lucide.createIcons();
}

/* ─────────────────────────────────────────────────────
   14. CERTIFICATIONS
   ───────────────────────────────────────────────────── */
function renderCertifications() {
  const grid = $('certsGrid');
  if (!grid) return;

  grid.innerHTML = certsData.map((cert, i) => {
    const statusClass = cert.status === 'active' ? 'cs-active' : 'cs-expired';
    const statusLabel = cert.status === 'active' ? '✓ Active' : '⚠ Expired';
    return `
      <div class="cert-card" style="animation-delay:${i * 60}ms">
        <div class="cert-logo" style="background:${cert.logoBg}">${cert.logoText}</div>
        <div class="cert-info">
          <p class="cert-name">${esc(cert.name)}</p>
          <p class="cert-issuer"><i data-lucide="building-2"></i>${esc(cert.issuer)}</p>
          <div class="cert-meta">
            <span class="cert-date"><i data-lucide="calendar"></i>${esc(cert.date)}</span>
            ${cert.expiry ? `<span class="cert-date" title="Expiry"><i data-lucide="clock"></i>${esc(cert.expiry)}</span>` : ''}
            <span class="cert-status ${statusClass}">${statusLabel}</span>
          </div>
        </div>
        <a href="${cert.credUrl}" class="cert-link-btn" aria-label="View credential" title="View credential">
          <i data-lucide="external-link"></i>
        </a>
      </div>
    `;
  }).join('');
  lucide.createIcons();
}

/* ─────────────────────────────────────────────────────
   15. PROJECTS
   ───────────────────────────────────────────────────── */
function renderProjects() {
  const grid = $('projectsGrid');
  if (!grid) return;

  const tagLabels = { live: 'Live', github: 'Open Source', wip: 'In Progress' };
  const tagClass  = { live: 'pt-live', github: 'pt-github', wip: 'pt-wip' };

  grid.innerHTML = projectsData.map((proj, i) => {
    const techHtml = proj.tech.map(t => `<span class="tech-chip">${esc(t)}</span>`).join('');
    return `
      <div class="project-card" style="animation-delay:${i * 70}ms; --proj-accent:${proj.accent}">
        <div class="proj-header">
          <div class="proj-name-row">
            <span class="proj-name">${esc(proj.name)}</span>
            <span class="proj-tag ${tagClass[proj.tag]}">${tagLabels[proj.tag]}</span>
          </div>
          <div class="proj-links">
            ${proj.github ? `<a href="${proj.github}" class="proj-link-btn" aria-label="GitHub repo" title="GitHub"><i data-lucide="github"></i></a>` : ''}
            ${proj.live   ? `<a href="${proj.live}"   class="proj-link-btn" aria-label="Live demo"  title="Live Demo"><i data-lucide="external-link"></i></a>` : ''}
          </div>
        </div>
        <p class="proj-desc">${esc(proj.desc)}</p>
        <div class="proj-stats">
          <span class="proj-stat"><i data-lucide="star"></i>${proj.stars}</span>
          <span class="proj-stat"><i data-lucide="git-fork"></i>${proj.forks}</span>
          <span class="proj-stat"><i data-lucide="eye"></i>${proj.views} views</span>
        </div>
        <div class="proj-tech">${techHtml}</div>
      </div>
    `;
  }).join('');
  lucide.createIcons();
}

/* ─────────────────────────────────────────────────────
   16. PORTFOLIO LINKS
   ───────────────────────────────────────────────────── */
function renderPortfolioLinks() {
  const grid = $('portfolioLinksGrid');
  if (!grid) return;

  grid.innerHTML = portfolioLinksData.map((link, i) => `
    <a href="${link.full}" class="portfolio-link-card" style="animation-delay:${i * 55}ms"
      target="_blank" rel="noopener noreferrer"
      aria-label="${link.name}: ${link.url}"
    >
      <div class="pl-icon" style="background:${link.bg};border:1px solid ${link.border};color:${link.color}">
        <i data-lucide="${link.icon}"></i>
      </div>
      <div class="pl-info">
        <p class="pl-name" style="color:${link.color}">${esc(link.name)}</p>
        <p class="pl-url">${esc(link.url)}</p>
      </div>
      <span class="pl-arrow"><i data-lucide="arrow-right"></i></span>
    </a>
  `).join('');
  lucide.createIcons();
}

/* ─────────────────────────────────────────────────────
   17. PROFILE COMPLETENESS
   ───────────────────────────────────────────────────── */
function animateCompleteness(target) {
  const fill = $('compFill');
  const pct  = $('compPct');
  if (fill) setTimeout(() => { fill.style.width = target + '%'; }, 300);
  if (pct)  pct.textContent = target + '%';
}

/* ─────────────────────────────────────────────────────
   18. POPULATE EDIT MODAL
   ───────────────────────────────────────────────────── */
function populateEditModal() {
  // Editable skills list
  renderEditableSkills();
  // Education edit entries
  renderEducationEdit();
  // Cert edit entries
  renderCertEdit();
  // Project edit entries
  renderProjectEdit();
}

function renderEditableSkills() {
  const list = $('editableSkillsList');
  if (!list) return;
  list.innerHTML = skillsData.map((sk, i) => `
    <span class="editable-skill" data-idx="${i}">
      ${esc(sk.name)} <span style="font-size:.68rem;color:var(--clr-faint)">(${sk.level})</span>
      <button class="del-skill" data-idx="${i}" aria-label="Remove ${sk.name}">
        <i data-lucide="x"></i>
      </button>
    </span>
  `).join('');
  lucide.createIcons();

  list.querySelectorAll('.del-skill').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.idx);
      skillsData.splice(idx, 1);
      renderEditableSkills();
      renderSkills(currentSkillTab());
      renderSkillRadar();
    });
  });
}

function renderEducationEdit() {
  const container = $('educationEditList');
  if (!container) return;
  container.innerHTML = educationData.map((edu, i) => `
    <div class="edit-entry" id="edu-edit-${i}">
      <div class="edit-entry-header">
        <span class="edit-entry-title">${esc(edu.school)}</span>
        <button class="del-entry-btn" data-type="edu" data-idx="${i}" aria-label="Remove">
          <i data-lucide="trash-2"></i>
        </button>
      </div>
      <div class="edit-entry-fields">
        <div class="form-group">
          <label class="form-label">School</label>
          <div class="input-wrap"><i data-lucide="building-2"></i>
            <input type="text" class="form-input" data-field="school" data-type="edu" data-idx="${i}" value="${esc(edu.school)}" />
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Degree</label>
          <div class="input-wrap"><i data-lucide="graduation-cap"></i>
            <input type="text" class="form-input" data-field="degree" data-type="edu" data-idx="${i}" value="${esc(edu.degree)}" />
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Dates</label>
          <div class="input-wrap"><i data-lucide="calendar"></i>
            <input type="text" class="form-input" data-field="dates" data-type="edu" data-idx="${i}" value="${esc(edu.dates)}" />
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">GPA</label>
          <div class="input-wrap"><i data-lucide="star"></i>
            <input type="text" class="form-input" data-field="gpa" data-type="edu" data-idx="${i}" value="${esc(edu.gpa || '')}" />
          </div>
        </div>
      </div>
    </div>
  `).join('');
  lucide.createIcons();
  bindEditEntryEvents(container, 'edu', educationData);
}

function renderCertEdit() {
  const container = $('certEditList');
  if (!container) return;
  container.innerHTML = certsData.map((cert, i) => `
    <div class="edit-entry" id="cert-edit-${i}">
      <div class="edit-entry-header">
        <span class="edit-entry-title">${esc(cert.name)}</span>
        <button class="del-entry-btn" data-type="cert" data-idx="${i}" aria-label="Remove">
          <i data-lucide="trash-2"></i>
        </button>
      </div>
      <div class="edit-entry-fields">
        <div class="form-group full">
          <label class="form-label">Certification Name</label>
          <div class="input-wrap"><i data-lucide="award"></i>
            <input type="text" class="form-input" data-field="name" data-type="cert" data-idx="${i}" value="${esc(cert.name)}" />
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Issuer</label>
          <div class="input-wrap"><i data-lucide="building-2"></i>
            <input type="text" class="form-input" data-field="issuer" data-type="cert" data-idx="${i}" value="${esc(cert.issuer)}" />
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Date Earned</label>
          <div class="input-wrap"><i data-lucide="calendar"></i>
            <input type="text" class="form-input" data-field="date" data-type="cert" data-idx="${i}" value="${esc(cert.date)}" />
          </div>
        </div>
      </div>
    </div>
  `).join('');
  lucide.createIcons();
  bindEditEntryEvents(container, 'cert', certsData);
}

function renderProjectEdit() {
  const container = $('projectEditList');
  if (!container) return;
  container.innerHTML = projectsData.map((proj, i) => `
    <div class="edit-entry" id="proj-edit-${i}">
      <div class="edit-entry-header">
        <span class="edit-entry-title">${esc(proj.name)}</span>
        <button class="del-entry-btn" data-type="proj" data-idx="${i}" aria-label="Remove">
          <i data-lucide="trash-2"></i>
        </button>
      </div>
      <div class="edit-entry-fields">
        <div class="form-group">
          <label class="form-label">Project Name</label>
          <div class="input-wrap"><i data-lucide="folder-open"></i>
            <input type="text" class="form-input" data-field="name" data-type="proj" data-idx="${i}" value="${esc(proj.name)}" />
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Tech Stack</label>
          <div class="input-wrap"><i data-lucide="code-2"></i>
            <input type="text" class="form-input" data-field="tech" data-type="proj" data-idx="${i}" value="${esc((proj.tech||[]).join(', '))}" />
          </div>
        </div>
        <div class="form-group full">
          <label class="form-label">Description</label>
          <textarea class="form-textarea" rows="2" data-field="desc" data-type="proj" data-idx="${i}">${esc(proj.desc)}</textarea>
        </div>
        <div class="form-group">
          <label class="form-label">GitHub URL</label>
          <div class="input-wrap"><i data-lucide="github"></i>
            <input type="text" class="form-input" data-field="github" data-type="proj" data-idx="${i}" value="${esc(proj.github||'')}" />
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Live URL</label>
          <div class="input-wrap"><i data-lucide="external-link"></i>
            <input type="text" class="form-input" data-field="live" data-type="proj" data-idx="${i}" value="${esc(proj.live||'')}" />
          </div>
        </div>
      </div>
    </div>
  `).join('');
  lucide.createIcons();
  bindEditEntryEvents(container, 'proj', projectsData);
}

function bindEditEntryEvents(container, type, dataArr) {
  container.querySelectorAll('.del-entry-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.idx);
      dataArr.splice(idx, 1);
      const renderMap = { edu: renderEducationEdit, cert: renderCertEdit, proj: renderProjectEdit };
      renderMap[type]?.();
    });
  });

  container.querySelectorAll('[data-field]').forEach(input => {
    input.addEventListener('input', () => {
      const idx   = parseInt(input.dataset.idx);
      const field = input.dataset.field;
      if (dataArr[idx]) {
        if (field === 'tech') {
          dataArr[idx][field] = input.value.split(',').map(s => s.trim()).filter(Boolean);
        } else {
          dataArr[idx][field] = input.value;
        }
      }
    });
  });
}

/* ─────────────────────────────────────────────────────
   19. SAVE PROFILE
   ───────────────────────────────────────────────────── */
function saveProfile() {
  // Basics
  profileData.name     = $('eFullName')?.value.trim()  || profileData.name;
  profileData.headline = $('eHeadline')?.value.trim()  || profileData.headline;
  profileData.tagline  = $('eTagline')?.value.trim()   || profileData.tagline;
  profileData.location = $('eLocation')?.value.trim()  || profileData.location;
  profileData.major    = $('eMajor')?.value.trim()     || profileData.major;
  profileData.grad     = $('eGrad')?.value.trim()      || profileData.grad;
  profileData.avail    = $('eAvail')?.value.trim()     || profileData.avail;
  profileData.openToWork = $('eOpenToWork')?.checked ?? profileData.openToWork;

  // Bio
  profileData.bio1 = $('eBio1')?.value.trim() || profileData.bio1;
  profileData.bio2 = $('eBio2')?.value.trim() || profileData.bio2;

  // Links
  profileData.links.github    = $('eGithub')?.value.trim()    || profileData.links.github;
  profileData.links.linkedin  = $('eLinkedin')?.value.trim()  || profileData.links.linkedin;
  profileData.links.portfolio = $('ePortfolio')?.value.trim() || profileData.links.portfolio;
  profileData.links.email     = $('eEmail')?.value.trim()     || profileData.links.email;

  // Apply to DOM
  applyProfileToDom();
  closeModal();
  showToast('Profile saved successfully!', 'success');
}

function applyProfileToDom() {
  const set = (id, val) => { const el = $(id); if (el) el.textContent = val; };

  set('heroName',     profileData.name);
  set('heroHeadline', profileData.headline);
  set('heroTagline',  profileData.tagline);
  set('heroLocation', profileData.location);
  set('heroMajor',    profileData.major);
  set('heroGrad',     profileData.grad);
  set('heroAvail',    profileData.avail);

  // Open to work badge
  const otw = $('openToWorkBadge');
  if (otw) otw.style.display = profileData.openToWork ? '' : 'none';

  // Social links
  const github    = $('socialGithub');
  const linkedin  = $('socialLinkedin');
  const portfolio = $('socialPortfolio');
  const email     = $('socialEmail');
  if (github)    github.querySelector('span').textContent    = profileData.links.github.replace('https://','');
  if (linkedin)  linkedin.querySelector('span').textContent  = profileData.links.linkedin.replace('https://','');
  if (portfolio) portfolio.querySelector('span').textContent = profileData.links.portfolio.replace('https://','');
  if (email)     email.querySelector('span').textContent     = profileData.links.email;

  // Bio
  const b1 = $('bioText');   if (b1) b1.textContent = profileData.bio1;
  const b2 = $('bioText2');  if (b2) b2.textContent = profileData.bio2;

  // Re-render dynamic sections
  renderCertifications();
  renderProjects();
  renderPortfolioLinks();
  renderEducation();
}

/* ─────────────────────────────────────────────────────
   20. MODAL OPEN / CLOSE
   ───────────────────────────────────────────────────── */
function openModal(tab) {
  const backdrop = $('modalBackdrop');
  backdrop?.classList.add('open');
  backdrop?.setAttribute('aria-hidden', 'false');
  if (tab) switchEditTab(tab);
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const backdrop = $('modalBackdrop');
  backdrop?.classList.remove('open');
  backdrop?.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function switchEditTab(tab) {
  document.querySelectorAll('.edit-tab').forEach(t => {
    const isActive = t.dataset.etab === tab;
    t.classList.toggle('active', isActive);
    t.setAttribute('aria-selected', isActive);
  });
  document.querySelectorAll('.edit-panel').forEach(p => {
    p.classList.toggle('active', p.id === `epanel-${tab}`);
  });
}

/* ─────────────────────────────────────────────────────
   21. BIND EVENTS
   ───────────────────────────────────────────────────── */
function bindEvents() {

  // Edit profile button (header + hero)
  [$('editProfileBtn'), $('heroEditBtn')].forEach(btn => {
    btn?.addEventListener('click', () => openModal('basics'));
  });

  // Section edit buttons
  document.querySelectorAll('.edit-section-btn').forEach(btn => {
    btn.addEventListener('click', () => openModal(btn.dataset.section));
  });

  // Modal close / cancel
  $('modalCloseBtn')?.addEventListener('click',  closeModal);
  $('modalCancelBtn')?.addEventListener('click', closeModal);
  $('modalBackdrop')?.addEventListener('click', e => {
    if (e.target === $('modalBackdrop')) closeModal();
  });

  // Modal save
  $('modalSaveBtn')?.addEventListener('click', saveProfile);

  // Edit tabs
  document.querySelectorAll('.edit-tab').forEach(tab => {
    tab.addEventListener('click', () => switchEditTab(tab.dataset.etab));
  });

  // Skill filter tabs
  document.querySelectorAll('.skill-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.skill-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderSkills(tab.dataset.tab);
    });
  });

  // Add skill button inside modal
  $('addSkillBtn')?.addEventListener('click', () => {
    const input    = $('eSkillsInput');
    const category = $('eSkillCategory')?.value || 'tools';
    const level    = $('eSkillLevel')?.value    || 'intermediate';
    const name     = input?.value.trim();
    if (!name) { showToast('Enter a skill name', 'warning'); return; }
    skillsData.push({ name, category, level });
    if (input) input.value = '';
    renderEditableSkills();
    renderSkills(currentSkillTab());
    renderSkillRadar();
    showToast(`Added: ${name}`, 'success');
  });

  $('eSkillsInput')?.addEventListener('keydown', e => {
    if (e.key === 'Enter') { e.preventDefault(); $('addSkillBtn')?.click(); }
  });

  // Add education / cert / project
  $('addEducationBtn')?.addEventListener('click', () => {
    educationData.push({ school: 'New School', degree: 'Degree', dates: '2024 – 2028', gpa: '', status: 'active', badges: [] });
    renderEducationEdit();
    renderEducation();
    showToast('Education entry added', 'info');
  });

  $('addCertBtn')?.addEventListener('click', () => {
    certsData.push({ name: 'New Certification', issuer: 'Issuer', date: '2026', expiry: null, status: 'active', logoBg: 'linear-gradient(135deg,#4F46E5,#6366f1)', logoText: 'C', credUrl: '#' });
    renderCertEdit();
    renderCertifications();
    showToast('Certification added', 'info');
  });

  $('addProjectBtn')?.addEventListener('click', () => {
    projectsData.push({ name: 'New Project', tag: 'wip', desc: 'Project description', tech: [], stars: 0, forks: 0, views: '0', github: '#', live: null, accent: '#4F46E5' });
    renderProjectEdit();
    renderProjects();
    showToast('Project added', 'info');
  });

  // Share profile button
  [$('shareProfileBtn'), $('heroShareBtn')].forEach(btn => {
    btn?.addEventListener('click', () => {
      navigator.clipboard?.writeText(window.location.href).catch(() => {});
      showToast('Profile link copied to clipboard!', 'success');
    });
  });

  // Avatar upload
  $('avatarEditBtn')?.addEventListener('click', () => $('avatarInput')?.click());
  $('avatarInput')?.addEventListener('change', e => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      const avatar = $('profileAvatar');
      const sidebarAvatar = document.querySelector('.user-avatar');
      if (avatar) avatar.style.backgroundImage = `url('${ev.target.result}')`;
      if (sidebarAvatar) sidebarAvatar.style.backgroundImage = `url('${ev.target.result}')`;
      showToast('Profile photo updated!', 'success');
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  });

  // Sidebar collapse
  $('sidebarCollapseBtn')?.addEventListener('click', () => {
    document.getElementById('sidebar')?.classList.toggle('collapsed');
  });

  // Toast dismiss
  $('toastDismiss')?.addEventListener('click', () => $('toast').classList.remove('show'));

  // Keyboard Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });
}

/* ─────────────────────────────────────────────────────
   22. UTILITIES
   ───────────────────────────────────────────────────── */
function currentSkillTab() {
  return document.querySelector('.skill-tab.active')?.dataset.tab || 'all';
}

let toastTimer;
function showToast(msg, type = 'success') {
  const toast   = $('toast');
  const msgEl   = $('toastMsg');
  const iconEl  = $('toastIcon');
  if (!toast) return;

  const icons = { success: 'check-circle', info: 'info', warning: 'alert-triangle', error: 'alert-circle' };
  iconEl.innerHTML = `<i data-lucide="${icons[type] || 'check-circle'}"></i>`;
  toast.className  = `toast show t-${type}`;
  msgEl.textContent = msg;

  lucide.createIcons();
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
}

function esc(str) {
  return String(str || '')
    .replace(/&/g,'&amp;').replace(/</g,'&lt;')
    .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
